import { NextRequest, NextResponse } from 'next/server';

import { mapDbAppToDownloadableApp, toPublicDownloadableApp } from '@/lib/apps-data';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get('slug');

    let query = supabase
      .from('apps')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (slug) {
      query = query.eq('slug', slug);
      const { data, error } = await query.maybeSingle();

      if (error) {
        console.error('Supabase error fetching app: ', error);
        return NextResponse.json({ app: null }, { status: 400 });
      }

      if (!data) {
        return NextResponse.json({ app: null });
      }

      return NextResponse.json({ app: toPublicDownloadableApp(mapDbAppToDownloadableApp(data)) });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error fetching apps: ', error);
      return NextResponse.json({ apps: [] }, { status: 400 });
    }

    const apps = (data || []).map((item) => toPublicDownloadableApp(mapDbAppToDownloadableApp(item)));
    return NextResponse.json({ apps });
  } catch (error) {
    console.error('Error fetching apps: ', error);
    return NextResponse.json({ apps: [] }, { status: 500 });
  }
}
