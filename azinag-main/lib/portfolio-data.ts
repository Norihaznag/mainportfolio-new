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

export const portfolio: PortfolioProject[] = [
  {
    id: 'inventory-mobile',
    name: 'StockManager Mobile',
    tagline: 'Inventory management mobile app for SMEs',
    description:
      'Cross-platform mobile application (iOS & Android) for real-time inventory tracking, supplier management, and automated reorder alerts. Deployed across 30+ warehouses.',
    platforms: ['mobile', 'backend'],
    industry: 'Logistics',
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'iOS', 'Android'],
    outcome: '40% reduction in manual inventory errors. 30+ deployments.',
    icon: '📦',
    gradient: 'from-blue-500 to-indigo-600',
    featured: true,
  },
  {
    id: 'erp-desktop',
    name: 'OpsDesk ERP',
    tagline: 'Desktop ERP for mid-sized manufacturing companies',
    description:
      'Windows desktop application integrating production planning, HR, payroll, and financial reporting. Offline-first with daily cloud sync.',
    platforms: ['desktop', 'backend'],
    industry: 'Manufacturing',
    tags: ['Electron', 'SQLite', 'Python', 'Windows'],
    outcome: 'Replaced 3 legacy tools. 60% faster monthly reporting.',
    icon: '🏭',
    gradient: 'from-slate-600 to-slate-800',
    featured: true,
  },
  {
    id: 'booking-web',
    name: 'ReserveNow Platform',
    tagline: 'Multi-channel online booking web app with payment integration',
    description:
      'Progressive web application supporting appointments, group bookings, waitlists, and automated reminders. Integrated with local payment gateways.',
    platforms: ['web', 'backend'],
    industry: 'Services',
    tags: ['Next.js', 'Supabase', 'Stripe', 'PWA'],
    outcome: '3× more bookings vs phone-only. 98.7% uptime in first year.',
    icon: '📅',
    gradient: 'from-teal-500 to-emerald-600',
    liveUrl: 'https://azinag.site',
    featured: true,
  },
  {
    id: 'analytics-saas',
    name: 'RetailPulse Dashboard',
    tagline: 'Real-time analytics SaaS for multi-location retail chains',
    description:
      'Web-based analytics platform consolidating sales data from multiple POS systems into a single dashboard with trend analysis and alert triggers.',
    platforms: ['web', 'backend'],
    industry: 'Retail',
    tags: ['React', 'FastAPI', 'ClickHouse', 'WebSocket'],
    outcome: 'Used by 12 retail chains. Average decision time down 4 hours/week.',
    icon: '📈',
    gradient: 'from-orange-500 to-amber-600',
    featured: false,
  },
  {
    id: 'pos-system',
    name: 'FlowPOS',
    tagline: 'Offline-capable POS system for hospitality and retail',
    description:
      'Cross-platform desktop POS with optional Android tablet mode. Works fully offline with background sync. Supports thermal printing and barcode scanning.',
    platforms: ['desktop', 'mobile', 'backend'],
    industry: 'Hospitality & Retail',
    tags: ['Tauri', 'Rust', 'SQLite', 'Android', 'Windows'],
    outcome: 'Deployed in 50+ locations. 99.9% transaction success rate.',
    icon: '🏪',
    gradient: 'from-rose-500 to-pink-600',
    featured: true,
  },
  {
    id: 'hr-platform',
    name: 'TalentCore HR',
    tagline: 'HR and payroll management web portal',
    description:
      'Full-featured HR platform: employee onboarding, leave management, payroll calculation, performance reviews, and org chart visualization.',
    platforms: ['web', 'backend'],
    industry: 'Human Resources',
    tags: ['Vue.js', 'Django', 'PostgreSQL', 'PDF generation'],
    outcome: '80% faster payroll processing. SOC 2-ready architecture.',
    icon: '👥',
    gradient: 'from-violet-500 to-purple-600',
    featured: false,
  },
  {
    id: 'api-integration',
    name: 'BridgeAPI Gateway',
    tagline: 'Custom API integration layer connecting legacy ERP with modern tools',
    description:
      'Middleware service exposing a clean REST + webhook API over a legacy SOAP-based ERP. Handles data transformation, rate limiting, and monitoring.',
    platforms: ['backend'],
    industry: 'Finance',
    tags: ['Node.js', 'Redis', 'Docker', 'REST', 'SOAP'],
    outcome: 'Connected 7 departments previously working in silos.',
    icon: '⚙️',
    gradient: 'from-cyan-500 to-blue-600',
    featured: false,
  },
  {
    id: 'elearning',
    name: 'LearnPath LMS',
    tagline: 'White-label Learning Management System for corporate training',
    description:
      'Multi-tenant LMS with video hosting, quizzes, certificates, and progress tracking. Deployed privately for enterprise clients.',
    platforms: ['web', 'mobile', 'backend'],
    industry: 'Education',
    tags: ['Next.js', 'HLS streaming', 'Supabase', 'PWA', 'iOS', 'Android'],
    outcome: '5 enterprise clients. 15,000+ active learners.',
    icon: '📚',
    gradient: 'from-indigo-500 to-blue-600',
    featured: false,
  },
];

export const PLATFORM_LABELS: Record<PortfolioProject['platforms'][number], string> = {
  desktop: '💻 Desktop',
  mobile: '📱 Mobile',
  web: '🌐 Web',
  backend: '⚙️ Backend',
};

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolio.filter((p) => p.featured);
}
