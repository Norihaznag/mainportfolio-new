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
    title: 'Azinag — Custom mobile apps and fast websites (no WordPress)',
    description: 'Azinag builds custom mobile apps, ultra-fast websites, and Progressive Web Apps (PWAs) for desktop and mobile, with WhatsApp ordering for faster sales. No slow, expensive CMS like WordPress — launch your app or site fast with clean, modern tech.',
    openGraph: {
      title: 'Azinag — Custom mobile apps and fast websites (no WordPress)',
      description: 'Azinag builds installable PWAs, mobile apps, and ultra-fast websites without heavy CMS like WordPress. Fast, native-like, and ready for business with WhatsApp checkout.',
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