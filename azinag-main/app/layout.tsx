import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/components/LanguageContext';
import './globals.css';

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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#C2410C" />
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
