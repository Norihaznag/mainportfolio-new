"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import ContactForm from '@/components/contact-form';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { WHATSAPP_URL_BASE } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

export default function Contact() {
  const whatsappMessage = encodeURIComponent(
    'مرحبا، بغيت نعرف على الخدمات ديال المواقع و التطبيقات اللي تجيب طلبات واتساب.'
  );
  const { language } = useLanguage();

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-b from-background via-background/95 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-center mb-12"
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {getTranslation('contactPageTitle', language)}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {getTranslation('contactPageDescription', language)}
                </p>
              </motion.div>

              {/* Primary WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
                className="text-center mb-12"
              >
                <a
                  href={`${WHATSAPP_URL_BASE}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full font-bold text-xl text-white bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] border border-[#25D366]/70 shadow-[0_0_0_1px_rgba(37,211,102,0.6),0_24px_48px_rgba(37,211,102,0.4)] hover:shadow-[0_0_0_1px_rgba(37,211,102,0.8),0_28px_56px_rgba(37,211,102,0.5)] hover:-translate-y-1 active:translate-y-0 transition-all duration-200 ease-out"
                >
                  <FaWhatsapp className="w-7 h-7" />
                  <span>{getTranslation('sendViaWhatsApp', language)}</span>
                </a>
                <p className="mt-4 text-sm text-muted-foreground">
                  💬 Fastest way to reach us – we usually reply within minutes.
                </p>
              </motion.div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  className="bg-muted/20 border border-border/50 rounded-xl p-6 text-center hover:border-emerald-500/30 transition-colors"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <FaWhatsapp className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">Best way to contact us</p>
                  <a
                    href={WHATSAPP_URL_BASE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline mt-2 inline-block text-sm"
                  >
                    Open chat
                  </a>
                </motion.div>

                <motion.div
                  className="bg-muted/20 border border-border/50 rounded-xl p-6 text-center hover:border-blue-500/30 transition-colors"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <FaMapMarkerAlt className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">
                    {getTranslation('location', language)}
                  </h3>
                  <p className="text-sm text-muted-foreground">حي الحسني، الدار البيضاء</p>
                </motion.div>

                <motion.div
                  className="bg-muted/20 border border-border/50 rounded-xl p-6 text-center hover:border-purple-500/30 transition-colors"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <FaPhone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground">Available via WhatsApp</p>
                </motion.div>
              </div>

              {/* Contact Form */}
              <div className="bg-muted/20 border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {getTranslation('contactCtaForm', language)}
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
