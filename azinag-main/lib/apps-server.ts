import 'server-only';

import { supabaseAdmin as supabase } from '@/lib/supabase';
import { mapDbAppToDownloadableApp, toPublicDownloadableApp, type DownloadableApp } from '@/lib/apps-data';

export async function fetchPublishedApps(): Promise<DownloadableApp[]> {
  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading apps: ', error.message);
    return [];
  }

  return (data || []).map((row) => toPublicDownloadableApp(mapDbAppToDownloadableApp(row)));
}

export async function fetchPublishedAppBySlug(slug: string): Promise<DownloadableApp | null> {
  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .eq('published', true)
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    if (error) {
      console.error('Error loading app by slug: ', error.message);
    }
    return null;
  }

  return toPublicDownloadableApp(mapDbAppToDownloadableApp(data));
}
