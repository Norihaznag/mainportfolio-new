import { MetadataRoute } from 'next';

const baseUrl = 'https://azinag.com';
const languages = ['en', 'fr', 'ar'];
const routes = ['', 'pricing', 'showcase', 'about', 'how-it-works', 'order'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = languages.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}${route ? `/${route}` : ''}`,
      lastModified: new Date(),
      changeFrequency: route ? ('weekly' as const) : ('daily' as const),
      priority: route ? (route === 'pricing' ? 0.9 : 0.8) : 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route ? `/${route}` : ''}`,
          fr: `${baseUrl}/fr${route ? `/${route}` : ''}`,
          ar: `${baseUrl}/ar${route ? `/${route}` : ''}`,
        },
      },
    }))
  );

  return entries;
}
