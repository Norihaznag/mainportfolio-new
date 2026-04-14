'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { apps, SECTORS, type SaasApp } from '@/lib/apps-data';
import { TrustBar } from '@/components/TrustBar';
import { CustomSolutionsCTA } from '@/components/CustomSolutionsCTA';

function AppCard({ app }: { app: SaasApp }) {
  return (
    <Link
      href={`/applications/${app.slug}`}
      className="group block border border-border-subtle rounded-2xl bg-white p-6 flex flex-col h-full
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-accent/30
                 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      aria-label={`${app.name} — ${app.tagline}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-2xl shrink-0
                     group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        >
          {app.icon}
        </div>
        {app.badge && (
          <span
            className={`text-xs font-semibold tracking-wide uppercase rounded-full px-2.5 py-1 shrink-0 ${
              app.badge === 'Populaire'
                ? 'bg-accent text-white'
                : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {app.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="text-[1rem] font-bold mb-1 group-hover:text-accent transition-colors">
        {app.name}
      </h3>
      <p className="text-sm text-ink-muted leading-relaxed flex-1 mb-5">
        {app.tagline}
      </p>

      {/* Price row */}
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-ink">
          {app.monthlyPrice}{' '}
          <span className="text-sm font-normal text-ink-muted">DH/mois</span>
        </p>
        <span className="text-sm font-semibold text-accent group-hover:gap-2 transition-all flex items-center gap-1">
          Voir l'application
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function ApplicationsPage() {
  const [activeSector, setActiveSector] = useState<string>('all');

  const filtered = activeSector === 'all'
    ? apps
    : apps.filter((a) => a.sector === activeSector);

  return (
    <div className="text-ink">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6" aria-label="Applications SaaS hero">
        {/* Ambient decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(29,78,216,0.25) 0%, transparent 70%)',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />

        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-4">Applications SaaS</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 max-w-3xl">
            Nos Applications SaaS
          </h1>
          <p className="text-[1.0625rem] text-ink-muted max-w-2xl leading-relaxed">
            Des outils prêts à l'emploi pour optimiser votre activité.{' '}
            <strong className="text-ink font-semibold">Abonnement mensuel, sans engagement.</strong>
          </p>
        </div>
      </section>

      {/* ─── Filter bar ───────────────────────────────────────── */}
      <section className="px-6 pb-4" aria-label="Filtrer par secteur">
        <div className="max-w-5xl mx-auto">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtres par secteur d'activité"
          >
            {SECTORS.map((sector) => (
              <button
                key={sector.value}
                type="button"
                id={`filter-${sector.value}`}
                onClick={() => setActiveSector(sector.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSector === sector.value
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-surface text-ink-muted hover:bg-surface-raised hover:text-ink border border-border-subtle'
                }`}
                aria-pressed={activeSector === sector.value}
              >
                {sector.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── App grid ─────────────────────────────────────────── */}
      <section className="px-6 pb-20 pt-8" aria-label="Catalogue d'applications">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink-muted">Aucune application dans ce secteur pour l'instant.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((app) => (
                <AppCard key={app.slug} app={app} />
              ))}
            </div>
          )}

          {/* Trust bar */}
          <div className="mt-12 border-t border-border-subtle pt-8">
            <TrustBar />
          </div>
        </div>
      </section>

      {/* ─── Custom solutions CTA ─────────────────────────────── */}
      <section className="px-6 pb-24" aria-label="Solutions sur mesure">
        <div className="max-w-5xl mx-auto">
          <CustomSolutionsCTA />
        </div>
      </section>
    </div>
  );
}
