'use client';

import React, { createContext, useContext } from 'react';
import { content, type LangContent } from '@/lib/content';

interface LanguageContextType {
  c: LangContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const c = content['en'] as LangContent;
  return (
    <LanguageContext.Provider value={{ c }}>
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
