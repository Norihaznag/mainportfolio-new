import Script from 'next/script';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MarketingConsent } from '@/components/MarketingConsent';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Plus_Jakarta_Sans, Newsreader } from 'next/font/google';
import { LanguageProvider } from '@/components/LanguageContext';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500'],
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: false,
});

const baseUrl = 'https://azinag.site';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Azinag - SaaS and Business Applications',
  description:
    'Azinag provides SaaS apps and downloadable business software for invoicing, restaurant operations, and business management.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Azinag',
    title: 'Azinag - SaaS and Business Applications',
    description:
      'Business apps from Azinag: SaaS and desktop software products with clear pricing and support.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azinag - SaaS and Business Applications',
    description:
      'Business apps from Azinag: SaaS and desktop software products with clear pricing and support.',
  },
  keywords: [
    'SaaS applications',
    'business software',
    'desktop business apps',
    'invoicing software',
    'restaurant POS software',
    'business management apps',
    'azinag',
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Azinag',
  url: baseUrl,
  description:
    'Azinag is a software product company selling SaaS and downloadable business applications.',
  founder: {
    '@type': 'Person',
    name: 'Noureddine Azinag',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MA',
  },
  areaServed: [
    { '@type': 'Country', name: 'Morocco' },
    { '@type': 'Place', name: 'North Africa' },
    { '@type': 'Place', name: 'Europe' },
  ],
  priceRange: '90-900 MAD',
  telephone: '+212609343953',
  sameAs: [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Azinag software products',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'Dovi',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Windows',
        },
        price: '90',
        priceCurrency: 'MAD',
        url: `${baseUrl}/applications/dovi`,
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'Azinag Restuara',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Windows',
        },
        price: '90',
        priceCurrency: 'MAD',
        url: `${baseUrl}/applications/azinag-restuara`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get('x-pathname') ?? '';
  const isAdmin = pathname.startsWith('/adminos');

  return (
    <html lang="en" className={`${jakarta.variable} ${newsreader.variable}`}>
      <head>
        <Script
          async
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2134625850039327"
          crossOrigin="anonymous"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FDF4E3" />
        <meta name="color-scheme" content="light" />
        <meta name="google-adsense-account" content="ca-pub-2134625850039327" />
        <link rel="icon" href="/icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="bg-canvas text-ink font-sans min-h-screen selection:bg-accent selection:text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        {isAdmin ? (
          children
        ) : (
          <LanguageProvider>
            <Header />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <MarketingConsent />
          </LanguageProvider>
        )}
      </body>
    </html>
  );
}
