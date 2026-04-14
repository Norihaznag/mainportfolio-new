// Single source of truth for all Azinag applications (downloadable + SaaS).
// Both the /downloads page and /applications page import from here.

export interface DownloadableApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  category: 'business' | 'productivity' | 'utility' | 'development';
  platforms: {
    windows?: { url: string; version: string; size?: string };
    macos?: { url: string; version: string; size?: string };
    linux?: { url: string; version: string; size?: string };
    ios?: { appStoreUrl: string; version: string };
    android?: { playStoreUrl: string; version: string };
    web?: { liveUrl: string };
  };
  features: string[];
  latestVersion: string;
  releaseDate: string;
  rating?: number;
  downloads?: number;
  industryUse: string[];
  githubRepo?: string;
  documentation?: string;
  // SaaS fields (optional — only for subscription apps)
  slug?: string;
  sector?: 'pme' | 'logistique' | 'gestion' | 'services';
  badge?: 'New' | 'Popular';
  monthlyPrice?: number;
  annualPrice?: number;
  saasFeatures?: { icon: string; title: string; description: string }[];
  screenshots?: { alt: string; bg: string }[];
  faq?: { question: string; answer: string }[];
  tiers?: Array<{
    name: 'Starter' | 'Pro';
    monthlyPrice: number;
    annualPrice: number;
    features: string[];
  }>;
}

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';

export const apps: DownloadableApp[] = [];

// Helper exports for SaaS-specific pages
export type SaasApp = DownloadableApp & Required<Pick<DownloadableApp, 'slug' | 'monthlyPrice' | 'annualPrice' | 'tiers' | 'faq' | 'saasFeatures' | 'screenshots'>>;

export function getSaasApps(): SaasApp[] {
  return apps.filter(
    (a): a is SaasApp =>
      !!a.slug && !!a.monthlyPrice && !!a.tiers && !!a.faq && !!a.saasFeatures && !!a.screenshots
  );
}

export function getAppBySlug(slug: string): DownloadableApp | undefined {
  return apps.find((a) => a.slug === slug);
}

export const SECTORS = [
  { value: 'all', label: 'All' },
  { value: 'pme', label: 'SME / Commerce' },
  { value: 'logistique', label: 'Logistics' },
  { value: 'gestion', label: 'Management' },
  { value: 'services', label: 'Professional Services' },
] as const;
