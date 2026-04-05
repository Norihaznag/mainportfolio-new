import { MetadataRoute } from 'next';

const baseUrl = 'https://azinag.site';

const routes: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }[] = [
  { path: '',          priority: 1.0, changeFrequency: 'daily'   },
  { path: 'pricing',   priority: 0.9, changeFrequency: 'weekly'  },
  { path: 'showcase',  priority: 0.8, changeFrequency: 'weekly'  },
  { path: 'about',     priority: 0.7, changeFrequency: 'monthly' },
  { path: 'contact',   priority: 0.7, changeFrequency: 'monthly' },
  { path: 'privacy',   priority: 0.3, changeFrequency: 'monthly' },
  { path: 'terms',     priority: 0.3, changeFrequency: 'monthly' },
  { path: 'lp/startup-mvp-development',   priority: 0.8, changeFrequency: 'weekly' },
  { path: 'lp/landing-page-development',  priority: 0.8, changeFrequency: 'weekly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path ? `/${path}` : ''}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
