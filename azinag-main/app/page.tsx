'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useContent } from '@/components/LanguageContext';
import { CTAButton } from '@/components/CTAButton';
import { trackWorkCtaClick, trackPricingCtaClick } from '@/lib/analytics';

interface Project {
  name: string;
  desc: string;
  tags?: string[];
}

export default function Home() {
  const c = useContent();
  const [projects, setProjects] = useState<Project[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/public/projects')
      .then((r) => r.ok ? r.json() : { projects: [] })
      .then((data) => {
        if (data.projects?.length > 0) setProjects(data.projects.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-canvas text-ink">
      {/* Hero */}
      <section className="pt-28 pb-24 px-6 max-w-5xl mx-auto">
        <p className="eyebrow mb-5">{c.hero.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl mb-6">
          {c.hero.headline}
        </h1>
        <p className="text-[1.0625rem] text-ink-muted leading-relaxed max-w-xl mb-10">
          {c.hero.subheadline}
        </p>
        <div className="flex flex-wrap gap-3">
          <CTAButton label={c.hero.primaryCta} trackEvent="book_call" trackSource="hero" variant="primary" size="lg" />
          <Link
            href="/showcase"
            onClick={() => trackWorkCtaClick('hero')}
            className="inline-flex items-center justify-center font-semibold rounded-lg border border-border-subtle text-ink hover:bg-surface-raised transition-colors px-8 py-4 text-base"
          >
            {c.hero.secondaryCta}
          </Link>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-y border-border-subtle bg-surface py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {c.proofStrip.map((item) => (
            <div key={item.label}>
              <p className="text-[0.9375rem] font-semibold text-ink mb-0.5">{item.label}</p>
              <p className="text-sm text-ink-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offer ladder */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <p className="eyebrow mb-3">{c.offers.eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{c.offers.title}</h2>
        <p className="text-ink-muted mb-14 text-[1.0625rem]">{c.offers.subtitle}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {([  
            { key: 'webApp', src: 'offer_web' },
            { key: 'desktopApp', src: 'offer_desktop' },
            { key: 'androidApp', src: 'offer_android' },
          ] as const).map(({ key, src }) => {
            const offer = c.offers[key];
            return (
              <div key={key} className="border border-border-subtle rounded-2xl p-8 bg-surface hover:shadow-card-hover transition-shadow flex flex-col">
                <p className="eyebrow mb-3">{offer.name}</p>
                <h3 className="text-xl font-bold mb-2">{offer.tagline}</h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-6">{offer.description}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {offer.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-ink-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <CTAButton label={offer.cta} trackEvent="book_call" trackSource={src} variant="primary" size="md" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Selected work */}
      {projects.length > 0 && (
        <section className="py-24 px-6 border-t border-border-subtle">
          <div className="max-w-5xl mx-auto">
            <p className="eyebrow mb-3">{c.selectedWork.eyebrow}</p>
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{c.selectedWork.title}</h2>
              <Link
                href="/showcase"
                onClick={() => trackWorkCtaClick('home_work_section')}
                className="text-sm font-medium text-accent hover:underline hidden sm:block"
              >
                {c.selectedWork.viewAll} &rarr;
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div key={p.name} className="border border-border-subtle rounded-xl p-6 bg-surface hover:shadow-card-hover transition-shadow">
                  <h3 className="text-[0.9375rem] font-semibold mb-2">{p.name}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed mb-4">{p.desc}</p>
                  {p.tags && (
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-light text-accent">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="py-24 px-6 border-t border-border-subtle bg-surface">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-3">{c.process.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-14">{c.process.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {c.process.steps.map((step) => (
              <div key={step.number}>
                <p className="text-2xl font-bold text-ink-faint mb-3 font-serif italic">{step.number}</p>
                <h3 className="text-[0.9375rem] font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 px-6 border-t border-border-subtle">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-5">{c.founder.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">{c.founder.title}</h2>
          <div className="text-[1.0625rem] text-ink-muted leading-relaxed space-y-4 mb-8">
            {c.founder.body.split('\n\n').map((para, i) => (<p key={i}>{para}</p>))}
          </div>
          <p className="text-[0.9375rem] font-semibold text-ink">{c.founder.name}</p>
          <p className="text-sm text-ink-muted mb-8">{c.founder.role}</p>
          <CTAButton label={c.founder.cta} trackEvent="book_call" trackSource="founder_section" variant="ghost" size="md" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 border-t border-border-subtle bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">{c.faq.title}</h2>
          <div className="divide-y divide-border-subtle">
            {c.faq.items.map((item, i) => (
              <div key={i}>
                <button
                  type="button"
                  className="w-full text-left py-5 flex items-center justify-between gap-4 hover:text-accent transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-[0.9375rem] font-semibold">{item.q}</span>
                  <span className="shrink-0 text-ink-faint text-lg leading-none">{openFaq === i ? '-' : '+'}</span>
                </button>
                {openFaq === i && <p className="pb-5 text-sm text-ink-muted leading-relaxed">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6 border-t border-border-subtle">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{c.finalCta.headline}</h2>
          <p className="text-ink-muted mb-10 text-[1.0625rem]">{c.finalCta.sub}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <CTAButton label={c.finalCta.primaryCta} trackEvent="book_call" trackSource="final_cta" variant="primary" size="lg" />
            <Link
              href="/pricing"
              onClick={() => trackPricingCtaClick('final_cta')}
              className="inline-flex items-center justify-center font-semibold rounded-lg border border-border-subtle text-ink hover:bg-surface-raised transition-colors px-8 py-4 text-base"
            >
              {c.finalCta.secondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
