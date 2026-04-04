'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '../_shell';

interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
}

type FormState = { title: string; description: string; tags: string; published: boolean };
const EMPTY: FormState = { title: '', description: '', tags: '', published: true };

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const r = await fetch('/api/admin/content');
    if (r.ok) {
      const d = await r.json();
      setItems((d.content || []).filter((c: any) => c.type === 'project'));
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setOpen(true); };
  const openEdit = (p: Project) => {
    setForm({ title: p.title, description: p.description, tags: p.content || '', published: p.published });
    setEditId(p.id);
    setOpen(true);
  };
  const closeModal = () => { setOpen(false); setEditId(null); };

  const handleSave = async () => {
    setSaving(true);
    const body = { title: form.title, description: form.description, content: form.tags, type: 'project', published: form.published };
    if (editId) {
      await fetch(`/api/admin/content/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    } else {
      await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    }
    setSaving(false);
    closeModal();
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/admin/content/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-ink">Projects</h1>
          <p className="text-sm text-ink-muted mt-0.5">Portfolio shown on the public site</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors"
        >
          Add project
        </button>
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
        <div className="divide-y divide-border-subtle border border-border-subtle rounded-2xl bg-surface overflow-hidden">
          {items.map(p => (
            <div key={p.id} className="flex items-start justify-between px-6 py-4 gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[0.9375rem] font-semibold text-ink">{p.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    p.published ? 'bg-green-50 text-green-700' : 'bg-surface-raised text-ink-faint'
                  }`}>
                    {p.published ? 'Live' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-ink-muted truncate max-w-lg">{p.description}</p>
                {p.content && <p className="text-xs text-ink-faint mt-1">{p.content}</p>}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <button onClick={() => openEdit(p)} className="text-sm text-ink-muted hover:text-ink transition-colors">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-sm text-red-500 hover:text-red-700 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl border border-border-subtle w-full max-w-md p-6">
            <h2 className="text-base font-bold mb-5">{editId ? 'Edit project' : 'New project'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Name</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Client project name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                  placeholder="Short project description"
                />
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
            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title}
                className="px-4 py-2 bg-ink text-white text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : editId ? 'Save changes' : 'Add project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
