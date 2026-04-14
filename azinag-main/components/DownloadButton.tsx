'use client';

import type { DownloadableApp } from '@/lib/apps-data';
import { DynamicIcon } from '@/components/DynamicIcon';

interface DownloadButtonProps {
  app: DownloadableApp;
  variant?: 'full' | 'compact';
  className?: string;
}

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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

export function DownloadButton({ app, variant = 'full', className = '' }: DownloadButtonProps) {
  const availablePlatforms = PLATFORM_BUTTONS.filter((p) => !!p.getUrl(app));

  if (availablePlatforms.length === 0) return null;

  if (variant === 'compact') {
    // Show just the primary platform button
    const primary = availablePlatforms[0];
    const url = primary.getUrl(app);
    if (!url) return null;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-blue-700 transition-colors ${className}`}
        id={`download-${app.id}-primary`}
      >
        {WA_ICON}
        Download
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

        const isWeb = p.key === 'web';

        return (
          <a
            key={p.key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            id={`download-${app.id}-${p.key}`}
            title={[version && `v${version}`, size].filter(Boolean).join(' · ') || p.label}
            className="inline-flex items-center gap-1.5 border border-border-subtle rounded-lg px-3 py-1.5 text-xs font-semibold text-ink-muted hover:text-accent hover:border-accent transition-colors bg-white"
          >
            {isWeb ? (
              <>
                <DynamicIcon name={p.icon} className="w-3.5 h-3.5 mr-0.5" aria-hidden="true" />
                {p.label}
                <span className="text-[10px] text-ink-faint ml-1">Access</span>
              </>
            ) : (
              <>
                <DynamicIcon name={p.icon} className="w-3.5 h-3.5 mr-0.5" aria-hidden="true" />
                {p.label}
                {version && <span className="text-[10px] text-ink-faint ml-1">v{version}</span>}
              </>
            )}
          </a>
        );
      })}
    </div>
  );
}
