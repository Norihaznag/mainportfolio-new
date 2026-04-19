import 'server-only';

import { supabaseAdmin as supabase } from '@/lib/supabase';
import type { PortfolioProject } from '@/lib/portfolio-data';

const ALLOWED_PLATFORMS: PortfolioProject['platforms'][number][] = ['desktop', 'mobile', 'web', 'backend'];

function normalizePlatforms(value: unknown): PortfolioProject['platforms'] {
  if (!Array.isArray(value)) return ['web'];

  const normalized = value
    .map((item) => (typeof item === 'string' ? item : ''))
    .filter((item): item is PortfolioProject['platforms'][number] =>
      ALLOWED_PLATFORMS.includes(item as PortfolioProject['platforms'][number])
    );

  return normalized.length > 0 ? normalized : ['web'];
}

function mapDbProjectToPortfolioProject(item: Record<string, unknown>): PortfolioProject {
  return {
    id: String(item.id ?? ''),
    name: String(item.title ?? ''),
    tagline: String(item.tagline ?? item.description ?? ''),
    description: String(item.description ?? ''),
    liveUrl: typeof item.live_url === 'string' ? item.live_url : undefined,
    downloadUrl: typeof item.download_url === 'string' ? item.download_url : undefined,
    githubRepo: typeof item.github_repo === 'string' ? item.github_repo : undefined,
    featured: Boolean(item.featured),
    icon: typeof item.icon === 'string' ? item.icon : 'LayoutGrid',
    gradient: typeof item.gradient === 'string' ? item.gradient : 'from-slate-700 to-slate-900',
    platforms: normalizePlatforms(item.platforms),
    industry: typeof item.industry === 'string' ? item.industry : typeof item.category === 'string' ? item.category : 'general',
    tags: Array.isArray(item.tags)
      ? item.tags.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0)
      : [],
    outcome: typeof item.outcome === 'string' ? item.outcome : 'Delivered successfully',
  };
}

export async function fetchPublishedProjects(options?: { featuredOnly?: boolean }): Promise<PortfolioProject[]> {
  let query = supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (options?.featuredOnly) {
    query = query.eq('featured', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error loading projects: ', error.message);
    return [];
  }

  return (data || []).map((item) => mapDbProjectToPortfolioProject(item as Record<string, unknown>));
}
