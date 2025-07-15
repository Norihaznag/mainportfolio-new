import Header from '@/components/header';
import Footer from '@/components/footer';
import AboutContent from '@/components/about-content';
import AnalyticsTracker from '@/components/analytics-tracker';

export function generateMetadata() {
  return {
    title: 'About',
    description: 'Learn about Azinag Web Solutions, a passionate web development agency from Morocco. Discover our journey, skills, and the technologies we use to build amazing websites.',
    openGraph: {
      title: 'About - Azinag Web Solutions',
      description: 'Learn about Azinag Web Solutions, a passionate web development agency from Morocco. Discover our journey, skills, and the technologies we use to build amazing websites.',
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