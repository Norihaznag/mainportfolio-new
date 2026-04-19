import Link from 'next/link';

import { DynamicIcon } from '@/components/DynamicIcon';
import { SECTORS } from '@/lib/apps-data';
import { fetchPublishedApps } from '@/lib/apps-server';

export const dynamic = 'force-dynamic';

type ApplicationsPageProps = {
  searchParams?: {
    sector?: string;
  };
};

function resolveActiveSector(value: string | undefined): string {
  if (!value) return 'all';
  return SECTORS.some((sector) => sector.value === value) ? value : 'all';
}

export default async function ApplicationsPage({ searchParams }: ApplicationsPageProps) {
  const apps = await fetchPublishedApps();
  const activeSector = resolveActiveSector(searchParams?.sector);

  const filtered =
    activeSector === 'all'
      ? apps
      : apps.filter((app) => (app.sector || app.category) === activeSector);

  return (
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <section className="max-w-5xl mx-auto bg-white border border-border-subtle rounded-2xl p-7 md:p-8">
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-muted mb-2">Applications</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-3">Software catalog</h1>
        <p className="text-sm text-ink-muted mb-6">Straightforward list of available applications.</p>

        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Sector filters">
          {SECTORS.map((sector) => {
            const href = sector.value === 'all' ? '/applications' : `/applications?sector=${sector.value}`;
            const isActive = activeSector === sector.value;

            return (
              <Link
                key={sector.value}
                href={href}
                className={`px-3.5 py-2 rounded-full text-sm border ${
                  isActive
                    ? 'bg-accent text-white border-accent'
                    : 'bg-surface-raised border-border-subtle text-ink-muted'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {sector.label}
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-ink-muted">No applications found for this sector.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((app) => (
              <article key={app.id} className="border border-border-subtle rounded-xl bg-surface-raised p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-light border border-border-subtle flex items-center justify-center">
                    <DynamicIcon name={app.icon} className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  {app.badge && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 bg-white border border-border-subtle">
                      {app.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-base font-semibold mb-1">{app.name}</h2>
                <p className="text-sm text-ink-muted mb-3 line-clamp-2">{app.tagline}</p>

                <div className="text-xs text-ink-faint mb-4">
                  {app.latestVersion ? `Version ${app.latestVersion}` : 'Version not specified'}
                </div>

                {app.slug ? (
                  <Link
                    href={`/applications/${app.slug}`}
                    className="inline-flex items-center px-3.5 py-2 rounded-lg bg-white border border-border-subtle text-sm font-medium"
                  >
                    Open details
                  </Link>
                ) : (
                  <span className="inline-flex items-center px-3.5 py-2 rounded-lg bg-white border border-border-subtle text-sm text-ink-faint">
                    Details unavailable
                  </span>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
