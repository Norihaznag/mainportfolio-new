'use client';

import { useState } from 'react';
import { useContent } from '@/components/LanguageContext';

export default function ContactPage() {
  const c = useContent();
  const fields = c.contact.fields;

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <section className="max-w-3xl mx-auto bg-white border border-border-subtle rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-muted mb-3">Contact</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Send a message</h1>
        <p className="text-sm text-ink-muted mb-8">Use the form below. We will reply by email.</p>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">{fields.name}</span>
              <input
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink"
                placeholder="John Smith"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">{fields.email}</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink"
                placeholder="name@example.com"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">{fields.company}</span>
            <input
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
              className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink"
              placeholder="Company"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">{fields.message}</span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink resize-none"
              placeholder="Project details"
            />
          </label>

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg bg-accent text-white disabled:opacity-60"
          >
            {status === 'sending'
              ? fields.sending
              : status === 'sent'
              ? fields.sent
              : fields.submit}
          </button>

          {status === 'error' && <p className="text-sm text-red-600">{fields.error}</p>}
        </form>
      </section>
    </div>
  );
}
