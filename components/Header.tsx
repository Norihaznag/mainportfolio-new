'use client';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export function Header() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-cartoon-bg border-b-3 border-black">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold tracking-wide text-black hover:-translate-y-[2px] transition-transform"
          aria-label="Azinag - Home"
        >
          AZINAG
        </Link>

        <nav className="flex items-center gap-6" role="navigation" aria-label="Main navigation">
          <Link href="/pricing" className="text-lg font-bold text-black hover:text-cartoon-pink hover:-translate-y-1 transition-all">
            {t('nav.pricing')}
          </Link>
          <Link href="/showcase" className="text-lg font-bold text-black hover:text-cartoon-blue hover:-translate-y-1 transition-all">
            {t('nav.work')}
          </Link>
          <Link href="/about" className="text-lg font-bold text-black hover:text-cartoon-green hover:-translate-y-1 transition-all">
            {t('nav.about')}
          </Link>
          
          <button 
            onClick={toggleLanguage}
            className="text-lg font-bold text-black border-2 border-black rounded-lg px-3 py-1 hover:bg-black hover:text-white transition-colors ml-4 uppercase"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>

          <Link
            href="/order"
            className="text-lg font-bold text-black bg-cartoon-yellow px-5 py-2.5 rounded-xl border-3 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-md active:translate-y-1 active:shadow-none transition-all ml-2"
          >
            {t('nav.getStarted')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
