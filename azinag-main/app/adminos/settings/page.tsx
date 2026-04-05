'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '../_shell';

export default function SettingsPage() {
  const [form, setForm] = useState({ booking_url: '', contact_email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : {} as Record<string, string>)
      .then((d: Record<string, string>) => {
        setForm({ booking_url: d.booking_url || '', contact_email: d.contact_email || '' });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setSaveError(err.message || `Error ${res.status}`);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-ink">Settings</h1>
        <p className="text-sm text-ink-muted mt-0.5">Site-wide configuration</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="border border-border-subtle rounded-2xl bg-surface p-6 max-w-lg">
          <h2 className="text-sm font-semibold text-ink mb-5">CTAs &amp; Contact</h2>
          <div className="space-y-5 mb-6">
            <div>
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                Booking URL
              </label>
              <input
                type="url"
                value={form.booking_url}
                onChange={e => setForm(f => ({ ...f, booking_url: e.target.value }))}
                placeholder="https://cal.com/yourname/30min"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
              <p className="text-xs text-ink-faint mt-1.5">Powers all "Book a call" buttons on the site</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                value={form.contact_email}
                onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))}
                placeholder="hello@azinag.site"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm text-ink bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
              <p className="text-xs text-ink-faint mt-1.5">Used on the contact page</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-ink text-white text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save settings'}
          </button>
          {saveError && (
            <p className="mt-3 text-xs text-red-600">{saveError}</p>
          )}
        </div>
      )}
    </AdminShell>
  );
}
