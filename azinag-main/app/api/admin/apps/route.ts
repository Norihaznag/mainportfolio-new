import { NextRequest, NextResponse } from 'next/server';

import { mapAppPayloadToDbRow, mapDbAppToDownloadableApp } from '@/lib/apps-data';
import { getAdminSessionFromRequest } from '@/lib/admin-auth';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const adminSession = getAdminSessionFromRequest(request);
  if (!adminSession) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const apps = (data || []).map((row) => mapDbAppToDownloadableApp(row));
    return NextResponse.json({ apps, total: apps.length });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const adminSession = getAdminSessionFromRequest(request);
  if (!adminSession) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const dbRow = mapAppPayloadToDbRow(body) as Record<string, unknown>;

    const hasRequiredFields =
      typeof dbRow['slug'] === 'string' && dbRow['slug'].trim().length > 0 &&
      typeof dbRow['name'] === 'string' && dbRow['name'].trim().length > 0 &&
      typeof dbRow['tagline'] === 'string' && dbRow['tagline'].trim().length > 0;

    if (!hasRequiredFields) {
      return NextResponse.json(
        { message: 'slug, name and tagline are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('apps')
      .insert([dbRow])
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ message: 'App was not created' }, { status: 500 });
    }

    return NextResponse.json(mapDbAppToDownloadableApp(data), { status: 201 });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
