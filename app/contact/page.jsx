"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import ContactForm from '@/components/contact-form';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_URL_BASE } from '@/lib/utils';

export default function Contact() {
  const { language } = useLanguage();
  const whatsappUrl = WHATSAPP_URL_BASE;

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {getTranslation('contactPageTitle', language)}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {getTranslation('contactPageDescription', language)}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-medium hover:bg-green-600 transition-colors text-lg shadow group mb-4"
            >
              <FaWhatsapp size={20} />
              {getTranslation('contactCtaWhatsapp', language)}
            </a>
          </div>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}