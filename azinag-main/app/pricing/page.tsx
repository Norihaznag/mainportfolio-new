'use client';

import { useEffect, useState } from 'react';
import { useContent } from '@/components/LanguageContext';
import { CTAButton } from '@/components/CTAButton';
import { trackPricingCtaClick } from '@/lib/analytics';
import { TrustBar } from '@/components/TrustBar';
import { CustomSolutionsCTA } from '@/components/CustomSolutionsCTA';
import { apps } from '@/lib/apps-data';
import Link from 'next/link';

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';

function makeWhatsAppUrl(appName: string): string {
  const msg = encodeURIComponent(
    `Bonjour, je souhaite m'abonner à ${appName}. Pouvez-vous me contacter ?`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
}

interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  is_featured?: boolean;
}

type Tab = 'solutions' | 'applications' | 'forfaits';

const TABS: { id: Tab; label: string }[] = [
  { id: 'solutions', label: 'Solutions personnalisées' },
  { id: 'applications', label: 'Applications SaaS' },
  { id: 'forfaits', label: 'Forfaits sur mesure' },
];

// ─── Tab 1: Custom solutions ───────────────────────────────────
function SolutionsTab({ packages, loading, c }: { packages: PricingPackage[]; loading: boolean; c: ReturnType<typeof useContent> }) {
  return (
    <div style={{ minHeight: 400 }}>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      ) : packages.length === 0 ? (
        <div className="border border-border-subtle rounded-2xl p-10 text-center bg-surface max-w-lg mx-auto">
          <p className="text-ink-muted text-sm">{c.pricing.fallback}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col border rounded-2xl p-8 bg-white transition-all duration-300 hover:shadow-card ${
                pkg.is_featured
                  ? 'border-accent ring-1 ring-accent'
                  : 'border-border-subtle'
              }`}
            >
              {pkg.is_featured && (
                <span className="self-start text-xs font-semibold tracking-widest uppercase text-accent bg-accent-light px-2 py-1 rounded-full mb-4">
                  Le plus populaire
                </span>
              )}
              <h2 className="text-xl font-bold mb-1">{pkg.name}</h2>
              <p className="text-sm text-ink-muted mb-4 leading-relaxed">{pkg.description}</p>

              {pkg.price > 0 ? (
                <p className="text-3xl font-bold tracking-tight mb-6">
                  {pkg.price.toLocaleString('fr-MA')} DH
                  <span className="text-base font-normal text-ink-muted"> fixe</span>
                </p>
              ) : (
                <p className="text-xl font-bold mb-6 text-ink-muted">Sur devis</p>
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
                label={pkg.price > 0 ? c.pricing.bookCta : c.pricing.contactCta}
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
        Vous ne savez pas quelle formule choisir ?{' '}
        <Link href="/contact" className="text-accent hover:underline font-medium" onClick={() => trackPricingCtaClick('pricing_advice')}>
          On vous conseille →
        </Link>
      </p>
    </div>
  );
}

// ─── Tab 2: SaaS apps ─────────────────────────────────────────
function ApplicationsTab() {
  const [annual, setAnnual] = useState(false);

  return (
    <div style={{ minHeight: 400 }}>
      {/* Billing toggle */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <p className="text-ink-muted text-sm">
          Passez en annuel et économisez <strong className="text-emerald-600">20%</strong>.
        </p>
        <div
          className="inline-flex items-center gap-1 bg-surface-raised border border-border-subtle rounded-full p-1"
          role="group"
          aria-label="Période de facturation"
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
            Mensuel
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
            Annuel
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 rounded-full px-2 py-0.5">
              −20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {apps.map((app) => {
          const price = annual ? app.annualPrice : app.monthlyPrice;
          const savings = annual
            ? Math.round((app.monthlyPrice - app.annualPrice) * 12)
            : 0;
          const whatsappUrl = makeWhatsAppUrl(app.name);

          const starterFeatures = app.tiers[0]?.features ?? [];

          return (
            <div
              key={app.slug}
              className="flex flex-col border border-border-subtle rounded-2xl p-6 bg-white hover:shadow-card hover:border-accent/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-xl shrink-0"
                    aria-hidden="true"
                  >
                    {app.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{app.name}</h3>
                    {app.badge && (
                      <span
                        className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                          app.badge === 'Populaire'
                            ? 'bg-accent text-white'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {app.badge}
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/applications/${app.slug}`}
                  className="text-xs font-medium text-accent hover:underline shrink-0"
                >
                  Détails →
                </Link>
              </div>

              <p className="text-sm text-ink-muted mb-4 leading-relaxed">{app.tagline}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-ink">{price.toLocaleString('fr-MA')}</span>
                <span className="text-ink-muted">DH/mois</span>
              </div>
              {annual && savings > 0 ? (
                <p className="text-xs text-emerald-600 font-medium mb-5">
                  → Économisez {savings.toLocaleString('fr-MA')} DH/an
                </p>
              ) : (
                <p className="h-5 mb-5" aria-hidden="true" />
              )}

              {/* Features */}
              <ul className="space-y-1.5 mb-6 flex-1" role="list">
                {starterFeatures.slice(0, 4).map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-ink-muted">
                    <span className="w-3.5 h-3.5 rounded-full bg-accent-light text-accent text-[9px] flex items-center justify-center shrink-0 font-bold" aria-hidden="true">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`pricing-saas-cta-${app.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold rounded-lg px-5 py-3 text-sm hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contacter pour abonnement
              </a>
            </div>
          );
        })}
      </div>

      {/* Trust line */}
      <div className="mt-10 border-t border-border-subtle pt-6">
        <TrustBar className="justify-center" />
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/applications"
          className="text-sm font-medium text-accent hover:underline"
        >
          Voir le catalogue complet des applications →
        </Link>
      </div>
    </div>
  );
}

// ─── Tab 3: Forfaits sur mesure ────────────────────────────────
function ForfaitsTab() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    'Bonjour, je souhaite discuter d\'un forfait sur mesure combinant SaaS et développement personnalisé.'
  )}`;

  const bundleOptions = [
    {
      icon: '🧩',
      title: 'SaaS + Personnalisation',
      desc: 'Prenez une de nos applications SaaS et demandez des ajouts spécifiques adaptés à vos processus.',
    },
    {
      icon: '🏗️',
      title: 'Solution intégrée complète',
      desc: 'Application custom développée sur mesure, intégrant vos systèmes existants (ERP, CRM, comptabilité).',
    },
    {
      icon: '🔄',
      title: 'Migration et modernisation',
      desc: 'Modernisez vos outils existants. Nous reprenons votre base et la transformons en solution cloud.',
    },
    {
      icon: '🌐',
      title: 'Déploiement multi-sites',
      desc: 'Une application déployée pour plusieurs filiales ou franchises, avec gestion centralisée.',
    },
  ];

  return (
    <div style={{ minHeight: 400 }}>
      <div className="max-w-3xl">
        <p className="text-ink-muted text-[1.0625rem] leading-relaxed mb-10">
          Vous avez un besoin qui dépasse les solutions standard ? Nous combinons nos outils SaaS avec du développement 
          sur mesure pour créer des solutions hybrides parfaitement adaptées à votre activité.
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {bundleOptions.map((opt) => (
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
          <h3 className="text-xl font-bold mb-3">Parlons de votre projet</h3>
          <p className="text-ink-muted mb-6 text-sm leading-relaxed">
            Contactez notre équipe pour une analyse gratuite de vos besoins. Nous vous proposerons 
            une offre combinée adaptée à votre budget et vos délais.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="forfaits-whatsapp-cta"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-6 py-3 text-[0.9375rem] hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Discuter de mon projet
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white border border-border-subtle text-ink font-semibold rounded-lg px-6 py-3 text-[0.9375rem] hover:bg-surface-raised transition-colors"
            >
              Formulaire de contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────
export default function Pricing() {
  const c = useContent();
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('solutions');

  useEffect(() => {
    // Set initial tab from URL hash
    const hash = window.location.hash.replace('#', '') as Tab;
    if (['solutions', 'applications', 'forfaits'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  useEffect(() => {
    fetch(`/api/public/pricing?t=${Date.now()}`)
      .then((r) => r.ok ? r.json() : { pricing: [] })
      .then((data) => setPackages(data.pricing || []))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
  };

  return (
    <div className="text-ink">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-12 px-6" aria-label="Pricing hero">
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-4">{c.pricing.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {c.pricing.title}
          </h1>
          <p className="text-[1.0625rem] text-ink-muted max-w-xl">{c.pricing.subtitle}</p>
        </div>
      </section>

      {/* ─── Tab bar ──────────────────────────────────────────── */}
      <div className="border-b border-border-subtle px-6 sticky top-[60px] z-40 bg-canvas/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex gap-0 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`pricing-tab-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              className={`shrink-0 px-5 py-4 text-sm font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-ink-muted hover:text-ink hover:border-border-subtle'
              }`}
              aria-selected={activeTab === tab.id}
              role="tab"
              aria-controls={`tabpanel-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Tab panels ───────────────────────────────────────── */}
      <section className="relative px-6 py-14 pb-24" aria-label="Contenu des formules">
        <div className="relative max-w-5xl mx-auto">
          <div
            id="tabpanel-solutions"
            role="tabpanel"
            aria-labelledby="pricing-tab-solutions"
            className={activeTab === 'solutions' ? 'block' : 'hidden'}
          >
            <SolutionsTab packages={packages} loading={loading} c={c} />
          </div>

          <div
            id="tabpanel-applications"
            role="tabpanel"
            aria-labelledby="pricing-tab-applications"
            className={activeTab === 'applications' ? 'block' : 'hidden'}
          >
            <ApplicationsTab />
          </div>

          <div
            id="tabpanel-forfaits"
            role="tabpanel"
            aria-labelledby="pricing-tab-forfaits"
            className={activeTab === 'forfaits' ? 'block' : 'hidden'}
          >
            <ForfaitsTab />
          </div>

          {/* Custom solutions CTA at the bottom of all tabs */}
          <div className="mt-16 pt-12 border-t border-border-subtle">
            <CustomSolutionsCTA variant="compact" />
          </div>
        </div>
      </section>
    </div>
  );
}
