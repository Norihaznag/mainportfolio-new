'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useContent } from '@/components/LanguageContext';
import { trackWorkCtaClick } from '@/lib/analytics';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function BookThanks() {
  const c = useContent();
  const t = c.bookThanks;

  useEffect(() => {
    // Fire Meta Pixel Schedule conversion on confirmed booking page load
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Schedule');
    }
  }, []);

  return (
    <div className="bg-canvas text-ink min-h-[70vh] flex items-center">
      <section className="px-6 py-28 max-w-2xl mx-auto text-center w-full">
        <p className="eyebrow mb-5">{t.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">{t.headline}</h1>
        <p className="text-[1.0625rem] text-ink-muted mb-10 leading-relaxed">{t.body}</p>
        <Link
          href="/showcase"
          onClick={() => trackWorkCtaClick('book_thanks')}
          className="inline-flex items-center justify-center font-semibold rounded-lg border border-border-subtle text-ink hover:bg-surface-raised transition-colors px-8 py-3.5 text-[0.9375rem]"
        >
          {t.cta}
        </Link>
      </section>
    </div>
  );
}
