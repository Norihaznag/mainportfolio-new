import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Azinag - تطوير د المواقع والتطبيقات للشركات المغربية',
  description:
    'كنقدمو خدمات ديال تطوير د المواقع والتطبيقات احترافية للشركات والمطاعم والمدارس المغربية بثمن ديال الواحد والواحد',
  keywords: [
    'تطوير مواقع',
    'تطبيقات',
    'Morocco',
    'web development',
    'app development',
  ],
  openGraph: {
    title: 'Azinag - تطوير د المواقع والتطبيقات',
    description: 'خدمات تطوير ويب وتطبيقات احترافية للشركات المغربية',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Azinag',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white text-gray-900">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
