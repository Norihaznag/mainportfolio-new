import Script from 'next/script';

export default function BaseSEO() {
  const baseUrl = 'https://azinag.site';

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}#organization`,
    name: 'Azinag Web Solutions',
    description: 'Azinag builds custom mobile apps, ultra-fast websites, and Progressive Web Apps (PWAs) for desktop and mobile, with WhatsApp ordering for faster sales.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    telephone: '+212-XXX-XXXXXX', // Update with actual phone number
    email: 'contact@azinag.site', // Update with actual email
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA',
      addressLocality: 'Morocco',
    },
    sameAs: [
      // Add your social media profiles here
      // 'https://twitter.com/azinag',
      // 'https://linkedin.com/company/azinag',
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Morocco',
    },
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: 'Azinag Web Solutions',
    description: 'Azinag builds custom mobile apps, ultra-fast websites, and Progressive Web Apps (PWAs) for desktop and mobile, with WhatsApp ordering for faster sales.',
    publisher: {
      '@id': `${baseUrl}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}

