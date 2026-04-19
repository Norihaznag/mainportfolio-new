'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PLATFORM_LABELS, type PortfolioProject } from '@/lib/portfolio-data';
import { DynamicIcon } from '@/components/DynamicIcon';
type PlatformFilter = PortfolioProject['platforms'][number] | 'all';

const PLATFORM_FILTERS: { value: PlatformFilter; label: string; icon: string }[] = [
  { value: 'all', label: 'All Projects', icon: 'LayoutDashboard' },
  { value: 'desktop', label: 'Desktop', icon: 'Monitor' },
  { value: 'mobile', label: 'Mobile', icon: 'Smartphone' },
  { value: 'web', label: 'Web', icon: 'Globe' },
  { value: 'backend', label: 'Backend', icon: 'Database' },
];

function ProjectCard({ project }: { project: PortfolioProject }) {
  const platforms = project.platforms
    .map((platform) => PLATFORM_LABELS[platform as keyof typeof PLATFORM_LABELS])
    .filter(
      (platform): platform is (typeof PLATFORM_LABELS)[keyof typeof PLATFORM_LABELS] =>
        !!platform
    );

  return (
    <article className="border border-border-subtle rounded-2xl bg-white overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Banner */}
      <div className={`w-full h-28 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white`} aria-hidden="true">
        <DynamicIcon name={project.icon} className="w-12 h-12 opacity-90" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-[1rem]">{project.name}</h3>
          <div className="flex gap-1.5 shrink-0">
            {project.featured && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700">Featured</span>
            )}
          </div>
        </div>

        <p className="text-sm font-medium text-ink-muted mb-2">{project.tagline}</p>
        <p className="text-sm text-ink-muted leading-relaxed mb-5 flex-1">{project.description}</p>

        {/* Platform badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {platforms.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-accent-light text-accent">
              <DynamicIcon name={p.icon} className="w-3 h-3" />
              {p.label}
            </span>
          ))}
        </div>

        {/* Industry + Outcome */}
        <div className="border-t border-border-subtle pt-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-ink uppercase tracking-wider">Industry</span>
            <span className="text-xs font-medium bg-surface border border-border-subtle rounded-full px-2 py-0.5 text-ink-muted">{project.industry}</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium">✓ {project.outcome}</p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-[11px] font-mono font-medium bg-surface border border-border-subtle rounded px-1.5 py-0.5 text-ink-muted">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-3 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Live demo
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
          {project.githubRepo && (
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink transition-colors"
            >
              GitHub →
            </a>
          )}
          {project.downloadUrl && (
            <a
              href={project.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:underline"
            >
              Download →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ShowcasePage() {
  const [activeFilter, setActiveFilter] = useState<PlatformFilter>('all');
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/projects?t=${Date.now()}`)
      .then((response) => (response.ok ? response.json() : { projects: [] }))
      .then((payload) => setProjects(payload.projects || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.platforms.includes(activeFilter as PortfolioProject['platforms'][number]));

  return (
    <div className="text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6" aria-label="Showcase hero">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-4">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">What We Have Built</h1>
          <p className="text-[1.0625rem] text-ink-muted max-w-2xl leading-relaxed">
            Real projects, measurable outcomes. Desktop apps, mobile solutions, SaaS platforms, backend systems,
            and integrations — for businesses across every industry.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-6" aria-label="Filter projects by platform">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Platform filters">
            {PLATFORM_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                id={`filter-platform-${filter.value}`}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 ${
                  activeFilter === filter.value
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-surface text-ink-muted hover:bg-surface-raised hover:text-ink border border-border-subtle'
                }`}
                aria-pressed={activeFilter === filter.value}
              >
                <DynamicIcon name={filter.icon} className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-ink-faint mt-3">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-20 pt-4" aria-label="Project cards">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="border border-border-subtle rounded-2xl p-10 text-center bg-white">
              <p className="text-ink-muted text-sm">No projects match this filter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-border-subtle bg-surface" aria-label="Start a project">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Want your project here?
          </h2>
          <p className="text-ink-muted text-[1.0625rem] mb-8">
            Every project starts with a conversation. Tell us what you are building.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953'}?text=${encodeURIComponent('Hello, I would like to discuss a new project with Azinag.')}`}
            target="_blank"
            rel="noopener noreferrer"
            id="showcase-bottom-cta"
            className="inline-flex items-center gap-2.5 bg-accent text-white font-semibold rounded-lg px-8 py-4 text-base hover:bg-accent/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Start Your Project
          </a>
          <p className="mt-4 text-sm text-ink-faint">Free consultation · No commitment · Response within 24h</p>
        </div>
      </section>
    </div>
  );
}
