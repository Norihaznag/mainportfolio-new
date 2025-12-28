'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  lang: 'en' | 'fr' | 'ar';
  navItems: Array<{ href: string; label: string; title: string }>;
  orderLabel: string;
  orderTitle: string;
  orderHref: string;
}

export function MobileMenu({
  lang,
  navItems,
  orderLabel,
  orderTitle,
  orderHref,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className={`w-6 h-6 text-gray-900 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50"
        >
          <nav className="container mx-auto px-4 py-4 space-y-2" role="navigation" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                title={item.title}
              >
                {item.label}
              </Link>
            ))}

            {/* Order Button */}
            <Link
              href={orderHref}
              onClick={closeMenu}
              className="block px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 font-medium text-center mt-4"
              title={orderTitle}
            >
              {orderLabel}
            </Link>

            {/* Language Selection */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="text-sm text-gray-600 font-semibold px-4 mb-2">
                {lang === 'ar' ? 'اللغة' : lang === 'fr' ? 'Langue' : 'Language'}
              </div>
              <div className="flex gap-2 px-4">
                <Link
                  href="/ar"
                  lang="ar"
                  onClick={closeMenu}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    lang === 'ar'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label="Switch to Arabic"
                  aria-current={lang === 'ar' ? 'page' : undefined}
                >
                  العربية
                </Link>
                <Link
                  href="/fr"
                  lang="fr"
                  onClick={closeMenu}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    lang === 'fr'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label="Switch to French"
                  aria-current={lang === 'fr' ? 'page' : undefined}
                >
                  Français
                </Link>
                <Link
                  href="/en"
                  lang="en"
                  onClick={closeMenu}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    lang === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label="Switch to English"
                  aria-current={lang === 'en' ? 'page' : undefined}
                >
                  English
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
