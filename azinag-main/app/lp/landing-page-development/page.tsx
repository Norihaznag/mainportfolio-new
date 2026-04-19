'use client';

import Link from 'next/link';
import { useContent } from '@/components/LanguageContext';
import { CTAButton } from '@/components/CTAButton';

export default function LandingPageDevelopment() {
  const c = useContent();
  const lp = c.lp.landingPage;

  return (
    <div className="bg-canvas text-ink">
      {/* Hero — low nav distraction for ad traffic */}
      <section className="pt-28 pb-20 px-6 max-w-4xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent bg-accent-light px-3 py-1 rounded-full mb-6">
          {lp.badge}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          {lp.headline}
        </h1>
        <p className="text-[1.0625rem] text-ink-muted max-w-xl mx-auto mb-10">{lp.sub}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <CTAButton
            label={lp.primaryCta}
            trackEvent="lp_primary_cta"
            trackSource="lp_landing_page_hero"
            variant="primary"
            size="lg"
          />
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center font-semibold rounded-lg border border-border-subtle text-ink hover:bg-surface-raised transition-colors px-8 py-4 text-base"
          >
            {lp.secondaryCta}
          </Link>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 px-6 border-t border-border-subtle bg-surface">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          {lp.features.map((f) => (
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
          <h2 className="text-2xl font-bold tracking-tight mb-10 text-center">Comment ça marche</h2>
          <ol className="flex flex-col sm:flex-row gap-0 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle border border-border-subtle rounded-2xl overflow-hidden bg-surface">
            {lp.process.map((step, i) => (
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
          <h2 className="text-3xl font-bold tracking-tight mb-4">{lp.footerCta}</h2>
          <p className="text-ink-muted mb-8">{lp.footerSub}</p>
          <CTAButton
            label={lp.primaryCta}
            trackEvent="lp_primary_cta"
            trackSource="lp_landing_page_footer"
            variant="primary"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}
