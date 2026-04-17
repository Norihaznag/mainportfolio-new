'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import { AdminShell } from '../_shell';
import { uploadFileToCloudinary, uploadFileToSupabaseStorage } from '@/lib/upload-client';

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
  title: string;
  description: string;
  live_url: string;
  thumbnail_url: string;
  download_url: string;
  tags: string;
  category: string;
  sort_order: number;
  featured: boolean;
  published: boolean;
};

const EMPTY: FormState = {
  title: '',
  description: '',
  live_url: '',
  thumbnail_url: '',
  download_url: '',
  tags: '',
  category: 'Web',
  sort_order: 0,
  featured: false,
  published: true,
};

function extractDomain(url: string): string {
  try {
    const normalized = url.startsWith('http') ? url : `https://${url}`;
    const hostname = new URL(normalized).hostname;
    return hostname.replace(/^www\./, '');
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
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  // Quick-add state
  const [quickUrl, setQuickUrl] = useState('');
  const [quickType, setQuickType] = useState('');
  const [quickTags, setQuickTags] = useState('');
  const [quickAdding, setQuickAdding] = useState(false);
  const [quickDone, setQuickDone] = useState(false);

  const load = async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/projects?t=${Date.now()}`, { cache: 'no-store' });
    if (r.ok) {
      const d = await r.json();
      setItems(d.projects || []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setSaveError(null); setOpen(true); };
  const openEdit = (p: Project) => {
    setSaveError(null);
    setForm({
      title: p.title,
      description: p.description || '',
      live_url: p.live_url || '',
      thumbnail_url: p.thumbnail_url || '',
      download_url: p.download_url || '',
      tags: (p.tags || []).join(', '),
      category: p.category || 'Web',
      sort_order: p.sort_order ?? 0,
      featured: p.featured ?? false,
      published: p.published ?? true,
    });
    setEditId(p.id);
    setOpen(true);
  };
  const closeModal = () => { setOpen(false); setEditId(null); };

  const handleQuickAdd = async () => {
    const url = quickUrl.trim();
    const type = quickType.trim();
    if (!url || !type) return;
    setQuickAdding(true);
    setQuickDone(false);
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    const domain = extractDomain(normalizedUrl);
    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: domain,
        description: type,
        live_url: normalizedUrl,
        thumbnail_url: '',
        download_url: '',
        tags: quickTags,
        category: 'Web',
        sort_order: 0,
        featured: false,
        published: true,
      }),
    });
    setQuickAdding(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.message || `Save failed (${res.status})`);
      return;
    }
    setQuickUrl('');
    setQuickType('');
    setQuickTags('');
    setQuickDone(true);
    setTimeout(() => setQuickDone(false), 2000);
    load();
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    setSaveError(null);
    const body = {
      title: form.title,
      description: form.description,
      live_url: form.live_url,
      thumbnail_url: form.thumbnail_url,
      download_url: form.download_url,
      tags: form.tags,
      category: form.category,
      sort_order: form.sort_order,
      featured: form.featured,
      published: form.published,
    };
    let res: Response;
    if (editId) {
      res = await fetch(`/api/admin/projects/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    } else {
      res = await fetch('/api/admin/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    }
    setSaving(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setSaveError(err.message || `Error ${res.status}`);
      return;
    }
    closeModal();
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setItems(prev => prev.filter(p => p.id !== id));
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    if (!res.ok) { alert('Delete failed'); load(); return; }
  };

  const handleUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    kind: 'thumbnail' | 'program'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const slug = slugify(form.title || 'project');
    setUploading(kind === 'thumbnail' ? 'Uploading thumbnail...' : 'Uploading program binary...');

    try {
      const uploaded =
        kind === 'thumbnail'
          ? await uploadFileToCloudinary(file, {
              folder: `azinag/projects/${slug}/thumbnails`,
              resourceType: 'image',
            })
          : await uploadFileToSupabaseStorage(file, {
              folder: `azinag/projects/${slug}/binaries`,
            });

      if (kind === 'thumbnail') {
        setForm((prev) => ({ ...prev, thumbnail_url: uploaded.secureUrl }));
      } else {
        setForm((prev) => ({ ...prev, download_url: uploaded.secureUrl }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      setSaveError(message);
    } finally {
      setUploading(null);
      event.target.value = '';
    }
  };

  const previewThumb = getThumb(form.live_url || null, form.thumbnail_url || null);

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-ink">Projects</h1>
          <p className="text-sm text-ink-muted mt-0.5">Portfolio shown on the public site · paste a Vercel URL to auto-generate thumbnail</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors"
        >
          Add project
        </button>
      </div>

      {/* Quick Add bar */}
      <div className="mb-8 border border-border-subtle rounded-2xl bg-surface p-4">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">⚡ Quick Add by URL</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={quickUrl}
            onChange={e => setQuickUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleQuickAdd()}
            placeholder="prismporo.ma or https://example.com"
            className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
          <input
            value={quickType}
            onChange={e => setQuickType(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleQuickAdd()}
            placeholder="e.g. car rental website"
            className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
          <input
            value={quickTags}
            onChange={e => setQuickTags(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleQuickAdd()}
            placeholder="Tags (optional): Next.js, Tailwind"
            className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
          <button
            onClick={handleQuickAdd}
            disabled={quickAdding || !quickUrl.trim() || !quickType.trim()}
            className="shrink-0 px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {quickAdding ? 'Adding…' : quickDone ? '✓ Added!' : '+ Add'}
          </button>
        </div>
        <p className="text-xs text-ink-faint mt-2">Domain is auto-extracted as the title · thumbnail auto-generated · published immediately</p>
      </div>


      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="border border-border-subtle rounded-2xl bg-surface py-16 text-center">
          <p className="text-ink-muted text-sm">No projects yet.</p>
          <button onClick={openAdd} className="mt-4 text-sm font-medium text-accent hover:underline">
            Add your first project
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(p => {
            const thumb = getThumb(p.live_url, p.thumbnail_url);
            return (
              <div key={p.id} className="border border-border-subtle rounded-2xl bg-surface overflow-hidden flex flex-col">
                {thumb ? (
                  <div className="relative w-full aspect-[16/9] bg-surface-raised overflow-hidden">
                    <Image src={thumb} alt={p.title} fill className="object-cover" unoptimized />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/9] bg-surface-raised flex items-center justify-center">
                    <span className="text-ink-faint text-xs">No preview</span>
                  </div>
                )}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-ink leading-snug">{p.title}</span>
                    {p.featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700">Featured</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.published ? 'bg-green-50 text-green-700' : 'bg-surface-raised text-ink-faint'
                    }`}>
                      {p.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  {p.description && (
                    <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">{p.description}</p>
                  )}
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.tags.map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-accent-light text-accent font-medium">{t}</span>
                      ))}
                    </div>
                  )}
                  {p.live_url && (
                    <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline truncate mt-auto pt-1">
                      {p.live_url}
                    </a>
                  )}
                  <div className="flex items-center gap-4 mt-2 pt-2 border-t border-border-subtle">
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
        <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl border border-border-subtle w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-bold mb-5">{editId ? 'Edit project' : 'New project'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Project name *</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Acme Corp website"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                  placeholder="Short project description"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                  Live URL <span className="normal-case font-normal text-ink-faint">(paste the Vercel / custom domain URL)</span>
                </label>
                <input
                  value={form.live_url}
                  onChange={e => setForm(f => ({ ...f, live_url: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="https://my-project.vercel.app"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                  Custom thumbnail URL <span className="normal-case font-normal text-ink-faint">(leave empty to auto-screenshot the live URL)</span>
                </label>
                <input
                  value={form.thumbnail_url}
                  onChange={e => setForm(f => ({ ...f, thumbnail_url: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="https://..."
                />
                <div className="mt-2">
                  <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'thumbnail')} className="text-xs" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                  Download URL <span className="normal-case font-normal text-ink-faint">(program binary)</span>
                </label>
                <p className="text-xs text-ink-faint mb-1.5">
                  Program binaries are uploaded to Supabase Storage. Executables like .exe are supported.
                </p>
                <input
                  value={form.download_url}
                  onChange={e => setForm(f => ({ ...f, download_url: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="https://.../program.zip"
                />
                <div className="mt-2">
                  <input
                    type="file"
                    accept=".exe,.msi,.dmg,.pkg,.deb,.rpm,.AppImage,.zip,.7z,.rar,.tar,.gz,.xz,.bin"
                    onChange={(e) => handleUpload(e, 'program')}
                    className="text-xs"
                  />
                </div>
              </div>
              {previewThumb && (
                <div>
                  <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Preview</p>
                  <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border-subtle bg-surface-raised">
                    <Image src={previewThumb} alt="preview" fill className="object-cover" unoptimized />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Category</label>
                  <input
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="Web, E-com, SaaS…"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Sort order</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                  Tags <span className="normal-case font-normal text-ink-faint">(comma-separated)</span>
                </label>
                <input
                  value={form.tags}
                  onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Next.js, Supabase, Tailwind"
                />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 accent-[#4A6FA5]"
                  />
                  <span className="text-sm text-ink">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                    className="w-4 h-4 accent-[#4A6FA5]"
                  />
                  <span className="text-sm text-ink">Published (visible on site)</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6 justify-end">
              {saveError && (
                <p className="flex-1 text-xs text-red-600 self-center">{saveError}</p>
              )}
              <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
                className="px-4 py-2 bg-ink text-white text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : editId ? 'Save changes' : 'Add project'}
              </button>
            </div>
            {uploading && <p className="mt-3 text-xs text-accent">{uploading}</p>}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
