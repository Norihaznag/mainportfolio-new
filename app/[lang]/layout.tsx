import type { Metadata } from 'next';
import { Header } from '@/components/HeaderWithLang';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import '../globals.css';

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: 'en' | 'fr' | 'ar';
  }>;
}

const languageTitles = {
  en: 'Azinag - Professional Web Development for Moroccan Businesses',
  fr: 'Azinag - Développement Web Professionnel pour les Entreprises Marocaines',
  ar: 'Azinag - تطوير الويب المحترف للشركات المغربية',
};

const languageDescriptions = {
  en: 'We build fast and effective websites and applications for Moroccan companies. Professional web development at affordable prices.',
  fr: 'Nous construisons des sites web et des applications rapides et efficaces pour les entreprises marocaines. Développement web professionnel à des prix abordables.',
  ar: 'رانا نبنيو لك مواقع ويب وتطبيقات سريعة وفعالة للشركات المغربية. تطوير ويب احترافي بثمن معقول.',
};

export async function generateMetadata({ params }: LangLayoutProps) {
  const { lang } = await params;
  return {
    title: languageTitles[lang],
    description: languageDescriptions[lang],
  };
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white text-gray-900">
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
