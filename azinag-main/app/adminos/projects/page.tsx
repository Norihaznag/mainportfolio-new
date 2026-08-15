'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import { AdminShell } from '../_shell';
import { uploadFileToCloudinary } from '@/lib/upload-client';

interface Project {
  id: string;
  title: string;
  description: string | null;
  live_url: string | null;
  thumbnail_url: string | null;
  download_url: string | null;
  tags: string[];
  category: string;
  sort_order: number;
  featured: boolean;
  published: boolean;
}

type FormState = {
  title: string; description: string; live_url: string; thumbnail_url: string;
  download_url: string; tags: string; category: string; sort_order: number;
  featured: boolean; published: boolean;
};

const EMPTY: FormState = {
  title: '', description: '', live_url: '', thumbnail_url: '', download_url: '',
  tags: '', category: 'Web', sort_order: 0, featured: false, published: true,
};

function extractDomain(url: string): string {
  try {
    const normalized = url.startsWith('http') ? url : `https://${url}`;
    return new URL(normalized).hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  }
}

function getThumb(liveUrl: string | null, thumbnailUrl: string | null): string {
  if (thumbnailUrl) return thumbnailUrl;
  if (liveUrl) return `https://image.thum.io/get/width/600/crop/400/${liveUrl}`;
  return '';
}

function slugify(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const INPUT = 'w-full px-3 py-2 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent';
const LABEL = 'block text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1';

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const [quickUrl, setQuickUrl] = useState('');
  const [quickType, setQuickType] = useState('');
  const [quickTags, setQuickTags] = useState('');
  const [quickAdding, setQuickAdding] = useState(false);
  const [quickDone, setQuickDone] = useState(false);

  const load = async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/projects?t=${Date.now()}`, { cache: 'no-store' });
    if (r.ok) { const d = await r.json(); setItems(d.projects || []); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setSaveError(null); setOpen(true); };
  const openEdit = (p: Project) => {
    setSaveError(null);
    setForm({
      title: p.title, description: p.description || '', live_url: p.live_url || '',
      thumbnail_url: p.thumbnail_url || '', download_url: p.download_url || '',
      tags: (p.tags || []).join(', '), category: p.category || 'Web',
      sort_order: p.sort_order ?? 0, featured: p.featured ?? false, published: p.published ?? true,
    });
    setEditId(p.id);
    setOpen(true);
  };
  const closeModal = () => { setOpen(false); setEditId(null); };

  const handleQuickAdd = async () => {
    const url = quickUrl.trim();
    const type = quickType.trim();
    if (!url || !type) return;
    setQuickAdding(true); setQuickDone(false);
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    const res = await fetch('/api/admin/projects', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: extractDomain(normalizedUrl), description: type, live_url: normalizedUrl, thumbnail_url: '', download_url: '', tags: quickTags, category: 'Web', sort_order: 0, featured: false, published: true }),
    });
    setQuickAdding(false);
    if (!res.ok) { const e = await res.json().catch(() => ({})); alert(e.message || `Save failed (${res.status})`); return; }
    setQuickUrl(''); setQuickType(''); setQuickTags('');
    setQuickDone(true);
    setTimeout(() => setQuickDone(false), 2000);
    load();
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true); setSaveError(null);
    const body = { ...form };
    const res = editId
      ? await fetch(`/api/admin/projects/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/admin/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setSaving(false);
    if (!res.ok) { const e = await res.json().catch(() => ({})); setSaveError(e.message || `Error ${res.status}`); return; }
    closeModal(); load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setItems(p => p.filter(x => x.id !== id));
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    if (!res.ok) { alert('Delete failed'); load(); }
  };

  const handleThumbnailUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading('Uploading…');
    try {
      const up = await uploadFileToCloudinary(file, {
        folder: `azinag/projects/${slugify(form.title || 'project')}/thumbnails`,
        resourceType: 'image',
      });
      setForm(p => ({ ...p, thumbnail_url: up.secureUrl }));
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Upload failed');
    } finally { setUploading(null); event.target.value = ''; }
  };

  const previewThumb = getThumb(form.live_url || null, form.thumbnail_url || null);

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-ink">Projects</h1>
          <p className="text-sm text-ink-muted mt-0.5">Portfolio shown on the public site</p>
        </div>
        <button onClick={openAdd} className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors">
          + New project
        </button>
      </div>

      {/* Quick Add */}
      <div className="mb-6 border border-border-subtle rounded-xl bg-surface p-4">
        <p className="text-[11px] font-bold text-ink-muted uppercase tracking-wide mb-2">⚡ Quick Add by URL</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input value={quickUrl} onChange={e => setQuickUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleQuickAdd()}
            placeholder="example.com or https://example.com" className={`${INPUT} flex-1 min-w-0`} />
          <input value={quickType} onChange={e => setQuickType(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleQuickAdd()}
            placeholder="e.g. car rental website" className={`${INPUT} flex-1 min-w-0`} />
          <input value={quickTags} onChange={e => setQuickTags(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleQuickAdd()}
            placeholder="Tags: Next.js, Tailwind (optional)" className={`${INPUT} flex-1 min-w-0`} />
          <button onClick={handleQuickAdd} disabled={quickAdding || !quickUrl.trim() || !quickType.trim()}
            className="shrink-0 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50">
            {quickAdding ? 'Adding…' : quickDone ? '✓ Done!' : '+ Add'}
          </button>
        </div>
        <p className="text-xs text-ink-faint mt-1.5">Domain auto-extracted as title · thumbnail auto-generated · published immediately</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="border border-border-subtle rounded-xl bg-surface py-16 text-center">
          <p className="text-ink-muted text-sm">No projects yet.</p>
          <button onClick={openAdd} className="mt-4 text-sm font-medium text-accent hover:underline">Add first project</button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(p => {
            const thumb = getThumb(p.live_url, p.thumbnail_url);
            return (
              <div key={p.id} className="border border-border-subtle rounded-xl bg-surface overflow-hidden flex flex-col">
                {thumb ? (
                  <div className="relative w-full aspect-[16/9] bg-surface-raised overflow-hidden">
                    <Image src={thumb} alt={p.title} fill className="object-cover" unoptimized />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/9] bg-surface-raised flex items-center justify-center">
                    <span className="text-ink-faint text-xs">No preview</span>
                  </div>
                )}
                <div className="p-3 flex flex-col gap-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="text-sm font-semibold text-ink truncate">{p.title}</span>
                    {p.featured && <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">Featured</span>}
                    <span className={`ml-auto shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${p.published ? 'bg-green-50 text-green-700' : 'bg-surface-raised text-ink-faint'}`}>
                      {p.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  {p.description && <p className="text-xs text-ink-muted line-clamp-2">{p.description}</p>}
                  {p.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map(t => <span key={t} className="text-xs px-1.5 py-0.5 rounded-full bg-accent-light text-accent font-medium">{t}</span>)}
                    </div>
                  )}
                  {p.live_url && (
                    <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline truncate mt-auto pt-1">{p.live_url}</a>
                  )}
                  <div className="flex items-center gap-4 mt-1 pt-2 border-t border-border-subtle">
                    <button onClick={() => openEdit(p)} className="text-xs text-ink-muted hover:text-ink transition-colors">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-xs text-red-500 hover:text-red-700 transition-colors">Delete</button>
                    <span className="ml-auto text-xs text-ink-faint">#{p.sort_order}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-8 overflow-y-auto">
          <div className="bg-surface rounded-2xl border border-border-subtle w-full max-w-lg flex flex-col" style={{ maxHeight: '90vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle shrink-0">
              <h2 className="text-base font-bold">{editId ? 'Edit project' : 'New project'}</h2>
              <button onClick={closeModal} className="text-ink-faint hover:text-ink text-xs px-2 py-1 rounded hover:bg-surface-raised transition-colors">✕</button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              <div>
                <label className={LABEL}>Project name *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className={INPUT} placeholder="Acme Corp website" autoFocus />
              </div>

              <div>
                <label className={LABEL}>Description</label>
                <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className={`${INPUT} resize-none`} placeholder="Short description" />
              </div>

              <div>
                <label className={LABEL}>Live URL <span className="normal-case font-normal text-ink-faint">(used for auto-thumbnail)</span></label>
                <input value={form.live_url} onChange={e => setForm(f => ({ ...f, live_url: e.target.value }))}
                  className={INPUT} placeholder="https://my-project.vercel.app" />
              </div>

              <div>
                <label className={LABEL}>Thumbnail URL <span className="normal-case font-normal text-ink-faint">(leave empty to auto-screenshot)</span></label>
                <div className="flex gap-2">
                  <input value={form.thumbnail_url} onChange={e => setForm(f => ({ ...f, thumbnail_url: e.target.value }))}
                    className={`${INPUT} flex-1`} placeholder="https://..." />
                  <label className="shrink-0 cursor-pointer px-3 py-2 rounded-lg border border-border-subtle text-xs text-ink-muted hover:bg-surface-raised transition-colors">
                    Upload
                    <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
                  </label>
                </div>
                {uploading && <p className="text-xs text-accent mt-1">{uploading}</p>}
              </div>

              {previewThumb && (
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border-subtle bg-surface-raised">
                  <Image src={previewThumb} alt="preview" fill className="object-cover" unoptimized />
                </div>
              )}

              <div>
                <label className={LABEL}>Download URL <span className="normal-case font-normal text-ink-faint">(hosted HTTPS only)</span></label>
                <input value={form.download_url} onChange={e => setForm(f => ({ ...f, download_url: e.target.value }))}
                  className={INPUT} placeholder="https://.../program.zip" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Category</label>
                  <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className={INPUT} placeholder="Web, E-com, SaaS…" />
                </div>
                <div>
                  <label className={LABEL}>Sort order</label>
                  <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))}
                    className={INPUT} placeholder="0" />
                </div>
              </div>

              <div>
                <label className={LABEL}>Tags <span className="normal-case font-normal text-ink-faint">(comma-separated)</span></label>
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                  className={INPUT} placeholder="Next.js, Supabase, Tailwind" />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-[#4A6FA5]" />
                  <span className="text-sm text-ink">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#4A6FA5]" />
                  <span className="text-sm text-ink">Published</span>
                </label>
              </div>
            </div>

            {/* Sticky footer */}
            <div className="shrink-0 px-5 py-4 border-t border-border-subtle bg-surface flex items-center gap-3">
              {saveError && <p className="flex-1 text-xs text-red-600">{saveError}</p>}
              <div className="ml-auto flex gap-3">
                <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.title.trim()}
                  className="px-5 py-2 bg-ink text-white text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50">
                  {saving ? 'Saving…' : editId ? 'Save changes' : 'Add project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
