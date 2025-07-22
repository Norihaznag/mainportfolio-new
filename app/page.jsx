import Hero from '@/components/hero';
import Services from '@/components/services';
import Industries from '@/components/industries';
import ContactCTA from '@/components/contact-cta';
import Footer from '@/components/footer';
import Header from '@/components/header';
import AnalyticsTracker from '@/components/analytics-tracker';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

export function generateMetadata() {
  return {
    title: 'Azinag — PWA apps with WhatsApp integration for faster sales',
    description: 'Azinag builds Progressive Web Apps (PWAs) for desktop and mobile, with WhatsApp ordering for faster sales. Launch your SaaS app fast — no downloads needed.',
    openGraph: {
      title: 'Azinag — PWA apps with WhatsApp integration for faster sales',
      description: 'Azinag builds installable PWAs for desktop and mobile with WhatsApp checkout. Fast, native-like, and ready for business.',
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
      <ContactCTA />
      <Footer />
    </>
  );
}