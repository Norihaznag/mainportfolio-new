import { PLATFORM_LABELS } from '@/lib/portfolio-data';
import { fetchPublishedProjects } from '@/lib/projects-server';

export const dynamic = 'force-dynamic';

function ProjectCard({ project }: { project: Awaited<ReturnType<typeof fetchPublishedProjects>>[number] }) {
  return (
    <article className="border border-border-subtle rounded-xl p-4 bg-surface-raised">
      <h2 className="text-base font-semibold mb-1">{project.name}</h2>
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
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="underline text-accent">
            Live demo
          </a>
        )}
        {project.githubRepo && (
          <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className="underline text-accent">
            GitHub
          </a>
        )}
        {project.downloadUrl && (
          <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className="underline text-accent">
            Download
          </a>
        )}
      </div>
    </article>
  );
}

export default async function ShowcasePage() {
  const projects = await fetchPublishedProjects();

  return (
    <div className="text-ink bg-surface min-h-screen pt-24 pb-16 px-6">
      <section className="max-w-5xl mx-auto bg-white border border-border-subtle rounded-2xl p-7 md:p-8">
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-muted mb-3">Showcase</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-3">Delivered projects</h1>
        <p className="text-sm text-ink-muted mb-8">A direct list of projects with links and platform details.</p>

        {projects.length === 0 ? (
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
