'use client';
import { Metadata } from 'next';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/public/projects');
        if (res.ok) {
          const data = await res.json();
          if (data.projects && data.projects.length > 0) {
            setProjects(data.projects.slice(0, 3));
          } else {
            setProjects((t('projects.list') as unknown) as Array<any>);
          }
        }
      } catch (error) {
        setProjects((t('projects.list') as unknown) as Array<any>);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [t]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 200, damping: 15 } 
    }
  };

  return (
    <main className="min-h-screen bg-cartoon-bg">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 border-b-3 border-black bg-cartoon-pink relative overflow-hidden">
        <div className="absolute top-10 right-10 w-24 h-24 bg-cartoon-yellow rounded-full border-3 border-black shadow-neo animate-wiggle hidden sm:block"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-cartoon-blue rounded-lg border-3 border-black shadow-neo animate-[wiggle_2s_ease-in-out_infinite_reverse] hidden sm:block"></div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-[1.1] mb-6 uppercase tracking-tight"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.div variants={itemVariants} className="flex justify-center mb-10">
            <p className="text-xl sm:text-3xl font-bold text-black border-black bg-white inline-block px-5 py-3 rounded-xl border-3 shadow-neo rotate-[-2deg]">
              {t('hero.badge')}
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
            <Button
              variant="primary"
              size="lg"
              href="/order"
            >
              {t('hero.btnPrimary')}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/showcase"
            >
              {t('hero.btnSecondary')}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Video */}
      <section className="py-24 px-6 border-b-3 border-black bg-white relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-cartoon-yellow rounded-3xl overflow-hidden border-3 border-black shadow-neo-lg rotate-[1deg] transition-transform hover:rotate-0 duration-300">
            <div className="aspect-video flex items-center justify-center">
              <p className="font-bold text-black text-2xl tracking-wide uppercase">{t('video.button')}</p>
            </div>
          </div>
          <p className="text-center font-bold text-xl text-black mt-10">
            {t('video.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Projects */}
      <section className="py-24 px-6 border-b-3 border-black bg-cartoon-blue">
        <div className="max-w-5xl mx-auto">
          <motion.div 
             initial={{ x: -50, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="flex items-center justify-between mb-12 bg-white px-6 py-4 rounded-xl border-3 border-black shadow-neo inline-flex"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black uppercase tracking-wide">
              {t('projects.title')}
            </h2>
            <a
              href="/showcase"
              className="ml-6 text-lg font-bold text-black hover:text-cartoon-pink transition-colors underline decoration-3 underline-offset-4 whitespace-nowrap"
            >
              {t('projects.viewAll')}
            </a>
          </motion.div>

          {loadingProjects ? (
            <div className="col-span-1 md:col-span-3 flex justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-b-8 border-black border-r-8 border-l-8 border-r-cartoon-pink border-l-cartoon-yellow"></div>
            </div>
          ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {projects.map((project: any, i: number) => {
              const colors = ['bg-cartoon-yellow', 'bg-cartoon-pink', 'bg-cartoon-green', 'bg-cartoon-blue'];
              const color = project.color || colors[i % colors.length];
              return (
              <motion.div variants={itemVariants} key={i} className="h-full">
                <Card
                  className="hover:scale-[1.02] transition-transform h-full flex flex-col"
                >
                  <div className={`aspect-[4/3] ${color} border-3 border-black rounded-xl mb-6 shadow-neo-sm flex-shrink-0`} />
                  <h3 className="text-2xl font-bold text-black mb-2 uppercase">
                    {project.name}
                  </h3>
                  <p className="text-black font-bold text-base mb-4 flex-grow">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags && project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-sm font-bold text-black bg-white border-2 border-black px-3 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )})}
          </motion.div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-6 bg-cartoon-green relative">
         <div className="absolute top-20 left-10 w-12 h-12 bg-cartoon-pink rounded-sm border-3 border-black shadow-neo rotate-12 animate-wiggle hidden sm:block"></div>
         <div className="absolute bottom-20 right-10 w-20 h-20 bg-cartoon-yellow rounded-full border-3 border-black shadow-neo -rotate-12 animate-[wiggle_1.5s_ease-in-out_infinite_reverse] hidden sm:block"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <div className="bg-white p-8 sm:p-12 rounded-3xl border-3 border-black shadow-neo-lg rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6 uppercase">
              {t('contact.title')}
            </h2>
            <p className="font-bold text-xl text-black mb-10">
              {t('contact.subtitle')}
            </p>

            <div className="flex justify-center mt-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="https://wa.me/212609343953"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-cartoon-yellow text-black font-black text-2xl px-10 py-5 rounded-2xl border-4 border-black shadow-neo hover:shadow-neo-md hover:-translate-y-1 transition-all active:translate-y-2 active:shadow-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                  {t('contact.whatsapp')}
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
