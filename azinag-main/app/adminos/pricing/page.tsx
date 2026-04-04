'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '../_shell';

interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  sort_order: number;
  active: boolean;
  is_featured: boolean;
}

type FormState = {
  name: string; price: string; description: string;
  features: string; sort_order: string; active: boolean; is_featured: boolean;
};
const EMPTY: FormState = { name: '', price: '', description: '', features: '', sort_order: '0', active: true, is_featured: false };

export default function PricingPage() {
  const [items, setItems] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const r = await fetch('/api/admin/pricing');
    if (r.ok) { const d = await r.json(); setItems(d.pricing || []); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setOpen(true); };
  const openEdit = (p: PricingPackage) => {
    setForm({
      name: p.name, price: String(p.price),
      description: p.description || '',
      features: Array.isArray(p.features) ? p.features.join('\n') : '',
      sort_order: String(p.sort_order || 0),
      active: p.active, is_featured: p.is_featured || false,
    });
    setEditId(p.id);
    setOpen(true);
  };
  const closeModal = () => { setOpen(false); setEditId(null); };

  const handleSave = async () => {
    setSaving(true);
    const body = {
      name: form.name,
      price: parseFloat(form.price) || 0,
      description: form.description,
      features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
      sort_order: parseInt(form.sort_order) || 0,
      active: form.active,
      is_featured: form.is_featured,
    };
    if (editId) {
      await fetch(`/api/admin/pricing/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    } else {
      await fetch('/api/admin/pricing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    }
    setSaving(false);
    closeModal();
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this package?')) return;
    await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-ink">Pricing</h1>
          <p className="text-sm text-ink-muted mt-0.5">Service packages shown on the pricing page</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors"
        >
          Add package
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="border border-border-subtle rounded-2xl bg-surface py-16 text-center">
          <p className="text-ink-muted text-sm">No packages yet.</p>
          <button onClick={openAdd} className="mt-4 text-sm font-medium text-accent hover:underline">
            Add your first package
          </button>
        </div>
      ) : (
        <div className="divide-y divide-border-subtle border border-border-subtle rounded-2xl bg-surface overflow-hidden">
          {items.map(p => (
            <div key={p.id} className="flex items-start justify-between px-6 py-4 gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[0.9375rem] font-semibold text-ink">{p.name}</span>
                  {p.is_featured && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-accent-light text-accent">Featured</span>
                  )}
                  {!p.active && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-surface-raised text-ink-faint">Inactive</span>
                  )}
                </div>
                <p className="text-sm text-ink-muted">{p.description}</p>
                <p className="text-sm font-semibold text-ink mt-1">${p.price.toLocaleString()}</p>
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
          <div className="bg-surface rounded-2xl border border-border-subtle w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-bold mb-5">{editId ? 'Edit package' : 'New package'}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="Web App"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Price ($)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="2500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Description</label>
                <input
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Short description"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                  Features <span className="normal-case font-normal text-ink-faint">(one per line)</span>
                </label>
                <textarea
                  rows={5}
                  value={form.features}
                  onChange={e => setForm(f => ({ ...f, features: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                  placeholder={"Custom design\nFull-stack build\nDeployment"}
                />
              </div>
              <div className="flex items-start gap-6">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Sort order</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={e => setForm(f => ({ ...f, sort_order: e.target.value }))}
                    className="w-20 px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  />
                </div>
                <div className="flex flex-col gap-2 pt-7">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="w-4 h-4 accent-[#4A6FA5]" />
                    <span className="text-sm text-ink">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} className="w-4 h-4 accent-[#4A6FA5]" />
                    <span className="text-sm text-ink">Featured</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name}
                className="px-4 py-2 bg-ink text-white text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : editId ? 'Save changes' : 'Add package'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
