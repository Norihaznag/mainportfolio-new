import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
  title: 'Azinag — Custom Software House · Morocco',
  description:
    'Azinag builds custom software for every business — desktop apps (Windows, macOS, Linux), mobile apps (iOS, Android), web applications, SaaS platforms, and backend systems. Based in Morocco, serving all industries.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Azinag',
    title: 'Azinag — Custom Software Solutions for Every Business',
    description:
      'Custom software house based in Morocco. Desktop, Mobile, Web, Backend. We build software for every industry at any scale.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azinag — Custom Software Solutions for Every Business',
    description:
      'Custom software house based in Morocco. Desktop, Mobile, Web, Backend. Every platform, every industry.',
  },
  keywords: [
    'custom software Morocco',
    'software house Maroc',
    'web application development',
    'mobile app development Morocco',
    'desktop application development',
    'SaaS development',
    'backend API Morocco',
    'azinag',
  ],
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
        {/* Google Analytics GA4 */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PRFYHRG5PQ" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-PRFYHRG5PQ');`,
          }}
        />
        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`,
              }}
            />
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Azinag',
              url: 'https://azinag.site',
              description:
                'Sites web professionnels pour restaurants et cafés au Maroc — Guelmim, Tan-Tan, Tiznit, Sidi Ifni. WhatsApp, Google Maps, prix fixe en dirhams.',
              founder: {
                '@type': 'Organization',
                name: 'Azinag',
              },
              areaServed: [
                { '@type': 'City', name: 'Guelmim' },
                { '@type': 'City', name: 'Tan-Tan' },
                { '@type': 'City', name: 'Tiznit' },
                { '@type': 'City', name: 'Sidi Ifni' },
              ],
              priceRange: '1200 – 6000 MAD',
              telephone: '+212609343953',
              sameAs: [],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Formules sites web restaurants',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'Présence — Site une page' },
                    price: '1200',
                    priceCurrency: 'MAD',
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'Vitrine — Site multi-pages' },
                    price: '2500',
                    priceCurrency: 'MAD',
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'Réservation+ — Site avec réservations' },
                    price: '4500',
                    priceCurrency: 'MAD',
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="bg-canvas text-ink font-sans min-h-screen selection:bg-accent selection:text-white antialiased">
        {/* Skip to main content — Lighthouse a11y */}
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
            <main id="main-content" className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppButton />
          </LanguageProvider>
        )}
      </body>
    </html>
  );
}
