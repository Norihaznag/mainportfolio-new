import { MetadataRoute } from 'next';
import { apps } from '@/lib/apps-data';

const baseUrl = 'https://azinag.site';

const routes: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }[] = [
  { path: '',             priority: 1.0, changeFrequency: 'daily'   },
  { path: 'pricing',      priority: 0.9, changeFrequency: 'weekly'  },
  { path: 'applications', priority: 0.9, changeFrequency: 'weekly'  },
  { path: 'showcase',     priority: 0.8, changeFrequency: 'weekly'  },
  { path: 'about',        priority: 0.7, changeFrequency: 'monthly' },
  { path: 'contact',      priority: 0.7, changeFrequency: 'monthly' },
  { path: 'privacy',      priority: 0.3, changeFrequency: 'monthly' },
  { path: 'terms',        priority: 0.3, changeFrequency: 'monthly' },
  { path: 'cgv',          priority: 0.3, changeFrequency: 'monthly' },
  { path: 'lp/startup-mvp-development',   priority: 0.8, changeFrequency: 'weekly' },
  { path: 'lp/landing-page-development',  priority: 0.8, changeFrequency: 'weekly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path ? `/${path}` : ''}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const appRoutes = apps.map((app) => ({
    url: `${baseUrl}/applications/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...appRoutes];
}
