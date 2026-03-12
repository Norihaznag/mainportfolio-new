'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';

export default function Order() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-cartoon-bg pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Decorative background blocks */}
      <div className="absolute top-40 left-10 w-16 h-16 bg-cartoon-pink rounded-xl border-4 border-black shadow-neo-sm rotate-12 animate-wiggle hidden sm:block"></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-cartoon-blue rounded-full border-4 border-black shadow-neo -rotate-12 animate-[wiggle_1.5s_ease-in-out_infinite_reverse] hidden sm:block"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <div className="bg-white p-8 sm:p-16 rounded-3xl border-4 border-black shadow-neo-lg rotate-[1deg] hover:rotate-0 transition-transform duration-300">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mb-6 uppercase tracking-wide leading-tight">
            {t('contact.title')}
          </h1>
          <p className="font-bold text-xl sm:text-2xl text-gray-700 mb-12">
            {t('contact.subtitle')}
          </p>

          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://wa.me/212609343953"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 bg-cartoon-yellow text-black font-black text-2xl sm:text-3xl px-10 py-6 rounded-2xl border-4 border-black shadow-neo-md hover:shadow-neo-lg hover:-translate-y-2 transition-all active:translate-y-2 active:shadow-none uppercase tracking-wide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                {t('contact.whatsapp')}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
