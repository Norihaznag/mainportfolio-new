'use client';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-cartoon-blue text-white border-t-3 border-black py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 font-bold">
          <p className="text-xl tracking-wide">© {currentYear} AZINAG</p>
          <div className="flex gap-8">
            <Link href="/pricing" className="text-lg hover:text-cartoon-yellow hover:-translate-y-1 transition-transform">{t('nav.pricing')}</Link>
            <Link href="/showcase" className="text-lg hover:text-cartoon-yellow hover:-translate-y-1 transition-transform">{t('nav.work')}</Link>
            <Link href="/about" className="text-lg hover:text-cartoon-yellow hover:-translate-y-1 transition-transform">{t('nav.about')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
