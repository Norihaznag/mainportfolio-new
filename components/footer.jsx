"use client";

import { motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';
import { WHATSAPP_URL_BASE } from '@/lib/utils';
import Link from 'next/link';

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12"
          >
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <span className="text-xl font-semibold">Azinag Web Solutions</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {getTranslation('footerDescription', language)}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                📍 Hay Hassani, Casablanca E45
              </p>
            </div>

            {/* Products Column */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Products</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/apps" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getTranslation('apps', language)}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getTranslation('pricingNav', language)}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/about" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getTranslation('about', language)}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getTranslation('contact', language)}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getTranslation('home', language)}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getTranslation('about', language)}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold mb-4">Connect</h3>
              <div className="flex flex-wrap gap-3 mb-4">
                <a
                  href={WHATSAPP_URL_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </a>
                <a
                  href="mailto:contact@azinag.site"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Azinag Web Solutions. {getTranslation('footerRights', language)}
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="/contact" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {getTranslation('contact', language)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}