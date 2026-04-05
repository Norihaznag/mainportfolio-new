'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useContent } from '@/components/LanguageContext';
import { CTAButton } from '@/components/CTAButton';

interface Project {
  id: string;
  name: string;
  desc: string | null;
  live_url: string | null;
  thumbnail_url: string | null;
  tags: string[];
  category: string;
  featured: boolean;
}

function getThumb(project: Project): string {
  if (project.thumbnail_url) return project.thumbnail_url;
  if (project.live_url) return `https://image.thum.io/get/width/800/crop/450/${project.live_url}`;
  return '';
}

function extractDomain(url: string): string {
  try {
    const normalized = url.startsWith('http') ? url : `https://${url}`;
    const hostname = new URL(normalized).hostname;
    return hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  }
}

export default function Showcase() {
  const c = useContent();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/projects?t=${Date.now()}`)
      .then((r) => r.ok ? r.json() : { projects: [] })
      .then((data) => setProjects(data.projects || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="text-ink">
      <section className="relative overflow-hidden pt-28 pb-16 px-6" aria-label="Showcase hero">
        <div className="relative max-w-5xl mx-auto">
          <p className="eyebrow mb-4">{c.showcase.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{c.showcase.title}</h1>
          <p className="text-[1.0625rem] text-ink-muted max-w-xl">{c.showcase.subtitle}</p>
        </div>
      </section>
      <section className="relative overflow-hidden pb-28 px-6" aria-label="Projects grid">
        <div className="relative max-w-5xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="border border-border-subtle rounded-2xl p-10 text-center bg-white max-w-lg mx-auto">
            <p className="text-ink-muted text-sm">{c.showcase.empty}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const thumb = getThumb(project);
              return (
                <article key={project.id} className="border border-border-subtle rounded-2xl bg-white overflow-hidden hover:shadow-card transition-shadow flex flex-col">
                  {thumb ? (
                    <div className="relative w-full aspect-[16/9] bg-surface-raised overflow-hidden">
                      <Image src={thumb} alt={project.name} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/9] bg-surface-raised" />
                  )}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-start gap-2 flex-wrap">
                      <div className="flex-1 min-w-0">
                        {project.live_url && project.desc ? (
                          <p className="text-base font-bold leading-snug">
                            <span>{extractDomain(project.live_url)}</span>
                            <span className="text-ink-muted font-normal mx-1.5">·</span>
                            <span className="text-ink-muted font-medium">{project.desc}</span>
                          </p>
                        ) : (
                          <>
                            <h2 className="text-base font-bold leading-snug">{project.name}</h2>
                            {project.desc && (
                              <p className="text-sm text-ink-muted leading-relaxed mt-1 line-clamp-3">{project.desc}</p>
                            )}
                          </>
                        )}
                      </div>
                      {project.featured && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700 shrink-0">Featured</span>
                      )}
                    </div>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-light text-accent">{tag}</span>
                        ))}
                      </div>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline pt-2"
                      >
                        View live site
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
        {!loading && (
          <div className="mt-16 pt-12 border-t border-border-subtle text-center">
            <p className="text-sm text-ink-muted mb-6">Interested in working together?</p>
            <CTAButton label={c.hero.primaryCta} trackEvent="book_call" trackSource="showcase_bottom" variant="primary" size="md" />
          </div>
        )}
        </div>
      </section>
    </div>
  );
}
