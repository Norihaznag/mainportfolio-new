'use client';

import { useEffect, useState } from 'react';

import { AppCard } from '@/components/AppCard';
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
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <section className="max-w-5xl mx-auto bg-white border border-border-subtle rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-muted mb-3">Applications</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Available software</h1>
        <p className="text-sm text-ink-muted mb-6">Select a sector or browse all applications.</p>

        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Sector filters">
          {SECTORS.map((sector) => (
            <button
              key={sector.value}
              type="button"
              onClick={() => setActiveSector(sector.value)}
              className={`px-3.5 py-2 rounded-full text-sm border ${
                activeSector === sector.value
                  ? 'bg-accent text-white border-accent'
                  : 'bg-surface-raised border-border-subtle text-ink-muted'
              }`}
              aria-pressed={activeSector === sector.value}
            >
              {sector.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-ink-muted">Loading applications...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-ink-muted">No applications found for this sector.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((app) => (
              <AppCard key={app.slug ?? app.id} app={app} variant="catalog" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
