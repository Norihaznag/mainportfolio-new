import Link from 'next/link';

const PRIMARY_LINKS = [
  {
    href: '/applications',
    title: 'Applications',
    description: 'Browse available apps and download directly from each app page.',
  },
  {
    href: '/showcase',
    title: 'Showcase',
    description: 'See completed projects and delivered software products.',
  },
  {
    href: '/services',
    title: 'Services',
    description: 'Understand what we build: desktop, mobile, web, and backend systems.',
  },
  {
    href: '/pricing',
    title: 'Pricing',
    description: 'See straightforward pricing information for SaaS and custom work.',
  },
];

export default function HomePage() {
  return (
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <section className="max-w-5xl mx-auto bg-white border border-border-subtle rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-muted mb-3">Azinag</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Software, without the noise.</h1>
        <p className="text-[1.02rem] text-ink-muted leading-relaxed max-w-3xl mb-8">
          This site is intentionally simple. Choose a section, get the information you need,
          and download or contact without extra marketing steps.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {PRIMARY_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl border border-border-subtle p-5 bg-surface-raised"
            >
              <h2 className="text-lg font-semibold text-ink mb-2">{item.title}</h2>
              <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
