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
    title: 'Azinag — Custom mobile apps and ultra-fast websites with WhatsApp integration',
    description:
      'Azinag Web Solutions builds custom mobile apps, PWAs, and ultra-fast websites powered by Next.js and Supabase, with WhatsApp-first customer flows for faster sales.',
    keywords: [
      'Azinag',
      'Azinag Web Solutions',
      'mobile app development',
      'PWA development',
      'Next.js agency',
      'Supabase apps',
      'WhatsApp integration',
      'fast websites',
      'web development agency',
    ],
    openGraph: {
      title: 'Azinag — Custom mobile apps and ultra-fast websites (no WordPress)',
      description:
        'Azinag builds installable PWAs, mobile apps, and ultra-fast websites with WhatsApp built in – no slow, bloated CMS.',
      url: 'https://azinag.site',
      images: [
        {
          url: 'https://azinag.site/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Azinag Web Solutions – Next.js and Supabase agency',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Azinag — Custom mobile apps and ultra-fast websites',
      description:
        'Azinag builds modern PWAs, mobile apps, and ultra-fast websites with WhatsApp-first conversion flows.',
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
