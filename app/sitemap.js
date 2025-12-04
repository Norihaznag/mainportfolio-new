export default function sitemap() {
  const baseUrl = 'https://azinag.site';
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/apps',
    '/contact',
    '/pricing',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}

