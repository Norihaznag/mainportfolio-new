'use client';

import Link from 'next/link';
import type { DownloadableApp } from '@/lib/apps-data';
import { DownloadButton } from '@/components/DownloadButton';
import { DynamicIcon } from '@/components/DynamicIcon';

interface AppCardProps {
  app: DownloadableApp;
  variant?: 'catalog' | 'download' | 'mini';
  showDownload?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
          viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-ink-muted ml-0.5">{rating.toFixed(1)}</span>
    </div>
  );
}

export function AppCard({ app, variant = 'catalog', showDownload = true }: AppCardProps) {
  if (variant === 'mini') {
    return (
      <Link
        href={app.slug ? `/applications/${app.slug}` : '/downloads'}
        className="group snap-center shrink-0 w-[240px] sm:w-[260px] border border-border-subtle rounded-2xl bg-white p-5 flex flex-col
                   transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-accent/30
                   focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-accent group-hover:scale-110 transition-transform"
            aria-hidden="true"
          >
            <DynamicIcon name={app.icon} className="w-5 h-5" />
          </div>
          {app.badge && (
            <span
              className={`text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 ${
                app.badge === 'Popular' ? 'bg-accent text-white' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {app.badge}
            </span>
          )}
        </div>
        <h3 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">{app.name}</h3>
        <p className="text-xs text-ink-muted leading-relaxed flex-1 mb-4 line-clamp-2">{app.tagline}</p>
        {app.monthlyPrice ? (
          <p className="text-sm font-bold">
            {app.monthlyPrice}{' '}
            <span className="text-xs font-normal text-ink-muted">MAD/month</span>
          </p>
        ) : (
          <p className="text-xs text-ink-muted">Free download</p>
        )}
      </Link>
    );
  }

  if (variant === 'download') {
    return (
      <div className="border border-border-subtle rounded-2xl bg-white p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-2xl bg-accent-light flex items-center justify-center text-accent shrink-0"
            aria-hidden="true"
          >
            <DynamicIcon name={app.icon} className="w-7 h-7" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <h3 className="font-bold text-[1rem]">{app.name}</h3>
              {app.badge && (
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 ${
                    app.badge === 'Popular' ? 'bg-accent text-white' : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {app.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-ink-muted">{app.tagline}</p>
            <div className="flex items-center gap-3 mt-1.5">
              {app.rating && <StarRating rating={app.rating} />}
              <span className="text-xs text-ink-faint">v{app.latestVersion}</span>
              {app.downloads && (
                <span className="text-xs text-ink-faint">{app.downloads.toLocaleString()}+ downloads</span>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-1 mb-5 flex-1" role="list">
          {app.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-ink-muted">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        {/* Industries */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {app.industryUse.slice(0, 3).map((ind) => (
            <span key={ind} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface border border-border-subtle text-ink-muted capitalize">
              {ind}
            </span>
          ))}
        </div>

        {/* Download buttons */}
        {showDownload && <DownloadButton app={app} variant="full" />}

        {/* Learn more */}
        {app.slug && (
          <Link
            href={`/applications/${app.slug}`}
            className="mt-4 text-sm font-medium text-accent hover:underline inline-flex items-center gap-1"
          >
            View details →
          </Link>
        )}
      </div>
    );
  }

  // Default: catalog variant
  return (
    <Link
      href={app.slug ? `/applications/${app.slug}` : '/downloads'}
      className="group block border border-border-subtle rounded-2xl bg-white p-6 flex flex-col h-full
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-accent/30
                 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      aria-label={`${app.name} — ${app.tagline}`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent shrink-0
                     group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        >
          <DynamicIcon name={app.icon} className="w-6 h-6" />
        </div>
        {app.badge && (
          <span
            className={`text-xs font-semibold tracking-wide uppercase rounded-full px-2.5 py-1 shrink-0 ${
              app.badge === 'Popular' ? 'bg-accent text-white' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {app.badge}
          </span>
        )}
      </div>

      <h3 className="text-[1rem] font-bold mb-1 group-hover:text-accent transition-colors">{app.name}</h3>
      <p className="text-sm text-ink-muted leading-relaxed flex-1 mb-5">{app.tagline}</p>

      <div className="flex items-center justify-between">
        {app.monthlyPrice ? (
          <p className="text-lg font-bold text-ink">
            {app.monthlyPrice}{' '}
            <span className="text-sm font-normal text-ink-muted">MAD/mo</span>
          </p>
        ) : (
          <p className="text-sm font-semibold text-emerald-600">Free</p>
        )}
        <span className="text-sm font-semibold text-accent group-hover:gap-2 transition-all flex items-center gap-1">
          View app
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
