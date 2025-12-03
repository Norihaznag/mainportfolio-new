import Header from '@/components/header';
import Footer from '@/components/footer';
import ProjectsGrid from '@/components/projects-grid';
import AnalyticsTracker from '@/components/analytics-tracker';

export function generateMetadata() {
  return {
    title: 'Projects',
    description: 'Discover our portfolio of custom websites, web applications, and PWA apps built without heavy CMS like WordPress. From modern marketing sites to complex business solutions, all with WhatsApp integration.',
    openGraph: {
      title: 'Projects - Azinag Team',
      description: 'Explore our portfolio of websites, web apps, and PWAs built by our team — no slow CMS like WordPress. From modern marketing sites to complex business solutions, all with WhatsApp integration.',
    },
  };
}

export default function Apps() {
  return (
    <>
      <AnalyticsTracker />
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <AppsTitle />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              <AppsDescription />
            </p>
          </div>
          <ProjectsGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}

function AppsTitle() {
  return (
    <>
      Our <span className="text-primary">Projects</span>
    </>
  );
}

function AppsDescription() {
  return "A collection of custom websites, web applications, and PWA apps we build for clients — from marketing sites to complex business platforms.";
}