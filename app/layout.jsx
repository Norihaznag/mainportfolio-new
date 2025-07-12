import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import GoogleAnalytics from '@/components/google-analytics';
import AnalyticsTracker from '@/components/analytics-tracker';
import { LanguageProvider } from '@/lib/language-context';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/next';
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata = {
  title: {
    default: 'Noureddine Azinag - Full Stack Web Developer',
    template: '%s | Noureddine Azinag'
  },
  description: 'Freelance web developer from Morocco specializing in modern, fast websites with Next.js, React, and Tailwind CSS. Serving Morocco, GCC, and Europe.',
  keywords: ['web developer', 'morocco', 'freelance', 'next.js', 'react', 'tailwind css', 'seo'],
  authors: [{ name: 'Noureddine Azinag' }],
  creator: 'Noureddine Azinag',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://noureddineazinag.com',
    title: 'Noureddine Azinag - Full Stack Web Developer',
    description: 'Freelance web developer from Morocco specializing in modern, fast websites with Next.js, React, and Tailwind CSS.',
    siteName: 'Noureddine Azinag Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noureddine Azinag - Full Stack Web Developer',
    description: 'Freelance web developer from Morocco specializing in modern, fast websites.',
    creator: '@noureddineazinag',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://noureddineazinag.com'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Suspense fallback={null}>
              <GoogleAnalytics />
              <AnalyticsTracker />
            </Suspense>
            <main className="min-h-screen">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
                <Analytics />
      </body>
    </html>
  );
}