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
    default: 'Azinag Web Solutions – PWA, SaaS & WhatsApp Agency',
    template: '%s | Azinag Web Solutions'
  },
  description: 'Azinag Web Solutions is a modern web agency specializing in PWA, SaaS, eCommerce, and WhatsApp-integrated solutions for restaurants, shops, rentals, and more. Serving Morocco, GCC, and international clients.',
  keywords: [
    'web development agency',
    'PWA',
    'SaaS',
    'WhatsApp integration',
    'eCommerce',
    'Morocco',
    'web solutions',
    'next.js',
    'react',
    'tailwind css',
    'business apps',
    'digital transformation',
    'restaurant apps',
    'rental apps',
    'shop apps',
    'agency',
    'international'
  ],
  authors: [{ name: 'Azinag Web Solutions' }],
  creator: 'Azinag Web Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://azinagweb.com',
    title: 'Azinag Web Solutions – PWA, SaaS & WhatsApp Agency',
    description: 'Azinag Web Solutions builds modern PWA, SaaS, eCommerce, and WhatsApp-integrated web apps for businesses worldwide.',
    siteName: 'Azinag Web Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azinag Web Solutions – PWA, SaaS & WhatsApp Agency',
    description: 'Azinag Web Solutions builds modern PWA, SaaS, eCommerce, and WhatsApp-integrated web apps for businesses worldwide.',
    creator: '@azinagweb',
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
  metadataBase: new URL('https://azinagweb.com'),
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