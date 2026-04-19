import type { Metadata } from 'next';
import Link from 'next/link';
import { DynamicIcon } from '@/components/DynamicIcon';

export const metadata: Metadata = {
  title: 'Services & Expertise — Azinag Software House',
  description:
    'Custom software development for every platform: Desktop (Windows, macOS, Linux), Mobile (iOS, Android), Web Applications, Backend & APIs, and Custom Integrations.',
};

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';

function makeWaUrl(context: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(`Hello, I would like to discuss ${context} with Azinag.`)}`;
}

const SERVICES = [
  {
    id: 'desktop',
    icon: 'Monitor',
    title: 'Desktop Applications',
    platforms: 'Windows · macOS · Linux',
    description:
      'High-performance, offline-first desktop applications for Windows, macOS, and Linux. From enterprise management tools to specialized POS systems and ERP software.',
    capabilities: [
      'Cross-platform development (Electron, Tauri, Qt, .NET)',
      'Offline-first architecture with cloud sync',
      'Hardware integrations: thermal printers, barcode scanners, card readers',
      'Native system tray, notifications, and auto-update',
      'ERP, POS, inventory, and management software',
      'Secure local data storage (SQLite, encrypted volumes)',
    ],
    tech: ['Tauri (Rust)', 'Electron', 'Qt', '.NET WPF', 'SQLite', 'Node.js', 'React', 'Svelte'],
    useCases: [
      'Point-of-sale system for multi-location retail chains',
      'Desktop ERP for manufacturing operations',
      'Logistics management with offline scanner integration',
      'Medical record management with local encryption',
    ],
    gradient: 'from-blue-500 to-indigo-600',
    waCtx: 'a Desktop application',
  },
  {
    id: 'mobile',
    icon: 'Smartphone',
    title: 'Mobile Applications',
    platforms: 'iOS · Android · Cross-platform',
    description:
      'Native and cross-platform mobile applications for iOS and Android. Field tools, customer-facing apps, and internal mobile solutions built to work in the real world — online and offline.',
    capabilities: [
      'React Native for shared iOS & Android codebases',
      'Native Swift (iOS) and Kotlin (Android) when performance demands it',
      'Offline sync with background data reconciliation',
      'Push notifications and in-app messaging',
      'GPS, camera, biometric, and device sensor integrations',
      'App Store and Google Play submission & ASO guidance',
    ],
    tech: ['React Native', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'SQLite', 'Redux'],
    useCases: [
      'Inventory management app for warehouse teams',
      'Customer loyalty and ordering app for hospitality',
      'Field inspection app with GPS and photo capture',
      'Driver tracking and delivery confirmation app',
    ],
    gradient: 'from-green-500 to-teal-600',
    waCtx: 'a Mobile application',
  },
  {
    id: 'web',
    icon: 'Globe',
    title: 'Web Applications',
    platforms: 'SaaS · PWA · Portals · Dashboards',
    description:
      'Full-stack web applications from customer portals and admin dashboards to fully multi-tenant SaaS platforms. Built for performance, scalability, and SEO from day one.',
    capabilities: [
      'Next.js, React, Vue.js — server-side rendering and static generation',
      'Multi-tenant SaaS with isolated data and custom branding',
      'Progressive Web Apps (offline support, installable)',
      'Real-time features with WebSockets and SSE',
      'Role-based access control (RBAC) and authentication',
      'Stripe and CMI payment gateway integrations',
    ],
    tech: ['Next.js', 'React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    useCases: [
      'B2B SaaS platform for HR and payroll management',
      'Online reservation system with payment integration',
      'Real-time analytics dashboard for retail chains',
      'Internal operations portal for logistics companies',
    ],
    gradient: 'from-indigo-500 to-violet-600',
    waCtx: 'a Web application',
  },
  {
    id: 'backend',
    icon: 'Database',
    title: 'Backend & APIs',
    platforms: 'REST · GraphQL · Microservices · Cloud',
    description:
      'Scalable server-side systems built for reliability and performance. REST and GraphQL APIs, microservice architectures, database design, and cloud infrastructure.',
    capabilities: [
      'Node.js, Python (FastAPI/Django), Go, Rust backends',
      'REST and GraphQL API design and documentation',
      'PostgreSQL, MySQL, MongoDB, Redis data layers',
      'Microservices and event-driven architectures',
      'Docker and Kubernetes containerization',
      'AWS, GCP, Vercel, and self-hosted deployment',
    ],
    tech: ['Node.js', 'FastAPI', 'Go', 'Rust', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    useCases: [
      'High-throughput API handling 10M+ requests/day',
      'Real-time event processing pipeline for IoT devices',
      'Secure payment processing with PCI compliance',
      'Multi-region cloud deployment with failover',
    ],
    gradient: 'from-purple-500 to-pink-600',
    waCtx: 'a Backend system or API',
  },
  {
    id: 'integrations',
    icon: 'Link',
    title: 'Integrations & Custom Connectors',
    platforms: 'ERP · CRM · Payments · Logistics APIs',
    description:
      'Connect your existing systems and third-party tools. We build custom middleware, API connectors, data pipelines, and integration layers that make your software ecosystem work as one.',
    capabilities: [
      'REST and SOAP API wrappers for legacy systems',
      'ERP connectors (SAP, Odoo, Sage, custom)',
      'CRM integrations (Salesforce, HubSpot, Zoho)',
      'Payment gateway connectors (Stripe, CMI, PayPal)',
      'Webhook and event-driven pipelines',
      'ETL pipelines and data warehouse integrations',
    ],
    tech: ['Node.js', 'Python', 'Zapier-style flows', 'Kafka', 'RabbitMQ', 'REST', 'SOAP'],
    useCases: [
      'Connecting a legacy ERP to a modern e-commerce front',
      'Syncing inventory across POS, warehouse, and website',
      'Automated invoicing from CRM deal close to accounting',
      'Real-time logistics tracking integrated into a customer portal',
    ],
    gradient: 'from-teal-500 to-emerald-600',
    waCtx: 'a System integration or connector',
  },
];

export default function ServicesPage() {
  return (
    <div className="text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6" aria-label="Services hero">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-0 w-[600px] h-[400px] opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.4) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-4">Services & Expertise</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 max-w-3xl">
            Custom software for every platform and every industry.
          </h1>
          <p className="text-[1.0625rem] text-ink-muted max-w-2xl leading-relaxed">
            We build desktop, mobile, web, and backend solutions tailored to your business. No generic templates, no offshore hand-offs.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <nav className="px-6 border-b border-border-subtle bg-canvas/95 sticky top-[60px] z-30" aria-label="Services navigation">
        <div className="max-w-5xl mx-auto flex gap-0 overflow-x-auto scrollbar-hide">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 px-4 py-3.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors border-b-2 border-transparent hover:border-accent/40 whitespace-nowrap flex items-center gap-2"
            >
              <DynamicIcon name={s.icon} className="w-4 h-4" /> {s.title.split(' ')[0]}
            </a>
          ))}
        </div>
      </nav>

      {/* Service sections */}
      <div className="divide-y divide-border-subtle">
        {SERVICES.map((service, idx) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-24 px-6 scroll-mt-28 ${idx % 2 !== 0 ? 'bg-surface' : ''}`}
            aria-labelledby={`service-${service.id}-heading`}
          >
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">

                {/* Left: content */}
                <div className="flex-1 min-w-0">
                  {/* Icon + label */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white`} aria-hidden="true">
                      <DynamicIcon name={service.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="eyebrow">{service.platforms}</p>
                    </div>
                  </div>

                  <h2 id={`service-${service.id}-heading`} className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                    {service.title}
                  </h2>
                  <p className="text-[1.0625rem] text-ink-muted leading-relaxed mb-8">{service.description}</p>

                  {/* Capabilities */}
                  <h3 className="text-sm font-semibold text-ink mb-4 uppercase tracking-wider">Capabilities</h3>
                  <ul className="space-y-2 mb-8" role="list">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-ink-muted">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                        {cap}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tech.map((t) => (
                      <span key={t} className="text-xs font-mono font-medium bg-white border border-border-subtle rounded-lg px-2.5 py-1 text-ink-muted">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={makeWaUrl(service.waCtx)}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`service-cta-${service.id}`}
                    className="inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-6 py-3 text-[0.9375rem] hover:bg-blue-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Discuss Your Needs
                  </a>
                </div>

                {/* Right: use cases */}
                <div className="lg:w-[340px] shrink-0">
                  <div className="border border-border-subtle rounded-2xl bg-white p-6 sticky top-24">
                    <p className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">Example Use Cases</p>
                    <ul className="space-y-3" role="list">
                      {service.useCases.map((uc) => (
                        <li key={uc} className="flex items-start gap-3 text-sm text-ink-muted">
                          <span className={`mt-1 w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0 text-[10px] text-white font-bold`} aria-hidden="true">✓</span>
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="py-24 px-6 border-t border-border-subtle bg-surface" aria-label="Bottom CTA">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Not sure which platform fits your project?
          </h2>
          <p className="text-ink-muted text-[1.0625rem] mb-8">
            A 30-minute discovery call is enough to recommend the right stack and give you a realistic timeline and estimate.
          </p>
          <a
            href={makeWaUrl('my project (I am unsure which platform fits)')}
            target="_blank"
            rel="noopener noreferrer"
            id="services-bottom-cta"
            className="inline-flex items-center gap-2.5 bg-accent text-white font-semibold rounded-lg px-8 py-4 text-base hover:bg-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Discuss Your Project
          </a>
          <p className="mt-4 text-sm text-ink-faint">Free consultation · No commitment required</p>
        </div>
      </section>
    </div>
  );
}
