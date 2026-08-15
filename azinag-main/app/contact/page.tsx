'use client';

import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const REQUEST_TYPES = [
  'Product support',
  'Billing question',
  'Subscription/cancellation',
  'Pre-purchase question',
  'Account/access issue',
];

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    product: '',
    requestType: REQUEST_TYPES[0],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    const product = searchParams.get('product');
    const request = searchParams.get('request');
    if (!product && !request) return;
    setForm((prev) => ({
      ...prev,
      product: product || prev.product,
      requestType: request === 'pre-purchase' ? 'Pre-purchase question' : prev.requestType,
    }));
  }, [searchParams]);

  const composedMessage = useMemo(
    () =>
      [
        `Product: ${form.product || 'Not specified'}`,
        `Request type: ${form.requestType}`,
        '',
        form.message.trim(),
      ].join('\n'),
    [form.product, form.requestType, form.message]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.product || null,
          requestType: form.requestType,
          message: composedMessage,
        }),
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      setStatus('sent');
      setForm({
        name: '',
        email: '',
        product: '',
        requestType: REQUEST_TYPES[0],
        message: '',
      });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="text-ink">
      <section className="relative overflow-hidden pt-28 pb-28 px-6" aria-labelledby="contact-heading">
        <div className="relative max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Support</p>
            <h1 id="contact-heading" className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Product Support and Sales Questions
            </h1>
            <p className="text-[1.0625rem] text-ink-muted mb-10">
              Contact Azinag for product support, billing, subscriptions, and pre-purchase questions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Product support form" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ink">Name</span>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink placeholder-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                    placeholder="John Smith"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ink">Email</span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink placeholder-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ink">Product</span>
                  <input
                    type="text"
                    value={form.product}
                    onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
                    className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink placeholder-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                    placeholder="Dovi, Azinag Restuara, or other"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ink">Request type</span>
                  <select
                    value={form.requestType}
                    onChange={(e) => setForm((f) => ({ ...f, requestType: e.target.value }))}
                    className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                  >
                    {REQUEST_TYPES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="px-4 py-2.5 text-sm border border-border-subtle rounded-lg bg-surface text-ink placeholder-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition resize-none"
                  placeholder="Describe the issue or question."
                />
              </label>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="inline-flex items-center justify-center font-semibold rounded-lg bg-accent text-white hover:bg-accent/90 disabled:opacity-60 transition-colors px-6 py-3 text-[0.9375rem] w-full sm:w-auto"
              >
                {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message sent' : 'Send'}
              </button>

              {status === 'error' && (
                <p className="text-sm text-red-600">
                  An error occurred. Please email hello@azinag.site.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
