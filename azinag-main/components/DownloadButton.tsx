'use client';

import { buildAppDownloadPath, isBinaryPlatformKey, type DownloadableApp } from '@/lib/apps-data';
import { DynamicIcon } from '@/components/DynamicIcon';

interface DownloadButtonProps {
  app: DownloadableApp;
  variant?: 'full' | 'compact';
  className?: string;
}

const PLATFORM_BUTTONS = [
  {
    key: 'windows' as const,
    label: 'Windows',
    icon: 'Monitor',
    getUrl: (app: DownloadableApp) => app.platforms.windows?.url,
    getVersion: (app: DownloadableApp) => app.platforms.windows?.version,
    getSize: (app: DownloadableApp) => app.platforms.windows?.size,
  },
  {
    key: 'macos' as const,
    label: 'macOS',
    icon: 'Apple',
    getUrl: (app: DownloadableApp) => app.platforms.macos?.url,
    getVersion: (app: DownloadableApp) => app.platforms.macos?.version,
    getSize: (app: DownloadableApp) => app.platforms.macos?.size,
  },
  {
    key: 'linux' as const,
    label: 'Linux',
    icon: 'HardDrive',
    getUrl: (app: DownloadableApp) => app.platforms.linux?.url,
    getVersion: (app: DownloadableApp) => app.platforms.linux?.version,
    getSize: (app: DownloadableApp) => app.platforms.linux?.size,
  },
  {
    key: 'ios' as const,
    label: 'iOS',
    icon: 'Smartphone',
    getUrl: (app: DownloadableApp) => app.platforms.ios?.appStoreUrl,
    getVersion: (app: DownloadableApp) => app.platforms.ios?.version,
    getSize: () => undefined,
  },
  {
    key: 'android' as const,
    label: 'Android',
    icon: 'Smartphone',
    getUrl: (app: DownloadableApp) => app.platforms.android?.playStoreUrl,
    getVersion: (app: DownloadableApp) => app.platforms.android?.version,
    getSize: () => undefined,
  },
  {
    key: 'web' as const,
    label: 'Web',
    icon: 'Globe',
    getUrl: (app: DownloadableApp) => app.platforms.web?.liveUrl,
    getVersion: () => undefined,
    getSize: () => undefined,
  },
];

function toActionLabel(platformKey: string, platformLabel: string): string {
  if (isBinaryPlatformKey(platformKey)) {
    return `Download ${platformLabel}`;
  }
  if (platformKey === 'web') {
    return 'Open Web App';
  }
  return `Get on ${platformLabel}`;
}

function toHref(app: DownloadableApp, platformKey: string, fallbackUrl: string): string {
  if (isBinaryPlatformKey(platformKey) && app.slug) {
    return buildAppDownloadPath(app.slug, platformKey);
  }
  return fallbackUrl;
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function DownloadButton({ app, variant = 'full', className = '' }: DownloadButtonProps) {
  const availablePlatforms = PLATFORM_BUTTONS.filter((p) => !!p.getUrl(app));

  if (availablePlatforms.length === 0) return null;

  if (variant === 'compact') {
    // Show just the primary platform button
    const primary = availablePlatforms[0];
    const url = primary.getUrl(app);
    if (!url) return null;

    const href = toHref(app, primary.key, url);
    const binaryDownload = isBinaryPlatformKey(primary.key);
    const external = isExternalHref(href);

    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={binaryDownload ? '' : undefined}
        className={`inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-accent/90 transition-colors ${className}`}
        id={`download-${app.id}-primary`}
      >
        <DynamicIcon name={binaryDownload ? 'Download' : primary.icon} className="w-4 h-4" aria-hidden="true" />
        {toActionLabel(primary.key, primary.label)}
      </a>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {availablePlatforms.map((p) => {
        const url = p.getUrl(app);
        const version = p.getVersion(app);
        const size = p.getSize(app);
        if (!url) return null;

        const href = toHref(app, p.key, url);
        const isBinary = isBinaryPlatformKey(p.key);
        const isWeb = p.key === 'web';
        const external = isExternalHref(href);
        const meta = [version && `v${version}`, size].filter(Boolean).join(' · ');

        return (
          <a
            key={p.key}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            download={isBinary ? '' : undefined}
            id={`download-${app.id}-${p.key}`}
            title={meta || toActionLabel(p.key, p.label)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              isBinary
                ? 'bg-accent text-white hover:bg-accent/90'
                : 'bg-white border border-border-subtle text-ink hover:border-accent hover:text-accent'
            }`}
          >
            {isBinary ? (
              <>
                <DynamicIcon name="Download" className="w-4 h-4" aria-hidden="true" />
                <span>{toActionLabel(p.key, p.label)}</span>
                {meta && <span className="text-[11px] text-white/85">{meta}</span>}
              </>
            ) : (
              <>
                <DynamicIcon name={isWeb ? 'Globe' : p.icon} className="w-4 h-4" aria-hidden="true" />
                <span>{toActionLabel(p.key, p.label)}</span>
                {version && <span className="text-[11px] text-ink-faint">v{version}</span>}
              </>
            )}
          </a>
        );
      })}
    </div>
  );
}
