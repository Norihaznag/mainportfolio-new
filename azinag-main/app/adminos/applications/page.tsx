'use client';

import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import { AdminShell } from '../_shell';
import type { AppFaq, AppSaasFeature, AppScreenshot, AppTier, DownloadableApp } from '@/lib/apps-data';
import { AppManifestValidationError, manifestToAppPayload, parseAppManifest } from '@/lib/app-manifest';
import { uploadFileToCloudinary } from '@/lib/upload-client';
import { ChevronDown, ChevronRight } from 'lucide-react';

type FormState = {
  slug: string; name: string; tagline: string; description: string;
  appImageUrl: string; icon: string; category: string; badge: '' | 'New' | 'Popular';
  monthlyPrice: string; annualPrice: string; latestVersion: string; releaseDate: string;
  liveDemoUrl: string; documentation: string; githubRepo: string;
  sortOrder: number; published: boolean;
  windowsUrl: string; windowsVersion: string; windowsSize: string;
  macosUrl: string; macosVersion: string; macosSize: string;
  linuxUrl: string; linuxVersion: string; linuxSize: string;
  iosUrl: string; iosVersion: string;
  androidUrl: string; androidVersion: string;
  webUrl: string;
  tiersJson: string; saasFeaturesJson: string; faqJson: string;
  screenshots: AppScreenshot[];
};

const EMPTY: FormState = {
  slug: '', name: '', tagline: '', description: '',
  appImageUrl: '', icon: 'LayoutGrid', category: 'pme', badge: '',
  monthlyPrice: '', annualPrice: '', latestVersion: '1.0.0',
  releaseDate: new Date().toISOString().slice(0, 10),
  liveDemoUrl: '', documentation: '', githubRepo: '',
  sortOrder: 0, published: true,
  windowsUrl: '', windowsVersion: '', windowsSize: '',
  macosUrl: '', macosVersion: '', macosSize: '',
  linuxUrl: '', linuxVersion: '', linuxSize: '',
  iosUrl: '', iosVersion: '',
  androidUrl: '', androidVersion: '',
  webUrl: '',
  tiersJson: '[]', saasFeaturesJson: '[]', faqJson: '[]',
  screenshots: [],
};

function slugify(v: string) {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function toPrettyJson(v: unknown) { return JSON.stringify(v, null, 2); }

function safeParseArray<T>(json: string, label: string): T[] {
  if (!json.trim()) return [];
  try {
    const p = JSON.parse(json);
    if (!Array.isArray(p)) throw new Error(`${label} must be a JSON array.`);
    return p as T[];
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : `Invalid ${label} JSON.`);
  }
}

function fromPayload(payload: Partial<DownloadableApp>): FormState {
  const pl = payload.platforms || {};
  return {
    ...EMPTY,
    slug: payload.slug || '',
    name: payload.name || '',
    tagline: payload.tagline || '',
    description: payload.description || '',
    appImageUrl: payload.screenshots?.find(s => !!s.url)?.url || '',
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
    windowsUrl: pl.windows?.url || '', windowsVersion: pl.windows?.version || '', windowsSize: pl.windows?.size || '',
    macosUrl: pl.macos?.url || '', macosVersion: pl.macos?.version || '', macosSize: pl.macos?.size || '',
    linuxUrl: pl.linux?.url || '', linuxVersion: pl.linux?.version || '', linuxSize: pl.linux?.size || '',
    iosUrl: pl.ios?.appStoreUrl || '', iosVersion: pl.ios?.version || '',
    androidUrl: pl.android?.playStoreUrl || '', androidVersion: pl.android?.version || '',
    webUrl: pl.web?.liveUrl || '',
    tiersJson: toPrettyJson(payload.tiers || []),
    saasFeaturesJson: toPrettyJson(payload.saasFeatures || []),
    faqJson: toPrettyJson(payload.faq || []),
    screenshots: payload.screenshots || [],
  };
}

const INPUT = 'w-full px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent';
const LABEL = 'block text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={LABEL}>{label}</label>{children}</div>;
}

function SectionHeader({ label, open, onToggle, count }: { label: string; open: boolean; onToggle: () => void; count?: number }) {
  return (
    <button type="button" onClick={onToggle} className="w-full flex items-center gap-2 py-2 text-left group">
      <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wide group-hover:text-ink transition-colors">{label}</span>
      {count !== undefined && count > 0 && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-light text-accent font-medium">{count}</span>
      )}
      <span className="ml-auto text-ink-faint">{open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
    </button>
  );
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

  // Manifest import
  const [manifestText, setManifestText] = useState('');
  const [manifestNotice, setManifestNotice] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Collapsible sections
  const [showDownloads, setShowDownloads] = useState(false);
  const [showScreenshots, setShowScreenshots] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Screenshot URL paste
  const [shotUrl, setShotUrl] = useState('');

  const load = async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/apps?t=${Date.now()}`, { cache: 'no-store' });
    if (r.ok) { const d = await r.json(); setItems(d.apps || []); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setForm(EMPTY); setEditId(null); setSaveError(null);
    setManifestText(''); setManifestNotice(null);
    setShowDownloads(false); setShowScreenshots(false); setShowAdvanced(false);
    setShotUrl('');
    setOpen(true);
  };

  const openEdit = (app: DownloadableApp) => {
    setSaveError(null);
    setForm({
      slug: app.slug || '', name: app.name, tagline: app.tagline,
      description: app.description || '',
      appImageUrl: app.screenshots?.find(s => !!s.url)?.url || '',
      icon: app.icon || 'LayoutGrid',
      category: app.sector || app.category || 'pme',
      badge: app.badge || '',
      monthlyPrice: app.monthlyPrice ? String(app.monthlyPrice) : '',
      annualPrice: app.annualPrice ? String(app.annualPrice) : '',
      latestVersion: app.latestVersion || '1.0.0',
      releaseDate: (app.releaseDate || '').slice(0, 10),
      liveDemoUrl: app.liveDemoUrl || '', documentation: app.documentation || '',
      githubRepo: app.githubRepo || '', sortOrder: app.sortOrder ?? 0, published: app.published ?? true,
      windowsUrl: app.platforms.windows?.url || '', windowsVersion: app.platforms.windows?.version || '',
      windowsSize: app.platforms.windows?.size || '',
      macosUrl: app.platforms.macos?.url || '', macosVersion: app.platforms.macos?.version || '',
      macosSize: app.platforms.macos?.size || '',
      linuxUrl: app.platforms.linux?.url || '', linuxVersion: app.platforms.linux?.version || '',
      linuxSize: app.platforms.linux?.size || '',
      iosUrl: app.platforms.ios?.appStoreUrl || '', iosVersion: app.platforms.ios?.version || '',
      androidUrl: app.platforms.android?.playStoreUrl || '', androidVersion: app.platforms.android?.version || '',
      webUrl: app.platforms.web?.liveUrl || '',
      tiersJson: toPrettyJson(app.tiers || []),
      saasFeaturesJson: toPrettyJson(app.saasFeatures || []),
      faqJson: toPrettyJson(app.faq || []),
      screenshots: app.screenshots || [],
    });
    setEditId(app.id);
    setManifestText(''); setManifestNotice(null); setShotUrl('');
    const hasPlatforms = Object.values(app.platforms || {}).some(Boolean);
    setShowDownloads(hasPlatforms);
    setShowScreenshots((app.screenshots || []).length > 0);
    setShowAdvanced((app.tiers || []).length > 0 || (app.saasFeatures || []).length > 0 || (app.faq || []).length > 0);
    setOpen(true);
  };

  const closeModal = () => { setOpen(false); setEditId(null); };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      file.text().then(text => {
        setManifestText(text);
        setSaveError(null);
        setManifestNotice(null);
      });
    }
  };

  const handleImport = async () => {
    setSaveError(null);
    setManifestNotice(null);
    const raw = manifestText.trim();
    if (!raw) { setSaveError('Paste or drop a manifest JSON first.'); return; }
    try {
      const manifest = parseAppManifest(raw);
      const payload = manifestToAppPayload(manifest);
      setForm(fromPayload(payload));

      const platformCount = [
        payload.platforms?.windows?.url, payload.platforms?.macos?.url,
        payload.platforms?.linux?.url, payload.platforms?.ios?.appStoreUrl,
        payload.platforms?.android?.playStoreUrl, payload.platforms?.web?.liveUrl,
      ].filter(Boolean).length;
      const screenshotCount = payload.screenshots?.length ?? 0;
      const tierCount = payload.tiers?.length ?? 0;

      if (platformCount > 0) setShowDownloads(true);
      if (screenshotCount > 0) setShowScreenshots(true);
      if (tierCount > 0 || (payload.saasFeatures?.length ?? 0) > 0 || (payload.faq?.length ?? 0) > 0) setShowAdvanced(true);

      setManifestNotice(`✓ Imported ${payload.name} — ${platformCount} platform${platformCount !== 1 ? 's' : ''}, ${screenshotCount} screenshot${screenshotCount !== 1 ? 's' : ''}, ${tierCount} tier${tierCount !== 1 ? 's' : ''}. Review below, then save.`);
    } catch (err) {
      const msg = err instanceof AppManifestValidationError
        ? err.issues.join('\n')
        : err instanceof Error ? err.message : 'Invalid manifest.';
      setSaveError(msg);
    }
  };

  const handleAppImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading('Uploading image…');
    try {
      const up = await uploadFileToCloudinary(file, {
        folder: `azinag/apps/${slugify(form.slug || form.name || 'app')}/cover`,
        resourceType: 'image',
      });
      setForm(p => ({ ...p, appImageUrl: up.secureUrl }));
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Upload failed.');
    } finally { setUploading(null); e.target.value = ''; }
  };

  const handleScreenshotUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading('Uploading screenshots…');
    try {
      const added: AppScreenshot[] = [];
      for (const file of files) {
        const up = await uploadFileToCloudinary(file, {
          folder: `azinag/apps/${slugify(form.slug || form.name || 'app')}/screenshots`,
          resourceType: 'image',
        });
        added.push({ alt: file.name.replace(/\.[^/.]+$/, ''), bg: 'from-slate-700 to-slate-900', url: up.secureUrl });
      }
      setForm(p => ({ ...p, screenshots: [...p.screenshots, ...added] }));
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Upload failed.');
    } finally { setUploading(null); e.target.value = ''; }
  };

  const addScreenshotByUrl = () => {
    const url = shotUrl.trim();
    if (!url) return;
    setForm(p => ({ ...p, screenshots: [...p.screenshots, { url, alt: '', bg: 'from-slate-700 to-slate-900' }] }));
    setShotUrl('');
  };

  const removeScreenshot = (i: number) => setForm(p => ({ ...p, screenshots: p.screenshots.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.tagline.trim()) { setSaveError('Name and tagline are required.'); return; }
    setSaving(true); setSaveError(null);
    try {
      const tiers = safeParseArray<AppTier>(form.tiersJson, 'tiers');
      const saasFeatures = safeParseArray<AppSaasFeature>(form.saasFeaturesJson, 'saasFeatures');
      const faq = safeParseArray<AppFaq>(form.faqJson, 'faq');
      const ver = form.latestVersion.trim() || '1.0.0';

      const cleanShots = form.screenshots.filter(s => s.alt?.trim() || s.url?.trim());
      const appImageUrl = form.appImageUrl.trim();
      const screenshots = appImageUrl
        ? [{ alt: `${form.name.trim()} cover`, bg: 'from-slate-700 to-slate-900', url: appImageUrl }, ...cleanShots.filter(s => s.url !== appImageUrl)]
        : cleanShots;

      const platforms: Record<string, unknown> = {};
      if (form.windowsUrl.trim()) platforms.windows = { url: form.windowsUrl.trim(), version: form.windowsVersion.trim() || ver, size: form.windowsSize.trim() || undefined };
      if (form.macosUrl.trim()) platforms.macos = { url: form.macosUrl.trim(), version: form.macosVersion.trim() || ver, size: form.macosSize.trim() || undefined };
      if (form.linuxUrl.trim()) platforms.linux = { url: form.linuxUrl.trim(), version: form.linuxVersion.trim() || ver, size: form.linuxSize.trim() || undefined };
      if (form.iosUrl.trim()) platforms.ios = { appStoreUrl: form.iosUrl.trim(), version: form.iosVersion.trim() || ver };
      if (form.androidUrl.trim()) platforms.android = { playStoreUrl: form.androidUrl.trim(), version: form.androidVersion.trim() || ver };
      if (form.webUrl.trim()) platforms.web = { liveUrl: form.webUrl.trim() };

      const body = {
        slug: slugify(form.slug || form.name),
        name: form.name.trim(), tagline: form.tagline.trim(), description: form.description.trim(),
        icon: form.icon.trim() || 'LayoutGrid', category: form.category,
        badge: form.badge || undefined,
        monthlyPrice: form.monthlyPrice.trim() ? Number(form.monthlyPrice) : undefined,
        annualPrice: form.annualPrice.trim() ? Number(form.annualPrice) : undefined,
        latestVersion: ver,
        releaseDate: form.releaseDate ? new Date(form.releaseDate).toISOString() : undefined,
        liveDemoUrl: form.liveDemoUrl.trim() || undefined,
        documentation: form.documentation.trim() || undefined,
        githubRepo: form.githubRepo.trim() || undefined,
        sortOrder: form.sortOrder, published: form.published,
        platforms, tiers, saasFeatures, faq, screenshots,
      };

      const res = editId
        ? await fetch(`/api/admin/apps/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        : await fetch('/api/admin/apps', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

      if (!res.ok) { const p = await res.json().catch(() => ({})); throw new Error(p.message || `Error ${res.status}`); }
      closeModal(); load();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this application?')) return;
    setItems(p => p.filter(a => a.id !== id));
    const res = await fetch(`/api/admin/apps/${id}`, { method: 'DELETE' });
    if (!res.ok) { alert('Delete failed'); load(); }
  };

  const platformCount = [form.windowsUrl, form.macosUrl, form.linuxUrl, form.iosUrl, form.androidUrl, form.webUrl].filter(u => u.trim()).length;

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-ink">Applications</h1>
          <p className="text-sm text-ink-muted mt-0.5">SaaS applications shown on the public catalog</p>
        </div>
        <button onClick={openAdd} className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors">
          + New app
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="border border-border-subtle rounded-2xl bg-surface py-16 text-center">
          <p className="text-ink-muted text-sm">No applications yet.</p>
          <button onClick={openAdd} className="mt-4 text-sm font-medium text-accent hover:underline">Add first app</button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(app => (
            <div key={app.id} className="border border-border-subtle rounded-xl bg-surface p-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-semibold text-ink truncate">{app.name}</span>
                {app.badge && <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-accent-light text-accent font-medium">{app.badge}</span>}
                <span className={`ml-auto shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${app.published ? 'bg-green-50 text-green-700' : 'bg-surface-raised text-ink-faint'}`}>
                  {app.published ? 'Live' : 'Draft'}
                </span>
              </div>
              <p className="text-xs text-ink-faint">/{app.slug}</p>
              <p className="text-xs text-ink-muted line-clamp-2">{app.tagline}</p>
              <p className="text-xs text-ink-faint">{app.monthlyPrice ? `${app.monthlyPrice} MAD/mo` : 'No pricing'}</p>
              <div className="flex items-center gap-4 mt-1 pt-2 border-t border-border-subtle">
                <button onClick={() => openEdit(app)} className="text-xs text-ink-muted hover:text-ink transition-colors">Edit</button>
                <button onClick={() => handleDelete(app.id)} className="text-xs text-red-500 hover:text-red-700 transition-colors">Delete</button>
                <span className="ml-auto text-xs text-ink-faint">#{app.sortOrder ?? 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-8 overflow-y-auto">
          <div className="bg-surface rounded-2xl border border-border-subtle w-full max-w-2xl flex flex-col" style={{ maxHeight: '90vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle shrink-0">
              <h2 className="text-base font-bold">{editId ? 'Edit application' : 'New application'}</h2>
              <button onClick={closeModal} className="text-ink-faint hover:text-ink text-xs px-2 py-1 rounded hover:bg-surface-raised transition-colors">✕ Close</button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              {/* ── IMPORT MANIFEST ── */}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`rounded-xl border-2 border-dashed p-4 transition-colors ${dragOver ? 'border-accent bg-accent-light/20' : 'border-border-subtle bg-canvas'}`}
              >
                <p className="text-[11px] font-bold text-ink-muted uppercase tracking-wide mb-2">Import manifest JSON</p>
                <p className="text-xs text-ink-faint mb-3">Drag a JSON file here, paste below, or click to pick a file. Import fills the form — review then save.</p>
                <textarea
                  rows={3}
                  value={manifestText}
                  onChange={e => { setManifestText(e.target.value); setManifestNotice(null); }}
                  placeholder='{"schemaVersion":"azinag-app-manifest/v1","slug":"my-app","name":"My App","tagline":"...","category":"pme"}'
                  className="w-full px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink bg-white font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
                <div className="flex items-center gap-3 mt-2">
                  <button type="button" onClick={handleImport}
                    className="px-3.5 py-1.5 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors">
                    Import
                  </button>
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg border border-border-subtle text-xs text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
                    Pick file
                  </button>
                  <input ref={fileInputRef} type="file" accept=".json,application/json" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) f.text().then(t => { setManifestText(t); setManifestNotice(null); }); e.target.value = ''; }} />
                  {manifestNotice && <p className="flex-1 text-xs text-emerald-700 leading-snug">{manifestNotice}</p>}
                </div>
              </div>

              {/* ── IDENTITY ── */}
              <div className="space-y-3">
                <p className={LABEL}>Identity</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Name *">
                    <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value, slug: p.slug || slugify(e.target.value) }))}
                      className={INPUT} placeholder="Azinag CRM" />
                  </Field>
                  <Field label="Slug *">
                    <input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: slugify(e.target.value) }))}
                      className={INPUT} placeholder="azinag-crm" />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Tagline *">
                    <input value={form.tagline} onChange={e => setForm(p => ({ ...p, tagline: e.target.value }))}
                      className={INPUT} placeholder="Manage operations in one place" />
                  </Field>
                  <Field label="Icon (Lucide name)">
                    <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}
                      className={INPUT} placeholder="LayoutGrid" />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea rows={2} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    className={`${INPUT} resize-none`} placeholder="What problem does this solve?" />
                </Field>
              </div>

              {/* ── PRICING & RELEASE ── */}
              <div className="space-y-3">
                <p className={LABEL}>Pricing & Release</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Field label="Monthly (MAD)">
                    <input type="number" value={form.monthlyPrice} onChange={e => setForm(p => ({ ...p, monthlyPrice: e.target.value }))}
                      className={INPUT} placeholder="490" />
                  </Field>
                  <Field label="Annual (MAD)">
                    <input type="number" value={form.annualPrice} onChange={e => setForm(p => ({ ...p, annualPrice: e.target.value }))}
                      className={INPUT} placeholder="390" />
                  </Field>
                  <Field label="Version">
                    <input value={form.latestVersion} onChange={e => setForm(p => ({ ...p, latestVersion: e.target.value }))}
                      className={INPUT} placeholder="1.0.0" />
                  </Field>
                  <Field label="Release date">
                    <input type="date" value={form.releaseDate} onChange={e => setForm(p => ({ ...p, releaseDate: e.target.value }))}
                      className={INPUT} />
                  </Field>
                </div>
              </div>

              {/* ── LINKS ── */}
              <div className="space-y-3">
                <p className={LABEL}>Links</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <Field label="Live demo URL">
                    <input value={form.liveDemoUrl} onChange={e => setForm(p => ({ ...p, liveDemoUrl: e.target.value }))}
                      className={INPUT} placeholder="https://app.example.com" />
                  </Field>
                  <Field label="Docs URL">
                    <input value={form.documentation} onChange={e => setForm(p => ({ ...p, documentation: e.target.value }))}
                      className={INPUT} placeholder="https://docs.example.com" />
                  </Field>
                  <Field label="GitHub URL">
                    <input value={form.githubRepo} onChange={e => setForm(p => ({ ...p, githubRepo: e.target.value }))}
                      className={INPUT} placeholder="https://github.com/org/repo" />
                  </Field>
                </div>
              </div>

              {/* ── APP IMAGE ── */}
              <div className="space-y-2">
                <p className={LABEL}>App image (hero)</p>
                <div className="flex gap-2 items-center">
                  <input value={form.appImageUrl} onChange={e => setForm(p => ({ ...p, appImageUrl: e.target.value }))}
                    className={`${INPUT} flex-1`} placeholder="https://cdn.example.com/cover.png" />
                  <label className="shrink-0 cursor-pointer px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink-muted hover:bg-surface-raised transition-colors">
                    Upload
                    <input type="file" accept="image/*" className="hidden" onChange={handleAppImageUpload} />
                  </label>
                </div>
                {form.appImageUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={form.appImageUrl} alt="cover preview" className="h-20 rounded-lg object-cover border border-border-subtle" />
                )}
              </div>

              {/* ── DOWNLOADS (collapsible) ── */}
              <div className="border border-border-subtle rounded-xl overflow-hidden">
                <div className="px-4 py-2 bg-canvas border-b border-border-subtle">
                  <SectionHeader label="Download URLs" open={showDownloads} onToggle={() => setShowDownloads(v => !v)} count={platformCount} />
                </div>
                {showDownloads && (
                  <div className="px-4 py-3 space-y-2">
                    <p className="text-xs text-ink-faint mb-2">Hosted HTTPS URLs only. Version defaults to the latestVersion above if left empty.</p>
                    {([
                      { label: 'Windows', url: form.windowsUrl, ver: form.windowsVersion, size: form.windowsSize, ph: 'setup.exe',
                        onUrl: (v: string) => setForm(p => ({ ...p, windowsUrl: v })),
                        onVer: (v: string) => setForm(p => ({ ...p, windowsVersion: v })),
                        onSize: (v: string) => setForm(p => ({ ...p, windowsSize: v })),
                      },
                      { label: 'macOS', url: form.macosUrl, ver: form.macosVersion, size: form.macosSize, ph: 'app.dmg',
                        onUrl: (v: string) => setForm(p => ({ ...p, macosUrl: v })),
                        onVer: (v: string) => setForm(p => ({ ...p, macosVersion: v })),
                        onSize: (v: string) => setForm(p => ({ ...p, macosSize: v })),
                      },
                      { label: 'Linux', url: form.linuxUrl, ver: form.linuxVersion, size: form.linuxSize, ph: 'app.AppImage',
                        onUrl: (v: string) => setForm(p => ({ ...p, linuxUrl: v })),
                        onVer: (v: string) => setForm(p => ({ ...p, linuxVersion: v })),
                        onSize: (v: string) => setForm(p => ({ ...p, linuxSize: v })),
                      },
                    ] as const).map(({ label, url, ver, size, ph, onUrl, onVer, onSize }) => (
                      <div key={label} className="grid grid-cols-[64px_1fr_72px_60px] gap-2 items-center">
                        <span className="text-xs text-ink-faint">{label}</span>
                        <input value={url} onChange={e => onUrl(e.target.value)} className={INPUT} placeholder={`https://.../${ph}`} />
                        <input value={ver} onChange={e => onVer(e.target.value)} className={INPUT} placeholder={form.latestVersion || '1.0.0'} />
                        <input value={size} onChange={e => onSize(e.target.value)} className={INPUT} placeholder="MB" />
                      </div>
                    ))}
                    {([
                      { label: 'iOS', url: form.iosUrl, ver: form.iosVersion, ph: 'apps.apple.com/...',
                        onUrl: (v: string) => setForm(p => ({ ...p, iosUrl: v })),
                        onVer: (v: string) => setForm(p => ({ ...p, iosVersion: v })),
                      },
                      { label: 'Android', url: form.androidUrl, ver: form.androidVersion, ph: 'play.google.com/...',
                        onUrl: (v: string) => setForm(p => ({ ...p, androidUrl: v })),
                        onVer: (v: string) => setForm(p => ({ ...p, androidVersion: v })),
                      },
                    ] as const).map(({ label, url, ver, ph, onUrl, onVer }) => (
                      <div key={label} className="grid grid-cols-[64px_1fr_72px] gap-2 items-center">
                        <span className="text-xs text-ink-faint">{label}</span>
                        <input value={url} onChange={e => onUrl(e.target.value)} className={INPUT} placeholder={ph} />
                        <input value={ver} onChange={e => onVer(e.target.value)} className={INPUT} placeholder={form.latestVersion || '1.0.0'} />
                      </div>
                    ))}
                    <div className="grid grid-cols-[64px_1fr] gap-2 items-center">
                      <span className="text-xs text-ink-faint">Web</span>
                      <input value={form.webUrl} onChange={e => setForm(p => ({ ...p, webUrl: e.target.value }))} className={INPUT} placeholder="https://app.example.com" />
                    </div>
                  </div>
                )}
              </div>

              {/* ── SCREENSHOTS (collapsible) ── */}
              <div className="border border-border-subtle rounded-xl overflow-hidden">
                <div className="px-4 py-2 bg-canvas border-b border-border-subtle">
                  <SectionHeader label="Screenshots" open={showScreenshots} onToggle={() => setShowScreenshots(v => !v)} count={form.screenshots.length} />
                </div>
                {showScreenshots && (
                  <div className="px-4 py-3 space-y-3">
                    <div className="flex gap-2">
                      <input value={shotUrl} onChange={e => setShotUrl(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addScreenshotByUrl()}
                        className={`${INPUT} flex-1`} placeholder="Paste screenshot URL…" />
                      <button type="button" onClick={addScreenshotByUrl}
                        className="shrink-0 px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink-muted hover:bg-surface-raised transition-colors">Add</button>
                      <label className="shrink-0 cursor-pointer px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink-muted hover:bg-surface-raised transition-colors">
                        Upload
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleScreenshotUpload} />
                      </label>
                    </div>
                    {form.screenshots.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {form.screenshots.map((shot, i) => (
                          <div key={`${shot.url}-${i}`} className="relative group rounded-lg overflow-hidden border border-border-subtle bg-surface-raised">
                            {shot.url
                              /* eslint-disable-next-line @next/next/no-img-element */
                              ? <img src={shot.url} alt={shot.alt} className="w-full h-16 object-cover" />
                              : <div className="w-full h-16 bg-surface-raised" />
                            }
                            <button type="button" onClick={() => removeScreenshot(i)}
                              className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── PUBLISH ── */}
              <div className="space-y-3">
                <p className={LABEL}>Publish settings</p>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Sector">
                    <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={INPUT}>
                      <option value="pme">SME / Commerce</option>
                      <option value="logistique">Logistics</option>
                      <option value="gestion">Management</option>
                      <option value="services">Services</option>
                    </select>
                  </Field>
                  <Field label="Badge">
                    <select value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value as FormState['badge'] }))} className={INPUT}>
                      <option value="">None</option>
                      <option value="Popular">Popular</option>
                      <option value="New">New</option>
                    </select>
                  </Field>
                  <Field label="Sort order">
                    <input type="number" value={form.sortOrder} onChange={e => setForm(p => ({ ...p, sortOrder: Number(e.target.value) || 0 }))} className={INPUT} />
                  </Field>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} className="w-4 h-4 accent-[#4A6FA5]" />
                  <span className="text-sm text-ink">Published (visible on site)</span>
                </label>
              </div>

              {/* ── ADVANCED (collapsible) ── */}
              <div className="border border-border-subtle rounded-xl overflow-hidden">
                <div className="px-4 py-2 bg-canvas border-b border-border-subtle">
                  <SectionHeader label="Advanced — Tiers, Features, FAQ" open={showAdvanced} onToggle={() => setShowAdvanced(v => !v)} />
                </div>
                {showAdvanced && (
                  <div className="px-4 py-3 grid sm:grid-cols-3 gap-3">
                    {([
                      { label: 'Tiers JSON', key: 'tiersJson' as const },
                      { label: 'Features JSON', key: 'saasFeaturesJson' as const },
                      { label: 'FAQ JSON', key: 'faqJson' as const },
                    ]).map(({ label, key }) => (
                      <div key={key}>
                        <label className={LABEL}>{label}</label>
                        <textarea rows={10} value={form[key]}
                          onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink bg-canvas font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent/30" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {uploading && <p className="text-xs text-accent">{uploading}</p>}
            </div>

            {/* Sticky footer */}
            <div className="shrink-0 px-6 py-4 border-t border-border-subtle bg-surface flex items-center gap-3">
              {saveError && <p className="flex-1 text-xs text-red-600 whitespace-pre-line leading-snug">{saveError}</p>}
              <div className="ml-auto flex gap-3">
                <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.name.trim() || !form.tagline.trim()}
                  className="px-5 py-2 bg-ink text-white text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50">
                  {saving ? 'Saving…' : editId ? 'Save changes' : 'Add application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
