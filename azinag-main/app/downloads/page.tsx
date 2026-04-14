'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apps, type DownloadableApp } from '@/lib/apps-data';
import { AppCard } from '@/components/AppCard';
import { DownloadButton } from '@/components/DownloadButton';

type CategoryFilter = DownloadableApp['category'] | 'all';

const CATEGORY_FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All Apps' },
  { value: 'business', label: '📊 Business' },
  { value: 'productivity', label: '⚡ Productivity' },
  { value: 'utility', label: '🔧 Utility' },
  { value: 'development', label: '💻 Development' },
];

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';

function ReleaseCard({ app }: { app: DownloadableApp }) {
  return (
    <div className="border border-border-subtle rounded-2xl bg-white p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-xl shrink-0" aria-hidden="true">
        {app.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <p className="font-semibold text-sm">{app.name}</p>
          <span className="text-xs font-mono text-ink-faint bg-surface border border-border-subtle rounded px-1.5 py-0.5">
            v{app.latestVersion}
          </span>
        </div>
        <p className="text-xs text-ink-muted mb-2">{new Date(app.releaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <DownloadButton app={app} variant="full" />
      </div>
    </div>
  );
}

export default function DownloadsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  const filtered =
    activeCategory === 'all'
      ? apps
      : apps.filter((a) => a.category === activeCategory);

  return (
    <div className="text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6" aria-label="Downloads hero">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-25"
          style={{ background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.3) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-4">Download Center</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Our Applications</h1>
          <p className="text-[1.0625rem] text-ink-muted max-w-2xl leading-relaxed">
            Download our applications for your desktop, mobile device, or access them online.{' '}
            <strong className="text-ink font-semibold">Windows · macOS · Linux · iOS · Android · Web.</strong>
          </p>
          {/* Quick platform legend */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { icon: '🖥️', label: 'Windows' },
              { icon: '🍎', label: 'macOS' },
              { icon: '🐧', label: 'Linux' },
              { icon: '📱', label: 'iOS' },
              { icon: '🤖', label: 'Android' },
              { icon: '🌐', label: 'Web' },
            ].map((p) => (
              <span key={p.label} className="inline-flex items-center gap-1.5 text-xs font-medium bg-white border border-border-subtle rounded-full px-3 py-1.5 text-ink-muted">
                <span aria-hidden="true">{p.icon}</span>{p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPLICATIONS ─────────────────────────────────────── */}
      <section className="px-6 pb-20" aria-labelledby="apps-section-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="apps-section-heading" className="text-2xl font-bold mb-6">Applications</h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                id={`cat-filter-${f.value}`}
                onClick={() => setActiveCategory(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === f.value
                    ? 'bg-accent text-white'
                    : 'bg-surface text-ink-muted hover:bg-surface-raised border border-border-subtle'
                }`}
                aria-pressed={activeCategory === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* App grid — download variant */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} variant="download" />
            ))}
          </div>

          {/* ─── DETAILED DOWNLOAD TABLE ───────────────────────── */}
          <div className="border border-border-subtle rounded-2xl overflow-hidden bg-white mb-16">
            <div className="px-6 py-4 border-b border-border-subtle bg-surface">
              <h2 className="text-[0.9375rem] font-semibold">Platform Download Links</h2>
              <p className="text-xs text-ink-muted mt-0.5">Direct download links for each platform and version.</p>
            </div>
            <div className="divide-y divide-border-subtle">
              {apps.map((app) => {
                const isExpanded = expandedApp === app.id;
                const platformCount = Object.keys(app.platforms).length;

                return (
                  <div key={app.id}>
                    <button
                      type="button"
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 hover:bg-surface transition-colors text-left"
                      onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`platform-table-${app.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl" aria-hidden="true">{app.icon}</span>
                        <div>
                          <p className="font-semibold text-sm">{app.name}</p>
                          <p className="text-xs text-ink-muted">
                            {platformCount} platform{platformCount !== 1 ? 's' : ''} · v{app.latestVersion}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-ink-faint text-xl leading-none transition-transform duration-200 ${isExpanded ? 'rotate-45' : ''}`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>

                    <div
                      id={`platform-table-${app.id}`}
                      className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="px-6 pb-6">
                        <DownloadButton app={app} variant="full" className="flex-col sm:flex-row" />

                        {app.documentation && (
                          <a
                            href={app.documentation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-accent transition-colors mt-3"
                          >
                            📄 Documentation
                          </a>
                        )}
                        {app.githubRepo && (
                          <a
                            href={app.githubRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-accent transition-colors mt-3 ml-4"
                          >
                            🐙 GitHub Repository
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── RELEASE NOTES ─────────────────────────────────── */}
          <div id="release-notes">
            <h2 className="text-2xl font-bold mb-6">Latest Releases</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[...apps]
                .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
                .map((app) => (
                  <ReleaseCard key={app.id} app={app} />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── OPEN SOURCE ───────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-border-subtle bg-surface" aria-labelledby="opensource-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="opensource-heading" className="text-2xl font-bold mb-2">Open Source & Code Samples</h2>
          <p className="text-ink-muted mb-6 text-sm">
            Selected repositories and code samples from our team. Contributions welcome.
          </p>
          <div className="border border-border-subtle rounded-2xl p-6 bg-white flex items-start gap-4">
            <span className="text-3xl" aria-hidden="true">🐙</span>
            <div>
              <p className="font-semibold mb-1">GitHub Organization</p>
              <p className="text-sm text-ink-muted mb-3">
                Explore open-source projects, SDK samples, and demo repositories maintained by the Azinag team.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                Visit GitHub →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOCUMENTATION ─────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-border-subtle" aria-labelledby="docs-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="docs-heading" className="text-2xl font-bold mb-2">Documentation</h2>
          <p className="text-ink-muted mb-6 text-sm">
            Technical guides, API references, and integration samples.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '📘', title: 'API Reference', desc: 'Complete reference for all public APIs and webhooks.' },
              { icon: '🚀', title: 'Getting Started Guides', desc: 'Step-by-step setup guides for each application.' },
              { icon: '🔌', title: 'Integration Samples', desc: 'Code samples for common integration patterns.' },
            ].map((doc) => (
              <a
                key={doc.title}
                href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Hello, I need documentation for: ${doc.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border-subtle rounded-2xl p-5 bg-white hover:shadow-card hover:border-accent/30 transition-all duration-200"
              >
                <p className="text-3xl mb-3" aria-hidden="true">{doc.icon}</p>
                <p className="font-semibold text-sm mb-1">{doc.title}</p>
                <p className="text-xs text-ink-muted">{doc.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUPPORT CTA ───────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-border-subtle bg-surface" aria-label="Support CTA">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl mb-4 font-bold">Need help with a download or installation?</p>
          <p className="text-ink-muted mb-6 text-[1.0625rem]">
            Our team responds on WhatsApp — usually within 2 hours on business days.
          </p>
          <a
            href={`https://wa.me/${PHONE}?text=${encodeURIComponent('Hello, I need help with an Azinag application download or installation.')}`}
            target="_blank"
            rel="noopener noreferrer"
            id="downloads-support-cta"
            className="inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-6 py-3 text-[0.9375rem] hover:bg-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Support
          </a>
        </div>
      </section>
    </div>
  );
}
