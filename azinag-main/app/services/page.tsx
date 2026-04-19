import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Azinag',
  description: 'Simple overview of software services provided by Azinag.',
};

const SERVICES = [
  {
    title: 'Desktop Applications',
    summary: 'Windows, macOS, and Linux applications built for business operations.',
    points: ['Offline-first workflows', 'Hardware integration', 'Local and cloud sync'],
  },
  {
    title: 'Mobile Applications',
    summary: 'iOS and Android apps for field teams, customers, and internal operations.',
    points: ['Native or cross-platform', 'Push notifications', 'Store deployment'],
  },
  {
    title: 'Web Applications',
    summary: 'SaaS platforms, dashboards, and portals for everyday business use.',
    points: ['Role-based access', 'Scalable architecture', 'Search-friendly pages'],
  },
  {
    title: 'Backend and APIs',
    summary: 'Reliable APIs and backend services for integrations and automation.',
    points: ['REST and GraphQL', 'Database design', 'Secure deployment'],
  },
  {
    title: 'Integrations',
    summary: 'Connection between your existing systems and new software.',
    points: ['ERP and CRM connectors', 'Payment integrations', 'Data pipelines'],
  },
];

export default function ServicesPage() {
  return (
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <section className="max-w-5xl mx-auto bg-white border border-border-subtle rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-muted mb-3">Services</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">What we build</h1>
        <p className="text-ink-muted text-[1.02rem] leading-relaxed max-w-3xl mb-8">
          Every service is listed clearly below. No bundles, no hidden layers.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {SERVICES.map((service) => (
            <article key={service.title} className="border border-border-subtle rounded-2xl p-5 bg-surface-raised">
              <h2 className="text-lg font-semibold mb-2">{service.title}</h2>
              <p className="text-sm text-ink-muted leading-relaxed mb-3">{service.summary}</p>
              <ul className="space-y-1.5">
                {service.points.map((point) => (
                  <li key={point} className="text-sm text-ink-muted">• {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
