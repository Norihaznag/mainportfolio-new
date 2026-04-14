'use client';

const PLATFORM_CONFIG = {
  windows: { icon: '🖥️', label: 'Windows', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  macos: { icon: '🍎', label: 'macOS', color: 'bg-gray-50 text-gray-700 border-gray-200' },
  linux: { icon: '🐧', label: 'Linux', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  ios: { icon: '📱', label: 'iOS', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  android: { icon: '🤖', label: 'Android', color: 'bg-green-50 text-green-700 border-green-200' },
  web: { icon: '🌐', label: 'Web', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  desktop: { icon: '💻', label: 'Desktop', color: 'bg-slate-50 text-slate-700 border-slate-200' },
  mobile: { icon: '📲', label: 'Mobile', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  backend: { icon: '⚙️', label: 'Backend', color: 'bg-purple-50 text-purple-700 border-purple-200' },
} as const;

type PlatformKey = keyof typeof PLATFORM_CONFIG;

interface PlatformBadgesProps {
  platforms: PlatformKey[];
  size?: 'sm' | 'md';
  className?: string;
}

export function PlatformBadges({ platforms, size = 'sm', className = '' }: PlatformBadgesProps) {
  const textSize = size === 'sm' ? 'text-[11px]' : 'text-xs';
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1';

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`} role="list" aria-label="Available platforms">
      {platforms.map((p) => {
        const cfg = PLATFORM_CONFIG[p];
        if (!cfg) return null;
        return (
          <span
            key={p}
            role="listitem"
            className={`inline-flex items-center gap-1 font-medium border rounded-full ${textSize} ${padding} ${cfg.color}`}
          >
            <span aria-hidden="true">{cfg.icon}</span>
            {cfg.label}
          </span>
        );
      })}
    </div>
  );
}

export { PLATFORM_CONFIG };
export type { PlatformKey };
