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
    <div className="text-ink">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-28 px-6" aria-label="Hero">
        {/* Ambient glow orbs */}
        <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0">
          <div className="orb -top-40 -right-20 w-[700px] h-[600px] opacity-100"
            style={{ background: 'radial-gradient(ellipse at center, rgba(155,92,255,0.22) 0%, transparent 70%)' }} />
          <div className="orb top-32 -left-32 w-[500px] h-[400px] opacity-80"
            style={{ background: 'radial-gradient(ellipse at center, rgba(99,44,200,0.14) 0%, transparent 70%)' }} />
          <div className="orb bottom-0 left-1/2 -translate-x-1/2 w-full h-40 opacity-60"
            style={{ background: 'radial-gradient(ellipse at center, rgba(155,92,255,0.10) 0%, transparent 70%)' }} />
        </div>
        {/* Dot grid */}
        <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 bg-grid" />
        {/* Bottom glow line */}
        <div aria-hidden="true" className="glow-line absolute bottom-0 left-0 right-0" />

        {/* Content */}
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-5">{c.hero.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.08] max-w-3xl mb-6">
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
        </div>
      </section>

      {/* ─── Proof strip ──────────────────────────────────────── */}
      <section className="relative bg-surface border-y border-border-subtle py-12 px-6" aria-label="Key facts">
        <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {c.proofStrip.map((item) => (
            <div key={item.label}>
              <p className="text-[0.9375rem] font-semibold text-ink mb-0.5">{item.label}</p>
              <p className="text-sm text-ink-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Offer ladder ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 px-6" aria-labelledby="offers-heading">
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-3">{c.offers.eyebrow}</p>
          <h2 id="offers-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{c.offers.title}</h2>
          <p className="text-ink-muted mb-14 text-[1.0625rem]">{c.offers.subtitle}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {([
              { key: 'webApp'     , src: 'offer_web'     , icon: '🌐' },
              { key: 'desktopApp' , src: 'offer_desktop' , icon: '🖥' },
              { key: 'androidApp' , src: 'offer_android' , icon: '📱' },
            ] as const).map(({ key, src, icon }) => {
              const offer = c.offers[key];
              return (
                <div key={key} className="border border-border-subtle rounded-2xl p-8 bg-white hover:shadow-card transition-all duration-300 flex flex-col group">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <p className="eyebrow mb-2">{offer.name}</p>
                  <h3 className="text-xl font-bold mb-2">{offer.tagline}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed mb-6">{offer.description}</p>
                  <ul className="space-y-2 mb-8 flex-1" role="list">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-ink-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <CTAButton label={offer.cta} trackEvent="book_call" trackSource={src} variant="primary" size="md" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Selected work ────────────────────────────────────── */}
      {projects.length > 0 && (
        <section className="relative py-24 px-6 border-t border-border-subtle" aria-labelledby="work-heading">
          <div className="relative max-w-5xl mx-auto">
            <p className="eyebrow mb-3">{c.selectedWork.eyebrow}</p>
            <div className="flex items-end justify-between mb-12">
              <h2 id="work-heading" className="text-3xl sm:text-4xl font-bold tracking-tight">{c.selectedWork.title}</h2>
              <Link
                href="/showcase"
                onClick={() => trackWorkCtaClick('home_work_section')}
                className="text-sm font-medium text-accent hover:underline hidden sm:block"
                aria-label="View all projects"
              >
                {c.selectedWork.viewAll} &rarr;
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div key={p.name} className="border border-border-subtle rounded-xl p-6 bg-white hover:shadow-card transition-all duration-300">
                  <h3 className="text-[0.9375rem] font-semibold mb-2">{p.name}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed mb-4">{p.desc}</p>
                  {p.tags && (
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Project tags">
                      {p.tags.map((tag) => (
                        <span key={tag} role="listitem" className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-light text-accent">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Process ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 px-6 border-t border-border-subtle bg-surface" aria-labelledby="process-heading">
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-3">{c.process.eyebrow}</p>
          <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-16">{c.process.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {c.process.steps.map((step, idx) => (
              <div key={step.number} className="flex flex-col">
                  <div className="gradient-number text-5xl font-bold mb-4 font-serif italic leading-none">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="text-[0.9375rem] font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Founder ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 px-6 border-t border-border-subtle" aria-labelledby="founder-heading">
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-5">{c.founder.eyebrow}</p>
          <h2 id="founder-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">{c.founder.title}</h2>
          <div className="text-[1.0625rem] text-ink-muted leading-relaxed space-y-4 mb-8">
            {c.founder.body.split('\n\n').map((para, i) => (<p key={i}>{para}</p>))}
          </div>
          <p className="text-[0.9375rem] font-semibold text-ink">{c.founder.name}</p>
          <p className="text-sm text-ink-muted mb-8">{c.founder.role}</p>
          <CTAButton label={c.founder.cta} trackEvent="book_call" trackSource="founder_section" variant="ghost" size="md" />
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 border-t border-border-subtle bg-surface" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">{c.faq.title}</h2>
          <div className="divide-y divide-border-subtle" role="list">
            {c.faq.items.map((item, i) => (
              <div key={i} role="listitem">
                <button
                  type="button"
                  className="w-full text-left py-5 flex items-center justify-between gap-4 hover:text-accent transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-[0.9375rem] font-semibold">{item.q}</span>
                  <span className="shrink-0 text-ink-faint text-xl leading-none select-none" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  hidden={openFaq !== i}
                >
                  <p className="pb-5 text-sm text-ink-muted leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────── */}
      <section className="relative py-32 px-6 border-t border-border-subtle" aria-labelledby="cta-heading">
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{c.finalCta.headline}</h2>
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
