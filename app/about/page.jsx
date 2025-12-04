import Header from '@/components/header';
import Footer from '@/components/footer';
import AboutContent from '@/components/about-content';
import AnalyticsTracker from '@/components/analytics-tracker';

export function generateMetadata() {
  return {
    title: 'About Us',
    description: 'Learn about Azinag Web Solutions, a passionate development agency from Morocco. Discover how we build custom mobile apps and ultra-fast websites without slow CMS like WordPress, along with the modern technologies we use to create amazing online experiences.',
    keywords: [
      'about Azinag',
      'web development agency Morocco',
      'custom app development',
      'Next.js developers',
      'PWA specialists',
    ],
    openGraph: {
      title: 'About Us - Azinag Web Solutions',
      description: 'Learn about Azinag Web Solutions, a passionate development agency from Morocco. We create custom mobile apps and fast websites without heavy CMS like WordPress, using modern technologies to build amazing digital experiences.',
      url: 'https://azinag.site/about',
      images: [
        {
          url: 'https://azinag.site/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'About Azinag Web Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Us - Azinag Web Solutions',
      description: 'Learn about Azinag Web Solutions, a passionate development agency from Morocco. We create custom mobile apps and fast websites without heavy CMS like WordPress.',
      images: ['https://azinag.site/og-image.jpg'],
    },
    alternates: {
      canonical: '/about',
    },
  };
}

export default function About() {
  return (
    <>
      <AnalyticsTracker />
      <Header />
      <main className="pt-20">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}