'use client';

import { useContent } from '@/components/LanguageContext';
import { CTAButton } from '@/components/CTAButton';

export default function About() {
  const c = useContent();

  return (
    <div className="bg-canvas text-ink">
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
        <p className="eyebrow mb-4">{c.about.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          {c.about.headline}
        </h1>
        <div className="text-[1.0625rem] text-ink-muted leading-relaxed max-w-2xl space-y-4">
          {c.about.body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="pb-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Stack */}
          <div className="border border-border-subtle rounded-2xl p-8 bg-surface">
            <h2 className="text-[0.9375rem] font-semibold mb-5">{c.about.stack.title}</h2>
            <ul className="space-y-2.5">
              {c.about.stack.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Values */}
          <div className="border border-border-subtle rounded-2xl p-8 bg-surface">
            <h2 className="text-[0.9375rem] font-semibold mb-5">{c.about.values.title}</h2>
            <ul className="space-y-2.5">
              {c.about.values.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14">
          <CTAButton
            label={c.about.cta}
            trackEvent="book_call"
            trackSource="about_page"
            variant="primary"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}

