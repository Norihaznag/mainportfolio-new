import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing — Azinag',
  description: 'Straightforward pricing information for applications and custom software.',
};

const ITEMS = [
  {
    title: 'SaaS Applications',
    detail: 'Monthly pricing is shown directly on each application page.',
    actionHref: '/applications',
    actionLabel: 'Open applications',
  },
  {
    title: 'Custom Software',
    detail: 'Custom projects are quoted based on scope, timeline, and integration complexity.',
    actionHref: '/contact',
    actionLabel: 'Request a quote',
  },
];

export default function PricingPage() {
  return (
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <section className="max-w-5xl mx-auto bg-white border border-border-subtle rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-muted mb-3">Pricing</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Simple pricing structure</h1>
        <p className="text-ink-muted text-[1.02rem] leading-relaxed max-w-3xl mb-8">
          No complex plans on this page. Choose the path that matches your need.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {ITEMS.map((item) => (
            <article key={item.title} className="border border-border-subtle rounded-2xl p-5 bg-surface-raised">
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-ink-muted mb-4 leading-relaxed">{item.detail}</p>
              <Link
                href={item.actionHref}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-border-subtle bg-white text-sm font-medium"
              >
                {item.actionLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
