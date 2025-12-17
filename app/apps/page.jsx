import Header from '@/components/header';
import Footer from '@/components/footer';
import ProjectsGrid from '@/components/projects-grid';
import AppsClient from './apps-client';
import { Metadata } from 'next';

export function generateMetadata() {
  return {
    title: 'Apps & Projects – Azinag Web Solutions',
    description:
      'Browse a selection of PWAs, web apps, and websites built by Azinag Web Solutions using Next.js and Supabase, with WhatsApp-first conversion flows.',
    keywords: [
      'Azinag apps',
      'Azinag portfolio',
      'Next.js Supabase apps',
      'PWA examples',
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
        <section className="py-24 bg-gradient-to-b from-background via-background/95 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                Apps, PWAs & websites we’ve built
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                All powered by Next.js, Supabase, and WhatsApp-first customer flows. New projects appear here
                automatically as they are added in Supabase.
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
