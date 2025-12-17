import Header from '@/components/header';
import Footer from '@/components/footer';
import AboutContent from '@/components/about-content';
import ContactCTA from '@/components/contact-cta';

export function generateMetadata() {
  return {
    title: 'About Azinag Web Solutions',
    description:
      'Learn more about Azinag Web Solutions, a small team focused on custom mobile apps, PWAs, and ultra-fast websites with WhatsApp integration.',
    keywords: [
      'Azinag Web Solutions',
      'about Azinag',
      'web agency',
      'PWA development team',
      'Next.js agency',
    ],
    alternates: {
      canonical: '/about',
    },
  };
}

export default function About() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <AboutContent />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
