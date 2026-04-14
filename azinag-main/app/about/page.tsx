import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Azinag Software House',
  description:
    'Azinag is a Morocco-based software house building custom desktop, mobile, web, and backend solutions for businesses across all industries.',
};

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent('Hello, I would like to discuss a project with Azinag.')}`;

const WHAT_WE_BUILD = [
  { icon: '💻', label: 'Desktop Applications', detail: 'Windows, macOS, Linux' },
  { icon: '📱', label: 'Mobile Applications', detail: 'iOS & Android' },
  { icon: '🌐', label: 'Web Applications', detail: 'SaaS, PWA, portals' },
  { icon: '⚙️', label: 'Backend & APIs', detail: 'Microservices, cloud infra' },
  { icon: '🔗', label: 'Custom Integrations', detail: 'ERP, CRM, payment gateways' },
  { icon: '📊', label: 'Analytics Dashboards', detail: 'Real-time data visualization' },
];

const HOW_WE_WORK = [
  { icon: '💬', title: 'Direct Communication', desc: 'You work with the engineers building your product. No account managers, no hand-offs to unknown subcontractors.' },
  { icon: '📅', title: 'Agile Delivery', desc: 'Iterative milestones with visible progress. Requirements can evolve — we adapt without friction.' },
  { icon: '🔒', title: 'Fixed-Price Contracts', desc: 'No time-and-materials surprises. Scope agreed upfront. Price agreed upfront. Delivery on schedule.' },
  { icon: '📞', title: 'Same-Day Response', desc: 'WhatsApp-first communication. We respond within the business day, 6 days a week.' },
];

const STATS = [
  { value: '50+', label: 'Projects Shipped' },
  { value: '10+', label: 'Industries Served' },
  { value: '4', label: 'Platforms Covered' },
  { value: '3y+', label: 'In Business' },
];

export default function AboutPage() {
  return (
    <div className="text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6" aria-label="About hero">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.35) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-4">About</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 max-w-3xl">
            A software house built for the long term.
          </h1>
          <p className="text-[1.0625rem] text-ink-muted leading-relaxed max-w-2xl mb-4">
            Azinag builds custom software for businesses across all industries — web applications, desktop software, mobile apps, and backend systems.
          </p>
          <p className="text-[1.0625rem] text-ink-muted leading-relaxed max-w-2xl mb-4">
            We work directly with you: no intermediary agencies, no unknown subcontractors. Your project is built and maintained by the same engineers who designed it.
          </p>
          <p className="text-[1.0625rem] text-ink-muted leading-relaxed max-w-2xl">
            Based in Morocco, we serve clients across North Africa and Europe with competitive pricing and a timezone that works for everyone.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-14 border-t border-border-subtle bg-surface" aria-label="Company stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-4xl font-bold text-ink mb-1">{stat.value}</p>
              <p className="text-sm text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we build + How we work */}
      <section className="px-6 py-20 border-t border-border-subtle" aria-labelledby="details-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="details-heading" className="sr-only">What We Build and How We Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* What we build */}
            <div className="border border-border-subtle rounded-2xl p-8 bg-white">
              <h2 className="text-[0.9375rem] font-semibold mb-6">What We Build</h2>
              <ul className="space-y-4" role="list">
                {WHAT_WE_BUILD.map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <span className="text-xl shrink-0" aria-hidden="true">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.label}</p>
                      <p className="text-xs text-ink-muted">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* How we work */}
            <div className="border border-border-subtle rounded-2xl p-8 bg-white">
              <h2 className="text-[0.9375rem] font-semibold mb-6">How We Work</h2>
              <ul className="space-y-5" role="list">
                {HOW_WE_WORK.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-ink mb-0.5">{item.title}</p>
                      <p className="text-xs text-ink-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack — visual */}
      <section className="px-6 py-16 border-t border-border-subtle bg-surface" aria-labelledby="stack-heading">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-3">Technology</p>
          <h2 id="stack-heading" className="text-2xl font-bold mb-8">Our technology stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              'Next.js', 'React', 'Vue.js', 'TypeScript',
              'Node.js', 'FastAPI', 'Rust', 'Go',
              'PostgreSQL', 'Redis', 'SQLite', 'Supabase',
              'Docker', 'Kubernetes', 'AWS', 'Vercel',
              'React Native', 'Swift', 'Kotlin', 'Expo',
              'Tauri', 'Electron', 'Tailwind CSS', 'GraphQL',
            ].map((tech) => (
              <div
                key={tech}
                className="border border-border-subtle rounded-xl bg-white px-4 py-3 text-sm font-mono font-medium text-ink-muted text-center hover:border-accent/30 hover:text-ink transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-border-subtle" aria-label="Start a project">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to build with us?
          </h2>
          <p className="text-ink-muted text-[1.0625rem] mb-8 max-w-xl mx-auto">
            Send us a message and we will schedule a free discovery call within 24 hours.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="about-cta-whatsapp"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-8 py-4 text-base hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-semibold rounded-lg border border-border-subtle text-ink hover:bg-surface-raised transition-colors px-8 py-4 text-base"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
