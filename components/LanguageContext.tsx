'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Use the existing strings mapping
// Since Azinag is primarily a simple landing page, we can provide immediate translations based on the raw JSON.
const translations = {
  ar: {
    nav: {
      pricing: "الثمن",
      work: "الأعمال",
      about: "علينا",
      getStarted: "طلب الاستشارة ديالك"
    },
    hero: {
      title: "مواقع، تطبيقات أندرويد، وبرامج ديسكتوب لعملك",
      highlight: "بثمن معقول",
      subtitle: "حنا كنبنيو ليك مواقع ويب، تطبيقات أندرويد، وبرامج ديسكتوب (Desktop POS) سريعة وفعالة للشركات المغربية.",
      badge: "سريع. نقي. مبني باش يبهر.",
      btnPrimary: "طلب الاستشارة ديالك فابور!",
      btnSecondary: "شوف الأعمال ديالنا"
    },
    video: {
      button: "كليكي باش تشوف",
      subtitle: "نظرة خفيفة على داكشي لي نقدرو نبنيو مجموعين."
    },
    projects: {
      title: "أعمال مختارة",
      viewAll: "شوف كلشي →",
      list: [
        {
          name: 'تطبيق أندرويد للمتاجر',
          desc: 'تطبيق أندرويد سريع لإدارة المبيعات والعملاء لمتجرك',
          tags: ['Android', 'Supabase'],
          color: 'bg-cartoon-yellow'
        },
        {
          name: 'منصة ويب متكاملة',
          desc: 'موقع ويب احترافي مع نظام حجوزات للمطاعم',
          tags: ['Next.js', 'Web'],
          color: 'bg-cartoon-pink'
        },
        {
          name: 'برنامج ديسكتوب (POS)',
          desc: 'برنامج ديسكتوب لإدارة الكاشير ونقاط البيع للمحلات',
          tags: ['Desktop', 'Windows'],
          color: 'bg-cartoon-green'
        }
      ]
    },
    contact: {
      title: "أجي نبنيو شي حاجة زوينة.",
      subtitle: "سواء بغيتي موقع، تطبيق أندرويد، أو برنامج ديسكتوب. غنجاوبك بالزربة!",
      whatsapp: "طلب الاستشارة ديالك فواتساب"
    }
  },
  en: {
    nav: {
      pricing: "Pricing",
      work: "Work",
      about: "About",
      getStarted: "Get a Free Quote"
    },
    hero: {
      title: "Websites, Android Apps & Desktop Software",
      highlight: "affordable",
      subtitle: "I build high-converting websites, native Android apps, and robust Desktop POS software for your business.",
      badge: "Fast. Clean. Built to wow.",
      btnPrimary: "Get your free quote!",
      btnSecondary: "See my work"
    },
    video: {
      button: "Click to play demo",
      subtitle: "Quick look at what we can build together."
    },
    projects: {
      title: "Selected work",
      viewAll: "View all →",
      list: [
        {
          name: 'Retail Android App',
          desc: 'Lightning-fast Android app for managing your store inventory and clients',
          tags: ['Android', 'Supabase'],
          color: 'bg-cartoon-yellow'
        },
        {
          name: 'Restaurant Web Platform',
          desc: 'Professional web presence with integrated reservation system',
          tags: ['Next.js', 'Web'],
          color: 'bg-cartoon-pink'
        },
        {
          name: 'Desktop POS Software',
          desc: 'Robust Windows desktop software for cashiers and point-of-sale management',
          tags: ['Desktop', 'Windows'],
          color: 'bg-cartoon-green'
        }
      ]
    },
    contact: {
      title: "Let's build something great.",
      subtitle: "Whether you need a Website, Android app, or Desktop software. I'll get back to you fast!",
      whatsapp: "Get your free quote on WhatsApp"
    }
  }
};

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (keyPath: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Try to load initial language from local storage on mount
    const saved = localStorage.getItem('azinag_lang') as Language;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguage(saved);
      document.documentElement.lang = saved;
    }
    
    // Set document direction for Arabic
    if (saved === 'ar' || language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, []); // Run only once to load stored pref

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('azinag_lang', newLang);
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
      return newLang;
    });
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation key not found: ${keyPath}`);
        return keyPath;
      }
      current = current[key];
    }
    
    return current as string;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div className={language === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
