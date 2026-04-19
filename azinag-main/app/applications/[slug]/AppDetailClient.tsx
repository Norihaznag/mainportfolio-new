'use client';

import type { DownloadableApp } from '@/lib/apps-data';
import { buildAppDownloadPath, isBinaryPlatformKey } from '@/lib/apps-data';
import { DynamicIcon } from '@/components/DynamicIcon';

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
    const href = app.slug && binary ? buildAppDownloadPath(app.slug, key) : rawUrl;

    entries.push({
      key,
      label,
      href,
      icon,
      version,
      size,
      external: isExternalLink(href),
      binary,
    });
  };

  add(
    'windows',
    'Windows',
    'Monitor',
    app.platforms.windows?.url,
    app.platforms.windows?.version,
    app.platforms.windows?.size
  );
  add(
    'macos',
    'macOS',
    'Monitor',
    app.platforms.macos?.url,
    app.platforms.macos?.version,
    app.platforms.macos?.size
  );
  add(
    'linux',
    'Linux',
    'Monitor',
    app.platforms.linux?.url,
    app.platforms.linux?.version,
    app.platforms.linux?.size
  );
  add('web', 'Web App', 'Globe', app.platforms.web?.liveUrl);
  add(
    'ios',
    'iOS',
    'Smartphone',
    app.platforms.ios?.appStoreUrl,
    app.platforms.ios?.version
  );
  add(
    'android',
    'Android',
    'Smartphone',
    app.platforms.android?.playStoreUrl,
    app.platforms.android?.version
  );

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
  if (item.label === 'Windows') {
    return <WindowsGlyph />;
  }
  return <DynamicIcon name={item.icon} className="w-4 h-4" aria-hidden="true" />;
}

function DownloadActionButton({ item, appId }: { item: PlatformEntry; appId: string }) {
  const actionLabel = item.binary ? 'Download' : item.label === 'Web App' ? 'Open' : 'Get';

  return (
    <a
      href={item.href}
      id={`download-${appId}-primary`}
      download={item.binary ? '' : undefined}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      className="inline-flex items-stretch border border-[#DF3D20] bg-[#F24822] text-white hover:bg-[#DD431E] transition-colors"
      title={item.label}
    >
      <span className="inline-flex items-center px-4 text-[11px] font-semibold uppercase tracking-[0.03em]">
        {actionLabel}
      </span>
      <span className="inline-flex items-center justify-center px-3 border-l border-white/35">
        <PlatformGlyph item={item} />
      </span>
      <span className="inline-flex items-center justify-center px-3 border-l border-white/35">
        <DynamicIcon name="Download" className="w-4 h-4" aria-hidden="true" />
      </span>
    </a>
  );
}

export default function AppDetailClient({ app }: { app: DownloadableApp }) {
  const platforms = resolvePlatforms(app);
  const [primaryPlatform, ...otherPlatforms] = platforms;

  const description = (app.description || app.tagline || 'Lorem ipsum is simply dummy text of the printing and typesetting industry.').trim();
  const systemLabel = primaryPlatform ? primaryPlatform.label.toLowerCase() : 'n/a';
  const sizeLabel = primaryPlatform?.size ? primaryPlatform.size.toLowerCase() : 'n/a';
  const downloadsLabel = app.downloads != null ? String(app.downloads) : 'n/a';

  const screenshot = (app.screenshots ?? []).find((item) => item.url?.trim());

  return (
    <main className="text-ink">
      <section className="px-6 py-16 sm:py-20">
        <div className="max-w-[920px] mx-auto grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-12 items-start">
          <div className="pt-1">
            <h1 className="text-[2.1rem] leading-[1.02] font-bold mb-3">{app.name}</h1>

            <p className="text-[10px] leading-[1.45] text-ink-muted max-w-[245px] mb-4">
              {description}
            </p>

            <ul className="text-[11px] text-ink-muted leading-[1.5] mb-5">
              <li>
                <span className="font-semibold text-ink">System :</span> {systemLabel}
              </li>
              <li>
                <span className="font-semibold text-ink">Size :</span> {sizeLabel}
              </li>
              <li>
                <span className="font-semibold text-ink">Downloads :</span> {downloadsLabel}
              </li>
            </ul>

            {primaryPlatform ? (
              <DownloadActionButton item={primaryPlatform} appId={app.id} />
            ) : (
              <p className="text-xs text-ink-muted">No download available</p>
            )}

            {otherPlatforms.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {otherPlatforms.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-[10px] px-2 py-1 border border-border-subtle bg-white text-ink-muted hover:text-ink"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#D8D9DE]" style={{ aspectRatio: '1.35 / 1' }}>
              {screenshot?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={screenshot.url}
                  alt={screenshot.alt || `${app.name} image`}
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-ink/70">
                  image
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
