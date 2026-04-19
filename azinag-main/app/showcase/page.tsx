'use client';

import { useEffect, useState } from 'react';
import { PLATFORM_LABELS, type PortfolioProject } from '@/lib/portfolio-data';

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="border border-border-subtle rounded-2xl p-5 bg-white">
      <h2 className="text-lg font-semibold mb-1">{project.name}</h2>
      <p className="text-sm text-ink-muted mb-2">{project.tagline}</p>
      <p className="text-sm text-ink-muted leading-relaxed mb-3">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {project.platforms.map((platform) => {
          const label = PLATFORM_LABELS[platform]?.label || platform;
          return (
            <span key={`${project.id}-${platform}`} className="text-xs px-2 py-1 rounded border border-border-subtle bg-surface-raised">
              {label}
            </span>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="underline">
            Live demo
          </a>
        )}
        {project.githubRepo && (
          <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className="underline">
            GitHub
          </a>
        )}
        {project.downloadUrl && (
          <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className="underline">
            Download
          </a>
        )}
      </div>
    </article>
  );
}

export default function ShowcasePage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/projects?t=${Date.now()}`)
      .then((response) => (response.ok ? response.json() : { projects: [] }))
      .then((payload) => setProjects(payload.projects || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <section className="max-w-5xl mx-auto bg-white border border-border-subtle rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-muted mb-3">Showcase</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Delivered projects</h1>
        <p className="text-sm text-ink-muted mb-8">A direct list of projects with links and platform details.</p>

        {loading ? (
          <p className="text-sm text-ink-muted">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-ink-muted">No projects available.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
