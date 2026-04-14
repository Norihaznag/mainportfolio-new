'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apps, SECTORS, type DownloadableApp } from '@/lib/apps-data';
import { TrustBar } from '@/components/TrustBar';

function AppCard({ app }: { app: DownloadableApp }) {
  return (
    <Link
      href={app.slug ? `/applications/${app.slug}` : '/downloads'}
      className="group block border border-border-subtle rounded-2xl bg-white p-6 flex flex-col h-full
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-accent/30
                 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      aria-label={`${app.name} — ${app.tagline}`}
    >
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
              app.badge === 'Popular' ? 'bg-accent text-white' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {app.badge}
          </span>
        )}
      </div>
      <h3 className="text-[1rem] font-bold mb-1 group-hover:text-accent transition-colors">{app.name}</h3>
      <p className="text-sm text-ink-muted leading-relaxed flex-1 mb-5">{app.tagline}</p>
      <div className="flex items-center justify-between">
        {app.monthlyPrice ? (
          <p className="text-lg font-bold text-ink">
            {app.monthlyPrice}{' '}
            <span className="text-sm font-normal text-ink-muted">MAD/mo</span>
          </p>
        ) : (
          <p className="text-sm font-semibold text-emerald-600">Free</p>
        )}
        <span className="text-sm font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
          View app
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function ApplicationsPage() {
  const [activeSector, setActiveSector] = useState<string>('all');

  const filtered =
    activeSector === 'all' ? apps : apps.filter((a) => a.sector === activeSector);

  return (
    <div className="text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6" aria-label="Applications hero">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.25) 0%, transparent 70%)' }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-4">SaaS Applications</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Ready-Made Applications
          </h1>
          <p className="text-[1.0625rem] text-ink-muted max-w-2xl leading-relaxed">
            Ready-to-use cloud tools to optimize your business operations.{' '}
            <strong className="text-ink font-semibold">Monthly subscription, no commitment.</strong>
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="px-6 pb-4" aria-label="Filter by sector">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sector filters">
            {SECTORS.map((sector) => (
              <button
                key={sector.value}
                type="button"
                id={`sector-filter-${sector.value}`}
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

      {/* App grid */}
      <section className="px-6 pb-20 pt-8" aria-label="Application catalog">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink-muted">No applications in this sector yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((app) => (
                <AppCard key={app.slug ?? app.id} app={app} />
              ))}
            </div>
          )}

          <div className="mt-12 border-t border-border-subtle pt-8">
            <TrustBar />
          </div>
        </div>
      </section>

      {/* Download center CTA */}
      <section className="px-6 pb-24 border-t border-border-subtle pt-10" aria-label="Download center CTA">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-2xl mb-3 font-bold">Looking for downloadable apps?</p>
          <p className="text-ink-muted mb-6">
            All desktop, mobile, and web apps are available from our Download Center.
          </p>
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 border border-border-subtle bg-white text-ink font-semibold rounded-lg px-6 py-3 text-[0.9375rem] hover:bg-surface-raised transition-colors"
          >
            Go to Download Center →
          </Link>
        </div>
      </section>
    </div>
  );
}
