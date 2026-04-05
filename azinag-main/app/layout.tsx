import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
});

const baseUrl = 'https://azinag.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Azinag — Founder-led Studio for Startups',
  description:
    'Landing pages and SaaS MVPs built by a founder who ships. Clean code, sharp design, fixed scope. Working with global startups.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Azinag',
    title: 'Azinag — Founder-led Studio for Startups',
    description:
      'Landing pages and SaaS MVPs built by a founder who ships. Fixed scope, direct communication, global clients.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azinag — Founder-led Studio for Startups',
    description:
      'Landing pages and SaaS MVPs built by a founder who ships. Fixed scope, direct communication, global clients.',
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
        <meta name="theme-color" content="#1D4ED8" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" />
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
          </LanguageProvider>
        )}
      </body>
    </html>
  );
}
