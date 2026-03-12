'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-cartoon-bg pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Decorative Blocks */}
      <div className="absolute top-40 left-10 w-24 h-24 bg-cartoon-yellow rounded-full border-4 border-black shadow-neo-sm rotate-12 animate-wiggle hidden sm:block"></div>
      <div className="absolute bottom-40 right-10 w-32 h-32 bg-cartoon-pink rounded-xl border-4 border-black shadow-neo -rotate-12 animate-[wiggle_2.5s_ease-in-out_infinite_reverse] hidden sm:block"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-7xl font-black text-black mb-6 uppercase tracking-tight leading-none rotate-[-1deg] inline-block bg-white px-8 py-3 border-4 border-black shadow-neo">
            {t('nav.about')}
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
          className="bg-white p-8 sm:p-12 rounded-[2rem] border-4 border-black shadow-neo-lg rotate-[1deg] hover:rotate-0 transition-transform duration-300"
        >
          <div className="prose prose-lg max-w-none text-black font-bold">
            <p className="text-2xl sm:text-3xl font-black mb-8 leading-snug">
              {t('hero.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-12">
              <div className="bg-cartoon-blue p-6 rounded-xl border-4 border-black shadow-neo-sm">
                <h3 className="text-2xl font-black uppercase mb-4 text-black">What we build</h3>
                <ul className="list-disc list-inside space-y-3 text-lg">
                  <li>Modern React & Next.js Websites</li>
                  <li>Lightning-fast Android Apps</li>
                  <li>Robust Desktop POS Software</li>
                  <li>High-conversion Landing Pages</li>
                </ul>
              </div>
              <div className="bg-cartoon-green p-6 rounded-xl border-4 border-black shadow-neo-sm">
                <h3 className="text-2xl font-black uppercase mb-4 text-black">Our Promise</h3>
                <ul className="list-disc list-inside space-y-3 text-lg">
                  <li>No hidden fees</li>
                  <li>Blazing fast delivery</li>
                  <li>Flawless aesthetic design</li>
                  <li>Continuous support</li>
                </ul>
              </div>
            </div>

            <p className="text-xl">
              We work with bold businesses of all sizes who want to stand out from the crowd and dominate their market.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
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
