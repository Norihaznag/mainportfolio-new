import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import FeaturedProjects from '@/components/featured-projects';
import Services from '@/components/services';
import Industries from '@/components/industries';
import SsgSsrBenefits from '@/components/ssg-ssr-benefits';
import ContactCTA from '@/components/contact-cta';

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
      <main className="pt-20">
        <Hero />
        <FeaturedProjects />
        <Services />
        <Industries />
        <SsgSsrBenefits />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
