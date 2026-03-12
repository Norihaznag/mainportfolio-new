'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/Button';

interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  color: string;
}

export default function Pricing() {
  const { t } = useLanguage();
  const [pricing, setPricing] = useState<PricingPackage[]>([]);
  const [whatsappInfo, setWhatsappInfo] = useState({ number: '', message: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch('/api/public/pricing');
        if (res.ok) {
          const data = await res.json();
          setPricing(data.pricing || []);
          setWhatsappInfo({
            number: data.whatsapp_number,
            message: data.whatsapp_message,
          });
        }
      } catch (error) {
        console.error('Failed to load pricing:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

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

  const getBackgroundColor = (colorCode: string) => {
    switch (colorCode) {
      case 'yellow': return 'bg-cartoon-yellow';
      case 'pink': return 'bg-cartoon-pink';
      case 'green': return 'bg-cartoon-green';
      case 'blue': return 'bg-cartoon-blue';
      default: return 'bg-cartoon-yellow';
    }
  };

  return (
    <main className="min-h-screen bg-cartoon-bg pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Decorative Blocks */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-cartoon-pink rounded-full border-4 border-black shadow-neo animate-wiggle hidden sm:block"></div>
      <div className="absolute bottom-40 left-10 w-16 h-16 bg-cartoon-blue rounded-xl border-4 border-black shadow-neo -rotate-12 animate-[wiggle_2s_ease-in-out_infinite_reverse] hidden sm:block"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl sm:text-6xl font-black text-black mb-6 uppercase tracking-tight leading-none rotate-[-1deg] inline-block bg-white px-8 py-3 border-4 border-black shadow-neo">
            {t('pricing.title')}
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-16 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-b-8 border-black border-r-8 border-l-8 border-r-cartoon-pink border-l-cartoon-yellow"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
          >
            {pricing.map((pkg, i) => (
              <motion.div variants={itemVariants} key={pkg.id}>
                <div 
                  className={`flex flex-col h-full bg-white rounded-[2rem] border-4 border-black shadow-neo-lg hover:shadow-neo hover:-translate-y-2 transition-all duration-300 overflow-hidden ${i === 1 ? 'md:-translate-y-8' : ''}`}
                >
                  <div className={`p-8 border-b-4 border-black ${getBackgroundColor(pkg.color)}`}>
                    <h3 className="text-3xl font-black text-black mb-2 uppercase">{pkg.name}</h3>
                    <p className="font-bold text-gray-800 h-12 overflow-hidden">{pkg.description}</p>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow bg-white">
                    <div className="mb-8">
                      <span className="text-5xl font-black text-black block mb-2">{pkg.price} DH</span>
                    </div>

                    <ul className="text-lg font-bold text-gray-700 space-y-4 mb-8 flex-grow text-left">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <svg className="w-6 h-6 shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" className="text-cartoon-green"></polyline>
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-auto">
                      <a
                        href="/order"
                        className="block w-full text-center text-xl font-black text-black uppercase bg-cartoon-yellow py-4 px-6 rounded-xl border-4 border-black shadow-neo hover:shadow-neo-sm active:translate-y-1 active:shadow-none transition-all"
                      >
                        {t('nav.getStarted')}
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
