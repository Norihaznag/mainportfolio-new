"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

const WHATSAPP_NUMBER = '212600000000'; // Replace with agency number

export default function ContactCTA() {
  const { language } = useLanguage();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {getTranslation('contactPageTitle', language)}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {getTranslation('contactPageDescription', language)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-medium hover:bg-green-600 transition-colors text-lg shadow group"
            >
              <MessageCircle size={20} />
              {getTranslation('contactCtaWhatsapp', language)}
            </a>
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors text-lg"
            >
              {getTranslation('contactCtaForm', language)}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 