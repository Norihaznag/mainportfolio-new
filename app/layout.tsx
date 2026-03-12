import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Fredoka } from 'next/font/google';
import { LanguageProvider } from '@/components/LanguageContext';
import './globals.css';

const fredoka = Fredoka({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka'
});

const baseUrl = 'https://azinag.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Azinag - Professional Web Development for Moroccan Businesses',
  description: 'We build fast and effective websites and applications for Moroccan companies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fredoka.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-cartoon-bg text-black font-sans min-h-screen selection:bg-cartoon-pink selection:text-black">
        <LanguageProvider>
          <Header />
            <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
