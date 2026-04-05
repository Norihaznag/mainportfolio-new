'use client';

import { useState } from 'react';
import { useContent } from '@/components/LanguageContext';
import { CTAButton } from '@/components/CTAButton';

export default function Contact() {
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
      // Simple mailto fallback — replace with a real form handler if needed
      const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`
      );
      window.location.href = `mailto:hello@azinag.com?subject=${subject}&body=${body}`;
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="text-ink">
      <section className="relative overflow-hidden pt-28 pb-28 px-6" aria-labelledby="contact-heading">
        <div className="relative max-w-5xl mx-auto">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">{c.contact.eyebrow}</p>
          <h1 id="contact-heading" className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{c.contact.title}</h1>
          <p className="text-[1.0625rem] text-ink-muted mb-10">{c.contact.subtitle}</p>

          {/* Book a call alt */}
          <div className="mb-10 p-5 border border-border-subtle rounded-xl bg-white hover:shadow-card transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-ink-muted">{c.contact.bookAlt}</p>
            <CTAButton
              label={c.contact.bookLinkLabel}
              trackEvent="book_call"
              trackSource="contact_page"
              variant="ghost"
              size="sm"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" aria-label={c.contact.title} noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">{fields.name}</span>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink placeholder-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                  placeholder="Jane Smith"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">{fields.email}</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink placeholder-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                  placeholder="jane@startup.com"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">{fields.company}</span>
              <input
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink placeholder-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                placeholder="Acme Inc."
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">{fields.message}</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink placeholder-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition resize-none"
                placeholder="I'm building a SaaS for..."
              />
            </label>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="inline-flex items-center justify-center font-semibold rounded-lg bg-accent text-white hover:bg-accent/90 disabled:opacity-60 transition-colors px-6 py-3 text-[0.9375rem] w-full sm:w-auto"
            >
              {status === 'sending'
                ? fields.sending
                : status === 'sent'
                ? fields.sent
                : fields.submit}
            </button>

            {status === 'error' && (
              <p className="text-sm text-red-600">{fields.error}</p>
            )}
          </form>
        </div>
        </div>
      </section>
    </div>
  );
}
