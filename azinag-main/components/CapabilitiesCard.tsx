'use client';

import Link from 'next/link';

interface CapabilitiesCardProps {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  accentColor?: string;
}

export function CapabilitiesCard({
  icon,
  title,
  description,
  bullets,
  href,
  accentColor = 'bg-accent-light',
}: CapabilitiesCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col border border-border-subtle rounded-2xl bg-white p-7
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-accent/30
                 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      aria-label={`${title} — Learn more`}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl ${accentColor} flex items-center justify-center text-2xl mb-5
                   group-hover:scale-110 transition-transform duration-300`}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Title + description */}
      <h3 className="font-bold text-[1rem] mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-5 flex-1">{description}</p>

      {/* Bullets */}
      <ul className="space-y-1.5 mb-5" role="list">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-xs text-ink-muted">
            <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      {/* Arrow link */}
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
        Learn more
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  );
}
