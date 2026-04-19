'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DynamicIcon } from '@/components/DynamicIcon';
import type { DownloadableApp } from '@/lib/apps-data';

function AppCard({ app }: { app: DownloadableApp }) {
  const screenshot = app.screenshots?.[0];
  const href = app.slug ? `/applications/${app.slug}` : '/applications';

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl overflow-hidden transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      aria-label={app.name}
    >
      <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
        {screenshot?.url ? (
          <Image
            src={screenshot.url}
            alt={screenshot.alt ?? app.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-border-subtle/40"
            aria-hidden="true"
          >
            <DynamicIcon name={app.icon} className="w-8 h-8 text-ink-muted/40" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 px-1 py-3">
        <div className="w-9 h-9 shrink-0 rounded-md bg-surface flex items-center justify-center text-accent" aria-hidden="true">
          <DynamicIcon name={app.icon} className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate text-ink leading-none">
            {app.name}
          </p>
          {app.tagline && (
            <p className="text-xs text-ink-muted truncate mt-0.5 leading-none">
              {app.tagline}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ApplicationsPage() {
  const [apps, setApps] = useState<DownloadableApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/apps?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { apps: [] }))
      .then((payload) => setApps(payload.apps ?? []))
      .catch(() => setApps([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="text-ink">
      <section className="flex flex-col items-center justify-center text-center px-6 pt-16 pb-12">
        <p className="eyebrow mb-4">Applications</p>
        <h1 className="font-black tracking-tight leading-[1.05] text-[2.6rem] sm:text-[3.8rem] md:text-[5rem] max-w-[820px] mb-5">
          Ready-Made Apps
        </h1>
        <p className="text-[1.0625rem] text-ink-muted max-w-[820px]">
          Explore our published applications and open any app to view details.
        </p>
      </section>

      <section className="px-6 pb-20" aria-label="Applications list">
        {loading && (
          <div className="flex justify-center py-20" aria-label="Loading applications">
            <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        )}

        {!loading && apps.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-muted">No applications available yet.</p>
          </div>
        )}

        {!loading && apps.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            role="list"
            aria-label="Applications"
          >
            {apps.map((app) => (
              <div key={app.slug ?? app.id} role="listitem">
                <AppCard app={app} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
