'use client';

import { useEffect, useState } from 'react';
import { useContent } from '@/components/LanguageContext';
import { CTAButton } from '@/components/CTAButton';
import { trackPricingCtaClick } from '@/lib/analytics';
import Link from 'next/link';

interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  is_featured?: boolean;
}

export default function Pricing() {
  const c = useContent();
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/pricing?t=${Date.now()}`)
      .then((r) => r.ok ? r.json() : { pricing: [] })
      .then((data) => setPackages(data.pricing || []))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="text-ink">
      {/* Header */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6" aria-label="Pricing hero">
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-4">{c.pricing.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {c.pricing.title}
          </h1>
          <p className="text-[1.0625rem] text-ink-muted max-w-xl">{c.pricing.subtitle}</p>
        </div>
      </section>

      {/* Packages */}
      <section className="relative overflow-hidden pb-28 px-6" aria-label="Pricing packages">
        <div className="relative max-w-5xl mx-auto">
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

          {/* Bottom note */}
          <p className="mt-12 text-center text-sm text-ink-muted">
            Vous ne savez pas quelle formule choisir ?{' '}
            <Link href="/contact" className="text-accent hover:underline font-medium">
              On vous conseille →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}


interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  color: string;
}

