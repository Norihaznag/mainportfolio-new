'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import type { SaasApp } from '@/lib/apps-data';
import { TrustBar } from '@/components/TrustBar';

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';

function makeWhatsAppUrl(appName: string): string {
  const msg = encodeURIComponent(
    `Bonjour, je suis intéressé par un essai gratuit de ${appName}. Pouvez-vous me contacter ?`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
}

// ─── Accordion item ────────────────────────────────────────────
function FaqItem({ question, answer, open, onToggle, id }: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <div className="border-b border-border-subtle">
      <button
        type="button"
        className="w-full text-left py-5 flex items-center justify-between gap-4 hover:text-accent transition-colors"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-answer`}
        id={`${id}-question`}
      >
        <span className="text-[0.9375rem] font-semibold">{question}</span>
        <span
          className={`shrink-0 text-ink-faint text-xl leading-none select-none transition-transform duration-200 ${
            open ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        style={{
          overflow: 'hidden',
          maxHeight: open ? '400px' : '0',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.25s ease',
        }}
      >
        <p className="pb-5 text-sm text-ink-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// ─── Screenshot placeholder ────────────────────────────────────
function ScreenshotPlaceholder({ alt, bg, index }: { alt: string; bg: string; index: number }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden aspect-[16/10] shrink-0 w-[320px] sm:w-[400px] bg-gradient-to-br ${bg} flex items-center justify-center`}
      aria-label={alt}
    >
      <div className="absolute inset-0 opacity-10 bg-grid" />
      <div className="relative text-center text-white px-6">
        <p className="text-5xl font-bold mb-2 opacity-60">{String(index + 1).padStart(2, '0')}</p>
        <p className="text-sm font-medium opacity-80 leading-tight">{alt}</p>
      </div>
    </div>
  );
}

// ─── Pricing card ──────────────────────────────────────────────
function PricingCard({
  tier,
  annual,
  whatsappUrl,
  isFeatured = false,
}: {
  tier: { name: string; monthlyPrice: number; annualPrice: number; features: string[] };
  annual: boolean;
  whatsappUrl: string;
  isFeatured?: boolean;
}) {
  const price = annual ? tier.annualPrice : tier.monthlyPrice;
  const savings = annual ? Math.round((tier.monthlyPrice - tier.annualPrice) * 12) : 0;

  return (
    <div
      className={`flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
        isFeatured
          ? 'bg-accent border-accent text-white ring-2 ring-accent ring-offset-2'
          : 'bg-white border-border-subtle hover:border-accent/40 hover:shadow-card'
      }`}
    >
      {isFeatured && (
        <span className="self-start text-xs font-semibold tracking-widest uppercase bg-white/20 text-white px-2.5 py-1 rounded-full mb-4">
          Recommandé
        </span>
      )}
      <h3 className={`text-xl font-bold mb-1 ${isFeatured ? 'text-white' : 'text-ink'}`}>
        {tier.name}
      </h3>

      <div className="flex items-end gap-1.5 mb-1">
        <span className={`text-4xl font-bold tracking-tight ${isFeatured ? 'text-white' : 'text-ink'}`}>
          {price.toLocaleString('fr-MA')}
        </span>
        <span className={`text-base mb-1 ${isFeatured ? 'text-white/70' : 'text-ink-muted'}`}>
          DH/mois
        </span>
      </div>

      {annual && savings > 0 ? (
        <p className={`text-xs font-medium mb-5 ${isFeatured ? 'text-white/80' : 'text-emerald-600'}`}>
          → Économisez {savings.toLocaleString('fr-MA')} DH/an
        </p>
      ) : (
        <p className="h-5 mb-5" aria-hidden="true" />
      )}

      <ul className="space-y-2.5 flex-1 mb-8" role="list">
        {tier.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2 text-sm">
            <span
              className={`mt-1.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                isFeatured ? 'bg-white/20 text-white' : 'bg-accent-light text-accent'
              }`}
              aria-hidden="true"
            >
              ✓
            </span>
            <span className={isFeatured ? 'text-white/90' : 'text-ink-muted'}>{feat}</span>
          </li>
        ))}
      </ul>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id={`pricing-cta-${tier.name.toLowerCase()}`}
        className={`w-full inline-flex items-center justify-center gap-2 font-semibold rounded-lg px-6 py-3 text-[0.9375rem] transition-all duration-200 ${
          isFeatured
            ? 'bg-white text-accent hover:bg-surface'
            : 'bg-accent text-white hover:bg-blue-700'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Contacter pour abonnement
      </a>
    </div>
  );
}

// ─── Main client component ─────────────────────────────────────
export default function AppDetailClient({ app }: { app: SaasApp }) {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const demoRef = useRef<HTMLElement>(null);

  const whatsappUrl = makeWhatsAppUrl(app.name);
  const annualSavingsMonthly = app.monthlyPrice - app.annualPrice;

  return (
    <div className="text-ink">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6" aria-label={`${app.name} — Hero`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[500px] opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.4) 0%, transparent 65%)' }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />

        <div className="relative max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            href="/applications"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors mb-8 group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 8H3M7 12l-4-4 4-4" />
            </svg>
            Toutes les applications
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            <div className="max-w-2xl">
              {/* Icon + badge */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center text-4xl border border-border-subtle"
                  aria-hidden="true"
                >
                  {app.icon}
                </div>
                {app.badge && (
                  <span
                    className={`text-sm font-semibold tracking-wide rounded-full px-3 py-1 ${
                      app.badge === 'Populaire' ? 'bg-accent text-white' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {app.badge}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{app.name}</h1>
              <p className="text-[1.125rem] text-ink-muted leading-relaxed mb-6">{app.description}</p>

              {/* Price badge */}
              <div className="inline-flex items-baseline gap-2 bg-surface border border-border-subtle rounded-2xl px-5 py-3 mb-8">
                <span className="text-2xl font-bold">{app.monthlyPrice}</span>
                <span className="text-ink-muted text-sm">DH/mois</span>
                <span className="text-xs text-ink-faint mx-2">·</span>
                <span className="text-sm text-emerald-600 font-medium">
                  {app.annualPrice} DH/mois en annuel
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-trial-cta"
                  className="inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-6 py-3.5 text-[0.9375rem] hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contacter pour essai gratuit
                </a>
                <button
                  type="button"
                  id="hero-demo-cta"
                  onClick={() => demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="inline-flex items-center gap-2 bg-white border border-border-subtle text-ink font-semibold rounded-lg px-6 py-3.5 text-[0.9375rem] hover:bg-surface-raised transition-colors"
                >
                  Voir une démo
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v10M3 8l5 5 5-5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Decorative preview */}
            <div
              className={`hidden lg:flex w-[320px] h-[240px] rounded-3xl bg-gradient-to-br ${app.screenshots[0].bg} items-center justify-center shrink-0 border border-white/20 shadow-card-hover`}
              aria-hidden="true"
            >
              <span className="text-7xl">{app.icon}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features grid ────────────────────────────────────── */}
      <section className="py-20 px-6 bg-surface border-t border-border-subtle" aria-labelledby="features-heading">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-3">Fonctionnalités</p>
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
            Tout ce dont vous avez besoin
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.features.map((feat) => (
              <div
                key={feat.title}
                className="bg-white border border-border-subtle rounded-2xl p-6 hover:shadow-card hover:border-accent/30 transition-all duration-200"
              >
                <span className="text-3xl mb-4 block" aria-hidden="true">{feat.icon}</span>
                <h3 className="font-bold mb-2">{feat.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Screenshots ──────────────────────────────────────── */}
      <section
        ref={demoRef}
        className="py-20 px-6 border-t border-border-subtle overflow-hidden"
        aria-labelledby="screenshots-heading"
      >
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-3">Aperçu</p>
          <h2 id="screenshots-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Découvrez l'interface
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 sm:-mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide">
            {app.screenshots.map((shot, idx) => (
              <div key={idx} className="snap-center shrink-0">
                <ScreenshotPlaceholder alt={shot.alt} bg={shot.bg} index={idx} />
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-faint mt-4">
            Contactez-nous pour une démo en direct →{' '}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">
              WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-surface border-t border-border-subtle" aria-labelledby="pricing-heading">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-3">Tarifs</p>
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Choisissez votre formule
          </h2>
          <p className="text-ink-muted mb-8">
            Passez en annuel et économisez{' '}
            <strong className="text-emerald-600">
              {(annualSavingsMonthly * 12).toLocaleString('fr-MA')} DH/an
            </strong>
            .
          </p>

          {/* Toggle */}
          <div
            className="inline-flex items-center gap-1 bg-surface-raised border border-border-subtle rounded-full p-1 mb-10"
            role="group"
            aria-label="Période de facturation"
          >
            <button
              type="button"
              id="billing-monthly"
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                !annual ? 'bg-white shadow-card text-ink' : 'text-ink-muted hover:text-ink'
              }`}
              aria-pressed={!annual}
            >
              Mensuel
            </button>
            <button
              type="button"
              id="billing-annual"
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                annual ? 'bg-white shadow-card text-ink' : 'text-ink-muted hover:text-ink'
              }`}
              aria-pressed={annual}
            >
              Annuel
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 rounded-full px-2 py-0.5">
                −20%
              </span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            {app.tiers.map((tier, idx) => (
              <PricingCard
                key={tier.name}
                tier={tier}
                annual={annual}
                whatsappUrl={whatsappUrl}
                isFeatured={idx === 1}
              />
            ))}
          </div>

          <div className="mt-8">
            <TrustBar />
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-border-subtle" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-3">Questions fréquentes</p>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">
            On répond à vos questions
          </h2>
          <div className="divide-y divide-border-subtle">
            {app.faq.map((item, idx) => (
              <FaqItem
                key={idx}
                id={`faq-${app.slug}-${idx}`}
                question={item.question}
                answer={item.answer}
                open={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────── */}
      <section className="py-20 px-6 bg-surface border-t border-border-subtle" aria-label="Appel à l'action">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-5" aria-hidden="true">{app.icon}</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Intéressé par {app.name} ?
          </h2>
          <p className="text-ink-muted text-[1.0625rem] mb-8">
            Contactez notre équipe — nous vous offrons un essai gratuit de 14 jours.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="bottom-cta-whatsapp"
            className="inline-flex items-center gap-2.5 bg-accent text-white font-semibold rounded-lg px-8 py-4 text-base hover:bg-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Écrivez-nous sur WhatsApp →
          </a>
          <div className="mt-6">
            <TrustBar />
          </div>
        </div>
      </section>
    </div>
  );
}
