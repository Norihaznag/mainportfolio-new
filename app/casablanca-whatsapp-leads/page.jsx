import Header from '@/components/header';
import Footer from '@/components/footer';
import CasablancaHero from '@/components/casablanca-hero';
import CasablancaProblem from '@/components/casablanca-problem';
import CasablancaSolution from '@/components/casablanca-solution';
import CasablancaOffer from '@/components/casablanca-offer';
import CasablancaSocialProof from '@/components/casablanca-social-proof';
import CasablancaFinalCTA from '@/components/casablanca-final-cta';

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
    ],
    openGraph: {
      title: 'مواقع ويب و تطبيقات موبايل تجلب طلبات واتساب',
      description: 'مواقع ويب، تطبيقات موبايل، و تطبيقات ويب متقدمة. كلها مصممة لجلب طلبات واتساب مباشرة.',
      url: 'https://azinag.site/casablanca-whatsapp-leads',
    },
    alternates: {
      canonical: '/casablanca-whatsapp-leads',
    },
  };
}

export default function CasablancaWhatsAppLeads() {
  return (
    <>
      <Header />
      <CasablancaHero />
      <CasablancaProblem />
      <CasablancaSolution />
      <CasablancaOffer />
      <CasablancaSocialProof />
      <CasablancaFinalCTA />
      <Footer />
    </>
  );
}

