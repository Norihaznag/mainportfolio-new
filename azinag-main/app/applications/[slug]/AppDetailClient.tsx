'use client';

import AdSenseAd from '@/components/AdSenseAd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { DownloadableApp } from '@/lib/apps-data';
import { isBinaryPlatformKey } from '@/lib/apps-data';
import { DynamicIcon } from '@/components/DynamicIcon';

interface LightboxProps {
  images: { url: string; alt: string }[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}

function Lightbox({ images, index, onClose, onNav }: LightboxProps) {
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNav(index - 1);
      if (e.key === 'ArrowRight' && hasNext) onNav(index + 1);
    },
    [index, hasPrev, hasNext, onClose, onNav]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  const current = images[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85" onClick={onClose}>
      <div className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.url} alt={current.alt} className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl" />

        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path strokeLinecap="round" d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        {hasPrev && (
          <button
            onClick={() => onNav(index - 1)}
            className="absolute left-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 12L6 8l4-4" />
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            onClick={() => onNav(index + 1)}
            className="absolute right-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l4 4-4 4" />
            </svg>
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-6 flex gap-2" onClick={(e) => e.stopPropagation()}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onNav(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/35'}`}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface PlatformEntry {
  key: string;
  label: string;
  href: string;
  icon: string;
  version?: string;
  size?: string;
  external: boolean;
  binary: boolean;
}

function isExternalLink(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function formatMad(value?: number | null): string {
  if (!value) return 'N/A';
  return `${value.toLocaleString('en-US')} MAD`;
}

function resolvePlatforms(app: DownloadableApp): PlatformEntry[] {
  const entries: PlatformEntry[] = [];

  const add = (
    key: string,
    label: string,
    icon: string,
    rawUrl: string | undefined,
    version?: string,
    size?: string
  ) => {
    if (!rawUrl) return;
    const binary = isBinaryPlatformKey(key);
    entries.push({ key, label, href: rawUrl, icon, version, size, external: isExternalLink(rawUrl), binary });
  };

  add('windows', 'Windows', 'Monitor', app.platforms.windows?.url, app.platforms.windows?.version, app.platforms.windows?.size);
  add('macos', 'macOS', 'Monitor', app.platforms.macos?.url, app.platforms.macos?.version, app.platforms.macos?.size);
  add('linux', 'Linux', 'Monitor', app.platforms.linux?.url, app.platforms.linux?.version, app.platforms.linux?.size);
  add('web', 'Web App', 'Globe', app.platforms.web?.liveUrl);
  add('ios', 'iOS', 'Smartphone', app.platforms.ios?.appStoreUrl, app.platforms.ios?.version);
  add('android', 'Android', 'Smartphone', app.platforms.android?.playStoreUrl, app.platforms.android?.version);

  return entries;
}

function WindowsGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M2 4.5L11 3v8H2V4.5zm10 6.5V2.9L22 1v10h-10zM2 12h9v8.1L2 18.6V12zm10 0h10v10l-10-1.9V12z" />
    </svg>
  );
}

function PlatformGlyph({ item }: { item: PlatformEntry }) {
  if (item.label === 'Windows') return <WindowsGlyph />;
  return <DynamicIcon name={item.icon} className="w-4 h-4" aria-hidden="true" />;
}

export default function AppDetailClient({ app }: { app: DownloadableApp }) {
  const platforms = resolvePlatforms(app);
  const [primaryPlatform, ...otherPlatforms] = platforms;
  const screenshots = (app.screenshots ?? []).filter((s) => s.url?.trim());
  const mainShot = screenshots[0];
  const extraShots = screenshots.slice(1);

  const lightboxImages = screenshots.map((s) => ({ url: s.url!, alt: s.alt || app.name }));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const description = (app.description || app.tagline || '').trim();
  const actionLabel = primaryPlatform?.binary ? 'Download' : primaryPlatform?.label === 'Web App' ? 'Open App' : 'Get';
  const primaryOpensNewTab = !!primaryPlatform?.external && !primaryPlatform.binary;

  const includedFeatures = useMemo(
    () =>
      app.tiers?.[0]?.features?.length
        ? app.tiers[0].features
        : ['Application access', 'Product updates', 'Billing support', 'Technical support'],
    [app.tiers]
  );

  return (
    <>
      <main className="text-ink">
      <div aria-label="Advertisement" className="my-8"><AdSenseAd /></div>
        <div className="px-6 pt-6 pb-0 max-w-5xl mx-auto">
          <Link href="/applications" className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 12L6 8l4-4" />
            </svg>
            Applications
          </Link>
        </div>

        <section className="px-6 pt-8 pb-10 max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="lg:w-[360px] shrink-0">
              <h1 className="font-black text-[2rem] leading-[1.05] mb-2">{app.name}</h1>

              {app.tagline && <p className="text-sm text-ink-muted mb-5">{app.tagline}</p>}

              <dl className="grid grid-cols-3 gap-y-4 mb-7 text-sm">
                {primaryPlatform && (
                  <>
                    <div>
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-ink-faint mb-0.5">System</dt>
                      <dd className="font-medium text-ink text-xs">{primaryPlatform.label}</dd>
                    </div>
                    {primaryPlatform.size && (
                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-ink-faint mb-0.5">Size</dt>
                        <dd className="font-medium text-ink text-xs">{primaryPlatform.size}</dd>
                      </div>
                    )}
                    {(primaryPlatform.version || app.latestVersion) && (
                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-ink-faint mb-0.5">Version</dt>
                        <dd className="font-medium text-ink text-xs">{primaryPlatform.version || app.latestVersion}</dd>
                      </div>
                    )}
                  </>
                )}
                {app.downloads != null && (
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-ink-faint mb-0.5">Downloads</dt>
                    <dd className="font-medium text-ink text-xs">{app.downloads}</dd>
                  </div>
                )}
              </dl>

              {primaryPlatform ? (
                <a
                  href={primaryPlatform.href}
                  target={primaryOpensNewTab ? '_blank' : undefined}
                  rel={primaryOpensNewTab ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 h-11 px-8 bg-accent text-white text-sm font-semibold hover:bg-[#D93621] transition-colors rounded-lg"
                >
                  {actionLabel}
                  <PlatformGlyph item={primaryPlatform} />
                </a>
              ) : (
                <p className="text-xs text-ink-muted">No access link available yet.</p>
              )}

              {otherPlatforms.length > 0 && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {otherPlatforms.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      target={item.external && !item.binary ? '_blank' : undefined}
                      rel={item.external && !item.binary ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border-subtle text-ink-muted hover:text-ink hover:border-ink/20 transition-colors rounded-full"
                    >
                      <PlatformGlyph item={item} />
                      {item.label}
                    </a>
                  ))}
                </div>
              )}

              {description && (
                <p className="mt-8 text-sm text-ink-muted leading-relaxed border-t border-border-subtle pt-6">{description}</p>
              )}

              <div className="mt-6 rounded-xl border border-border-subtle bg-surface p-4">
                <p className="text-sm font-semibold text-ink">Plan summary</p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="rounded-lg border border-border-subtle bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Monthly</p>
                    <p className="text-sm font-semibold mt-1">{formatMad(app.monthlyPrice)}</p>
                  </div>
                  <div className="rounded-lg border border-border-subtle bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Annual</p>
                    <p className="text-sm font-semibold mt-1">{formatMad(app.annualPrice)}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-ink-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ink-muted">
                  Support terms: product usage help, billing assistance, and account/access support through{' '}
                  <Link href="/contact" className="font-semibold text-accent hover:underline">
                    Support
                  </Link>
                  .
                </p>
                <p className="mt-2 text-xs text-ink-faint">
                  Cancellation and refunds follow the{' '}
                  <Link href="/terms" className="font-semibold text-accent hover:underline">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/refund" className="font-semibold text-accent hover:underline">
                    Refund Policy
                  </Link>
                  .
                </p>
                <p className="mt-3 text-xs text-ink-faint">
                  Access behavior: after purchase you receive account or download instructions by email, then updates and support according to your plan.
                </p>
              </div>
            </div>

            <div className="w-full lg:flex-1 min-w-0">
              <button
                type="button"
                className="group w-full rounded-2xl overflow-hidden border border-border-subtle bg-surface relative cursor-zoom-in"
                style={{ aspectRatio: '16/9' }}
                onClick={() => mainShot?.url && setLightboxIndex(0)}
                aria-label="View screenshot fullscreen"
              >
                {mainShot?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={mainShot.url} alt={mainShot.alt || `${app.name} screenshot`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-muted/30 text-sm">No preview</div>
                )}
                {mainShot?.url && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-xs px-3 py-1.5 rounded-full">
                      View full size
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </section>

        {extraShots.length > 0 && (
          <section className="px-6 pb-12 max-w-5xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-ink-faint mb-4">Screenshots</h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {extraShots.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className="group shrink-0 rounded-xl overflow-hidden border border-border-subtle bg-surface relative cursor-zoom-in"
                  style={{ width: 280, aspectRatio: '16/9' }}
                  onClick={() => setLightboxIndex(i + 1)}
                  aria-label={`View screenshot ${i + 2} fullscreen`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.url!} alt={s.alt || `Screenshot ${i + 2}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="px-6 pb-24 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-ink text-canvas px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-black text-xl mb-1">Need help before purchase?</p>
              <p className="text-sm opacity-70">Use support for pre-purchase questions, billing, and product access.</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/pricing"
                className="shrink-0 h-11 px-6 border border-white/40 text-white text-sm font-semibold rounded-lg flex items-center hover:bg-white/10 transition-colors"
              >
                See pricing
              </Link>
              <Link
                href="/contact"
                className="shrink-0 h-11 px-6 bg-accent text-white text-sm font-semibold rounded-lg flex items-center hover:bg-[#D93621] transition-colors"
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </main>

      {lightboxIndex !== null && (
        <Lightbox images={lightboxImages} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNav={setLightboxIndex} />
      )}
    </>
  );
}
