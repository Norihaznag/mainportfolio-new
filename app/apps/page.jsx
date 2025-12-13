import Header from '@/components/header';
import Footer from '@/components/footer';
import ProjectsGrid from '@/components/projects-grid';
import AppsClient from './apps-client';

export function generateMetadata() {
  return {
    title: 'أمثلة على مشاريعنا - مواقع ويب و تطبيقات موبايل',
    description: 'شوف أمثلة على مواقع ويب، تطبيقات موبايل، و تطبيقات ويب أنشأناها لأصحاب محلات في كازابلانكا. كلها مصممة لجلب طلبات واتساب مباشرة.',
    keywords: [
      'أمثلة مواقع',
      'أمثلة تطبيقات',
      'مواقع كازابلانكا',
      'طلبات واتساب',
    ],
    alternates: {
      canonical: '/apps',
    },
  };
}

export default function Apps() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                أمثلة على <span className="text-red-500">مشاريعنا</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                شوف أمثلة على مواقع ويب، تطبيقات موبايل، و تطبيقات ويب أنشأناها لأصحاب محلات في كازابلانكا
              </p>
            </div>

            <ProjectsGrid />

            <AppsClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
