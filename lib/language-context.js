"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    // Get saved language from localStorage or detect from browser
    const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    const browserLanguage = typeof window !== 'undefined' ? navigator.language.split('-')[0] : 'en';
    
    const initialLanguage = savedLanguage || (browserLanguage === 'fr' ? 'fr' : 'en');
    
    setLanguage(initialLanguage);
    const initialDirection = initialLanguage === 'ar' ? 'rtl' : 'ltr';
    setDirection(initialDirection);
    
    // Update document direction and language
    if (typeof window !== 'undefined') {
      document.documentElement.dir = initialDirection;
      document.documentElement.lang = initialLanguage;
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    const newDirection = newLanguage === 'ar' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
      document.documentElement.dir = newDirection;
      document.documentElement.lang = newLanguage;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, direction, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};