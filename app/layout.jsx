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
    default: 'Azinag — PWA apps with WhatsApp integration for faster sales',
    template: '%s | Azinag'
  },
  description: 'Azinag builds Progressive Web Apps (PWAs) that work seamlessly on desktop and mobile, with WhatsApp ordering for faster sales. Launch your SaaS app fast — no downloads needed.',
  keywords: [
    'Azinag',
    'PWA',
    'Progressive Web Apps',
    'WhatsApp ordering',
    'SaaS apps',
    'mobile apps',
    'desktop apps',
    'fast launch',
    'business solutions',
    'installable apps',
    'responsive',
    'native-like',
    'Supabase',
    'local business',
    'international business'
  ],
  authors: [{ name: 'Azinag' }],
  creator: 'Azinag',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://azinagweb.com',
    title: 'Azinag — PWA apps with WhatsApp integration for faster sales',
    description: 'Azinag builds installable PWAs for desktop and mobile with WhatsApp checkout. Fast, native-like, and ready for business.',
    siteName: 'Azinag',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azinag — PWA apps with WhatsApp integration for faster sales',
    description: 'Azinag builds installable PWAs for desktop and mobile with WhatsApp checkout. Fast, native-like, and ready for business.',
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
            <main className="min-h-screen pt-20">
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