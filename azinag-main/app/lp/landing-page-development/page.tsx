'use client';

import Link from 'next/link';
import { useContent } from '@/components/LanguageContext';

export default function LandingPageDevelopment() {
  const c = useContent();
  const lp = c.lp.landingPage;

  return (
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <section className="max-w-4xl mx-auto bg-white border border-border-subtle rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-muted mb-3">Landing Page Development</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{lp.headline}</h1>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">{lp.sub}</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {lp.features.map((feature) => (
            <article key={feature.title} className="border border-border-subtle rounded-xl p-4 bg-surface-raised">
              <h2 className="text-sm font-semibold mb-1">{feature.title}</h2>
              <p className="text-sm text-ink-muted">{feature.desc}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="inline-flex items-center px-4 py-2 rounded-lg border border-border-subtle bg-surface-raised text-sm font-medium">
            Contact
          </Link>
          <Link href="/pricing" className="inline-flex items-center px-4 py-2 rounded-lg border border-border-subtle bg-surface-raised text-sm font-medium">
            Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
