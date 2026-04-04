'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { content, type Lang, type LangContent } from '@/lib/content';

type Language = Lang;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  /** Typed content tree for the current language — preferred API */
  c: LangContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('azinag_lang') as Language;
    if (saved === 'en' || saved === 'ar') {
      setLanguage(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next: Language = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('azinag_lang', next);
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = next;
      return next;
    });
  };

  const c = content[language] as LangContent;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, c }}>
      <div className={language === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}

/** Convenience hook — returns the typed content tree for the current language */
export function useContent(): LangContent {
  const { c } = useLanguage();
  return c;
}
