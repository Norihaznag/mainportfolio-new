import { NextRequest, NextResponse } from 'next/server';

import { getAdminSessionFromRequest } from '@/lib/admin-auth';
import { getCloudinaryCredentials, signCloudinaryParams } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

type ResourceType = 'image' | 'raw';

function sanitizeSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9/_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-/]+|[-/]+$/g, '');
}

export async function POST(request: NextRequest) {
  const adminSession = getAdminSessionFromRequest(request);
  if (!adminSession) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));

    const resourceType: ResourceType = body?.resourceType === 'raw' ? 'raw' : 'image';
    const inputFolder = typeof body?.folder === 'string' ? body.folder : 'azinag/uploads';
    const folder = sanitizeSegment(inputFolder) || 'azinag/uploads';

    const inputPublicId = typeof body?.publicId === 'string' ? body.publicId : '';
    const publicId = inputPublicId ? sanitizeSegment(inputPublicId) : undefined;

    const inputTags = Array.isArray(body?.tags)
      ? body.tags.map((tag: unknown) => (typeof tag === 'string' ? tag.trim() : '')).filter(Boolean)
      : [];
    const tags = inputTags.length > 0 ? inputTags.join(',') : undefined;

    const timestamp = Math.floor(Date.now() / 1000);
    const { cloudName, apiKey, apiSecret } = getCloudinaryCredentials();

    const signature = signCloudinaryParams(
      {
        timestamp,
        folder,
        public_id: publicId,
        tags,
      },
      apiSecret
    );

    return NextResponse.json({
      cloudName,
      apiKey,
      timestamp,
      signature,
      folder,
      publicId,
      tags,
      resourceType,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
