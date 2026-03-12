'use client';

import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { useEffect, useState } from 'react';

export default function Showcase() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // We are using a randomized set of colors per project for the cartoon vibe
  const colors = ['bg-cartoon-yellow', 'bg-cartoon-pink', 'bg-cartoon-green', 'bg-cartoon-blue'];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/public/projects');
        if (res.ok) {
          const data = await res.json();
          if (data.projects && data.projects.length > 0) {
            setProjects(data.projects);
          } else {
            setProjects(getDefaultProjects());
          }
        }
      } catch (error) {
        setProjects(getDefaultProjects());
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [t]);

  const getDefaultProjects = () => {
    const rawProjects = (t('projects.list') as unknown) as Array<any>;
    return [
      ...rawProjects, 
      {
        name: t('language') === 'ar' ? 'منصة للتجارة الإلكترونية' : 'E-commerce Store',
        desc: t('language') === 'ar' ? 'متجر متكامل بخصائص الدفع' : 'Full-featured online store with payment integration.',
        tags: ['Next.js', 'Stripe', 'Web'],
      },
      {
        name: t('language') === 'ar' ? 'تطبيق لحجز المواعيد' : 'Medical Clinic',
        desc: t('language') === 'ar' ? 'نظام لمواعيد العيادات الصحية' : 'Appointment booking system for healthcare practice.',
        tags: ['React', 'Supabase', 'Desktop'],
      },
      {
        name: t('language') === 'ar' ? 'منصة للعقارات' : 'Real Estate Platform',
        desc: t('language') === 'ar' ? 'قوائم العقارات مع البحث والفلترة' : 'Property listings with search and filter capabilities.',
        tags: ['Next.js', 'Web', 'Android'],
      }
    ];
  };

  return (
    <main className="min-h-screen bg-cartoon-bg pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Decorative Blocks */}
      <div className="absolute top-24 right-10 w-20 h-20 bg-cartoon-green rounded-xl border-4 border-black shadow-neo rotate-12 animate-wiggle hidden sm:block"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 bg-cartoon-yellow rounded-full border-4 border-black shadow-neo -rotate-12 animate-[wiggle_2s_ease-in-out_infinite_reverse] hidden sm:block"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-black text-black mb-6 uppercase tracking-tight leading-none rotate-[1deg] inline-block bg-white px-8 py-3 border-4 border-black shadow-neo">
            {t('nav.work')}
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 max-w-2xl mx-auto mt-6">
            {t('projects.title')}
          </p>
        </motion.div>

        {loadingProjects ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-b-8 border-black border-r-8 border-l-8 border-r-cartoon-pink border-l-cartoon-yellow"></div>
          </div>
        ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, i) => {
            const color = project.color || colors[i % colors.length];
            return (
              <motion.div variants={itemVariants} key={i}>
                <div className="bg-white rounded-[2rem] border-4 border-black shadow-neo-lg hover:shadow-neo hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className={`aspect-[4/3] ${color} border-b-4 border-black flex items-center justify-center`}>
                    <p className="font-black text-black text-2xl uppercase tracking-widest opacity-50">Preview</p>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-black mb-2 uppercase">
                      {project.name}
                    </h3>
                    <p className="text-gray-800 font-bold mb-6 flex-grow">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags && project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className={`text-sm font-black text-black border-2 border-black px-3 py-1 rounded-lg ${
                            tag === 'Android' ? 'bg-cartoon-yellow' : 
                            tag === 'Web' ? 'bg-cartoon-pink' : 
                            tag === 'Desktop' ? 'bg-cartoon-green' : 'bg-white'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.4, delay: 0.3 }}
          className="mt-16 text-center"
        >
           <a
              href="/order"
              className="inline-block text-2xl font-black text-black uppercase bg-cartoon-yellow py-5 px-10 rounded-2xl border-4 border-black shadow-neo hover:shadow-neo-md hover:-translate-y-2 active:translate-y-1 active:shadow-none transition-all"
            >
              {t('nav.getStarted')}
            </a>
        </motion.div>
      </div>
    </main>
  );
}
