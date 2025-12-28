import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://azinag.com'),
  title: 'Azinag - Professional Web Development for Moroccan Companies',
  description: 'Build fast, effective websites and applications for Moroccan businesses. Professional web development at affordable prices.',
  keywords: [
    'web development',
    'website design',
    'Morocco',
    'e-commerce',
    'web applications',
    'professional development',
  ],
  authors: [{ name: 'Azinag Team' }],
  creator: 'Azinag',
  publisher: 'Azinag',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cairo.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Azinag" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`bg-white text-gray-900 ${cairo.className}`}>
        {children}
      </body>
    </html>
  );
}
