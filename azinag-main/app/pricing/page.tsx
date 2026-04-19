'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';
import { trackPricingCtaClick } from '@/lib/analytics';
import { TrustBar } from '@/components/TrustBar';
import { CustomSolutionsCTA } from '@/components/CustomSolutionsCTA';
import { DynamicIcon } from '@/components/DynamicIcon';
import type { DownloadableApp } from '@/lib/apps-data';

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';

function makeWhatsAppUrl(appName: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(
    `Hello, I would like to subscribe to ${appName}.`
  )}`;
}

interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  is_featured?: boolean;
}

type Tab = 'solutions' | 'applications' | 'bundles';

const TABS: { id: Tab; label: string }[] = [
  { id: 'solutions', label: 'Custom Solutions' },
  { id: 'applications', label: 'SaaS Applications' },
  { id: 'bundles', label: 'Custom Bundles' },
];

// ─── Tab 1: Custom Solutions ───────────────────────────────────
function SolutionsTab({ packages, loading }: { packages: PricingPackage[]; loading: boolean }) {
  return (
    <div style={{ minHeight: 400 }}>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      ) : packages.length === 0 ? (
        <div className="border border-border-subtle rounded-2xl p-10 text-center bg-surface max-w-lg mx-auto">
          <p className="text-ink-muted text-sm">
            Pricing packages are configured in the admin panel.{' '}
            <Link
              href="/contact"
              className="text-accent hover:underline font-medium"
              onClick={() => trackPricingCtaClick('no_packages_contact')}
            >
              Contact us for a quote →
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col border rounded-2xl p-8 bg-white transition-all duration-300 hover:shadow-card ${
                pkg.is_featured ? 'border-accent ring-1 ring-accent' : 'border-border-subtle'
              }`}
            >
              {pkg.is_featured && (
                <span className="self-start text-xs font-semibold tracking-widest uppercase text-accent bg-accent-light px-2 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-bold mb-1">{pkg.name}</h2>
              <p className="text-sm text-ink-muted mb-4 leading-relaxed">{pkg.description}</p>

              {pkg.price > 0 ? (
                <p className="text-3xl font-bold tracking-tight mb-6">
                  {pkg.price.toLocaleString('en-US')}{' '}
                  <span className="text-base font-normal text-ink-muted">MAD fixed</span>
                </p>
              ) : (
                <p className="text-xl font-bold mb-6 text-ink-muted">Quote on request</p>
              )}

              {pkg.features && pkg.features.length > 0 && (
                <ul className="space-y-2.5 mb-8 flex-1" role="list">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-ink-muted">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
              )}

              <CTAButton
                label={pkg.price > 0 ? 'Book a Free Call' : 'Contact Us'}
                trackEvent="pricing_cta"
                trackSource={`pricing_${pkg.name.toLowerCase().replace(/\s+/g, '_')}`}
                variant={pkg.is_featured ? 'primary' : 'ghost'}
                size="md"
                className="w-full"
                fallbackHref="/contact"
              />
            </div>
          ))}
        </div>
      )}

      <p className="mt-12 text-center text-sm text-ink-muted">
        Not sure which package fits?{' '}
        <Link
          href="/contact"
          className="text-accent hover:underline font-medium"
          onClick={() => trackPricingCtaClick('pricing_advice')}
        >
          We will advise you for free →
        </Link>
      </p>
    </div>
  );
}

// ─── Tab 2: SaaS Applications ─────────────────────────────────
function ApplicationsTab({ appsData, loading }: { appsData: DownloadableApp[]; loading: boolean }) {
  const [annual, setAnnual] = useState(false);
  const paidApps = appsData.filter((app) => !!app.monthlyPrice);

  if (loading) {
    return (
      <div style={{ minHeight: 400 }} className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: 400 }}>
      {/* Billing toggle */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <p className="text-ink-muted text-sm">
          Switch to annual and save <strong className="text-emerald-600">20%</strong>.
        </p>
        <div
          className="inline-flex items-center gap-1 bg-surface-raised border border-border-subtle rounded-full p-1"
          role="group"
          aria-label="Billing period"
        >
          <button
            type="button"
            id="saas-billing-monthly"
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              !annual ? 'bg-white shadow-card text-ink' : 'text-ink-muted hover:text-ink'
            }`}
            aria-pressed={!annual}
          >
            Monthly
          </button>
          <button
            type="button"
            id="saas-billing-annual"
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              annual ? 'bg-white shadow-card text-ink' : 'text-ink-muted hover:text-ink'
            }`}
            aria-pressed={annual}
          >
            Annual
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 rounded-full px-2 py-0.5">
              −20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {paidApps.length === 0 ? (
          <div className="md:col-span-2 border border-border-subtle rounded-2xl p-8 bg-surface text-center">
            <p className="text-sm text-ink-muted">No published SaaS applications yet.</p>
          </div>
        ) : paidApps.map((app) => {
          const price = annual ? (app.annualPrice ?? app.monthlyPrice!) : app.monthlyPrice!;
          const savings = annual && app.annualPrice
            ? Math.round((app.monthlyPrice! - app.annualPrice) * 12)
            : 0;
          const waUrl = makeWhatsAppUrl(app.name);
          const starterFeatures = app.tiers?.[0]?.features ?? [];

          return (
            <div
              key={app.id}
              className="flex flex-col border border-border-subtle rounded-2xl p-6 bg-white hover:shadow-card hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-xl shrink-0" aria-hidden="true">
                    <DynamicIcon name={app.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold">{app.name}</h3>
                    {app.badge && (
                      <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                        app.badge === 'Popular' ? 'bg-accent text-white' : 'bg-emerald-100 text-emerald-700'
                      }`}>{app.badge}</span>
                    )}
                  </div>
                </div>
                {app.slug && (
                  <Link href={`/applications/${app.slug}`} className="text-xs font-medium text-accent hover:underline shrink-0">
                    Details →
                  </Link>
                )}
              </div>

              <p className="text-sm text-ink-muted mb-4 leading-relaxed">{app.tagline}</p>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-ink">{price.toLocaleString('en-US')}</span>
                <span className="text-ink-muted">MAD/mo</span>
              </div>
              {annual && savings > 0 ? (
                <p className="text-xs text-emerald-600 font-medium mb-5">
                  → Save {savings.toLocaleString('en-US')} MAD/year
                </p>
              ) : (
                <p className="h-5 mb-5" aria-hidden="true" />
              )}

              <ul className="space-y-1.5 mb-6 flex-1" role="list">
                {starterFeatures.slice(0, 4).map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-ink-muted">
                    <span className="w-3.5 h-3.5 rounded-full bg-accent-light text-accent text-[9px] flex items-center justify-center shrink-0 font-bold" aria-hidden="true">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`pricing-saas-cta-${app.id}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold rounded-lg px-5 py-3 text-sm hover:bg-accent/90 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Subscribe via WhatsApp
              </a>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border-t border-border-subtle pt-6">
        <TrustBar className="justify-center" />
      </div>

      <div className="mt-8 text-center">
        <Link href="/applications" className="text-sm font-medium text-accent hover:underline">
          View full application catalog →
        </Link>
      </div>
    </div>
  );
}

// ─── Tab 3: Custom Bundles ─────────────────────────────────────
function BundlesTab() {
  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    "Hello, I would like to discuss a custom bundle combining SaaS and bespoke development."
  )}`;

  const options = [
    { icon: '🧩', title: 'SaaS + Customization', desc: 'Take one of our ready-made apps and request specific additions tailored to your workflows.' },
    { icon: '🏗️', title: 'Full Custom Solution', desc: 'A bespoke application built from the ground up, integrated with your existing systems (ERP, CRM, accounting).' },
    { icon: '🔄', title: 'Migration & Modernization', desc: 'Modernize your existing tools. We take your current system and rebuild it as a performant, maintainable product.' },
    { icon: '🌐', title: 'Multi-site Deployment', desc: 'One application deployed across multiple branches or franchises with centralized management.' },
  ];

  return (
    <div style={{ minHeight: 400 }}>
      <div className="max-w-3xl">
        <p className="text-ink-muted text-[1.0625rem] leading-relaxed mb-10">
          Need something beyond standard products? We combine our SaaS tools with bespoke development to
          create hybrid solutions perfectly adapted to your operations.
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {options.map((opt) => (
            <div
              key={opt.title}
              className="border border-border-subtle rounded-2xl p-6 bg-white hover:shadow-card hover:border-accent/30 transition-all duration-200"
            >
              <span className="text-3xl mb-3 block" aria-hidden="true">{opt.icon}</span>
              <h3 className="font-bold mb-2">{opt.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{opt.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border-subtle rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-3">Let&apos;s talk about your project</h3>
          <p className="text-ink-muted mb-6 text-sm leading-relaxed">
            Contact our team for a free analysis of your needs. We will propose a combined offer
            adapted to your budget and timeline.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="bundles-whatsapp-cta"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-6 py-3 text-[0.9375rem] hover:bg-accent/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Discuss My Project
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white border border-border-subtle text-ink font-semibold rounded-lg px-6 py-3 text-[0.9375rem] hover:bg-surface-raised transition-colors"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Pricing Page ─────────────────────────────────────────
export default function PricingPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [appsData, setAppsData] = useState<DownloadableApp[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('solutions');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Tab;
    if (['solutions', 'applications', 'bundles'].includes(hash)) setActiveTab(hash);
  }, []);

  useEffect(() => {
    fetch(`/api/public/pricing?t=${Date.now()}`)
      .then((r) => (r.ok ? r.json() : { pricing: [] }))
      .then((data) => setPackages(data.pricing || []))
      .catch(() => setPackages([]))
      .finally(() => setLoadingPackages(false));
  }, []);

  useEffect(() => {
    fetch(`/api/public/apps?t=${Date.now()}`)
      .then((r) => (r.ok ? r.json() : { apps: [] }))
      .then((data) => setAppsData(data.apps || []))
      .catch(() => setAppsData([]))
      .finally(() => setLoadingApps(false));
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
  };

  return (
    <div className="text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 px-6" aria-label="Pricing hero">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-4">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Transparent pricing. No surprises.
          </h1>
          <p className="text-[1.0625rem] text-ink-muted max-w-xl">
            Custom projects are quoted by scope in MAD. SaaS applications have fixed monthly pricing.
          </p>
        </div>
      </section>

      {/* Tab bar */}
      <div className="border-b border-border-subtle px-6 sticky top-[60px] z-40 bg-canvas/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex gap-0 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Pricing tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`pricing-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              className={`shrink-0 px-5 py-4 text-sm font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-ink-muted hover:text-ink hover:border-border-subtle'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab panels */}
      <section className="relative px-6 py-14 pb-24" aria-label="Pricing content">
        <div className="relative max-w-5xl mx-auto">
          <div id="tabpanel-solutions" role="tabpanel" aria-labelledby="pricing-tab-solutions" className={activeTab === 'solutions' ? 'block' : 'hidden'}>
            <SolutionsTab packages={packages} loading={loadingPackages} />
          </div>
          <div id="tabpanel-applications" role="tabpanel" aria-labelledby="pricing-tab-applications" className={activeTab === 'applications' ? 'block' : 'hidden'}>
            <ApplicationsTab appsData={appsData} loading={loadingApps} />
          </div>
          <div id="tabpanel-bundles" role="tabpanel" aria-labelledby="pricing-tab-bundles" className={activeTab === 'bundles' ? 'block' : 'hidden'}>
            <BundlesTab />
          </div>

          <div className="mt-16 pt-12 border-t border-border-subtle">
            <CustomSolutionsCTA variant="compact" />
          </div>
        </div>
      </section>
    </div>
  );
}
