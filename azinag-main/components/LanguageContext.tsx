'use client';

import React, { createContext, useContext } from 'react';
import { content, type Lang, type LangContent } from '@/lib/content';

type Language = Lang;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  c: LangContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const c = content['en'] as LangContent;
  return (
    <LanguageContext.Provider value={{ language: 'en', toggleLanguage: () => {}, c }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}

export function useContent(): LangContent {
  const { c } = useLanguage();
  return c;
}
