'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { DownloadableApp } from '@/lib/apps-data';
import { DownloadButton } from '@/components/DownloadButton';
import { DynamicIcon } from '@/components/DynamicIcon';

function formatReleaseDate(value: string): string | null {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function formatCategory(value?: string): string | null {
  if (!value) return null;
  return value
    .split(/[_-]+/)
    .map((chunk) => (chunk.length > 0 ? chunk[0].toUpperCase() + chunk.slice(1) : chunk))
    .join(' ');
}

export default function AppDetailClient({ app }: { app: DownloadableApp }) {
  const releaseDate = formatReleaseDate(app.releaseDate);
  const category = formatCategory(app.category);
  const screenshot = (app.screenshots ?? []).find((item) => typeof item.url === 'string' && item.url.trim().length > 0);
  const highlights = app.saasFeatures?.map((item) => item.title).filter((item) => item.trim().length > 0) ?? [];
  const fallbackHighlights = app.features.filter((item) => item.trim().length > 0);
  const visibleHighlights = (highlights.length > 0 ? highlights : fallbackHighlights).slice(0, 6);

  return (
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/applications"
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors mb-6 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 8H3M7 12l-4-4 4-4" />
          </svg>
          All Applications
        </Link>

        <section
          className="bg-white border border-border-subtle rounded-3xl p-6 sm:p-8 md:p-10 shadow-card"
          aria-label={`${app.name} details`}
        >
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-start">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-16 h-16 rounded-2xl bg-accent-light border border-border-subtle flex items-center justify-center"
                  aria-hidden="true"
                >
                  <DynamicIcon name={app.icon} className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{app.name}</h1>
                  <p className="text-ink-muted mt-1">{app.tagline}</p>
                </div>
              </div>

              <p className="text-[1.05rem] text-ink-muted leading-relaxed mb-6">{app.description}</p>

              <div className="flex flex-wrap gap-2 mb-7">
                {app.latestVersion && (
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-surface border border-border-subtle">
                    Version {app.latestVersion}
                  </span>
                )}
                {releaseDate && (
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-surface border border-border-subtle">
                    Updated {releaseDate}
                  </span>
                )}
                {category && (
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-surface border border-border-subtle">
                    {category}
                  </span>
                )}
              </div>

              <div className="border border-border-subtle rounded-2xl p-4 bg-surface-raised">
                <p className="text-xs font-semibold tracking-wide text-ink-muted uppercase mb-3">Download</p>
                {Object.keys(app.platforms).length > 0 ? (
                  <DownloadButton app={app} variant="full" />
                ) : (
                  <p className="text-sm text-ink-muted">No download available yet for this app.</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-border-subtle bg-surface-raised aspect-[16/10]">
                {screenshot?.url ? (
                  <Image
                    src={screenshot.url}
                    alt={screenshot.alt || `${app.name} preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-faint">
                    <DynamicIcon name={app.icon} className="w-16 h-16" />
                  </div>
                )}
              </div>

              {visibleHighlights.length > 0 && (
                <div className="border border-border-subtle rounded-2xl p-4">
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-ink-muted mb-3">Highlights</h2>
                  <ul className="space-y-2">
                    {visibleHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
