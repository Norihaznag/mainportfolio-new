'use client';

import { useState } from 'react';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

interface RequestFormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  platform: string;
  timeline: string;
  message: string;
}

const initialForm: RequestFormState = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  platform: '',
  timeline: '',
  message: '',
};

const PROJECT_TYPES = [
  'Business website',
  'Web app / SaaS',
  'Mobile app',
  'Desktop app',
  'Backend / API',
  'Integration / automation',
];

const PLATFORMS = [
  'Web',
  'iOS + Android',
  'Windows + macOS + Linux',
  'Backend only',
  'Not sure yet',
];

const TIMELINES = [
  'ASAP',
  '1 month',
  '2-3 months',
  '3-6 months',
  'Flexible',
];

export function HomeRequestForm() {
  const [form, setForm] = useState<RequestFormState>(initialForm);
  const [status, setStatus] = useState<FormStatus>('idle');

  function updateField(field: keyof RequestFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status !== 'idle') {
      setStatus('idle');
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    try {
      const enrichedMessage = [
        `Project type: ${form.projectType}`,
        `Platform: ${form.platform}`,
        `Timeline: ${form.timeline}`,
        '',
        form.message,
      ].join('\n');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: enrichedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('sent');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-3xl text-left" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Name</span>
          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="px-4 py-2.5 text-sm rounded-lg bg-white text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/35 transition"
            placeholder="Your name"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="px-4 py-2.5 text-sm rounded-lg bg-white text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/35 transition"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Company (optional)</span>
        <input
          type="text"
          autoComplete="organization"
          value={form.company}
          onChange={(event) => updateField('company', event.target.value)}
          className="px-4 py-2.5 text-sm rounded-lg bg-white text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/35 transition"
          placeholder="Company name"
        />
      </label>

      <div className="grid sm:grid-cols-3 gap-5">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Project type</span>
          <select
            required
            value={form.projectType}
            onChange={(event) => updateField('projectType', event.target.value)}
            className="px-4 py-2.5 text-sm rounded-lg bg-white text-ink focus:outline-none focus:ring-2 focus:ring-accent/35 transition"
          >
            <option value="" disabled>Select</option>
            {PROJECT_TYPES.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Platform</span>
          <select
            required
            value={form.platform}
            onChange={(event) => updateField('platform', event.target.value)}
            className="px-4 py-2.5 text-sm rounded-lg bg-white text-ink focus:outline-none focus:ring-2 focus:ring-accent/35 transition"
          >
            <option value="" disabled>Select</option>
            {PLATFORMS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Timeline</span>
          <select
            required
            value={form.timeline}
            onChange={(event) => updateField('timeline', event.target.value)}
            className="px-4 py-2.5 text-sm rounded-lg bg-white text-ink focus:outline-none focus:ring-2 focus:ring-accent/35 transition"
          >
            <option value="" disabled>Select</option>
            {TIMELINES.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">What do you want to build?</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="px-4 py-2.5 text-sm rounded-lg bg-white text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/35 transition resize-none"
          placeholder="Describe your project, platform, and timeline"
        />
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center font-semibold rounded-lg bg-accent text-white hover:bg-accent/90 disabled:opacity-60 transition-colors px-6 py-3 text-[0.9375rem]"
      >
        {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent' : 'Send request'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-600">
          Could not send your request. Please try again.
        </p>
      )}
    </form>
  );
}
