import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const ALLOWED_PLATFORMS = ['desktop', 'mobile', 'web', 'backend'] as const;

type ProjectPlatform = (typeof ALLOWED_PLATFORMS)[number];

function normalizePlatforms(value: unknown): ProjectPlatform[] {
  if (!Array.isArray(value)) return ['web'];

  const normalized = value
    .map((item) => (typeof item === 'string' ? item : ''))
    .filter((item): item is ProjectPlatform =>
      (ALLOWED_PLATFORMS as readonly string[]).includes(item)
    );

  return normalized.length > 0 ? normalized : ['web'];
}

export async function GET(request: NextRequest) {
  try {
    const featuredOnly = request.nextUrl.searchParams.get('featured') === 'true';

    let query = supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (featuredOnly) {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error fetching projects: ', error);
      return NextResponse.json({ projects: [] }, { status: 400 });
    }

    const projects = (data || []).map(item => ({
      id: item.id,
      name: item.title,
      tagline: item.tagline || item.description || '',
      description: item.description || '',
      liveUrl: item.live_url,
      downloadUrl: item.download_url,
      githubRepo: item.github_repo,
      thumbnailUrl: item.thumbnail_url,
      icon: item.icon || 'LayoutGrid',
      gradient: item.gradient || 'from-slate-700 to-slate-900',
      platforms: normalizePlatforms(item.platforms),
      industry: item.industry || item.category || 'general',
      outcome: item.outcome || 'Delivered successfully',
      thumbnail_url: item.thumbnail_url,
      tags: item.tags || [],
      category: item.category,
      sort_order: item.sort_order,
      featured: item.featured,
    }));

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects: ', error);
    return NextResponse.json({ projects: [] }, { status: 500 });
  }
}
