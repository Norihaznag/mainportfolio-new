import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import GoogleAnalytics from '@/components/google-analytics';
import AnalyticsTracker from '@/components/analytics-tracker';
import { LanguageProvider } from '@/lib/language-context';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/next';
import BaseSEO from '@/components/base-seo';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL('https://azinag.site'),
  title: {
    default: 'Azinag — Custom mobile apps and fast websites (no WordPress)',
    template: '%s | Azinag'
  },
  description: 'Azinag builds custom mobile apps, ultra-fast websites, and Progressive Web Apps (PWAs) for desktop and mobile, with WhatsApp ordering for faster sales. No slow, expensive CMS like WordPress — launch your app or site fast with clean, modern tech.',
  keywords: [
    'Azinag',
    'PWA',
    'Progressive Web Apps',
    'WhatsApp ordering',
    'React Native mobile apps',
    'mobile apps',
    'desktop apps',
    'fast launch',
    'business solutions',
    'installable apps',
    'static websites',
    'ultra-fast websites',
    'responsive',
    'native-like',
    'Supabase',
    'Next.js',
    'web development',
    'custom web apps',
    'Morocco web agency',
    'local business',
    'international business'
  ],
  authors: [{ name: 'Azinag Web Solutions' }],
  creator: 'Azinag Web Solutions',
  publisher: 'Azinag Web Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://azinag.site',
    title: 'Azinag — Custom mobile apps and fast websites (no WordPress)',
    description: 'Azinag builds installable PWAs, mobile apps, and ultra-fast websites without heavy CMS like WordPress. Fast, native-like, and ready for business with WhatsApp checkout.',
    siteName: 'Azinag',
    images: [
      {
        url: 'https://azinag.site/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Azinag Web Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azinag — Custom mobile apps and fast websites (no WordPress)',
    description: 'Azinag builds installable PWAs, mobile apps, and ultra-fast websites without heavy CMS like WordPress. Fast, native-like, and ready for business with WhatsApp checkout.',
    creator: '@azinag',
    images: ['https://azinag.site/og-image.jpg'],
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE', // Replace with your actual verification code
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <BaseSEO />
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