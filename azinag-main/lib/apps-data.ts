// Shared app types and normalization helpers used by API routes and UI.

export type AppSector = 'pme' | 'logistique' | 'gestion' | 'services';

export interface AppPlatforms {
  windows?: { url: string; version: string; size?: string };
  macos?: { url: string; version: string; size?: string };
  linux?: { url: string; version: string; size?: string };
  ios?: { appStoreUrl: string; version: string };
  android?: { playStoreUrl: string; version: string };
  web?: { liveUrl: string };
}

export interface AppTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
}

export interface AppSaasFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AppScreenshot {
  alt: string;
  bg: string;
  url?: string;
}

export interface AppFaq {
  question: string;
  answer: string;
}

export interface DownloadableApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  sector?: AppSector;
  platforms: AppPlatforms;
  features: string[];
  latestVersion: string;
  releaseDate: string;
  rating?: number;
  downloads?: number;
  industryUse: string[];
  githubRepo?: string;
  documentation?: string;
  liveDemoUrl?: string;
  slug?: string;
  badge?: 'New' | 'Popular';
  monthlyPrice?: number;
  annualPrice?: number;
  saasFeatures?: AppSaasFeature[];
  screenshots?: AppScreenshot[];
  faq?: AppFaq[];
  tiers?: AppTier[];
  sortOrder?: number;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type UnknownRecord = Record<string, unknown>;

export type BinaryPlatformKey = 'windows' | 'macos' | 'linux';

const BINARY_PLATFORM_KEYS: BinaryPlatformKey[] = ['windows', 'macos', 'linux'];

function encodeSlugSegment(value: string): string {
  return encodeURIComponent(value.trim());
}

export function isBinaryPlatformKey(value: string): value is BinaryPlatformKey {
  return BINARY_PLATFORM_KEYS.includes(value as BinaryPlatformKey);
}

export function buildAppDownloadPath(slug: string, platform: BinaryPlatformKey): string {
  return `/download/${encodeSlugSegment(slug)}/${platform}`;
}

export function toPublicDownloadableApp(app: DownloadableApp): DownloadableApp {
  const platforms: AppPlatforms = { ...app.platforms };

  // If slug is missing, hide binary entries instead of leaking raw storage URLs.
  if (!app.slug) {
    delete platforms.windows;
    delete platforms.macos;
    delete platforms.linux;
    return {
      ...app,
      platforms,
    };
  }

  if (platforms.windows?.url) {
    platforms.windows = {
      ...platforms.windows,
      url: buildAppDownloadPath(app.slug, 'windows'),
    };
  }

  if (platforms.macos?.url) {
    platforms.macos = {
      ...platforms.macos,
      url: buildAppDownloadPath(app.slug, 'macos'),
    };
  }

  if (platforms.linux?.url) {
    platforms.linux = {
      ...platforms.linux,
      url: buildAppDownloadPath(app.slug, 'linux'),
    };
  }

  return {
    ...app,
    platforms,
  };
}

export const apps: DownloadableApp[] = [];

export type SaasApp = DownloadableApp & Required<
  Pick<DownloadableApp, 'slug' | 'monthlyPrice' | 'annualPrice' | 'tiers' | 'faq' | 'saasFeatures' | 'screenshots'>
>;

const DEFAULT_SCREENSHOT_BG = 'from-slate-700 to-slate-900';

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function asBoolean(value: unknown, fallback = true): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => asOptionalString(item))
    .filter((item): item is string => !!item);
}

function normalizeDate(value: unknown): string {
  if (typeof value === 'string' && value.trim().length > 0) {
    const candidate = new Date(value);
    if (!Number.isNaN(candidate.getTime())) return candidate.toISOString();
  }
  return new Date().toISOString();
}

function normalizePlatformBinary(value: unknown): { url: string; version: string; size?: string } | undefined {
  if (!isRecord(value)) return undefined;
  const url = asOptionalString(value.url);
  if (!url) return undefined;
  return {
    url,
    version: asString(value.version, '1.0.0'),
    size: asOptionalString(value.size),
  };
}

function normalizePlatformStore(value: unknown, urlKey: 'appStoreUrl' | 'playStoreUrl'):
  | { appStoreUrl: string; version: string }
  | { playStoreUrl: string; version: string }
  | undefined {
  if (!isRecord(value)) return undefined;
  const url = asOptionalString(value[urlKey]);
  if (!url) return undefined;
  if (urlKey === 'appStoreUrl') {
    return {
      appStoreUrl: url,
      version: asString(value.version, '1.0.0'),
    };
  }
  return {
    playStoreUrl: url,
    version: asString(value.version, '1.0.0'),
  };
}

function normalizeWebPlatform(value: unknown): { liveUrl: string } | undefined {
  if (!isRecord(value)) return undefined;
  const liveUrl = asOptionalString(value.liveUrl);
  if (!liveUrl) return undefined;
  return { liveUrl };
}

export function normalizePlatforms(value: unknown): AppPlatforms {
  if (!isRecord(value)) return {};
  return {
    windows: normalizePlatformBinary(value.windows),
    macos: normalizePlatformBinary(value.macos),
    linux: normalizePlatformBinary(value.linux),
    ios: normalizePlatformStore(value.ios, 'appStoreUrl') as { appStoreUrl: string; version: string } | undefined,
    android: normalizePlatformStore(value.android, 'playStoreUrl') as { playStoreUrl: string; version: string } | undefined,
    web: normalizeWebPlatform(value.web),
  };
}

function normalizeTiers(value: unknown): AppTier[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!isRecord(item)) return null;
      const name = asOptionalString(item.name) ?? 'Starter';
      const monthlyPrice = asNumber(item.monthlyPrice ?? item.monthly_price) ?? 0;
      const annualPrice = asNumber(item.annualPrice ?? item.annual_price) ?? monthlyPrice;
      const features = normalizeStringArray(item.features);
      return { name, monthlyPrice, annualPrice, features };
    })
    .filter((item): item is AppTier => !!item);
}

function normalizeSaasFeatures(value: unknown): AppSaasFeature[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!isRecord(item)) return null;
      const title = asOptionalString(item.title);
      if (!title) return null;
      return {
        icon: asString(item.icon, 'Sparkles'),
        title,
        description: asString(item.description),
      };
    })
    .filter((item): item is AppSaasFeature => !!item);
}

function normalizeScreenshots(value: unknown): AppScreenshot[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item, index) => {
    if (!isRecord(item)) return [];

    const screenshot: AppScreenshot = {
      alt: asString(item.alt, `Screenshot ${index + 1}`),
      bg: asString(item.bg, DEFAULT_SCREENSHOT_BG),
    };

    const url = asOptionalString(item.url);
    if (url) {
      screenshot.url = url;
    }

    return [screenshot];
  });
}

function normalizeFaq(value: unknown): AppFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!isRecord(item)) return null;
      const question = asOptionalString(item.question);
      const answer = asOptionalString(item.answer);
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is AppFaq => !!item);
}

function normalizeBadge(value: unknown): 'New' | 'Popular' | undefined {
  if (value === 'New' || value === 'Popular') return value;
  return undefined;
}

function toSector(value: unknown): AppSector | undefined {
  if (value === 'pme' || value === 'logistique' || value === 'gestion' || value === 'services') {
    return value;
  }
  return undefined;
}

export function mapDbAppToDownloadableApp(row: UnknownRecord): DownloadableApp {
  const category = asString(row.category, 'pme');
  const releaseDate = asString(row.release_date, new Date().toISOString());

  return {
    id: asString(row.id),
    slug: asOptionalString(row.slug),
    name: asString(row.name),
    tagline: asString(row.tagline),
    description: asString(row.description),
    icon: asString(row.icon, 'LayoutGrid'),
    category,
    sector: toSector(category),
    badge: normalizeBadge(row.badge),
    monthlyPrice: asNumber(row.monthly_price),
    annualPrice: asNumber(row.annual_price),
    platforms: normalizePlatforms(row.platforms),
    tiers: normalizeTiers(row.tiers),
    saasFeatures: normalizeSaasFeatures(row.saas_features),
    screenshots: normalizeScreenshots(row.screenshots),
    faq: normalizeFaq(row.faq),
    liveDemoUrl: asOptionalString(row.live_demo_url),
    documentation: asOptionalString(row.documentation_url),
    githubRepo: asOptionalString(row.github_repo),
    latestVersion: asString(row.latest_version, '1.0.0'),
    releaseDate,
    sortOrder: asNumber(row.sort_order) ?? 0,
    published: asBoolean(row.published, true),
    createdAt: asOptionalString(row.created_at),
    updatedAt: asOptionalString(row.updated_at),
    features: [],
    industryUse: [],
  };
}

type AppPayload = Partial<DownloadableApp> & Record<string, unknown>;

function stripUndefinedFields<T extends UnknownRecord>(input: T): T {
  const result = { ...input };
  Object.keys(result).forEach((key) => {
    if (result[key] === undefined) {
      delete result[key];
    }
  });
  return result;
}

export function mapAppPayloadToDbRow(payload: AppPayload): UnknownRecord {
  const category = asString(payload.category ?? payload.sector, 'pme');
  const row: UnknownRecord = {
    slug: asOptionalString(payload.slug),
    name: asOptionalString(payload.name),
    tagline: asOptionalString(payload.tagline),
    description: asOptionalString(payload.description) ?? null,
    icon: asOptionalString(payload.icon) ?? 'LayoutGrid',
    category,
    badge: normalizeBadge(payload.badge) ?? null,
    monthly_price: asNumber(payload.monthlyPrice ?? payload.monthly_price) ?? null,
    annual_price: asNumber(payload.annualPrice ?? payload.annual_price) ?? null,
    platforms: normalizePlatforms(payload.platforms),
    tiers: normalizeTiers(payload.tiers),
    saas_features: normalizeSaasFeatures(payload.saasFeatures ?? payload.saas_features),
    screenshots: normalizeScreenshots(payload.screenshots),
    faq: normalizeFaq(payload.faq),
    live_demo_url: asOptionalString(payload.liveDemoUrl ?? payload.live_demo_url) ?? null,
    documentation_url: asOptionalString(payload.documentation ?? payload.documentation_url) ?? null,
    github_repo: asOptionalString(payload.githubRepo ?? payload.github_repo) ?? null,
    release_date: normalizeDate(payload.releaseDate ?? payload.release_date),
    latest_version: asOptionalString(payload.latestVersion ?? payload.latest_version) ?? '1.0.0',
    sort_order: asNumber(payload.sortOrder ?? payload.sort_order) ?? 0,
    published: asBoolean(payload.published, true),
  };

  return stripUndefinedFields(row);
}

export function getSaasApps(appList: DownloadableApp[] = apps): SaasApp[] {
  return appList.filter(
    (a): a is SaasApp =>
      !!a.slug && !!a.monthlyPrice && !!a.tiers && !!a.faq && !!a.saasFeatures && !!a.screenshots
  );
}

export function getAppBySlug(slug: string, appList: DownloadableApp[] = apps): DownloadableApp | undefined {
  return appList.find((a) => a.slug === slug);
}

export const SECTORS = [
  { value: 'all', label: 'All' },
  { value: 'pme', label: 'SME / Commerce' },
  { value: 'logistique', label: 'Logistics' },
  { value: 'gestion', label: 'Management' },
  { value: 'services', label: 'Professional Services' },
] as const;
