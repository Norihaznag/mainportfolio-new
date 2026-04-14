// Single source of truth for all Azinag applications (downloadable + SaaS).
// Both the /downloads page and /applications page import from here.

export interface DownloadableApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  category: 'business' | 'productivity' | 'utility' | 'development';
  platforms: {
    windows?: { url: string; version: string; size?: string };
    macos?: { url: string; version: string; size?: string };
    linux?: { url: string; version: string; size?: string };
    ios?: { appStoreUrl: string; version: string };
    android?: { playStoreUrl: string; version: string };
    web?: { liveUrl: string };
  };
  features: string[];
  latestVersion: string;
  releaseDate: string;
  rating?: number;
  downloads?: number;
  industryUse: string[];
  githubRepo?: string;
  documentation?: string;
  // SaaS fields (optional — only for subscription apps)
  slug?: string;
  sector?: 'pme' | 'logistique' | 'gestion' | 'services';
  badge?: 'New' | 'Popular';
  monthlyPrice?: number;
  annualPrice?: number;
  saasFeatures?: { icon: string; title: string; description: string }[];
  screenshots?: { alt: string; bg: string }[];
  faq?: { question: string; answer: string }[];
  tiers?: Array<{
    name: 'Starter' | 'Pro';
    monthlyPrice: number;
    annualPrice: number;
    features: string[];
  }>;
}

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';

export const apps: DownloadableApp[] = [
  {
    id: 'datasync-pro',
    slug: 'datasync-pro',
    name: 'DataSync Pro',
    tagline: 'Real-time cloud data synchronization for your organization.',
    description:
      'Keep all your business tools and teams in sync. DataSync Pro connects your existing software and ensures everyone works from the same live data — no manual exports, no version conflicts.',
    icon: '🔄',
    category: 'business',
    sector: 'gestion',
    badge: 'Popular',
    monthlyPrice: 199,
    annualPrice: 159,
    platforms: {
      windows: {
        url: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like to download DataSync Pro for Windows.')}`,
        version: '2.4.1',
        size: '48 MB',
      },
      macos: {
        url: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like to download DataSync Pro for macOS.')}`,
        version: '2.4.1',
        size: '52 MB',
      },
      linux: {
        url: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like to download DataSync Pro for Linux.')}`,
        version: '2.4.1',
        size: '45 MB',
      },
      web: { liveUrl: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like to access DataSync Pro online.')}` },
    },
    features: [
      'Real-time sync across all connected tools',
      'Native integrations: Google Workspace, Notion, Airtable, 40+ more',
      'AES-256 end-to-end encryption',
      '12-month change history',
      'Smart conflict detection & resolution',
      'Multi-team access with role-based permissions',
    ],
    latestVersion: '2.4.1',
    releaseDate: '2025-03-10',
    rating: 4.8,
    downloads: 1200,
    industryUse: ['manufacturing', 'logistics', 'finance', 'hr', 'operations'],
    documentation: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I need documentation for DataSync Pro.')}`,
    saasFeatures: [
      { icon: '⚡', title: 'Real-time Sync', description: 'Instant synchronization across all your tools and teams, zero delay.' },
      { icon: '🔗', title: 'Native Integrations', description: 'Connect Google Sheets, Notion, Airtable and 40+ business tools.' },
      { icon: '🛡️', title: 'End-to-End Encryption', description: 'Your data is protected with AES-256 encryption throughout.' },
      { icon: '📊', title: 'Full History', description: 'Access complete change history for every record over 12 months.' },
      { icon: '🔔', title: 'Smart Alerts', description: 'Instant notifications when anomalies or conflicts are detected.' },
      { icon: '🌍', title: 'Multi-Team', description: 'Manage multiple teams with custom role-based access controls.' },
    ],
    screenshots: [
      { alt: 'DataSync Pro synchronization dashboard', bg: 'from-blue-600 to-indigo-700' },
      { alt: 'Integration connectors view', bg: 'from-indigo-600 to-purple-700' },
      { alt: 'History and sync logs', bg: 'from-violet-600 to-blue-700' },
    ],
    faq: [
      { question: 'How many tools can I connect?', answer: 'Starter plan supports up to 5 tools. Pro plan offers unlimited connections with 40+ native integrations.' },
      { question: 'Is my data secure?', answer: 'Yes. All data is transmitted over HTTPS and encrypted with AES-256. We never store your data content — only sync metadata.' },
      { question: 'Can I try before subscribing?', answer: 'Yes. Contact us on WhatsApp and we will give you a free 14-day trial, no credit card required.' },
      { question: 'What happens if I exceed the sync limit?', answer: 'We notify you by email before you hit the limit. No service interruption — you can upgrade anytime.' },
    ],
    tiers: [
      {
        name: 'Starter',
        monthlyPrice: 199,
        annualPrice: 159,
        features: ['5 tool connections', 'Sync every 5 minutes', '30-day history', '2 team members', 'Email support'],
      },
      {
        name: 'Pro',
        monthlyPrice: 349,
        annualPrice: 279,
        features: ['Unlimited connections', 'Real-time sync', '12-month history', 'Unlimited teams', 'Priority WhatsApp support', 'Advanced reporting'],
      },
    ],
  },
  {
    id: 'invoiceflow',
    slug: 'invoiceflow',
    name: 'InvoiceFlow',
    tagline: 'Invoice faster. Get paid without chasing.',
    description:
      'Automated invoicing and cash flow management for SMEs and freelancers. Create, send, and track invoices in seconds. Know exactly who owes you — and when.',
    icon: '🧾',
    category: 'business',
    sector: 'pme',
    badge: 'New',
    monthlyPrice: 149,
    annualPrice: 119,
    platforms: {
      windows: {
        url: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like to download InvoiceFlow for Windows.')}`,
        version: '1.8.0',
        size: '32 MB',
      },
      macos: {
        url: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like to download InvoiceFlow for macOS.')}`,
        version: '1.8.0',
        size: '35 MB',
      },
      web: { liveUrl: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like to access InvoiceFlow online.')}` },
    },
    features: [
      'Professional invoices in under 30 seconds',
      'Send via email or WhatsApp directly from the app',
      'Real-time payment tracking dashboard',
      'Cash flow forecast for 30 and 90 days',
      'Automated recurring invoice scheduling',
      'Convert accepted quotes to invoices in one click',
    ],
    latestVersion: '1.8.0',
    releaseDate: '2025-01-20',
    rating: 4.7,
    downloads: 850,
    industryUse: ['freelance', 'consulting', 'retail', 'services', 'construction'],
    documentation: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I need documentation for InvoiceFlow.')}`,
    saasFeatures: [
      { icon: '📄', title: 'Invoices in 30 Seconds', description: 'Generate professional, compliant invoices with a few clicks.' },
      { icon: '📬', title: 'Auto-Send', description: 'Send invoices by email or WhatsApp directly from the application.' },
      { icon: '💸', title: 'Payment Tracking', description: 'See in real-time which invoices are paid, pending, or overdue.' },
      { icon: '📈', title: 'Cash Flow Dashboard', description: 'Cash flow view with 30 and 90-day forecasts for confident planning.' },
      { icon: '🔁', title: 'Recurring Invoices', description: 'Automate billing for repeat clients with saved templates.' },
      { icon: '🏷️', title: 'One-Click Quotes', description: 'Turn an accepted quote into an invoice instantly — no re-entry.' },
    ],
    screenshots: [
      { alt: 'InvoiceFlow invoice creation screen', bg: 'from-emerald-600 to-teal-700' },
      { alt: 'Cash flow and treasury dashboard', bg: 'from-teal-600 to-cyan-700' },
      { alt: 'Payment tracking list', bg: 'from-cyan-600 to-emerald-700' },
    ],
    faq: [
      { question: 'Are invoices legally compliant?', answer: 'Yes. InvoiceFlow generates invoices compliant with Moroccan DGI requirements: sequential numbering, mandatory fields, VAT handling. You can add your logo and company details.' },
      { question: 'Can I invoice in foreign currencies?', answer: 'Starter plan supports MAD and EUR. Pro plan adds all major currencies with automatic exchange rates.' },
      { question: 'How does overdue follow-up work?', answer: 'InvoiceFlow sends automatic email reminders at D+7, D+15, and D+30 after due date. You can customize the text and frequency.' },
      { question: 'Can I export my data?', answer: 'Yes. Export all invoices, clients, and accounting data as PDF, Excel, or CSV at any time. Your data belongs to you.' },
    ],
    tiers: [
      {
        name: 'Starter',
        monthlyPrice: 149,
        annualPrice: 119,
        features: ['20 invoices/month', 'Automated email sending', 'Payment tracking', '1 user', 'Email support'],
      },
      {
        name: 'Pro',
        monthlyPrice: 299,
        annualPrice: 239,
        features: ['Unlimited invoices', 'WhatsApp + email sending', 'Cash flow & forecasts', '5 users', 'Recurring invoices', 'Priority support'],
      },
    ],
  },
  {
    id: 'teamcollab',
    slug: 'teamcollab',
    name: 'TeamCollab',
    tagline: 'Your team, finally aligned and productive.',
    description:
      'Internal collaboration platform for distributed teams. Tasks, messages, files, and projects — centralized in one workspace. Less email, more clarity.',
    icon: '🤝',
    category: 'productivity',
    sector: 'services',
    monthlyPrice: 129,
    annualPrice: 103,
    platforms: {
      web: { liveUrl: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like to access TeamCollab.')}` },
      ios: {
        appStoreUrl: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like TeamCollab on iOS.')}`,
        version: '3.1.2',
      },
      android: {
        playStoreUrl: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like TeamCollab on Android.')}`,
        version: '3.1.2',
      },
    },
    features: [
      'Task creation, assignment, and deadline tracking',
      'Team messaging channels by project or department',
      'File sharing directly in conversations',
      'Shared calendar for meetings and milestones',
      'Real-time project progress visualization',
      'Private spaces for HR, management, and sensitive projects',
    ],
    latestVersion: '3.1.2',
    releaseDate: '2024-11-05',
    rating: 4.6,
    downloads: 620,
    industryUse: ['any industry', 'remote teams', 'agencies', 'startups', 'enterprise'],
    documentation: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I need documentation for TeamCollab.')}`,
    saasFeatures: [
      { icon: '📋', title: 'Task Management', description: 'Create, assign, and track tasks with deadlines and priority levels.' },
      { icon: '💬', title: 'Team Messaging', description: 'Project and team channels for focused communication.' },
      { icon: '📁', title: 'File Sharing', description: 'Share documents and files directly in conversations.' },
      { icon: '🗓️', title: 'Shared Calendar', description: 'Meetings, deadlines, and events visible to the whole team.' },
      { icon: '📊', title: 'Progress Tracking', description: 'Visual dashboard to track each project in real time.' },
      { icon: '🔐', title: 'Private Spaces', description: 'Confidential spaces for HR, management, or sensitive projects.' },
    ],
    screenshots: [
      { alt: 'TeamCollab team dashboard', bg: 'from-violet-600 to-purple-700' },
      { alt: 'Tasks and active projects view', bg: 'from-purple-600 to-pink-700' },
      { alt: 'Messaging and file sharing', bg: 'from-pink-600 to-violet-700' },
    ],
    faq: [
      { question: 'Does TeamCollab work on mobile?', answer: 'Yes. TeamCollab has native iOS and Android apps plus a full-featured web app — no desktop required.' },
      { question: 'How many members can join a workspace?', answer: 'Starter plan includes up to 10 members. Pro plan is unlimited. Special pricing available for large organizations.' },
      { question: 'Can I import existing projects?', answer: 'Yes. Import from Trello, Asana, or CSV files. Our team assists with migration at no extra cost.' },
      { question: 'What is the file storage limit?', answer: 'Starter plan: 5 GB shared storage. Pro plan: 50 GB. Individual files up to 2 GB.' },
    ],
    tiers: [
      {
        name: 'Starter',
        monthlyPrice: 129,
        annualPrice: 103,
        features: ['10 members max', 'Unlimited projects', '5 GB storage', 'Team messaging', 'Email support'],
      },
      {
        name: 'Pro',
        monthlyPrice: 249,
        annualPrice: 199,
        features: ['Unlimited members', 'Unlimited projects & spaces', '50 GB storage', 'Private spaces & advanced roles', 'Calendar + integrations', 'Priority support'],
      },
    ],
  },
  {
    id: 'analyticshub',
    slug: 'analyticshub',
    name: 'AnalyticsHub',
    tagline: 'Business insights in one click. No data science degree required.',
    description:
      'Connect your data sources and get clear visual reports that drive decisions. AnalyticsHub turns raw numbers into readable dashboards for any business.',
    icon: '📊',
    category: 'business',
    sector: 'gestion',
    badge: 'New',
    monthlyPrice: 179,
    annualPrice: 143,
    platforms: {
      web: { liveUrl: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like to access AnalyticsHub.')}` },
      windows: {
        url: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I would like to download AnalyticsHub for Windows.')}`,
        version: '1.5.0',
        size: '58 MB',
      },
    },
    features: [
      'Live KPI tracking on a central dashboard',
      'Automated weekly and monthly reports by email',
      'Connect Google Analytics, CRM, Excel, and more',
      'Interactive charts, geo maps, and cross-tables',
      'Threshold alerts when a metric deviates',
      'Export reports as PDF or share via secure link',
    ],
    latestVersion: '1.5.0',
    releaseDate: '2025-02-14',
    rating: 4.9,
    downloads: 430,
    industryUse: ['e-commerce', 'retail', 'marketing', 'finance', 'logistics'],
    documentation: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('I need documentation for AnalyticsHub.')}`,
    saasFeatures: [
      { icon: '🎯', title: 'Live KPIs', description: 'Track key performance indicators in real time on a central dashboard.' },
      { icon: '📉', title: 'Automated Reports', description: 'Receive weekly and monthly reports by email, without manual work.' },
      { icon: '🔌', title: 'Multi-Source', description: 'Connect Google Analytics, your CRM, Excel, and other data sources.' },
      { icon: '🗺️', title: 'Advanced Visualizations', description: 'Interactive charts, geographic maps, and pivot tables.' },
      { icon: '🤖', title: 'Threshold Alerts', description: 'Define critical thresholds and get instant alerts when a metric goes off track.' },
      { icon: '📤', title: 'Export & Share', description: 'Export as PDF or share with stakeholders via a secure link.' },
    ],
    screenshots: [
      { alt: 'AnalyticsHub main dashboard', bg: 'from-orange-500 to-amber-600' },
      { alt: 'Charts and trends view', bg: 'from-amber-500 to-yellow-600' },
      { alt: 'Automated monthly report', bg: 'from-yellow-500 to-orange-600' },
    ],
    faq: [
      { question: 'Do I need technical skills to use AnalyticsHub?', answer: 'No. AnalyticsHub is built for decision-makers, not data scientists. The interface is intuitive and we guide you through the initial setup.' },
      { question: 'Which data sources can I connect?', answer: 'Google Analytics, Google Sheets, Meta Ads, Supabase, PostgreSQL, MySQL, and CSV/Excel files. New integrations added each quarter.' },
      { question: 'Is data refreshed in real time?', answer: 'Starter plan refreshes data hourly. Pro plan offers near real-time refresh under 5 minutes.' },
      { question: 'Can I create custom dashboards per team member?', answer: 'Yes. Create role-based views — the sales lead sees their KPIs, the director sees the consolidated view. Everyone gets their own dashboard.' },
    ],
    tiers: [
      {
        name: 'Starter',
        monthlyPrice: 179,
        annualPrice: 143,
        features: ['3 data sources', 'Hourly refresh', '5 dashboards', '2 users', 'Monthly PDF reports'],
      },
      {
        name: 'Pro',
        monthlyPrice: 329,
        annualPrice: 263,
        features: ['Unlimited sources', 'Real-time (< 5 min)', 'Unlimited dashboards', '10 users', 'Threshold alerts', 'Priority support + onboarding'],
      },
    ],
  },
];

// Helper exports for SaaS-specific pages
export type SaasApp = DownloadableApp & Required<Pick<DownloadableApp, 'slug' | 'monthlyPrice' | 'annualPrice' | 'tiers' | 'faq' | 'saasFeatures' | 'screenshots'>>;

export function getSaasApps(): SaasApp[] {
  return apps.filter(
    (a): a is SaasApp =>
      !!a.slug && !!a.monthlyPrice && !!a.tiers && !!a.faq && !!a.saasFeatures && !!a.screenshots
  );
}

export function getAppBySlug(slug: string): DownloadableApp | undefined {
  return apps.find((a) => a.slug === slug);
}

export const SECTORS = [
  { value: 'all', label: 'All' },
  { value: 'pme', label: 'SME / Commerce' },
  { value: 'logistique', label: 'Logistics' },
  { value: 'gestion', label: 'Management' },
  { value: 'services', label: 'Professional Services' },
] as const;
