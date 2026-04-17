import { NextRequest, NextResponse } from 'next/server';

import { getAdminSessionFromRequest } from '@/lib/admin-auth';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const DEFAULT_BUCKET = 'files';
const DEFAULT_FOLDER = 'azinag/uploads';
const MAX_FILE_BYTES = 1024 * 1024 * 1024;

function sanitizePathSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sanitizeObjectPath(value: string): string {
  return value
    .split('/')
    .map((segment) => sanitizePathSegment(segment))
    .filter((segment) => segment.length > 0)
    .join('/');
}

function sanitizeFileName(value: string): string {
  const normalized = sanitizePathSegment(value.replace(/\s+/g, '-'));
  return normalized.length > 0 ? normalized.slice(0, 180) : 'file.bin';
}

export async function POST(request: NextRequest) {
  const adminSession = getAdminSessionFromRequest(request);
  if (!adminSession) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folderRaw = formData.get('folder');

    if (!(file instanceof File) || file.size <= 0) {
      return NextResponse.json({ message: 'File is required.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ message: 'File is too large. Keep it under 1GB.' }, { status: 400 });
    }

    const folderInput = typeof folderRaw === 'string' ? folderRaw : DEFAULT_FOLDER;
    const folder = sanitizeObjectPath(folderInput) || DEFAULT_FOLDER;
    const fileName = sanitizeFileName(file.name);
    const objectPath = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${fileName}`;
    const contentType = file.type?.trim() || 'application/octet-stream';
    const bucket = process.env.SUPABASE_FILES_BUCKET?.trim() || DEFAULT_BUCKET;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(objectPath, Buffer.from(await file.arrayBuffer()), {
        contentType,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
    if (!data.publicUrl) {
      return NextResponse.json({ message: 'Could not build public file URL.' }, { status: 500 });
    }

    return NextResponse.json({
      fileUrl: data.publicUrl,
      objectPath,
      bytes: file.size,
      contentType,
      bucket,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
