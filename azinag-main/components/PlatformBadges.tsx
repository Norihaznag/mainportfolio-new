'use client';

import { DynamicIcon } from '@/components/DynamicIcon';

const PLATFORM_CONFIG = {
  windows: { icon: 'Monitor', label: 'Windows', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  macos: { icon: 'Apple', label: 'macOS', color: 'bg-gray-50 text-gray-700 border-gray-200' },
  linux: { icon: 'HardDrive', label: 'Linux', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  ios: { icon: 'Smartphone', label: 'iOS', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  android: { icon: 'Smartphone', label: 'Android', color: 'bg-green-50 text-green-700 border-green-200' },
  web: { icon: 'Globe', label: 'Web', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  desktop: { icon: 'Monitor', label: 'Desktop', color: 'bg-slate-50 text-slate-700 border-slate-200' },
  mobile: { icon: 'Smartphone', label: 'Mobile', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  backend: { icon: 'Database', label: 'Backend', color: 'bg-purple-50 text-purple-700 border-purple-200' },
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
            <DynamicIcon name={cfg.icon} className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} aria-hidden="true" />
            {cfg.label}
          </span>
        );
      })}
    </div>
  );
}

export { PLATFORM_CONFIG };
export type { PlatformKey };
