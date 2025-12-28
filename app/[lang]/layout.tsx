import type { Metadata } from 'next';
import { Header } from '@/components/HeaderWithLang';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import '../globals.css';

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: 'en' | 'fr' | 'ar';
  }>;
}

const baseUrl = 'https://azinag.com';

const languageTitles = {
  en: 'Azinag - Professional Web Development for Moroccan Businesses',
  fr: 'Azinag - Développement Web Professionnel pour les Entreprises Marocaines',
  ar: 'Azinag - تطوير مواقع احترافي للشركات المغربية',
};

const languageDescriptions = {
  en: 'We build fast and effective websites and applications for Moroccan companies. Professional web development at affordable prices. Expert Darija-friendly service.',
  fr: 'Nous construisons des sites web et des applications rapides et efficaces pour les entreprises marocaines. Développement web professionnel à des prix abordables.',
  ar: 'كنبنيو ليك مواقع ويب وتطبيقات سريعة وفعالة، موجهة خصيصاً للشركات المغربية وبثمن معقول. خدمة احترافية وموثوقة.',
};

const languageKeywords = {
  en: 'web development, website design, Moroccan businesses, affordable websites, professional development, web apps, e-commerce',
  fr: 'développement web, conception de sites web, entreprises marocaines, sites web abordables, développement professionnel, applications web, e-commerce',
  ar: 'تطوير ويب، تصميم مواقع، شركات مغربية، مواقع بأسعار معقولة، تطوير احترافي، تطبيقات ويب، متاجر إلكترونية',
};

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const canonical = `${baseUrl}/${lang}`;

  return {
    metadataBase: new URL(baseUrl),
    title: languageTitles[lang],
    description: languageDescriptions[lang],
    keywords: languageKeywords[lang],
    authors: [{ name: 'Azinag Team' }],
    creator: 'Azinag',
    publisher: 'Azinag',
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'ar' ? 'ar_MA' : lang === 'fr' ? 'fr_MA' : 'en_US',
      alternateLocale: lang === 'en' ? ['fr_MA', 'ar_MA'] : lang === 'fr' ? ['en_US', 'ar_MA'] : ['en_US', 'fr_MA'],
      url: canonical,
      siteName: 'Azinag',
      title: languageTitles[lang],
      description: languageDescriptions[lang],
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Azinag - Professional Web Development',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: languageTitles[lang],
      description: languageDescriptions[lang],
      images: [`${baseUrl}/og-image.png`],
      creator: '@azinag',
    },
    alternates: {
      canonical: canonical,
      languages: {
        'en-US': `${baseUrl}/en`,
        'fr-MA': `${baseUrl}/fr`,
        'ar-MA': `${baseUrl}/ar`,
        'x-default': `${baseUrl}/en`,
      },
    },
    verification: {
      google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
    },
  };
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}#organization`,
    name: 'Azinag',
    alternateName: 'Azinag Web Development',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: languageDescriptions[lang],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA',
      addressLocality: 'Marrakech',
      streetAddress: 'Morocco',
    },
    email: 'contact@azinag.com',
    telephone: '+212-XXXXXXXXX',
    sameAs: [
      'https://www.facebook.com/azinag',
      'https://www.instagram.com/azinag',
      'https://www.linkedin.com/company/azinag',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+212-XXXXXXXXX',
      contactType: 'Sales',
      email: 'contact@azinag.com',
    },
    priceRange: '$',
    areaServed: 'MA',
    knowsAbout: ['Web Development', 'UI/UX Design', 'E-commerce', 'Web Applications'],
  };

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="language" content={lang} />
        <link rel="canonical" href={`${baseUrl}/${lang}`} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
        <link rel="alternate" hrefLang="fr" href={`${baseUrl}/fr`} />
        <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en`} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-white text-gray-900">
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
