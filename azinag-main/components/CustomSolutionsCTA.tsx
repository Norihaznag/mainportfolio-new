'use client';

import { DynamicIcon } from './DynamicIcon';

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(
  'Hello, I would like to discuss a custom software project with Azinag.'
)}`;

interface CustomSolutionsCTAProps {
  variant?: 'default' | 'compact';
}

export function CustomSolutionsCTA({ variant = 'default' }: CustomSolutionsCTAProps) {
  if (variant === 'compact') {
    return (
      <div className="border border-border-subtle rounded-2xl bg-white p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-bold mb-1">Need a custom solution?</p>
          <p className="text-sm text-ink-muted">
            We build bespoke software for every platform and every industry. No technical limits.
          </p>
        </div>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="custom-solutions-cta-compact"
          className="shrink-0 inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-accent/90 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Discuss Your Project
        </a>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border border-border-subtle rounded-3xl bg-white p-10 md:p-12">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-[400px] h-[300px] opacity-5"
        style={{ background: 'radial-gradient(ellipse at center, rgba(240,138,93,1) 0%, transparent 70%)' }}
      />

      <div className="relative flex flex-col lg:flex-row lg:items-center gap-10">
        {/* Left */}
        <div className="flex-1">
          <p className="eyebrow mb-3">Custom Development</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Need software built exactly for your business?
          </h2>
          <p className="text-ink-muted text-[1.0625rem] leading-relaxed mb-6 max-w-xl">
            Our ready-made SaaS apps cover common needs. For everything else — we design and build from scratch.
            Desktop, mobile, web, or backend. Any industry. Any scale.
          </p>

          <ul className="space-y-2 mb-8" role="list">
            {[
              'All platforms: Desktop (Win/Mac/Linux) · Mobile (iOS/Android) · Web · Backend',
              'Every industry — manufacturing, logistics, retail, healthcare, finance, and more',
              'Fixed-price contracts in MAD — scope and price agreed before we start',
              '30 days of post-launch support included with every project',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-ink-muted">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="custom-solutions-cta-main"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-6 py-3.5 text-[0.9375rem] hover:bg-accent/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Start Your Project
            </a>
          </div>
        </div>

        {/* Right — platform grid */}
        <div className="shrink-0 grid grid-cols-2 gap-3 lg:w-[260px]">
          {[
            { icon: 'Monitor', label: 'Desktop', sub: 'Win · Mac · Linux' },
            { icon: 'Smartphone', label: 'Mobile', sub: 'iOS · Android' },
            { icon: 'Globe', label: 'Web', sub: 'SaaS · PWA · Portal' },
            { icon: 'Database', label: 'Backend', sub: 'API · Cloud · DB' },
          ].map((p) => (
            <div
              key={p.label}
              className="border border-border-subtle rounded-xl bg-surface p-3.5 flex flex-col items-center text-center"
            >
              <DynamicIcon name={p.icon} className="w-8 h-8 mb-2 text-accent" aria-hidden="true" />
              <p className="text-xs font-semibold text-ink">{p.label}</p>
              <p className="text-[10px] text-ink-faint">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
