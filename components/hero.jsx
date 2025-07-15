"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { event } from '@/lib/analytics';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

export default function Hero() {
  const { language } = useLanguage();

  const trackButtonClick = (buttonName) => {
    event({
      action: 'click',
      category: 'Hero',
      label: buttonName
    });
  };
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              {getTranslation('heroAgencyAvailable', language)}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              {getTranslation('heroAgencyTitle', language)}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-8 text-muted-foreground">
              {getTranslation('heroAgencySubtitle', language)}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              {getTranslation('heroAgencyDescription', language)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/projects"
              onClick={() => trackButtonClick(getTranslation('seeOurWork', language))}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors group"
            >
              {getTranslation('seeOurWork', language)}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              onClick={() => trackButtonClick(getTranslation('getConsultation', language))}
              className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <MessageCircle size={20} />
              {getTranslation('getConsultation', language)}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-sm text-muted-foreground"
          >
            <p>{getTranslation('heroAgencyLocation', language)}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}