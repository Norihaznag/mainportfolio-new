'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useContent } from '@/components/LanguageContext';
import { CTAButton } from '@/components/CTAButton';

export function Header() {
  const c = useContent();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[1.05rem] font-bold tracking-tight text-ink hover:opacity-70 transition-opacity"
          aria-label="Azinag — Home"
        >
          Azinag
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
          <Link href="/showcase" className="text-sm font-medium text-ink-muted hover:text-ink transition-colors">
            {c.nav.work}
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-ink-muted hover:text-ink transition-colors">
            {c.nav.pricing}
          </Link>
          <Link href="/about" className="text-sm font-medium text-ink-muted hover:text-ink transition-colors">
            {c.nav.about}
          </Link>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <CTAButton
            label={c.nav.cta}
            trackEvent="book_call"
            trackSource="header"
            variant="primary"
            size="sm"
            className="hidden md:inline-flex"
          />
          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M14 6l-8 8" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden border-t border-border-subtle bg-canvas px-6 py-5 flex flex-col gap-5 ${mobileOpen ? '' : 'hidden'}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
          <Link
            href="/showcase"
            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {c.nav.work}
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {c.nav.pricing}
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {c.nav.about}
          </Link>
          <CTAButton
            label={c.nav.cta}
            trackEvent="book_call"
            trackSource="header_mobile"
            variant="primary"
            size="sm"
            className="self-start"
          />
        </div>
    </header>
  );
}

