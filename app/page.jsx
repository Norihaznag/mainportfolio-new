import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Footer from '@/components/footer';

// Lazy load components for better performance
const CasablancaHero = dynamic(() => import('@/components/casablanca-hero'), { ssr: true });
const CasablancaProblem = dynamic(() => import('@/components/casablanca-problem'), { ssr: true });
const CasablancaSolution = dynamic(() => import('@/components/casablanca-solution'), { ssr: true });
const CasablancaOffer = dynamic(() => import('@/components/casablanca-offer'), { ssr: true });
const CasablancaSocialProof = dynamic(() => import('@/components/casablanca-social-proof'), { ssr: true });
const CasablancaFinalCTA = dynamic(() => import('@/components/casablanca-final-cta'), { ssr: true });

export function generateMetadata() {
  return {
    title: 'مواقع ويب و تطبيقات موبايل تجلب طلبات واتساب | كازابلانكا',
    description: 'ننشئ مواقع ويب سريعة، تطبيقات موبايل، و تطبيقات ويب متقدمة. كلها مصممة لجلب طلبات واتساب مباشرة. مثالي للمطاعم، الصالونات، والمحلات في كازابلانكا.',
    keywords: [
      'موقع ويب كازابلانكا',
      'تطبيق موبايل',
      'تطبيق ويب',
      'طلبات واتساب',
      'موقع مطعم',
      'موقع صالون',
      'موقع محلات',
      'تطوير تطبيقات',
    ],
    openGraph: {
      title: 'مواقع ويب و تطبيقات موبايل تجلب طلبات واتساب',
      description: 'مواقع ويب، تطبيقات موبايل، و تطبيقات ويب متقدمة. كلها مصممة لجلب طلبات واتساب مباشرة.',
      url: 'https://azinag.site',
      images: [
        {
          url: 'https://azinag.site/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'مواقع ويب و تطبيقات تجلب طلبات واتساب',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'مواقع ويب و تطبيقات موبايل تجلب طلبات واتساب',
      description: 'مواقع ويب، تطبيقات موبايل، و تطبيقات ويب متقدمة. كلها مصممة لجلب طلبات واتساب مباشرة.',
      images: ['https://azinag.site/og-image.jpg'],
    },
    alternates: {
      canonical: '/',
    },
  };
}

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="min-h-screen" />}>
        <CasablancaHero />
        <CasablancaProblem />
        <CasablancaSolution />
        <CasablancaOffer />
        <CasablancaSocialProof />
        <CasablancaFinalCTA />
      </Suspense>
      <Footer />
    </>
  );
}
