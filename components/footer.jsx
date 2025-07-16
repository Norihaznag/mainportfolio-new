"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';
import Link from 'next/link';

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 text-center md:text-left"
        >
          {/* Logo and Description */}
          <div className="flex-1 flex flex-col items-center md:items-start gap-4">
            {/* Logo (replace with image if available) */}
            <Link href="/" className="text-2xl font-bold mb-2">Azinag Web Solutions</Link>
            <p className="text-muted-foreground max-w-xs">
              {getTranslation('footerDescription', language)}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col items-center gap-2 md:items-start">
            <h3 className="font-semibold mb-2">{getTranslation('footerConnect', language)}</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="hover:text-primary transition-colors">{getTranslation('home', language)}</Link>
              <Link href="/apps" className="hover:text-primary transition-colors">{getTranslation('apps', language)}</Link>
              <Link href="/about" className="hover:text-primary transition-colors">{getTranslation('about', language)}</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">{getTranslation('contact', language)}</Link>
            </nav>
          </div>

          {/* Socials */}
          <div className="flex-1 flex flex-col items-center gap-2 md:items-end">
            <h3 className="font-semibold mb-2">Socials</h3>
            <div className="flex gap-4 mb-2">
              <a
                href="https://github.com/azinagweb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/company/azinagweb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:noureddine@example.com"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <div className="text-xs text-muted-foreground">
              {getTranslation('footerBy', language)}
            </div>
          </div>
        </motion.div>
        <div className="border-t border-border pt-8 mt-12 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            {getTranslation('footerMade', language)} <Heart size={16} className="text-red-500" /> Azinag Web Solutions
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {currentYear} Azinag Web Solutions. {getTranslation('footerRights', language)}
          </p>
        </div>
      </div>
    </footer>
  );
}