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
  title: 'Azinag - SaaS Apps and Custom Software - Morocco',
  description:
    'Azinag builds SaaS applications, desktop apps, web applications, mobile apps, and backend systems. Based in Morocco, serving businesses across industries.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Azinag',
    title: 'Azinag - SaaS Apps and Custom Software',
    description:
      'Morocco-based software studio building SaaS products, desktop applications, web applications, mobile apps, and backend systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azinag - SaaS Apps and Custom Software',
    description:
      'Morocco-based software studio building SaaS products, desktop applications, web applications, mobile apps, and backend systems.',
  },
  keywords: [
    'custom software Morocco',
    'software house Morocco',
    'SaaS applications Morocco',
    'web application development',
    'mobile app development Morocco',
    'desktop application development',
    'backend API Morocco',
    'azinag',
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Azinag',
  url: baseUrl,
  description:
    'Morocco-based software studio building SaaS applications, desktop apps, web applications, mobile apps, and backend systems.',
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
  priceRange: '90-4900 MAD',
  telephone: '+212609343953',
  sameAs: [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Azinag software products and services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'SoftwareApplication', name: 'Dovi' },
        price: '90',
        priceCurrency: 'MAD',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'SoftwareApplication', name: 'Azinag Restuara' },
        price: '90',
        priceCurrency: 'MAD',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Custom software projects' },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'MAD',
          description: 'Inquiry-only custom project pricing',
        },
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FDF4E3" />
        <meta name="color-scheme" content="light" />
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
