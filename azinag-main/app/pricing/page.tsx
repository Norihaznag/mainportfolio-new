'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { DynamicIcon } from '@/components/DynamicIcon';
import { TrustBar } from '@/components/TrustBar';
import { trackPricingCtaClick } from '@/lib/analytics';
import type { DownloadableApp } from '@/lib/apps-data';

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';

interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  is_featured?: boolean;
}

type Tab = 'applications' | 'projects';

const TABS: { id: Tab; label: string }[] = [
  { id: 'applications', label: 'SaaS & Apps' },
  { id: 'projects', label: 'Custom Projects' },
];

const DEFAULT_PADDLE_APPS: DownloadableApp[] = [
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
      'Restaurant operations software for managing point-of-sale workflows, orders, and daily restaurant activity from a Windows desktop app.',
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

const APP_COPY: Record<
  string,
  {
    description: string;
    deliverables: string[];
    support: string;
  }
> = {
  dovi: {
    description:
      'Invoice management software for small businesses that need to create, organize, and track invoices from a desktop workspace.',
    deliverables: [
      'Windows desktop application access',
      'Invoice creation and management workflows',
      'Customer and business record organization',
      'Software updates for active customers',
    ],
    support: 'Email and WhatsApp support for setup, activation, and product issues.',
  },
  'azinag-restuara': {
    description:
      'Restaurant operations software for managing point-of-sale workflows, orders, and daily restaurant activity from a Windows desktop app.',
    deliverables: [
      'Windows desktop application access',
      'Restaurant POS and order-management workflows',
      'Versioned downloadable installer',
      'Software updates for active customers',
    ],
    support: 'Email and WhatsApp support for setup, activation, and product issues.',
  },
};

function makeWhatsAppUrl(message: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

function formatMad(value?: number | null): string {
  if (!value) return 'Quote';
  return value.toLocaleString('en-US');
}

function getAppKey(app: DownloadableApp): string {
  return app.slug || app.name.toLowerCase().replace(/\s+/g, '-');
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

function ApplicationsTab({ appsData, loading }: { appsData: DownloadableApp[]; loading: boolean }) {
  const paidApps = useMemo(() => appsData.filter((app) => !!app.monthlyPrice), [appsData]);

  if (loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <div className="h-6 w-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[360px]">
      <div className="mb-8 rounded-lg border border-border-subtle bg-surface p-5">
        <p className="text-sm font-semibold text-ink">Paddle-facing software products</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          These SaaS/app products are the items intended for Paddle checkout. Custom development and setup projects are
          handled separately by written agreement.
        </p>
      </div>

      {paidApps.length === 0 ? (
        <div className="rounded-lg border border-border-subtle bg-surface p-8 text-center">
          <p className="text-sm text-ink-muted">No published paid applications are available yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {paidApps.map((app) => {
            const key = getAppKey(app);
            const copy = APP_COPY[key] || {
              description: app.description || app.tagline,
              deliverables: [
                app.tagline || 'Application access',
                'Product updates for active customers',
                'Setup and activation support',
                'Billing and subscription support',
              ],
              support: 'Email and WhatsApp support for setup, activation, and product issues.',
            };
            const platforms = getPlatformLabels(app);
            const subscribeUrl = makeWhatsAppUrl(
              `Hello, I would like to subscribe to ${app.name} and receive the Paddle checkout link.`
            );

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
                    <Link
                      href={`/applications/${app.slug}`}
                      className="shrink-0 text-xs font-semibold text-accent hover:underline"
                    >
                      Details
                    </Link>
                  )}
                </div>

                <p className="mb-5 text-sm leading-relaxed text-ink-muted">{copy.description}</p>

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
                  <p className="mb-3 text-sm font-semibold text-ink">Included deliverables</p>
                  <ul className="space-y-2" role="list">
                    {copy.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-ink-muted">{copy.support}</p>
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <a
                    href={subscribeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`pricing-saas-cta-${app.id}`}
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-[#D93621]"
                    onClick={() => trackPricingCtaClick(`app_${key}`)}
                  >
                    Request Paddle checkout
                  </a>
                  <p className="text-xs leading-relaxed text-ink-faint">
                    Purchases processed through Paddle are subject to Azinag&apos;s terms, privacy policy, and refund
                    policy.
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
  );
}

function ProjectsTab({ packages, loading }: { packages: PricingPackage[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <div className="h-6 w-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[360px]">
      <div className="mb-8 rounded-lg border border-border-subtle bg-surface p-5">
        <p className="text-sm font-semibold text-ink">Custom projects are inquiry-only</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          These examples are not Paddle checkout products. Each custom project requires a written proposal covering
          scope, deliverables, timeline, acceptance, and payment terms.
        </p>
      </div>

      {packages.length === 0 ? (
        <div className="rounded-lg border border-border-subtle bg-surface p-8 text-center">
          <p className="text-sm text-ink-muted">
            Custom project packages are configured in the admin panel.{' '}
            <Link href="/contact" className="font-semibold text-accent hover:underline">
              Contact us for a quote
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="flex flex-col rounded-lg border border-border-subtle bg-white p-6 transition-colors hover:border-ink/20"
            >
              {pkg.is_featured && (
                <span className="mb-4 self-start rounded-full bg-accent-light px-2 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  Common inquiry
                </span>
              )}
              <h2 className="text-xl font-bold">{pkg.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pkg.description}</p>
              <p className="mt-5 text-2xl font-bold tracking-tight">
                {pkg.price > 0 ? pkg.price.toLocaleString('en-US') : 'Quote'}{' '}
                <span className="text-sm font-medium text-ink-muted">MAD estimate</span>
              </p>

              {pkg.features?.length > 0 && (
                <ul className="mt-6 flex-1 space-y-2" role="list">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-ink-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href="/contact"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-lg border border-border-subtle bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-surface-raised"
                onClick={() => trackPricingCtaClick(`custom_${pkg.name.toLowerCase().replace(/\s+/g, '_')}`)}
              >
                Request written proposal
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-lg bg-ink p-6 text-canvas">
        <h3 className="text-lg font-bold">Need setup or customization for a SaaS product?</h3>
        <p className="mt-2 text-sm leading-relaxed opacity-70">
          Setup, migration, custom workflows, and integrations are quoted separately from the software subscription.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-[#D93621]"
        >
          Contact Azinag
        </Link>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [appsData, setAppsData] = useState<DownloadableApp[]>(DEFAULT_PADDLE_APPS);
  const [loadingApps, setLoadingApps] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('applications');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Tab;
    if (hash === 'applications' || hash === 'projects') {
      setActiveTab(hash);
    }
  }, []);

  useEffect(() => {
    fetch(`/api/public/pricing?t=${Date.now()}`)
      .then((response) => (response.ok ? response.json() : { pricing: [] }))
      .then((data) => setPackages(data.pricing || []))
      .catch(() => setPackages([]))
      .finally(() => setLoadingPackages(false));
  }, []);

  useEffect(() => {
    fetch(`/api/public/apps?t=${Date.now()}`)
      .then((response) => (response.ok ? response.json() : { apps: [] }))
      .then((data) => setAppsData(data.apps?.length ? data.apps : DEFAULT_PADDLE_APPS))
      .catch(() => setAppsData(DEFAULT_PADDLE_APPS))
      .finally(() => setLoadingApps(false));
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
  };

  return (
    <div className="text-ink">
      <section className="relative overflow-hidden px-6 pb-12 pt-28" aria-label="Pricing hero">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-5xl">
          <p className="eyebrow mb-4">Pricing</p>
          <h1 className="mb-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Software subscriptions and app licenses.
          </h1>
          <p className="max-w-2xl text-[1.0625rem] text-ink-muted">
            Azinag sells SaaS/app products through Paddle. Custom development remains inquiry-only and is handled by
            separate written agreement.
          </p>
        </div>
      </section>

      <div className="sticky top-[78px] z-40 border-b border-border-subtle bg-canvas/95 px-6 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl gap-0 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Pricing tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`pricing-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              className={`shrink-0 whitespace-nowrap border-b-2 px-5 py-4 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-ink-muted hover:border-border-subtle hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <section className="relative px-6 py-14 pb-24" aria-label="Pricing content">
        <div className="relative mx-auto max-w-5xl">
          <div
            id="tabpanel-applications"
            role="tabpanel"
            aria-labelledby="pricing-tab-applications"
            className={activeTab === 'applications' ? 'block' : 'hidden'}
          >
            <ApplicationsTab appsData={appsData} loading={loadingApps} />
          </div>
          <div
            id="tabpanel-projects"
            role="tabpanel"
            aria-labelledby="pricing-tab-projects"
            className={activeTab === 'projects' ? 'block' : 'hidden'}
          >
            <ProjectsTab packages={packages} loading={loadingPackages} />
          </div>

          <div className="mt-16 border-t border-border-subtle pt-8 text-sm leading-relaxed text-ink-muted">
            <p>
              Review the{' '}
              <Link href="/terms" className="font-semibold text-accent hover:underline">
                Terms of Service
              </Link>
              ,{' '}
              <Link href="/privacy" className="font-semibold text-accent hover:underline">
                Privacy Policy
              </Link>
              , and{' '}
              <Link href="/refund" className="font-semibold text-accent hover:underline">
                Refund Policy
              </Link>{' '}
              before purchase.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
