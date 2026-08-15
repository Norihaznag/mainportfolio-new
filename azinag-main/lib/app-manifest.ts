import type {
  AppFaq,
  AppPlatforms,
  AppSaasFeature,
  AppScreenshot,
  AppTier,
  DownloadableApp,
} from '@/lib/apps-data';

export const APP_MANIFEST_SCHEMA_VERSION = 'azinag-app-manifest/v1';

type UnknownRecord = Record<string, unknown>;

export type AppManifestCategory = 'pme' | 'logistique' | 'gestion' | 'services';

export type AppManifestV1 = {
  schemaVersion: typeof APP_MANIFEST_SCHEMA_VERSION;
  slug: string;
  name: string;
  tagline: string;
  description?: string;
  icon?: string;
  category: AppManifestCategory;
  badge?: 'New' | 'Popular' | null;
  pricing?: {
    monthlyPrice?: number;
    annualPrice?: number;
  };
  release?: {
    latestVersion?: string;
    releaseDate?: string;
  };
  links?: {
    liveDemoUrl?: string;
    documentation?: string;
    githubRepo?: string;
  };
  platforms?: AppPlatforms;
  screenshots?: AppScreenshot[];
  tiers?: AppTier[];
  saasFeatures?: AppSaasFeature[];
  faq?: AppFaq[];
  sortOrder?: number;
  published?: boolean;
};

export type AppManifestPayload = Partial<DownloadableApp>;

export class AppManifestValidationError extends Error {
  issues: string[];

  constructor(issues: string[]) {
    super(issues.join('\n'));
    this.name = 'AppManifestValidationError';
    this.issues = issues;
  }
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseJsonInput(input: string | unknown): unknown {
  if (typeof input !== 'string') return input;

  try {
    return JSON.parse(input);
  } catch {
    throw new AppManifestValidationError(['Manifest must be valid JSON.']);
  }
}

function optionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function requiredString(record: UnknownRecord, key: string, issues: string[]): string {
  const value = optionalString(record[key]);
  if (!value) {
    issues.push(`${key} is required.`);
    return '';
  }
  return value;
}

function optionalNumber(value: unknown, path: string, issues: string[]): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  issues.push(`${path} must be a finite number.`);
  return undefined;
}

function optionalBoolean(value: unknown, path: string, issues: string[]): boolean | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'boolean') return value;
  issues.push(`${path} must be true or false.`);
  return undefined;
}

function optionalHttpsUrl(value: unknown, path: string, issues: string[]): string | undefined {
  const url = optionalString(value);
  if (!url) return undefined;

  if (/^data:/i.test(url)) {
    issues.push(`${path} must be a hosted HTTPS URL, not embedded data.`);
    return undefined;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
      issues.push(`${path} must be an HTTPS URL.`);
      return undefined;
    }
    return url;
  } catch {
    issues.push(`${path} must be a valid HTTPS URL.`);
    return undefined;
  }
}

function optionalStringArray(value: unknown, path: string, issues: string[]): string[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    issues.push(`${path} must be an array of strings.`);
    return [];
  }

  return value
    .map((item, index) => {
      const stringValue = optionalString(item);
      if (!stringValue) {
        issues.push(`${path}[${index}] must be a non-empty string.`);
      }
      return stringValue;
    })
    .filter((item): item is string => !!item);
}

function parseCategory(value: unknown, issues: string[]): AppManifestCategory {
  if (value === 'pme' || value === 'logistique' || value === 'gestion' || value === 'services') {
    return value;
  }
  issues.push('category must be one of: pme, logistique, gestion, services.');
  return 'pme';
}

function parseBadge(value: unknown, issues: string[]): 'New' | 'Popular' | null | undefined {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  if (value === 'New' || value === 'Popular') return value;
  issues.push('badge must be "New", "Popular", or null.');
  return undefined;
}

function parseDate(value: unknown, path: string, issues: string[]): string | undefined {
  const date = optionalString(value);
  if (!date) return undefined;
  if (Number.isNaN(new Date(date).getTime())) {
    issues.push(`${path} must be a valid date.`);
    return undefined;
  }
  return date;
}

function parsePricing(value: unknown, issues: string[]): AppManifestV1['pricing'] {
  if (value === undefined || value === null) return undefined;
  if (!isRecord(value)) {
    issues.push('pricing must be an object.');
    return undefined;
  }

  return {
    monthlyPrice: optionalNumber(value.monthlyPrice, 'pricing.monthlyPrice', issues),
    annualPrice: optionalNumber(value.annualPrice, 'pricing.annualPrice', issues),
  };
}

function parseRelease(value: unknown, issues: string[]): AppManifestV1['release'] {
  if (value === undefined || value === null) return undefined;
  if (!isRecord(value)) {
    issues.push('release must be an object.');
    return undefined;
  }

  return {
    latestVersion: optionalString(value.latestVersion),
    releaseDate: parseDate(value.releaseDate, 'release.releaseDate', issues),
  };
}

function parseLinks(value: unknown, issues: string[]): AppManifestV1['links'] {
  if (value === undefined || value === null) return undefined;
  if (!isRecord(value)) {
    issues.push('links must be an object.');
    return undefined;
  }

  return {
    liveDemoUrl: optionalHttpsUrl(value.liveDemoUrl, 'links.liveDemoUrl', issues),
    documentation: optionalHttpsUrl(value.documentation, 'links.documentation', issues),
    githubRepo: optionalHttpsUrl(value.githubRepo, 'links.githubRepo', issues),
  };
}

function parseBinaryPlatform(
  value: unknown,
  path: string,
  issues: string[]
): { url: string; version: string; size?: string } | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isRecord(value)) {
    issues.push(`${path} must be an object.`);
    return undefined;
  }

  const url = optionalHttpsUrl(value.url, `${path}.url`, issues);
  if (!url) return undefined;

  return {
    url,
    version: optionalString(value.version) || '1.0.0',
    size: optionalString(value.size),
  };
}

function parseStorePlatform(
  value: unknown,
  path: string,
  urlKey: 'appStoreUrl' | 'playStoreUrl',
  issues: string[]
):
  | { appStoreUrl: string; version: string }
  | { playStoreUrl: string; version: string }
  | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isRecord(value)) {
    issues.push(`${path} must be an object.`);
    return undefined;
  }

  const url = optionalHttpsUrl(value[urlKey], `${path}.${urlKey}`, issues);
  if (!url) return undefined;

  if (urlKey === 'appStoreUrl') {
    return { appStoreUrl: url, version: optionalString(value.version) || '1.0.0' };
  }
  return { playStoreUrl: url, version: optionalString(value.version) || '1.0.0' };
}

function parseWebPlatform(value: unknown, issues: string[]): { liveUrl: string } | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isRecord(value)) {
    issues.push('platforms.web must be an object.');
    return undefined;
  }

  const liveUrl = optionalHttpsUrl(value.liveUrl, 'platforms.web.liveUrl', issues);
  return liveUrl ? { liveUrl } : undefined;
}

function parsePlatforms(value: unknown, issues: string[]): AppPlatforms | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isRecord(value)) {
    issues.push('platforms must be an object.');
    return undefined;
  }

  return {
    windows: parseBinaryPlatform(value.windows, 'platforms.windows', issues),
    macos: parseBinaryPlatform(value.macos, 'platforms.macos', issues),
    linux: parseBinaryPlatform(value.linux, 'platforms.linux', issues),
    ios: parseStorePlatform(value.ios, 'platforms.ios', 'appStoreUrl', issues) as
      | { appStoreUrl: string; version: string }
      | undefined,
    android: parseStorePlatform(value.android, 'platforms.android', 'playStoreUrl', issues) as
      | { playStoreUrl: string; version: string }
      | undefined,
    web: parseWebPlatform(value.web, issues),
  };
}

function parseScreenshots(value: unknown, issues: string[]): AppScreenshot[] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value)) {
    issues.push('screenshots must be an array.');
    return undefined;
  }

  return value.flatMap((item, index) => {
    if (!isRecord(item)) {
      issues.push(`screenshots[${index}] must be an object.`);
      return [];
    }

    const url = optionalHttpsUrl(item.url, `screenshots[${index}].url`, issues);
    if (!url) return [];

    return [
      {
        url,
        alt: optionalString(item.alt) || `Screenshot ${index + 1}`,
        bg: optionalString(item.bg) || 'from-slate-700 to-slate-900',
      },
    ];
  });
}

function parseTiers(value: unknown, issues: string[]): AppTier[] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value)) {
    issues.push('tiers must be an array.');
    return undefined;
  }

  return value.flatMap((item, index) => {
    if (!isRecord(item)) {
      issues.push(`tiers[${index}] must be an object.`);
      return [];
    }

    const name = optionalString(item.name);
    if (!name) {
      issues.push(`tiers[${index}].name is required.`);
      return [];
    }

    return [
      {
        name,
        monthlyPrice: optionalNumber(item.monthlyPrice, `tiers[${index}].monthlyPrice`, issues) ?? 0,
        annualPrice: optionalNumber(item.annualPrice, `tiers[${index}].annualPrice`, issues) ?? 0,
        features: optionalStringArray(item.features, `tiers[${index}].features`, issues),
      },
    ];
  });
}

function parseSaasFeatures(value: unknown, issues: string[]): AppSaasFeature[] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value)) {
    issues.push('saasFeatures must be an array.');
    return undefined;
  }

  return value.flatMap((item, index) => {
    if (!isRecord(item)) {
      issues.push(`saasFeatures[${index}] must be an object.`);
      return [];
    }

    const title = optionalString(item.title);
    if (!title) {
      issues.push(`saasFeatures[${index}].title is required.`);
      return [];
    }

    return [
      {
        icon: optionalString(item.icon) || 'Sparkles',
        title,
        description: optionalString(item.description) || '',
      },
    ];
  });
}

function parseFaq(value: unknown, issues: string[]): AppFaq[] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value)) {
    issues.push('faq must be an array.');
    return undefined;
  }

  return value.flatMap((item, index) => {
    if (!isRecord(item)) {
      issues.push(`faq[${index}] must be an object.`);
      return [];
    }

    const question = optionalString(item.question);
    const answer = optionalString(item.answer);
    if (!question || !answer) {
      issues.push(`faq[${index}] must include question and answer.`);
      return [];
    }

    return [{ question, answer }];
  });
}

export function parseAppManifest(input: string | unknown): AppManifestV1 {
  const parsed = parseJsonInput(input);
  const issues: string[] = [];

  if (!isRecord(parsed)) {
    throw new AppManifestValidationError(['Manifest must be a JSON object.']);
  }

  if (parsed.schemaVersion !== APP_MANIFEST_SCHEMA_VERSION) {
    issues.push(`schemaVersion must be "${APP_MANIFEST_SCHEMA_VERSION}".`);
  }

  const manifest: AppManifestV1 = {
    schemaVersion: APP_MANIFEST_SCHEMA_VERSION,
    slug: requiredString(parsed, 'slug', issues),
    name: requiredString(parsed, 'name', issues),
    tagline: requiredString(parsed, 'tagline', issues),
    description: optionalString(parsed.description),
    icon: optionalString(parsed.icon),
    category: parseCategory(parsed.category, issues),
    badge: parseBadge(parsed.badge, issues),
    pricing: parsePricing(parsed.pricing, issues),
    release: parseRelease(parsed.release, issues),
    links: parseLinks(parsed.links, issues),
    platforms: parsePlatforms(parsed.platforms, issues),
    screenshots: parseScreenshots(parsed.screenshots, issues),
    tiers: parseTiers(parsed.tiers, issues),
    saasFeatures: parseSaasFeatures(parsed.saasFeatures, issues),
    faq: parseFaq(parsed.faq, issues),
    sortOrder: optionalNumber(parsed.sortOrder, 'sortOrder', issues),
    published: optionalBoolean(parsed.published, 'published', issues),
  };

  if (issues.length > 0) {
    throw new AppManifestValidationError(issues);
  }

  return manifest;
}

export function manifestToAppPayload(manifest: AppManifestV1): AppManifestPayload {
  return {
    slug: manifest.slug,
    name: manifest.name,
    tagline: manifest.tagline,
    description: manifest.description || '',
    icon: manifest.icon || 'LayoutGrid',
    category: manifest.category,
    badge: manifest.badge || undefined,
    monthlyPrice: manifest.pricing?.monthlyPrice,
    annualPrice: manifest.pricing?.annualPrice,
    latestVersion: manifest.release?.latestVersion || '1.0.0',
    releaseDate: manifest.release?.releaseDate,
    liveDemoUrl: manifest.links?.liveDemoUrl,
    documentation: manifest.links?.documentation,
    githubRepo: manifest.links?.githubRepo,
    platforms: manifest.platforms || {},
    screenshots: manifest.screenshots || [],
    tiers: manifest.tiers || [],
    saasFeatures: manifest.saasFeatures || [],
    faq: manifest.faq || [],
    sortOrder: manifest.sortOrder ?? 0,
    published: manifest.published ?? true,
  };
}
