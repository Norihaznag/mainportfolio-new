// Portfolio projects data — all in English, platform-focused, industry-neutral.

export interface PortfolioProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  platforms: ('desktop' | 'mobile' | 'web' | 'backend')[];
  industry: string;
  tags: string[];
  outcome: string;
  liveUrl?: string;
  downloadUrl?: string;
  githubRepo?: string;
  featured?: boolean;
  icon: string;
  gradient: string;
}

export const portfolio: PortfolioProject[] = [];

export const PLATFORM_LABELS: Record<PortfolioProject['platforms'][number], { id: string; icon: string; label: string }> = {
  desktop: { id: 'desktop', icon: 'Monitor', label: 'Desktop' },
  mobile: { id: 'mobile', icon: 'Smartphone', label: 'Mobile' },
  web: { id: 'web', icon: 'Globe', label: 'Web' },
  backend: { id: 'backend', icon: 'Database', label: 'Backend' },
};

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolio.filter((p) => p.featured);
}
