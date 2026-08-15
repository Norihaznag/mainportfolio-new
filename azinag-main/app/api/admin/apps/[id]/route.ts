import { NextRequest, NextResponse } from 'next/server';

import { mapAppPayloadToDbRow, mapDbAppToDownloadableApp } from '@/lib/apps-data';
import { getAdminSessionFromRequest } from '@/lib/admin-auth';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminSession = getAdminSessionFromRequest(request);
  if (!adminSession) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const dbRow: Record<string, unknown> = {
      ...mapAppPayloadToDbRow(body),
      updated_at: new Date().toISOString(),
    };

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
      .update(dbRow)
      .eq('id', params.id)
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ message: 'App was not found' }, { status: 404 });
    }

    return NextResponse.json(mapDbAppToDownloadableApp(data));
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminSession = getAdminSessionFromRequest(request);
  if (!adminSession) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { error } = await supabase.from('apps').delete().eq('id', params.id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
