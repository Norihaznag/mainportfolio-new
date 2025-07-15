import Hero from '@/components/hero';
import Services from '@/components/services';
import Industries from '@/components/industries';
import FeaturedProjects from '@/components/featured-projects';
import ContactCTA from '@/components/contact-cta';
import Footer from '@/components/footer';
import Header from '@/components/header';
import AnalyticsTracker from '@/components/analytics-tracker';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

export function generateMetadata() {
  return {
    title: 'Azinag Web Solutions – PWA, SaaS & WhatsApp Agency',
    description: 'Azinag Web Solutions is a modern web agency specializing in PWA, SaaS, eCommerce, and WhatsApp-integrated solutions for restaurants, shops, rentals, and more. Serving Morocco, GCC, and international clients.',
    openGraph: {
      title: 'Azinag Web Solutions – PWA, SaaS & WhatsApp Agency',
      description: 'Azinag Web Solutions builds modern PWA, SaaS, eCommerce, and WhatsApp-integrated web apps for businesses worldwide.',
    },
  };
}

export default function Home() {
  return (
    <>
      <AnalyticsTracker />
      <Header />
      <Hero />
      <Services />
      <Industries />
      <FeaturedProjects />
      <ContactCTA />
      <Footer />
    </>
  );
}