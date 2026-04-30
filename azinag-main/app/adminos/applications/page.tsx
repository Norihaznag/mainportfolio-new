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
import {
  AppManifestValidationError,
  manifestToAppPayload,
  parseAppManifest,
} from '@/lib/app-manifest';
import { uploadFileToCloudinary } from '@/lib/upload-client';

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

function toFormStateFromAppPayload(payload: Partial<DownloadableApp>): FormState {
  const platforms = payload.platforms || {};
  const screenshots = payload.screenshots || [];

  return {
    ...EMPTY,
    slug: payload.slug || '',
    name: payload.name || '',
    tagline: payload.tagline || '',
    description: payload.description || '',
    appImageUrl: screenshots.find((shot) => !!shot.url)?.url || '',
    icon: payload.icon || 'LayoutGrid',
    category: payload.sector || payload.category || 'pme',
    badge: payload.badge || '',
    monthlyPrice: payload.monthlyPrice !== undefined ? String(payload.monthlyPrice) : '',
    annualPrice: payload.annualPrice !== undefined ? String(payload.annualPrice) : '',
    latestVersion: payload.latestVersion || '1.0.0',
    releaseDate: payload.releaseDate ? payload.releaseDate.slice(0, 10) : EMPTY.releaseDate,
    liveDemoUrl: payload.liveDemoUrl || '',
    documentation: payload.documentation || '',
    githubRepo: payload.githubRepo || '',
    sortOrder: payload.sortOrder ?? 0,
    published: payload.published ?? true,

    windowsUrl: platforms.windows?.url || '',
    windowsVersion: platforms.windows?.version || payload.latestVersion || '1.0.0',
    windowsSize: platforms.windows?.size || '',
    macosUrl: platforms.macos?.url || '',
    macosVersion: platforms.macos?.version || payload.latestVersion || '1.0.0',
    macosSize: platforms.macos?.size || '',
    linuxUrl: platforms.linux?.url || '',
    linuxVersion: platforms.linux?.version || payload.latestVersion || '1.0.0',
    linuxSize: platforms.linux?.size || '',
    iosUrl: platforms.ios?.appStoreUrl || '',
    iosVersion: platforms.ios?.version || payload.latestVersion || '1.0.0',
    androidUrl: platforms.android?.playStoreUrl || '',
    androidVersion: platforms.android?.version || payload.latestVersion || '1.0.0',
    webUrl: platforms.web?.liveUrl || '',

    tiersJson: toPrettyJson(payload.tiers || []),
    saasFeaturesJson: toPrettyJson(payload.saasFeatures || []),
    faqJson: toPrettyJson(payload.faq || []),
    screenshots,
  };
}

function buildManifestImportSummary(payload: Partial<DownloadableApp>): string {
  const platforms = payload.platforms || {};
  const platformCount = [
    platforms.windows?.url,
    platforms.macos?.url,
    platforms.linux?.url,
    platforms.ios?.appStoreUrl,
    platforms.android?.playStoreUrl,
    platforms.web?.liveUrl,
  ].filter(Boolean).length;

  const screenshotCount = payload.screenshots?.length || 0;
  const tierCount = payload.tiers?.length || 0;

  return `Imported ${payload.name || 'manifest'} with ${platformCount} platform URL${platformCount === 1 ? '' : 's'}, ${screenshotCount} screenshot${screenshotCount === 1 ? '' : 's'}, and ${tierCount} tier${tierCount === 1 ? '' : 's'}. Review the form, then save.`;
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
  const [manifestFile, setManifestFile] = useState<File | null>(null);
  const [manifestText, setManifestText] = useState('');
  const [manifestNotice, setManifestNotice] = useState<string | null>(null);

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
    setManifestFile(null);
    setManifestText('');
    setManifestNotice(null);
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
    setManifestFile(null);
    setManifestText('');
    setManifestNotice(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditId(null);
    setManifestFile(null);
    setManifestText('');
    setManifestNotice(null);
  };

  const handleImportAppManifest = async () => {
    setSaveError(null);
    setManifestNotice(null);

    try {
      let raw = manifestText.trim();
      if (!raw && manifestFile) {
        raw = (await manifestFile.text()).trim();
      }

      if (!raw) {
        setSaveError('Provide an app manifest JSON file or paste manifest JSON.');
        return;
      }

      const manifest = parseAppManifest(raw);
      const payload = manifestToAppPayload(manifest);

      setForm(toFormStateFromAppPayload(payload));
      setManifestNotice(buildManifestImportSummary(payload));
    } catch (error) {
      const message =
        error instanceof AppManifestValidationError
          ? error.issues.join('\n')
          : error instanceof Error
          ? error.message
          : 'Invalid app manifest payload.';
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
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Import app manifest</p>
                <p className="text-xs text-ink-faint">
                  Upload or paste one Azinag app manifest JSON. For manifest imports, binaries, images, and screenshots must already be hosted as HTTPS URLs.
                </p>
                <p className="text-[11px] text-ink-faint">
                  Importing fills this form only. Review the mapped fields, then click save to publish or update the app.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">Manifest JSON file</label>
                    <input
                      type="file"
                      accept="application/json,.json"
                      onChange={(event) => setManifestFile(event.target.files?.[0] || null)}
                      className="text-xs"
                    />
                    {manifestFile && <p className="mt-1 text-xs text-ink-faint">Selected {manifestFile.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">Or paste manifest JSON</label>
                    <textarea
                      rows={4}
                      value={manifestText}
                      onChange={(event) => setManifestText(event.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink bg-white font-mono resize-none"
                      placeholder='{"schemaVersion":"azinag-app-manifest/v1","slug":"my-app","name":"My App","tagline":"Short tagline","category":"pme"}'
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleImportAppManifest}
                    className="px-3.5 py-2 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors"
                  >
                    Import manifest
                  </button>
                  {manifestNotice && <p className="text-xs text-emerald-700">{manifestNotice}</p>}
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
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Download URLs</p>
                <p className="text-xs text-ink-faint">
                  Paste hosted HTTPS URLs for binaries. Large installers are not uploaded through admin.
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
              {saveError && <p className="flex-1 text-xs text-red-600 self-center whitespace-pre-line">{saveError}</p>}
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
