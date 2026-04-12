'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
        {/* Ambient glow orbs — terracotta */}
        <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0">
          <div className="orb -top-40 -right-20 w-[700px] h-[600px] opacity-100"
            style={{ background: 'radial-gradient(ellipse at center, rgba(194,65,12,0.18) 0%, transparent 70%)' }} />
          <div className="orb top-32 -left-32 w-[500px] h-[400px] opacity-80"
            style={{ background: 'radial-gradient(ellipse at center, rgba(234,88,12,0.10) 0%, transparent 70%)' }} />
          <div className="orb bottom-0 left-1/2 -translate-x-1/2 w-full h-40 opacity-60"
            style={{ background: 'radial-gradient(ellipse at center, rgba(194,65,12,0.08) 0%, transparent 70%)' }} />
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
              href="/pricing"
              onClick={() => trackPricingCtaClick('hero')}
              className="inline-flex items-center justify-center font-semibold rounded-lg border border-border-subtle text-ink hover:bg-surface-raised transition-colors px-8 py-4 text-base"
            >
              {c.hero.secondaryCta}
            </Link>
          </div>

          {/* Hero visual — restaurant image mosaic */}
          <div className="mt-14 grid grid-cols-3 gap-3 h-[260px] sm:h-[340px] lg:h-[400px]">

            {/* Large main image */}
            <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85"
                alt="Intérieur de restaurant chaleureux"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="(max-width: 768px) 66vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="text-xs font-semibold text-white/90 tracking-widest uppercase bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  Votre restaurant
                </span>
              </div>
            </div>

            {/* Right column — two stacked images */}
            <div className="flex flex-col gap-3">
              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85"
                  alt="Cuisine locale"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85"
                  alt="Salle de restaurant"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-semibold text-white/80 tracking-widest uppercase bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    Guelmim · Tiznit
                  </span>
                </div>
              </div>
            </div>

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
              {
                key: 'webApp', src: 'offer_presence', icon: '📍',
                visual: (
                  <div className="w-full aspect-[16/9] relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=700&q=80"
                      alt="Café local"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-bold text-white tracking-widest uppercase">Présence</span>
                  </div>
                ),
              },
              {
                key: 'desktopApp', src: 'offer_vitrine', icon: '🍽️',
                visual: (
                  <div className="w-full aspect-[16/9] relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80"
                      alt="Cuisine de restaurant"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-bold text-white tracking-widest uppercase">Vitrine</span>
                  </div>
                ),
              },
              {
                key: 'androidApp', src: 'offer_reservation', icon: '📅',
                visual: (
                  <div className="w-full aspect-[16/9] relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=700&q=80"
                      alt="Réservation restaurant"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-bold text-white tracking-widest uppercase">Réservation+</span>
                  </div>
                ),
              },
            ] as const).map(({ key, src, icon, visual }) => {
              const offer = c.offers[key];
              return (
                <div key={key} className="border border-border-subtle rounded-2xl bg-white hover:shadow-card transition-all duration-300 flex flex-col group overflow-hidden">
                  {visual}
                  <div className="p-8 flex flex-col flex-1">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
      <section className="relative overflow-hidden border-t border-border-subtle" aria-labelledby="founder-heading">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&q=80"
            alt=""
            fill
            className="object-cover object-center"
            aria-hidden="true"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
        </div>

        <div className="relative py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow mb-5 text-white/60">{c.founder.eyebrow}</p>
            <h2 id="founder-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-white">{c.founder.title}</h2>
            <div className="text-[1.0625rem] text-white/70 leading-relaxed space-y-4 mb-8">
              {c.founder.body.split('\n\n').map((para, i) => (<p key={i}>{para}</p>))}
            </div>
            <p className="text-[0.9375rem] font-semibold text-white">{c.founder.name}</p>
            <p className="text-sm text-white/60 mb-8">{c.founder.role}</p>
            <CTAButton label={c.founder.cta} trackEvent="book_call" trackSource="founder_section" variant="secondary" size="md" />
          </div>
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
      <section className="relative overflow-hidden border-t border-border-subtle" aria-labelledby="cta-heading">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1600&q=80"
            alt=""
            fill
            className="object-cover object-center"
            aria-hidden="true"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-orange-950/70" />
        </div>
        <div className="relative py-32 px-6">
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">{c.finalCta.headline}</h2>
          <p className="text-white/70 mb-10 text-[1.0625rem]">{c.finalCta.sub}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <CTAButton label={c.finalCta.primaryCta} trackEvent="book_call" trackSource="final_cta" variant="primary" size="lg" />
            <a
              href={`https://wa.me/212609343953?text=${encodeURIComponent('Bonjour, je voudrais un site web pour mon restaurant/café.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors px-8 py-4 text-base gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className="text-[#25D366]" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
        </div>
      </section>

    </div>
  );
}
