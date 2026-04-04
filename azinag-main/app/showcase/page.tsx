'use client';

import { useEffect, useState } from 'react';
import { useContent } from '@/components/LanguageContext';
import { CTAButton } from '@/components/CTAButton';

interface Project {
  name: string;
  desc: string;
  tags?: string[];
  content?: string;
}

export default function Showcase() {
  const c = useContent();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/projects')
      .then((r) => r.ok ? r.json() : { projects: [] })
      .then((data) => setProjects(data.projects || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-canvas text-ink">
      <section className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
        <p className="eyebrow mb-4">{c.showcase.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{c.showcase.title}</h1>
        <p className="text-[1.0625rem] text-ink-muted max-w-xl">{c.showcase.subtitle}</p>
      </section>
      <section className="pb-28 px-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="border border-border-subtle rounded-2xl p-10 text-center bg-surface max-w-lg mx-auto">
            <p className="text-ink-muted text-sm">{c.showcase.empty}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {projects.map((project, i) => (
              <article key={project.name + i} className="border border-border-subtle rounded-2xl p-8 md:p-10 bg-surface hover:shadow-card-hover transition-shadow">
                <h2 className="text-xl font-bold mb-3">{project.name}</h2>
                <p className="text-sm text-ink-muted leading-relaxed mb-6 max-w-2xl">{project.desc}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="mb-6">
                    <p className="eyebrow mb-2">{c.showcase.stack}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-light text-accent">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
                {project.content && (
                  <div>
                    <p className="eyebrow mb-2">{c.showcase.outcome}</p>
                    <p className="text-sm text-ink-muted leading-relaxed">{project.content}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
        {!loading && (
          <div className="mt-16 pt-12 border-t border-border-subtle text-center">
            <p className="text-sm text-ink-muted mb-6">Interested in working together?</p>
            <CTAButton label={c.hero.primaryCta} trackEvent="book_call" trackSource="showcase_bottom" variant="primary" size="md" />
          </div>
        )}
      </section>
    </div>
  );
}