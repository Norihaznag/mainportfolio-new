"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, direction, changeLanguage } = useLanguage();
  const pathname = usePathname();

  const navigation = [
    { key: 'home', href: '/' },
    { key: 'apps', href: '/apps' },
    { key: 'about', href: '/about' },
    { key: 'pricingNav', href: '/pricing' },
    { key: 'contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      dir={direction}
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
      scrolled
        ? 'bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-sm'
        : 'bg-background/70 backdrop-blur-xl border-b border-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary text-sm font-semibold">
              AZ
            </span>
            <span className="text-sm sm:text-base font-semibold tracking-tight">
              Azinag Web Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {getTranslation(item.key, language)}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="flex items-center rounded-full border border-border/60 bg-muted/60 px-1 py-0.5 text-xs">
                {['en', 'fr'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => changeLanguage(code)}
                    className={`px-2 py-1 rounded-full transition-colors ${
                      language === code
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-label={`Switch language to ${code.toUpperCase()}`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="فتح القائمة"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-3 pb-4 border-t border-border/60 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm transition-colors ${
                    isActive(item.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {getTranslation(item.key, language)}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center rounded-full border border-border/60 bg-muted/60 px-1 py-0.5 text-xs">
                  {['en', 'fr'].map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => changeLanguage(code)}
                      className={`px-2 py-1 rounded-full transition-colors ${
                        language === code
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
