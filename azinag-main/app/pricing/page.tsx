'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { DynamicIcon } from '@/components/DynamicIcon';
import { TrustBar } from '@/components/TrustBar';
import type { DownloadableApp } from '@/lib/apps-data';

const DEFAULT_APPS: DownloadableApp[] = [
  {
    id: 'dovi-default',
    slug: 'dovi',
    name: 'Dovi',
    tagline: 'Invoice management for small businesses.',
    description:
      'Invoice management software for small businesses that need to create, organize, and track invoices from a desktop workspace.',
    icon: 'LayoutGrid',
    category: 'pme',
    sector: 'pme',
    monthlyPrice: 90,
    annualPrice: 800,
    platforms: {
      windows: { url: '/applications/dovi', version: '1.0.0' },
    },
    latestVersion: '1.0.0',
    releaseDate: '2026-04-17T00:00:00.000Z',
    features: [],
    industryUse: [],
    tiers: [
      {
        name: 'Starter',
        monthlyPrice: 90,
        annualPrice: 800,
        features: ['Invoice creation', 'Customer records', 'Windows desktop access', 'Product updates'],
      },
    ],
    saasFeatures: [],
    screenshots: [],
    faq: [],
    published: true,
  },
  {
    id: 'azinag-restuara-default',
    slug: 'azinag-restuara',
    name: 'Azinag Restuara',
    tagline: 'Restaurant POS and order-management software.',
    description:
      'Restaurant operations software for managing point-of-sale workflows, orders, and daily activity from a Windows desktop app.',
    icon: 'LayoutGrid',
    category: 'gestion',
    sector: 'gestion',
    monthlyPrice: 90,
    annualPrice: 900,
    platforms: {
      windows: { url: '/applications/azinag-restuara', version: '2.3.0' },
    },
    latestVersion: '2.3.0',
    releaseDate: '2026-04-28T00:00:00.000Z',
    features: [],
    industryUse: [],
    tiers: [
      {
        name: 'Starter',
        monthlyPrice: 90,
        annualPrice: 900,
        features: ['POS workflows', 'Order management', 'Windows desktop access', 'Product updates'],
      },
    ],
    saasFeatures: [],
    screenshots: [],
    faq: [],
    published: true,
  },
];

function formatMad(value?: number | null): string {
  if (!value) return 'N/A';
  return value.toLocaleString('en-US');
}

function getPlatformLabels(app: DownloadableApp): string[] {
  const platforms = app.platforms || {};
  const labels: string[] = [];
  if (platforms.windows) labels.push('Windows');
  if (platforms.macos) labels.push('macOS');
  if (platforms.linux) labels.push('Linux');
  if (platforms.web || app.liveDemoUrl) labels.push('Web');
  if (platforms.ios) labels.push('iOS');
  if (platforms.android) labels.push('Android');
  return labels.length > 0 ? labels : ['Software access'];
}

function getIncludedFeatures(app: DownloadableApp): string[] {
  const tierFeatures = app.tiers?.[0]?.features ?? [];
  if (tierFeatures.length > 0) return tierFeatures;
  return [
    app.tagline || 'Application access',
    'Product updates for active customers',
    'Setup and activation support',
    'Billing and subscription support',
  ];
}

export default function PricingPage() {
  const [appsData, setAppsData] = useState<DownloadableApp[]>(DEFAULT_APPS);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
    fetch(`/api/public/apps?t=${Date.now()}`)
      .then((response) => (response.ok ? response.json() : { apps: [] }))
      .then((data) => setAppsData(data.apps?.length ? data.apps : DEFAULT_APPS))
      .catch(() => setAppsData(DEFAULT_APPS))
      .finally(() => setLoadingApps(false));
  }, []);

  const paidApps = useMemo(() => appsData.filter((app) => !!app.monthlyPrice || !!app.annualPrice), [appsData]);

  return (
    <div className="text-ink">
      <section className="relative overflow-hidden px-6 pb-12 pt-28" aria-label="Pricing hero">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-5xl">
          <p className="eyebrow mb-4">Pricing</p>
          <h1 className="mb-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            SaaS subscriptions and app licenses.
          </h1>
          <p className="max-w-2xl text-[1.0625rem] text-ink-muted">
            Pricing on this page is for Azinag software products only. Service packages are not sold here.
          </p>
          <p className="mt-4 rounded-lg border border-border-subtle bg-surface px-4 py-3 text-sm text-ink">
            Checkout is available online for Azinag software products and subscriptions.
          </p>
        </div>
      </section>

      <section className="relative px-6 py-14 pb-24" aria-label="Pricing products">
        <div className="relative mx-auto max-w-5xl">
          {loadingApps ? (
            <div className="flex min-h-[360px] items-center justify-center">
              <div className="h-6 w-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
          ) : paidApps.length === 0 ? (
            <div className="rounded-lg border border-border-subtle bg-surface p-8 text-center">
              <p className="text-sm text-ink-muted">No paid applications are available yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {paidApps.map((app) => {
                const platforms = getPlatformLabels(app);
                const features = getIncludedFeatures(app);
                return (
                  <article
                    key={app.id}
                    className="flex flex-col rounded-lg border border-border-subtle bg-white p-6 transition-colors hover:border-accent/40"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent"
                          aria-hidden="true"
                        >
                          <DynamicIcon name={app.icon} className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold tracking-tight">{app.name}</h2>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                            {platforms.join(' + ')}
                          </p>
                        </div>
                      </div>
                      {app.slug && (
                        <Link href={`/applications/${app.slug}`} className="shrink-0 text-xs font-semibold text-accent hover:underline">
                          Details
                        </Link>
                      )}
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-ink-muted">{app.description || app.tagline}</p>

                    <div className="mb-5 grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-border-subtle bg-surface p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Monthly</p>
                        <p className="mt-1 text-2xl font-bold text-ink">
                          {formatMad(app.monthlyPrice)} <span className="text-sm font-medium text-ink-muted">MAD/mo</span>
                        </p>
                      </div>
                      <div className="rounded-lg border border-border-subtle bg-surface p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Annual</p>
                        <p className="mt-1 text-2xl font-bold text-ink">
                          {formatMad(app.annualPrice)} <span className="text-sm font-medium text-ink-muted">MAD/yr</span>
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="mb-3 text-sm font-semibold text-ink">Included features</p>
                      <ul className="space-y-2" role="list">
                        {features.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm text-ink-muted">
                        Support: email help for product usage, billing questions, subscription changes, and access issues.
                      </p>
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                      <Link
                        href={`/contact?product=${encodeURIComponent(app.name)}&request=pre-purchase`}
                        className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-[#D93621]"
                      >
                        Contact sales for availability
                      </Link>
                      <p className="text-xs leading-relaxed text-ink-faint">
                        Review the{' '}
                        <Link href="/terms" className="font-semibold text-accent hover:underline">
                          Terms
                        </Link>
                        ,{' '}
                        <Link href="/privacy" className="font-semibold text-accent hover:underline">
                          Privacy Policy
                        </Link>
                        , and{' '}
                        <Link href="/refund" className="font-semibold text-accent hover:underline">
                          Refund Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-10 border-t border-border-subtle pt-6">
            <TrustBar className="justify-center" />
          </div>
        </div>
      </section>
    </div>
  );
}
