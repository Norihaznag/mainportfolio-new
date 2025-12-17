"use client";

import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_URL_BASE } from '@/lib/utils';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <span className="text-xl font-semibold">Azinag</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {getTranslation('footerDescription', language)}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                📍 Hay Hassani, Casablanca E45 — {getTranslation('morocco', language)}
              </p>
            </div>

            {/* Products Column */}
            <div>
              <h3 className="text-sm font-semibold mb-4">
                {getTranslation('servicesTitle', language)}
              </h3>
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
              <h3 className="text-sm font-semibold mb-4">
                {getTranslation('about', language)}
              </h3>
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
              <h3 className="text-sm font-semibold mb-4">
                Azinag
              </h3>
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
              <h3 className="text-sm font-semibold mb-4">
                {getTranslation('footerConnect', language)}
              </h3>
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Azinag. {getTranslation('footerRights', language)}
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
