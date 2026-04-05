'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '../_shell';

interface Submission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export default function ContactsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  const load = async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/contacts?t=${Date.now()}`, { cache: 'no-store' });
    if (r.ok) {
      const d = await r.json();
      setItems(d.submissions || []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string, read: boolean) => {
    await fetch('/api/admin/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read }),
    });
    setItems(prev => prev.map(s => s.id === id ? { ...s, read } : s));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, read } : prev);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this submission?')) return;
    await fetch('/api/admin/contacts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setItems(prev => prev.filter(s => s.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const open = (s: Submission) => {
    setSelected(s);
    if (!s.read) markRead(s.id, true);
  };

  const unreadCount = items.filter(s => !s.read).length;

  return (
    <AdminShell>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact Submissions</h1>
          <p className="text-sm text-ink-muted mt-1">
            {items.length} total{unreadCount > 0 && ` · ${unreadCount} unread`}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="border border-border-subtle rounded-xl p-10 text-center text-sm text-ink-muted bg-surface">
          No submissions yet.
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-200px)]">
          {/* List */}
          <div className="lg:w-72 shrink-0 flex flex-col gap-1 lg:overflow-y-auto">
            {items.map(s => (
              <button
                key={s.id}
                onClick={() => open(s)}
                className={`text-left px-4 py-3 rounded-xl border transition-all ${
                  selected?.id === s.id
                    ? 'border-accent bg-accent-light'
                    : 'border-border-subtle bg-surface hover:bg-surface-raised'
                }`}
              >
                <div className="flex items-center gap-2">
                  {!s.read && (
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  )}
                  <p className={`text-sm truncate ${!s.read ? 'font-semibold' : 'font-medium'}`}>
                    {s.name}
                  </p>
                </div>
                <p className="text-xs text-ink-muted truncate mt-0.5">{s.email}</p>
                <p className="text-xs text-ink-faint mt-1">
                  {new Date(s.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="flex-1 lg:overflow-y-auto">
            {selected ? (
              <div className="border border-border-subtle rounded-xl bg-white p-5 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold">{selected.name}</h2>
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-sm text-accent hover:underline"
                    >
                      {selected.email}
                    </a>
                    {selected.company && (
                      <p className="text-sm text-ink-muted mt-0.5">{selected.company}</p>
                    )}
                    <p className="text-xs text-ink-faint mt-2">
                      {new Date(selected.created_at).toLocaleString('en-GB')}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => markRead(selected.id, !selected.read)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-border-subtle hover:bg-surface-raised transition-colors"
                    >
                      {selected.read ? 'Mark unread' : 'Mark read'}
                    </button>
                    <a
                      href={`mailto:${selected.email}?subject=Re: Your inquiry`}
                      className="text-xs px-3 py-1.5 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
                    >
                      Reply
                    </a>
                    <button
                      onClick={() => remove(selected.id)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="border-t border-border-subtle pt-6">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-ink">{selected.message}</p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-full text-sm text-ink-muted">
                Select a submission to view
              </div>
            )}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
