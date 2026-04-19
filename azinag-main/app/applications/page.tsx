'use client';

import { useEffect, useState } from 'react';

import { AppCard } from '@/components/AppCard';
import { TrustBar } from '@/components/TrustBar';
import { SECTORS, type DownloadableApp } from '@/lib/apps-data';

export default function ApplicationsPage() {
  const [apps, setApps] = useState<DownloadableApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSector, setActiveSector] = useState<string>('all');

  useEffect(() => {
    fetch(`/api/public/apps?t=${Date.now()}`, { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : { apps: [] }))
      .then((payload) => setApps(payload.apps || []))
      .catch(() => setApps([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeSector === 'all'
      ? apps
      : apps.filter((app) => (app.sector || app.category) === activeSector);

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
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink-muted">No applications in this sector yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((app) => (
                <AppCard key={app.slug ?? app.id} app={app} variant="catalog" />
              ))}
            </div>
          )}

          <div className="mt-12 border-t border-border-subtle pt-8">
            <TrustBar />
          </div>
        </div>
      </section>
    </div>
  );
}
