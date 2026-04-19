import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Azinag',
  description: 'Simple company information about Azinag.',
};

const FACTS = [
  'Based in Morocco.',
  'Focused on business software.',
  'Builds desktop, mobile, web, and backend systems.',
  'Works on both custom software and ready-made applications.',
];

export default function AboutPage() {
  return (
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <section className="max-w-5xl mx-auto bg-white border border-border-subtle rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-muted mb-3">About</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Azinag</h1>
        <p className="text-ink-muted text-[1.02rem] leading-relaxed max-w-3xl mb-8">
          We build software that is practical, maintainable, and usable in day-to-day operations.
          This page keeps only essential information.
        </p>

        <ul className="space-y-3">
          {FACTS.map((fact) => (
            <li key={fact} className="text-sm text-ink-muted border border-border-subtle rounded-xl p-4 bg-surface-raised">
              {fact}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
