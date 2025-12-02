import Header from '@/components/header';
import Footer from '@/components/footer';
import AboutContent from '@/components/about-content';
import AnalyticsTracker from '@/components/analytics-tracker';

export function generateMetadata() {
  return {
    title: 'About',
    description: 'Learn about Azinag Web Solutions, a passionate development agency from Morocco. Discover how we build custom mobile apps and ultra-fast websites without slow CMS like WordPress, along with the modern technologies we use to create amazing online experiences.',
    openGraph: {
      title: 'About - Azinag Web Solutions',
      description: 'Learn about Azinag Web Solutions, a passionate development agency from Morocco. We create custom mobile apps and fast websites without heavy CMS like WordPress, using modern technologies to build amazing digital experiences.',
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