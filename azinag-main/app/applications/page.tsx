'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { DynamicIcon } from '@/components/DynamicIcon';
import type { DownloadableApp } from '@/lib/apps-data';

// ── helpers ──────────────────────────────────────────────────────

function getAppType(app: DownloadableApp): 'web' | 'desktop' | 'both' {
  const hasWeb = !!(app.platforms?.web?.liveUrl || app.liveDemoUrl);
  const hasDesktop = !!(app.platforms?.windows || app.platforms?.macos || app.platforms?.linux);
  if (hasWeb && hasDesktop) return 'both';
  if (hasWeb) return 'web';
  return 'desktop';
}

function getAppSize(app: DownloadableApp): string | null {
  return (
    app.platforms?.windows?.size ||
    app.platforms?.macos?.size ||
    app.platforms?.linux?.size ||
    null
  );
}

// ── AppCard ───────────────────────────────────────────────────────

function AppCard({ app }: { app: DownloadableApp }) {
  const href = app.slug ? `/applications/${app.slug}` : '/applications';
  const type = getAppType(app);
  const size = getAppSize(app);
  const screenshot = app.screenshots?.[0];
  const typeLabel =
    type === 'both' ? 'Web + Desktop' : type === 'web' ? 'Web' : 'Desktop';

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border  bg-white hover:border-ink/20 transition-colors overflow-hidden"
      aria-label={app.name}
    >
      <div
        className="relative bg-canvas border-b border-border-subtle"
        style={{ aspectRatio: '16/9' }}
      >
        {screenshot?.url ? (
          <Image
            src={screenshot.url}
            alt={screenshot.alt ?? app.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <DynamicIcon name={app.icon} className="w-8 h-8 text-ink-muted/20" />
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold text-ink truncate">{app.name}</p>
        {app.tagline && (
          <p className="text-xs text-ink-muted truncate mt-0.5">{app.tagline}</p>
        )}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">
            {typeLabel}
          </span>
          {size && (
            <span className="text-[10px] text-ink-faint">· {size}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── AppListItem — compact row for "Top Charts" ────────────────────

function AppListItem({ app, rank }: { app: DownloadableApp; rank: number }) {
  const href = app.slug ? `/applications/${app.slug}` : '/applications';
  const type = getAppType(app);

  return (
    <Link
      href={href}
      className="flex items-center gap-3 py-3 border-b border-border-subtle/60 last:border-0 hover:opacity-70 transition-opacity"
    >
      <span className="w-4 text-xs text-ink-faint shrink-0 text-right tabular-nums">{rank}</span>
      <div className="w-9 h-9 shrink-0 rounded-lg bg-canvas border border-border-subtle flex items-center justify-center text-accent">
        <DynamicIcon name={app.icon} className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink truncate">{app.name}</p>
        {app.tagline && (
          <p className="text-xs text-ink-muted truncate">{app.tagline}</p>
        )}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint shrink-0">
        {type === 'web' ? 'Web' : type === 'both' ? 'Web+' : 'Desktop'}
      </span>
    </Link>
  );
}

// ── Section wrapper ───────────────────────────────────────────────

function Section({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-bold text-[1.05rem] text-ink">{title}</h2>
        {href && (
          <Link
            href={href}
            className="text-xs font-medium text-ink-muted hover:text-ink transition-colors"
          >
            See more →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

// ── Category chips data ────────────────────────────────────────────

const CATEGORIES = [
  { value: 'all',        label: 'All' },
  { value: 'web',        label: 'Web Apps' },
  { value: 'desktop',    label: 'Desktop' },
  { value: 'pme',        label: 'SME & Commerce' },
  { value: 'gestion',    label: 'Management' },
  { value: 'logistique', label: 'Logistics' },
  { value: 'services',   label: 'Services' },
];

// ── Page ──────────────────────────────────────────────────────────

export default function ApplicationsPage() {
  const searchParams = useSearchParams();
  const [apps, setApps]       = useState<DownloadableApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState<string>(searchParams.get('type') ?? 'all');

  useEffect(() => {
    fetch(`/api/public/apps?t=${Date.now()}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { apps: [] }))
      .then((p) => setApps(p.apps ?? []))
      .catch(() => setApps([]))
      .finally(() => setLoading(false));
  }, []);

  function matchFilter(app: DownloadableApp): boolean {
    if (filter === 'all') return true;
    const t = getAppType(app);
    if (filter === 'web')     return t === 'web' || t === 'both';
    if (filter === 'desktop') return t === 'desktop' || t === 'both';
    return app.sector === filter || app.category === filter;
  }

  const filtered    = apps.filter(matchFilter);
  const webApps     = apps.filter((a) => { const t = getAppType(a); return t === 'web' || t === 'both'; });
  const desktopApps = apps.filter((a) => { const t = getAppType(a); return t === 'desktop' || t === 'both'; });
  const popularApps = apps.filter((a) => a.badge === 'Popular');
  const newApps     = apps.filter((a) => a.badge === 'New');
  const showCharts  = popularApps.length > 0 || newApps.length > 0;
  const isDefault   = filter === 'all';

  return (
    <main className="text-ink">

      {/* Hero */}
      <div className="text-center px-6 pt-14 pb-10">
        <p className="eyebrow mb-4">Applications</p>
        <h1 className="font-black tracking-tight leading-[1.05] text-[2.6rem] sm:text-[3.8rem] md:text-[4.5rem] max-w-[780px] mx-auto mb-4">
          Ready-Made Apps
        </h1>
        <p className="text-[1.0625rem] text-ink-muted max-w-[460px] mx-auto">
          Desktop and web applications built for modern businesses.
        </p>
      </div>

      <div className="px-6 pb-24 max-w-5xl mx-auto">

        {/* Category filters */}
        <div className="flex gap-6 flex-wrap mb-10">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`text-sm font-medium transition-colors ${
                filter === value
                  ? 'text-ink'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        )}

        {/* Filtered view */}
        {!loading && !isDefault && (
          filtered.length === 0
            ? <p className="text-center text-ink-muted text-sm py-24">No apps in this category yet.</p>
            : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filtered.map((app) => (
                  <AppCard key={app.slug ?? app.id} app={app} />
                ))}
              </div>
            )
        )}

        {/* Default "All" view — sectioned like Chrome Web Store */}
        {!loading && isDefault && apps.length > 0 && (
          <>
            {/* Top Charts */}
            {showCharts && (
              <Section title="Top Charts">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {popularApps.length > 0 && (
                    <div className="rounded-xl border border-border-subtle bg-surface px-5 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-ink-faint mb-2">
                        Popular
                      </p>
                      {popularApps.slice(0, 5).map((app, i) => (
                        <AppListItem key={app.slug ?? app.id} app={app} rank={i + 1} />
                      ))}
                    </div>
                  )}
                  {newApps.length > 0 && (
                    <div className="rounded-xl border border-border-subtle bg-surface px-5 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-ink-faint mb-2">
                        New &amp; Notable
                      </p>
                      {newApps.slice(0, 5).map((app, i) => (
                        <AppListItem key={app.slug ?? app.id} app={app} rank={i + 1} />
                      ))}
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Web Apps */}
            {webApps.length > 0 && (
              <Section
                title="Web Apps"
                href={webApps.length > 4 ? '/applications?type=web' : undefined}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {webApps.slice(0, 4).map((app) => (
                    <AppCard key={app.slug ?? app.id} app={app} />
                  ))}
                </div>
              </Section>
            )}

            {/* Desktop Apps */}
            {desktopApps.length > 0 && (
              <Section
                title="Desktop Apps"
                href={desktopApps.length > 4 ? '/applications?type=desktop' : undefined}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {desktopApps.slice(0, 4).map((app) => (
                    <AppCard key={app.slug ?? app.id} app={app} />
                  ))}
                </div>
              </Section>
            )}

            {/* All Apps */}
            <Section title="All Apps">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {apps.map((app) => (
                  <AppCard key={app.slug ?? app.id} app={app} />
                ))}
              </div>
            </Section>

            {/* CTA Banner */}
            <div className="rounded-2xl bg-ink text-canvas px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-black text-xl mb-1">Need something custom?</p>
                <p className="text-sm opacity-60">We build tailored solutions for your business.</p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 h-11 px-8 bg-accent text-white text-sm font-semibold rounded-lg flex items-center hover:bg-[#D93621] transition-colors"
              >
                Contact us →
              </Link>
            </div>
          </>
        )}

        {/* Empty */}
        {!loading && apps.length === 0 && (
          <p className="text-center text-ink-muted text-sm py-24">
            No applications available yet.
          </p>
        )}

      </div>
    </main>
  );
}
