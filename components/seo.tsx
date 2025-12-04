import Script from 'next/script';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function SEO({
  title,
  description,
  image = 'https://azinag.site/og-image.jpg',
  slug = '',
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const baseUrl = 'https://azinag.site';
  const canonicalUrl = `${baseUrl}${slug}`;
  const fullTitle = title ? `${title} | Azinag` : 'Azinag — Custom mobile apps and fast websites';

  // WebPage Schema (page-specific)
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: fullTitle,
    description: description,
    isPartOf: {
      '@id': `${baseUrl}#website`,
    },
    about: {
      '@id': `${baseUrl}#organization`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: image,
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
  };

  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(webpageSchema),
      }}
    />
  );
}

