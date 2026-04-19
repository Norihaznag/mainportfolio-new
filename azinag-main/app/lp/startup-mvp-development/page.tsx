'use client';

import Link from 'next/link';
import { useContent } from '@/components/LanguageContext';
import { CTAButton } from '@/components/CTAButton';

export default function StartupMVPDevelopment() {
  const c = useContent();
  const mvp = c.lp.mvp;

  return (
    <div className="bg-canvas text-ink">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 max-w-4xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent bg-accent-light px-3 py-1 rounded-full mb-6">
          {mvp.badge}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          {mvp.headline}
        </h1>
        <p className="text-[1.0625rem] text-ink-muted max-w-xl mx-auto mb-10">{mvp.sub}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <CTAButton
            label={mvp.primaryCta}
            trackEvent="lp_primary_cta"
            trackSource="lp_mvp_hero"
            variant="primary"
            size="lg"
          />
          <Link
            href="/showcase"
            className="inline-flex items-center justify-center font-semibold rounded-lg border border-border-subtle text-ink hover:bg-surface-raised transition-colors px-8 py-4 text-base"
          >
            {mvp.secondaryCta}
          </Link>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 px-6 border-t border-border-subtle bg-surface">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          {mvp.features.map((f) => (
            <div key={f.title} className="p-6 rounded-xl border border-border-subtle bg-canvas">
              <h3 className="text-[0.9375rem] font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-10 text-center">The process</h2>
          <ol className="flex flex-col sm:flex-row gap-0 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle border border-border-subtle rounded-2xl overflow-hidden bg-surface">
            {mvp.process.map((step, i) => (
              <li key={step} className="flex-1 p-6">
                <p className="text-2xl font-bold text-ink-faint font-serif italic mb-2">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="text-sm font-medium text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 border-t border-border-subtle bg-surface">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{mvp.footerCta}</h2>
          <p className="text-ink-muted mb-8">{mvp.footerSub}</p>
          <CTAButton
            label={mvp.primaryCta}
            trackEvent="lp_primary_cta"
            trackSource="lp_mvp_footer"
            variant="primary"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}
