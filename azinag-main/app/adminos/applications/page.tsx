'use client';

import { useEffect, useState, type ChangeEvent } from 'react';

import { AdminShell } from '../_shell';
import type {
  AppFaq,
  AppSaasFeature,
  AppScreenshot,
  AppTier,
  DownloadableApp,
} from '@/lib/apps-data';
import { uploadFileToCloudinary, uploadFileToSupabaseStorage } from '@/lib/upload-client';

type UnknownRecord = Record<string, unknown>;

type FormState = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  appImageUrl: string;
  icon: string;
  category: string;
  badge: '' | 'New' | 'Popular';
  monthlyPrice: string;
  annualPrice: string;
  latestVersion: string;
  releaseDate: string;
  liveDemoUrl: string;
  documentation: string;
  githubRepo: string;
  sortOrder: number;
  published: boolean;

  windowsUrl: string;
  windowsVersion: string;
  windowsSize: string;
  macosUrl: string;
  macosVersion: string;
  macosSize: string;
  linuxUrl: string;
  linuxVersion: string;
  linuxSize: string;
  iosUrl: string;
  iosVersion: string;
  androidUrl: string;
  androidVersion: string;
  webUrl: string;

  tiersJson: string;
  saasFeaturesJson: string;
  faqJson: string;
  screenshots: AppScreenshot[];
};

const EMPTY: FormState = {
  slug: '',
  name: '',
  tagline: '',
  description: '',
  appImageUrl: '',
  icon: 'LayoutGrid',
  category: 'pme',
  badge: '',
  monthlyPrice: '',
  annualPrice: '',
  latestVersion: '1.0.0',
  releaseDate: new Date().toISOString().slice(0, 10),
  liveDemoUrl: '',
  documentation: '',
  githubRepo: '',
  sortOrder: 0,
  published: true,

  windowsUrl: '',
  windowsVersion: '1.0.0',
  windowsSize: '',
  macosUrl: '',
  macosVersion: '1.0.0',
  macosSize: '',
  linuxUrl: '',
  linuxVersion: '1.0.0',
  linuxSize: '',
  iosUrl: '',
  iosVersion: '1.0.0',
  androidUrl: '',
  androidVersion: '1.0.0',
  webUrl: '',

  tiersJson: '[\n  {\n    "name": "Starter",\n    "monthlyPrice": 490,\n    "annualPrice": 390,\n    "features": ["Feature one", "Feature two"]\n  }\n]',
  saasFeaturesJson: '[\n  {\n    "icon": "Sparkles",\n    "title": "Automation",\n    "description": "Automate repetitive operations."\n  }\n]',
  faqJson: '[\n  {\n    "question": "Do you provide onboarding?",\n    "answer": "Yes, we support onboarding and migration."\n  }\n]',
  screenshots: [],
};

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toPrettyJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function safeParseArray<T>(json: string, label: string): T[] {
  if (!json.trim()) return [];
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      throw new Error(`${label} must be a JSON array.`);
    }
    return parsed as T[];
  } catch (error) {
    const message = error instanceof Error ? error.message : `Invalid ${label} JSON.`;
    throw new Error(message);
  }
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toDisplayAppName(packageName: string): string {
  const withoutScope = packageName.replace(/^@[^/]+\//, '');
  return withoutScope
    .split(/[-_\s]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
    .trim();
}

function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

function inferCategoryFromPackageJson(pkg: UnknownRecord): FormState['category'] {
  const dependencies = isRecord(pkg.dependencies) ? Object.keys(pkg.dependencies) : [];
  const devDependencies = isRecord(pkg.devDependencies) ? Object.keys(pkg.devDependencies) : [];
  const keywords = Array.isArray(pkg.keywords)
    ? pkg.keywords.filter((item): item is string => typeof item === 'string')
    : [];

  const corpus = [
    ...dependencies,
    ...devDependencies,
    ...keywords,
    typeof pkg.name === 'string' ? pkg.name : '',
    typeof pkg.description === 'string' ? pkg.description : '',
  ]
    .join(' ')
    .toLowerCase();

  if (/logistic|delivery|shipment|fleet|transport/.test(corpus)) return 'logistique';
  if (/crm|erp|invoice|account|analytics|dashboard|admin|inventory/.test(corpus)) return 'gestion';
  if (/booking|service|support|client|customer|agency/.test(corpus)) return 'services';
  return 'pme';
}

function normalizeRepositoryUrl(repository: unknown): string | undefined {
  if (typeof repository === 'string') {
    const trimmed = repository.trim();
    if (!trimmed) return undefined;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (trimmed.startsWith('github.com/')) return `https://${trimmed}`;
    return undefined;
  }

  if (isRecord(repository) && typeof repository.url === 'string') {
    const normalized = repository.url
      .replace(/^git\+/, '')
      .replace(/^git:/, 'https:')
      .replace(/\.git$/, '')
      .trim();
    return normalized || undefined;
  }

  return undefined;
}

function parsePackageJson(raw: string): UnknownRecord {
  const parsed = JSON.parse(raw);
  if (!isRecord(parsed)) {
    throw new Error('package.json must be a JSON object.');
  }
  return parsed;
}

function asFiniteNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function normalizeCustomCategory(value: unknown): FormState['category'] | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;

  if (/^(logistique|logistics|logistic|transport|fleet|shipping|delivery)$/.test(normalized)) {
    return 'logistique';
  }
  if (/^(gestion|management|admin|crm|erp|finance|accounting|analytics)$/.test(normalized)) {
    return 'gestion';
  }
  if (/^(services|service|agency|consulting|support)$/.test(normalized)) {
    return 'services';
  }
  if (/^(pme|sme|business|commerce|retail)$/.test(normalized)) {
    return 'pme';
  }

  return undefined;
}

function getPackageCandidateRecords(pkg: UnknownRecord): UnknownRecord[] {
  const candidates: UnknownRecord[] = [pkg];
  const rootKeys = ['azinag', 'app', 'application', 'meta', 'metadata', 'config', 'custom', 'x-azinag', 'x-app'];

  for (const key of rootKeys) {
    const value = pkg[key];
    if (isRecord(value)) {
      candidates.push(value);
    }
  }

  const nestedParents = ['config', 'metadata'];
  const nestedChildren = ['app', 'application', 'pricing', 'billing', 'custom', 'azinag'];

  for (const parent of nestedParents) {
    const parentValue = pkg[parent];
    if (!isRecord(parentValue)) continue;

    for (const child of nestedChildren) {
      const childValue = parentValue[child];
      if (isRecord(childValue)) {
        candidates.push(childValue);
      }
    }
  }

  return candidates;
}

function findNumberInRecords(records: UnknownRecord[], keys: string[]): number | undefined {
  const nestedContainers = ['pricing', 'billing', 'subscription', 'subscriptions', 'plan', 'plans', 'cost', 'costs'];

  for (const record of records) {
    for (const key of keys) {
      const numeric = asFiniteNumber(record[key]);
      if (numeric !== undefined) return numeric;
    }

    for (const container of nestedContainers) {
      const nested = record[container];
      if (!isRecord(nested)) continue;

      for (const key of keys) {
        const numeric = asFiniteNumber(nested[key]);
        if (numeric !== undefined) return numeric;
      }
    }
  }

  return undefined;
}

function findCategoryInRecords(records: UnknownRecord[]): FormState['category'] | undefined {
  const categoryKeys = ['category', 'sector', 'industry', 'domain'];
  const nestedContainers = ['app', 'application', 'meta', 'metadata', 'custom'];

  for (const record of records) {
    for (const key of categoryKeys) {
      const category = normalizeCustomCategory(record[key]);
      if (category) return category;
    }

    for (const container of nestedContainers) {
      const nested = record[container];
      if (!isRecord(nested)) continue;

      for (const key of categoryKeys) {
        const category = normalizeCustomCategory(nested[key]);
        if (category) return category;
      }
    }
  }

  return undefined;
}

function extractPricingAndCategoryFromPackageJson(pkg: UnknownRecord): {
  monthlyPrice?: number;
  annualPrice?: number;
  category?: FormState['category'];
} {
  const records = getPackageCandidateRecords(pkg);

  const monthlyPrice = findNumberInRecords(records, [
    'monthlyPrice',
    'monthly_price',
    'monthly',
    'priceMonthly',
    'price_monthly',
    'subscriptionMonthly',
    'subscription_monthly',
  ]);

  const annualPrice = findNumberInRecords(records, [
    'annualPrice',
    'annual_price',
    'annual',
    'priceAnnual',
    'price_annual',
    'yearlyPrice',
    'yearly_price',
    'subscriptionAnnual',
    'subscription_annual',
  ]);

  const category = findCategoryInRecords(records);

  return { monthlyPrice, annualPrice, category };
}

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<DownloadableApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [packageJsonFile, setPackageJsonFile] = useState<File | null>(null);
  const [packageJsonText, setPackageJsonText] = useState('');
  const [autofillNotice, setAutofillNotice] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const response = await fetch(`/api/admin/apps?t=${Date.now()}`, { cache: 'no-store' });
    if (response.ok) {
      const payload = await response.json();
      setItems(payload.apps || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm(EMPTY);
    setEditId(null);
    setSaveError(null);
    setPackageJsonFile(null);
    setPackageJsonText('');
    setAutofillNotice(null);
    setOpen(true);
  };

  const openEdit = (app: DownloadableApp) => {
    setSaveError(null);
    setForm({
      slug: app.slug || '',
      name: app.name,
      tagline: app.tagline,
      description: app.description || '',
      appImageUrl: app.screenshots?.find((shot) => !!shot.url)?.url || '',
      icon: app.icon || 'LayoutGrid',
      category: app.sector || app.category || 'pme',
      badge: app.badge || '',
      monthlyPrice: app.monthlyPrice ? String(app.monthlyPrice) : '',
      annualPrice: app.annualPrice ? String(app.annualPrice) : '',
      latestVersion: app.latestVersion || '1.0.0',
      releaseDate: (app.releaseDate || '').slice(0, 10),
      liveDemoUrl: app.liveDemoUrl || '',
      documentation: app.documentation || '',
      githubRepo: app.githubRepo || '',
      sortOrder: app.sortOrder ?? 0,
      published: app.published ?? true,

      windowsUrl: app.platforms.windows?.url || '',
      windowsVersion: app.platforms.windows?.version || '1.0.0',
      windowsSize: app.platforms.windows?.size || '',
      macosUrl: app.platforms.macos?.url || '',
      macosVersion: app.platforms.macos?.version || '1.0.0',
      macosSize: app.platforms.macos?.size || '',
      linuxUrl: app.platforms.linux?.url || '',
      linuxVersion: app.platforms.linux?.version || '1.0.0',
      linuxSize: app.platforms.linux?.size || '',
      iosUrl: app.platforms.ios?.appStoreUrl || '',
      iosVersion: app.platforms.ios?.version || '1.0.0',
      androidUrl: app.platforms.android?.playStoreUrl || '',
      androidVersion: app.platforms.android?.version || '1.0.0',
      webUrl: app.platforms.web?.liveUrl || '',

      tiersJson: toPrettyJson(app.tiers || []),
      saasFeaturesJson: toPrettyJson(app.saasFeatures || []),
      faqJson: toPrettyJson(app.faq || []),
      screenshots: app.screenshots || [],
    });
    setEditId(app.id);
    setPackageJsonFile(null);
    setPackageJsonText('');
    setAutofillNotice(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditId(null);
    setPackageJsonFile(null);
    setPackageJsonText('');
    setAutofillNotice(null);
  };

  const handleAutofillFromPackageJson = async () => {
    setSaveError(null);
    setAutofillNotice(null);

    try {
      let raw = packageJsonText.trim();
      if (!raw && packageJsonFile) {
        raw = (await packageJsonFile.text()).trim();
      }

      if (!raw) {
        setSaveError('Provide a package.json file or paste JSON text to autofill.');
        return;
      }

      const pkg = parsePackageJson(raw);
      const packageName = asOptionalString(pkg.name);
      const packageVersion = asOptionalString(pkg.version);
      const packageDescription = asOptionalString(pkg.description);
      const packageHomepage = asOptionalString(pkg.homepage);
      const packageRepo = normalizeRepositoryUrl(pkg.repository);
      const inferredName = packageName ? toDisplayAppName(packageName) : '';
      const customAutofill = extractPricingAndCategoryFromPackageJson(pkg);

      setForm((prev) => ({
        ...prev,
        name: prev.name.trim() || inferredName || prev.name,
        slug: prev.slug.trim() || slugify(packageName || inferredName || prev.name || 'app'),
        tagline:
          prev.tagline.trim() ||
          (packageDescription
            ? truncateText(packageDescription, 90)
            : inferredName
            ? `${inferredName} for modern teams`
            : prev.tagline),
        description: prev.description.trim() || packageDescription || prev.description,
        latestVersion:
          prev.latestVersion.trim() && prev.latestVersion.trim() !== '1.0.0'
            ? prev.latestVersion
            : packageVersion || prev.latestVersion,
        githubRepo: prev.githubRepo.trim() || packageRepo || prev.githubRepo,
        liveDemoUrl: prev.liveDemoUrl.trim() || packageHomepage || prev.liveDemoUrl,
        documentation: prev.documentation.trim() || packageHomepage || prev.documentation,
        webUrl: prev.webUrl.trim() || packageHomepage || prev.webUrl,
        monthlyPrice:
          prev.monthlyPrice.trim() ||
          (customAutofill.monthlyPrice !== undefined ? String(customAutofill.monthlyPrice) : prev.monthlyPrice),
        annualPrice:
          prev.annualPrice.trim() ||
          (customAutofill.annualPrice !== undefined ? String(customAutofill.annualPrice) : prev.annualPrice),
        category:
          prev.category !== 'pme'
            ? prev.category
            : customAutofill.category || inferCategoryFromPackageJson(pkg),
        windowsVersion:
          prev.windowsVersion.trim() && prev.windowsVersion.trim() !== '1.0.0'
            ? prev.windowsVersion
            : packageVersion || prev.windowsVersion,
        macosVersion:
          prev.macosVersion.trim() && prev.macosVersion.trim() !== '1.0.0'
            ? prev.macosVersion
            : packageVersion || prev.macosVersion,
        linuxVersion:
          prev.linuxVersion.trim() && prev.linuxVersion.trim() !== '1.0.0'
            ? prev.linuxVersion
            : packageVersion || prev.linuxVersion,
      }));

      setAutofillNotice('Autofill complete. Empty fields were populated from package.json.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid package.json payload.';
      setSaveError(message);
    }
  };

  const handleAppImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const slug = slugify(form.slug || form.name || 'app');
    setUploading('Uploading app image...');

    try {
      const uploaded = await uploadFileToCloudinary(file, {
        folder: `azinag/apps/${slug}/cover`,
        resourceType: 'image',
      });

      setForm((prev) => ({ ...prev, appImageUrl: uploaded.secureUrl }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed.';
      setSaveError(message);
    } finally {
      setUploading(null);
      event.target.value = '';
    }
  };

  const handlePlatformUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    platform: 'windows' | 'macos' | 'linux'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const slug = slugify(form.slug || form.name || 'app');

    setUploading(`Uploading ${platform} binary...`);
    try {
      const uploaded = await uploadFileToSupabaseStorage(file, {
        folder: `azinag/apps/${slug}/binaries/${platform}`,
      });

      const versionValue = form.latestVersion || '1.0.0';
      const sizeMb = uploaded.bytes ? `${(uploaded.bytes / 1024 / 1024).toFixed(1)} MB` : '';

      if (platform === 'windows') {
        setForm((prev) => ({
          ...prev,
          windowsUrl: uploaded.secureUrl,
          windowsVersion: versionValue,
          windowsSize: sizeMb || prev.windowsSize,
        }));
      }
      if (platform === 'macos') {
        setForm((prev) => ({
          ...prev,
          macosUrl: uploaded.secureUrl,
          macosVersion: versionValue,
          macosSize: sizeMb || prev.macosSize,
        }));
      }
      if (platform === 'linux') {
        setForm((prev) => ({
          ...prev,
          linuxUrl: uploaded.secureUrl,
          linuxVersion: versionValue,
          linuxSize: sizeMb || prev.linuxSize,
        }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed.';
      setSaveError(message);
    } finally {
      setUploading(null);
      event.target.value = '';
    }
  };

  const handleScreenshotUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const slug = slugify(form.slug || form.name || 'app');
    setUploading('Uploading screenshots...');

    try {
      const uploadedScreenshots: AppScreenshot[] = [];

      for (const file of files) {
        const uploaded = await uploadFileToCloudinary(file, {
          folder: `azinag/apps/${slug}/screenshots`,
          resourceType: 'image',
        });

        uploadedScreenshots.push({
          alt: file.name.replace(/\.[^/.]+$/, ''),
          bg: 'from-slate-700 to-slate-900',
          url: uploaded.secureUrl,
        });
      }

      setForm((prev) => ({
        ...prev,
        screenshots: [...prev.screenshots, ...uploadedScreenshots],
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed.';
      setSaveError(message);
    } finally {
      setUploading(null);
      event.target.value = '';
    }
  };

  const removeScreenshot = (index: number) => {
    setForm((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, idx) => idx !== index),
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.tagline.trim()) {
      setSaveError('Name and tagline are required.');
      return;
    }

    setSaving(true);
    setSaveError(null);

    try {
      const tiers = safeParseArray<AppTier>(form.tiersJson, 'tiers');
      const saasFeatures = safeParseArray<AppSaasFeature>(form.saasFeaturesJson, 'saasFeatures');
      const faq = safeParseArray<AppFaq>(form.faqJson, 'faq');
      const normalizedScreenshots = form.screenshots.filter((shot) => {
        const alt = typeof shot.alt === 'string' ? shot.alt.trim() : '';
        const url = typeof shot.url === 'string' ? shot.url.trim() : '';
        return alt.length > 0 || url.length > 0;
      });

      const appImageUrl = form.appImageUrl.trim();
      const screenshots = appImageUrl
        ? [
            {
              alt: `${form.name.trim() || 'App'} cover`,
              bg: 'from-slate-700 to-slate-900',
              url: appImageUrl,
            },
            ...normalizedScreenshots.filter((shot) => shot.url !== appImageUrl),
          ]
        : normalizedScreenshots;

      const platforms: Record<string, unknown> = {};

      if (form.windowsUrl.trim()) {
        platforms.windows = {
          url: form.windowsUrl.trim(),
          version: form.windowsVersion.trim() || form.latestVersion.trim() || '1.0.0',
          size: form.windowsSize.trim() || undefined,
        };
      }
      if (form.macosUrl.trim()) {
        platforms.macos = {
          url: form.macosUrl.trim(),
          version: form.macosVersion.trim() || form.latestVersion.trim() || '1.0.0',
          size: form.macosSize.trim() || undefined,
        };
      }
      if (form.linuxUrl.trim()) {
        platforms.linux = {
          url: form.linuxUrl.trim(),
          version: form.linuxVersion.trim() || form.latestVersion.trim() || '1.0.0',
          size: form.linuxSize.trim() || undefined,
        };
      }
      if (form.iosUrl.trim()) {
        platforms.ios = {
          appStoreUrl: form.iosUrl.trim(),
          version: form.iosVersion.trim() || form.latestVersion.trim() || '1.0.0',
        };
      }
      if (form.androidUrl.trim()) {
        platforms.android = {
          playStoreUrl: form.androidUrl.trim(),
          version: form.androidVersion.trim() || form.latestVersion.trim() || '1.0.0',
        };
      }
      if (form.webUrl.trim()) {
        platforms.web = {
          liveUrl: form.webUrl.trim(),
        };
      }

      const body = {
        slug: slugify(form.slug || form.name),
        name: form.name.trim(),
        tagline: form.tagline.trim(),
        description: form.description.trim(),
        icon: form.icon.trim() || 'LayoutGrid',
        category: form.category,
        badge: form.badge || undefined,
        monthlyPrice: form.monthlyPrice.trim() ? Number(form.monthlyPrice) : undefined,
        annualPrice: form.annualPrice.trim() ? Number(form.annualPrice) : undefined,
        latestVersion: form.latestVersion.trim() || '1.0.0',
        releaseDate: form.releaseDate ? new Date(form.releaseDate).toISOString() : undefined,
        liveDemoUrl: form.liveDemoUrl.trim() || undefined,
        documentation: form.documentation.trim() || undefined,
        githubRepo: form.githubRepo.trim() || undefined,
        sortOrder: form.sortOrder,
        published: form.published,
        platforms,
        tiers,
        saasFeatures,
        faq,
        screenshots,
      };

      const response = editId
        ? await fetch(`/api/admin/apps/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        : await fetch('/api/admin/apps', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || `Error ${response.status}`);
      }

      closeModal();
      load();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Save failed.';
      setSaveError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this application?')) return;

    setItems((prev) => prev.filter((item) => item.id !== id));
    const response = await fetch(`/api/admin/apps/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      alert('Delete failed');
      load();
    }
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-ink">Applications</h1>
          <p className="text-sm text-ink-muted mt-0.5">Manage SaaS applications shown on the public catalog</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors"
        >
          Add application
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="border border-border-subtle rounded-2xl bg-surface py-16 text-center">
          <p className="text-ink-muted text-sm">No applications yet.</p>
          <button onClick={openAdd} className="mt-4 text-sm font-medium text-accent hover:underline">
            Add your first application
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((app) => (
            <div key={app.id} className="border border-border-subtle rounded-2xl bg-surface p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-ink">{app.name}</span>
                {app.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-accent-light text-accent">{app.badge}</span>
                )}
                <span
                  className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
                    app.published ? 'bg-green-50 text-green-700' : 'bg-surface-raised text-ink-faint'
                  }`}
                >
                  {app.published ? 'Live' : 'Draft'}
                </span>
              </div>
              <p className="text-xs text-ink-muted">/{app.slug}</p>
              <p className="text-sm text-ink-muted line-clamp-2">{app.tagline}</p>
              <div className="text-xs text-ink-faint">
                {app.monthlyPrice ? `${app.monthlyPrice} MAD/mo` : 'No pricing'}
              </div>
              <div className="flex items-center gap-4 mt-2 pt-2 border-t border-border-subtle">
                <button onClick={() => openEdit(app)} className="text-xs text-ink-muted hover:text-ink transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(app.id)} className="text-xs text-red-500 hover:text-red-700 transition-colors">
                  Delete
                </button>
                <span className="ml-auto text-xs text-ink-faint">#{app.sortOrder ?? 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl border border-border-subtle w-full max-w-3xl p-6 max-h-[92vh] overflow-y-auto">
            <h2 className="text-base font-bold mb-5">{editId ? 'Edit application' : 'New application'}</h2>

            <div className="space-y-6">
              <div className="border border-border-subtle rounded-xl p-4 bg-canvas space-y-3">
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Optional package.json autofill</p>
                <p className="text-xs text-ink-faint">
                  Upload or paste a package.json to auto-populate empty fields like name, slug, version, links, and description.
                </p>
                <p className="text-[11px] text-ink-faint">
                  Custom keys supported for pricing/category: monthlyPrice, annualPrice, category (also nested under azinag, app,
                  pricing, billing, or config.app).
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">package.json file</label>
                    <input
                      type="file"
                      accept="application/json,.json"
                      onChange={(event) => setPackageJsonFile(event.target.files?.[0] || null)}
                      className="text-xs"
                    />
                    {packageJsonFile && <p className="mt-1 text-xs text-ink-faint">Selected {packageJsonFile.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">Or paste package.json</label>
                    <textarea
                      rows={4}
                      value={packageJsonText}
                      onChange={(event) => setPackageJsonText(event.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink bg-white font-mono resize-none"
                      placeholder='{"name":"my-app","version":"1.0.0"}'
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAutofillFromPackageJson}
                    className="px-3.5 py-2 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors"
                  >
                    Autofill from package.json
                  </button>
                  {autofillNotice && <p className="text-xs text-emerald-700">{autofillNotice}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Name *</label>
                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        name: event.target.value,
                        slug: prev.slug || slugify(event.target.value),
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                    placeholder="Azinag CRM"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Slug *</label>
                  <input
                    value={form.slug}
                    onChange={(event) => setForm((prev) => ({ ...prev, slug: slugify(event.target.value) }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                    placeholder="azinag-crm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Tagline *</label>
                  <input
                    value={form.tagline}
                    onChange={(event) => setForm((prev) => ({ ...prev, tagline: event.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                    placeholder="Manage operations in one place"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Icon</label>
                  <input
                    value={form.icon}
                    onChange={(event) => setForm((prev) => ({ ...prev, icon: event.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                    placeholder="LayoutGrid"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas resize-none"
                  placeholder="Describe what this application solves."
                />
              </div>

              <div className="border border-border-subtle rounded-xl p-4 bg-canvas space-y-3">
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">App Image</p>
                <p className="text-xs text-ink-faint">This image is used as the hero preview on the public application page.</p>
                <input
                  value={form.appImageUrl}
                  onChange={(event) => setForm((prev) => ({ ...prev, appImageUrl: event.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                  placeholder="https://.../app-cover.png"
                />
                <input type="file" accept="image/*" onChange={handleAppImageUpload} className="text-xs" />
                {form.appImageUrl && (
                  <div className="border border-border-subtle rounded-lg overflow-hidden bg-white w-full max-w-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.appImageUrl} alt={`${form.name || 'App'} cover`} className="w-full h-28 object-cover" />
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Sector</label>
                  <select
                    value={form.category}
                    onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                  >
                    <option value="pme">SME / Commerce</option>
                    <option value="logistique">Logistics</option>
                    <option value="gestion">Management</option>
                    <option value="services">Professional Services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Badge</label>
                  <select
                    value={form.badge}
                    onChange={(event) => setForm((prev) => ({ ...prev, badge: event.target.value as FormState['badge'] }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                  >
                    <option value="">None</option>
                    <option value="Popular">Popular</option>
                    <option value="New">New</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Sort order</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(event) => setForm((prev) => ({ ...prev, sortOrder: Number(event.target.value) || 0 }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Monthly price</label>
                  <input
                    type="number"
                    value={form.monthlyPrice}
                    onChange={(event) => setForm((prev) => ({ ...prev, monthlyPrice: event.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                    placeholder="490"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Annual price</label>
                  <input
                    type="number"
                    value={form.annualPrice}
                    onChange={(event) => setForm((prev) => ({ ...prev, annualPrice: event.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                    placeholder="390"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Version</label>
                  <input
                    value={form.latestVersion}
                    onChange={(event) => setForm((prev) => ({ ...prev, latestVersion: event.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                    placeholder="1.2.0"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Live demo URL</label>
                  <input
                    value={form.liveDemoUrl}
                    onChange={(event) => setForm((prev) => ({ ...prev, liveDemoUrl: event.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                    placeholder="https://app.example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Release date</label>
                  <input
                    type="date"
                    value={form.releaseDate}
                    onChange={(event) => setForm((prev) => ({ ...prev, releaseDate: event.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Documentation URL</label>
                  <input
                    value={form.documentation}
                    onChange={(event) => setForm((prev) => ({ ...prev, documentation: event.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                    placeholder="https://docs.example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">GitHub URL</label>
                  <input
                    value={form.githubRepo}
                    onChange={(event) => setForm((prev) => ({ ...prev, githubRepo: event.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas"
                    placeholder="https://github.com/org/repo"
                  />
                </div>
              </div>

              <div className="border border-border-subtle rounded-xl p-4 bg-canvas space-y-4">
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Binary Uploads</p>
                <p className="text-xs text-ink-faint">
                  Binary files are uploaded to Supabase Storage. Executables like .exe are supported.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-ink-muted">Windows URL</label>
                    <input
                      value={form.windowsUrl}
                      onChange={(event) => setForm((prev) => ({ ...prev, windowsUrl: event.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                      placeholder="https://.../setup.exe"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={form.windowsVersion}
                        onChange={(event) => setForm((prev) => ({ ...prev, windowsVersion: event.target.value }))}
                        className="px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                        placeholder="version"
                      />
                      <input
                        value={form.windowsSize}
                        onChange={(event) => setForm((prev) => ({ ...prev, windowsSize: event.target.value }))}
                        className="px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                        placeholder="size"
                      />
                    </div>
                    <input
                      type="file"
                      accept=".exe,.msi,.zip,.7z,.rar,.tar,.gz,.xz,.bin"
                      onChange={(event) => handlePlatformUpload(event, 'windows')}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-ink-muted">macOS URL</label>
                    <input
                      value={form.macosUrl}
                      onChange={(event) => setForm((prev) => ({ ...prev, macosUrl: event.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                      placeholder="https://.../app.dmg"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={form.macosVersion}
                        onChange={(event) => setForm((prev) => ({ ...prev, macosVersion: event.target.value }))}
                        className="px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                        placeholder="version"
                      />
                      <input
                        value={form.macosSize}
                        onChange={(event) => setForm((prev) => ({ ...prev, macosSize: event.target.value }))}
                        className="px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                        placeholder="size"
                      />
                    </div>
                    <input
                      type="file"
                      accept=".dmg,.pkg,.zip,.7z,.tar,.gz,.xz,.bin"
                      onChange={(event) => handlePlatformUpload(event, 'macos')}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-ink-muted">Linux URL</label>
                    <input
                      value={form.linuxUrl}
                      onChange={(event) => setForm((prev) => ({ ...prev, linuxUrl: event.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                      placeholder="https://.../app.AppImage"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={form.linuxVersion}
                        onChange={(event) => setForm((prev) => ({ ...prev, linuxVersion: event.target.value }))}
                        className="px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                        placeholder="version"
                      />
                      <input
                        value={form.linuxSize}
                        onChange={(event) => setForm((prev) => ({ ...prev, linuxSize: event.target.value }))}
                        className="px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                        placeholder="size"
                      />
                    </div>
                    <input
                      type="file"
                      accept=".AppImage,.deb,.rpm,.zip,.7z,.tar,.gz,.xz,.bin"
                      onChange={(event) => handlePlatformUpload(event, 'linux')}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-ink-muted">iOS / Android / Web</label>
                    <input
                      value={form.iosUrl}
                      onChange={(event) => setForm((prev) => ({ ...prev, iosUrl: event.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                      placeholder="iOS App Store URL"
                    />
                    <input
                      value={form.androidUrl}
                      onChange={(event) => setForm((prev) => ({ ...prev, androidUrl: event.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                      placeholder="Android Play Store URL"
                    />
                    <input
                      value={form.webUrl}
                      onChange={(event) => setForm((prev) => ({ ...prev, webUrl: event.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-white"
                      placeholder="Web app URL"
                    />
                  </div>
                </div>
              </div>

              <div className="border border-border-subtle rounded-xl p-4 bg-canvas space-y-3">
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Screenshots</p>
                <input type="file" multiple accept="image/*" onChange={handleScreenshotUpload} className="text-xs" />
                {form.screenshots.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {form.screenshots.map((shot, index) => (
                      <div key={`${shot.url || shot.alt}-${index}`} className="border border-border-subtle rounded-lg overflow-hidden bg-white">
                        {shot.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={shot.url} alt={shot.alt} className="w-full h-20 object-cover" />
                        ) : (
                          <div className="w-full h-20 bg-surface-raised" />
                        )}
                        <div className="p-2">
                          <p className="text-xs text-ink-muted truncate">{shot.alt}</p>
                          <button
                            type="button"
                            onClick={() => removeScreenshot(index)}
                            className="text-xs text-red-600 hover:underline mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Tiers JSON</label>
                  <textarea
                    rows={10}
                    value={form.tiersJson}
                    onChange={(event) => setForm((prev) => ({ ...prev, tiersJson: event.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink bg-canvas font-mono resize-none"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Features JSON</label>
                  <textarea
                    rows={10}
                    value={form.saasFeaturesJson}
                    onChange={(event) => setForm((prev) => ({ ...prev, saasFeaturesJson: event.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink bg-canvas font-mono resize-none"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">FAQ JSON</label>
                  <textarea
                    rows={10}
                    value={form.faqJson}
                    onChange={(event) => setForm((prev) => ({ ...prev, faqJson: event.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink bg-canvas font-mono resize-none"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) => setForm((prev) => ({ ...prev, published: event.target.checked }))}
                  className="w-4 h-4 accent-[#4A6FA5]"
                />
                <span className="text-sm text-ink">Published (visible on site)</span>
              </label>

              {uploading && <p className="text-xs text-accent">{uploading}</p>}
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              {saveError && <p className="flex-1 text-xs text-red-600 self-center">{saveError}</p>}
              <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name.trim() || !form.tagline.trim()}
                className="px-4 py-2 bg-ink text-white text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editId ? 'Save changes' : 'Add application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
