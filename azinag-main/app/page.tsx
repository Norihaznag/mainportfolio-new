'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CTAButton } from '@/components/CTAButton';
import { CapabilitiesCard } from '@/components/CapabilitiesCard';
import { AppCard } from '@/components/AppCard';
import { INDUSTRIES } from '@/components/SectorTag';
import { CustomSolutionsCTA } from '@/components/CustomSolutionsCTA';
import type { DownloadableApp } from '@/lib/apps-data';
import { PLATFORM_LABELS, type PortfolioProject } from '@/lib/portfolio-data';
import { DynamicIcon } from '@/components/DynamicIcon';
import {
  FadeUp,
  AnimatedHeadline,
  StaggerContainer,
  StaggerItem,
  SlideIn,
  ScaleIn,
} from '@/components/FadeUp';

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent('Hello, I would like to discuss a software project with Azinag.')}`;

const CAPABILITIES = [
  {
    icon: '💻',
    title: 'Desktop Applications',
    description: 'High-performance apps for Windows, macOS, and Linux — offline-first, hardware-integrated, enterprise-grade.',
    bullets: ['Cross-platform (Electron, Tauri, Qt)', 'Offline sync & auto-update', 'ERP, POS, management software', 'Hardware integrations'],
    href: '/services#desktop',
    accentColor: 'bg-blue-50',
  },
  {
    icon: '📱',
    title: 'Mobile Applications',
    description: 'Native and cross-platform apps for iOS and Android. Field tools, customer apps, internal mobile solutions.',
    bullets: ['React Native & native Swift/Kotlin', 'Offline capability & push notifications', 'GPS, camera, device sensors', 'App Store & Google Play publishing'],
    href: '/services#mobile',
    accentColor: 'bg-green-50',
  },
  {
    icon: '🌐',
    title: 'Web Applications',
    description: 'Modern SaaS platforms, portals, and progressive web apps that scale from launch to millions of users.',
    bullets: ['Next.js, React, Vue — full-stack', 'Multi-tenant SaaS architecture', 'Progressive Web Apps (PWA)', 'Admin dashboards & customer portals'],
    href: '/services#web',
    accentColor: 'bg-indigo-50',
  },
  {
    icon: '⚙️',
    title: 'Backend & APIs',
    description: 'Scalable server-side systems: REST & GraphQL APIs, microservices, cloud infrastructure, and databases.',
    bullets: ['Node.js, Python, Rust, Go', 'PostgreSQL, MongoDB, Redis', 'Docker, cloud deployment', 'Third-party API integrations'],
    href: '/services#backend',
    accentColor: 'bg-purple-50',
  },
  {
    icon: '🔗',
    title: 'Integrations & Connectors',
    description: 'Connect your existing systems — ERP, CRM, payment gateways, logistics APIs, and custom data pipelines.',
    bullets: ['ERP/CRM integration', 'Payment gateway connectors', 'Webhook & event systems', 'Legacy system modernization'],
    href: '/services#integrations',
    accentColor: 'bg-teal-50',
  },
  {
    icon: '🔧',
    title: 'Custom Solutions',
    description: 'No standard product fits? We architect bespoke solutions from the ground up — no technical limits.',
    bullets: ['AI/ML integration', 'Real-time systems', 'IoT & embedded interfaces', 'Security-hardened architectures'],
    href: '/services',
    accentColor: 'bg-orange-50',
  },
];

const WHY_US = [
  {
    icon: '🏗️',
    title: 'Complete Technical Depth',
    desc: 'One team across all platforms and all technologies. No hand-offs, no knowledge gaps between front-end and back-end.',
  },
  {
    icon: '🔄',
    title: 'Agile & Iterative',
    desc: 'You see real progress at every milestone. We adapt as requirements evolve — not locked into a rigid spec from day one.',
  },
  {
    icon: '🛡️',
    title: 'Long-term Support',
    desc: 'We stay with your product after launch. Updates, scaling, new features — your software grows with your business.',
  },
  {
    icon: '🇲🇦',
    title: 'Morocco-based Team',
    desc: 'Timezone compatibility with Europe and MENA. Competitive pricing without compromising engineering quality.',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<PortfolioProject[]>([]);
  const [saasApps, setSaasApps] = useState<DownloadableApp[]>([]);

  const PROCESS = [
    {
      num: '01',
      title: 'Discovery & Consultation',
      desc: 'A 30-minute call is all it takes to scope your project. We map your business needs, technical constraints, and timeline.',
    },
    {
      num: '02',
      title: 'Design & Development',
      desc: 'We build iteratively with visible milestones. You are involved throughout — not just at the start and end.',
    },
    {
      num: '03',
      title: 'Launch & Long-term Support',
      desc: 'We deploy, optimize, and stay available for updates, scaling, and new features. 30 days post-launch support included.',
    },
  ];

  const FAQ = [
    { q: 'What types of software do you build?', a: 'Desktop apps (Windows, macOS, Linux), mobile apps (iOS, Android), web applications, SaaS platforms, backend systems, and custom integrations. We cover the full stack.' },
    { q: 'Which industries do you serve?', a: 'All of them. We have shipped software for manufacturing, logistics, retail, hospitality, finance, education, healthcare, and more. If you have a process, we can automate it.' },
    { q: 'How long does a typical project take?', a: 'A straightforward web or mobile app takes 4-8 weeks. Complex ERP or full SaaS products take 3-6 months. You get a clear timeline after the discovery call.' },
    { q: 'Do you provide post-launch support?', a: 'Yes. Every project includes 30 days of free post-launch support. Ongoing maintenance plans are available covering bug fixes, updates, and scaling.' },
    { q: 'How do I get started?', a: 'Message us on WhatsApp. We will schedule a free 30-minute discovery call, no obligations.' },
  ];

  useEffect(() => {
    fetch(`/api/public/apps?t=${Date.now()}`)
      .then((response) => (response.ok ? response.json() : { apps: [] }))
      .then((payload) => {
        const apps = (payload.apps || []) as DownloadableApp[];
        setSaasApps(apps.filter((app) => !!app.monthlyPrice).slice(0, 4));
      })
      .catch(() => setSaasApps([]));

    fetch(`/api/public/projects?featured=true&t=${Date.now()}`)
      .then((response) => (response.ok ? response.json() : { projects: [] }))
      .then((payload) => setFeaturedProjects((payload.projects || []).slice(0, 4)))
      .catch(() => setFeaturedProjects([]));
  }, []);

  return (
    <div className="text-ink">

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-28 px-6" aria-label="Hero">

        {/* Ambient orbs */}
        <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0">
          <motion.div
            className="absolute -top-40 -right-20 w-[700px] h-[600px]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.18) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-32 -left-32 w-[500px] h-[400px]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.10) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 bg-grid" />

        <div className="relative max-w-5xl mx-auto">

          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">Software House — Morocco</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              Available for projects
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.08] max-w-3xl mb-6">
            <AnimatedHeadline text="Custom Software Solutions for Every Business." delay={0.1} />
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-[1.0625rem] text-ink-muted leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            From concept to production. <strong className="text-ink font-semibold">Desktop, Mobile, Web, Backend.</strong>{' '}
            We build software tailored to your business — for any industry, any scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-primary-cta"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-8 py-4 text-base hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true" className="text-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Start Your Project
            </a>
            <Link
              href="/showcase"
              className="inline-flex items-center justify-center font-semibold rounded-lg border border-border-subtle text-ink hover:bg-surface-raised transition-colors px-8 py-4 text-base"
            >
              See Our Work
            </Link>
          </motion.div>

          {/* Platform pills */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { icon: '💻', label: 'Desktop (Win · Mac · Linux)' },
              { icon: '📱', label: 'Mobile (iOS · Android)' },
              { icon: '🌐', label: 'Web & SaaS' },
              { icon: '⚙️', label: 'Backend & APIs' },
            ].map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-surface border border-border-subtle rounded-full px-3 py-1.5 text-ink-muted"
              >
                <span aria-hidden="true">{p.icon}</span>
                {p.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PROOF STRIP ───────────────────────────────────────── */}
      <section className="relative bg-surface border-y border-border-subtle py-10 px-6" aria-label="Key facts">
        <StaggerContainer className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8" stagger={0.12}>
          {[
            { label: 'All Platforms', detail: 'Desktop · Mobile · Web · Backend' },
            { label: 'All Industries', detail: 'Manufacturing to Finance to Healthcare' },
            { label: 'Morocco-based', detail: 'Optimized timezone, competitive rates' },
            { label: 'Long-term Support', detail: 'Maintenance, scaling, and new features' },
          ].map((item) => (
            <StaggerItem key={item.label}>
              <p className="text-[0.9375rem] font-semibold text-ink mb-0.5">{item.label}</p>
              <p className="text-sm text-ink-muted">{item.detail}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ─── CAPABILITIES ──────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 px-6" aria-labelledby="capabilities-heading">
        <div className="relative max-w-5xl mx-auto">
          <FadeUp>
            <p className="eyebrow mb-3">What We Build</p>
            <h2 id="capabilities-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Every platform. Every industry.
            </h2>
            <p className="text-ink-muted mb-14 text-[1.0625rem] max-w-xl">
              We build software tailored to your processes — not the other way around.
            </p>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1} delay={0.05}>
            {CAPABILITIES.map((cap) => (
              <StaggerItem key={cap.title}>
                <CapabilitiesCard {...cap} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── INDUSTRIES ────────────────────────────────────────── */}
      <section className="relative py-20 px-6 bg-surface border-t border-border-subtle" aria-labelledby="industries-heading">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="eyebrow mb-3">Versatility</p>
            <h2 id="industries-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              We build for every industry.
            </h2>
            <p className="text-ink-muted mb-10 text-[1.0625rem]">
              If your business has a process, we can build software around it.
            </p>
          </FadeUp>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.label}
                className="flex items-center gap-2.5 border border-border-subtle rounded-xl bg-white px-4 py-3 text-sm font-medium text-ink-muted hover:border-accent/30 hover:text-ink transition-colors"
              >
                <span aria-hidden="true" className="text-lg">{ind.icon}</span>
                {ind.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─────────────────────────────────── */}
      <section className="relative py-24 px-6 border-t border-border-subtle" aria-labelledby="work-heading">
        <div className="relative max-w-5xl mx-auto">
          <FadeUp>
            <p className="eyebrow mb-3">Portfolio</p>
            <div className="flex items-end justify-between mb-12">
              <h2 id="work-heading" className="text-3xl sm:text-4xl font-bold tracking-tight">Featured Projects</h2>
              <Link href="/showcase" className="text-sm font-medium text-accent hover:underline hidden sm:block">
                View all →
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" stagger={0.1}>
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/showcase" className="text-sm font-medium text-accent hover:underline">View all projects →</Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 px-6 bg-surface border-t border-border-subtle" aria-labelledby="why-heading">
        <div className="relative max-w-5xl mx-auto">
          <FadeUp>
            <p className="eyebrow mb-3">Why Azinag</p>
            <h2 id="why-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
              Built for the long term.
            </h2>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 gap-6" stagger={0.1}>
            {WHY_US.map((item) => (
              <StaggerItem key={item.title}>
                <div className="border border-border-subtle rounded-2xl bg-white p-7 h-full">
                  <p className="text-3xl mb-4" aria-hidden="true">{item.icon}</p>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── PROCESS ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 px-6 border-t border-border-subtle" aria-labelledby="process-heading">
        <div className="relative max-w-5xl mx-auto">
          <FadeUp>
            <p className="eyebrow mb-3">How It Works</p>
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-16">
              From idea to production in 3 steps.
            </h2>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10" stagger={0.15}>
            {PROCESS.map((step, idx) => (
              <StaggerItem key={step.num}>
                <div className="flex flex-col">
                  <motion.div
                    className="gradient-number text-5xl font-bold mb-4 font-serif italic leading-none"
                    initial={{ opacity: 0, scale: 1.3, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step.num}
                  </motion.div>
                  <h3 className="text-[0.9375rem] font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── SAAS APPS TEASER ──────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-surface border-t border-border-subtle" aria-labelledby="saas-heading">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="eyebrow mb-3">Ready-Made Solutions</p>
            <div className="flex items-end justify-between mb-4">
              <h2 id="saas-heading" className="text-3xl sm:text-4xl font-bold tracking-tight max-w-xl">
                Optimize your business with our cloud tools.
              </h2>
            </div>
            <p className="text-ink-muted mb-10 text-[1.0625rem] max-w-2xl">
              Beyond custom development, we offer ready-made SaaS applications.{' '}
              <strong className="text-ink font-semibold">Monthly subscription, no commitment.</strong>{' '}
              Integrable with your existing systems.
            </p>
          </FadeUp>

          {/* Horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 sm:-mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide">
            {saasApps.map((app) => (
              <AppCard key={app.id} app={app} variant="mini" />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/applications"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              See all applications →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CUSTOM SOLUTIONS CTA ──────────────────────────────── */}
      <section className="px-6 pb-16 border-t border-border-subtle pt-16" aria-label="Custom solutions CTA">
        <div className="max-w-5xl mx-auto">
          <CustomSolutionsCTA />
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 border-t border-border-subtle bg-surface" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">Common Questions</h2>
          </FadeUp>
          <div className="divide-y divide-border-subtle">
            {FAQ.map((item, i) => (
              <div key={i} role="listitem">
                <button
                  type="button"
                  className="w-full text-left py-5 flex items-center justify-between gap-4 hover:text-accent transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-[0.9375rem] font-semibold">{item.q}</span>
                  <motion.span
                    className="shrink-0 text-ink-faint text-xl leading-none select-none"
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  id={`faq-answer-${i}`}
                  role="region"
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="pb-5 text-sm text-ink-muted leading-relaxed">{item.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border-subtle" aria-labelledby="cta-heading">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e1b4b 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid opacity-10"
        />
        <div className="relative py-32 px-6">
          <div className="relative max-w-2xl mx-auto text-center">
            <ScaleIn>
              <p className="eyebrow mb-5 text-white/60">Ready to Build?</p>
              <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
                Ready to start your software project?
              </h2>
              <p className="text-white/70 mb-10 text-[1.0625rem]">
                Talk directly with our technical team. No sales pitch — just engineering.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="final-cta-whatsapp"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold rounded-lg px-8 py-4 text-base hover:bg-[#1ebe57] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center font-semibold rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors px-8 py-4 text-base"
                >
                  Send a Message
                </Link>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

    </div>
  );
}

// ─── Inline ProjectCard for featured work ──────────────────────
function ProjectCard({ project }: { project: PortfolioProject }) {
  const platforms = project.platforms
    .map((platform) => PLATFORM_LABELS[platform as keyof typeof PLATFORM_LABELS])
    .filter(
      (platform): platform is (typeof PLATFORM_LABELS)[keyof typeof PLATFORM_LABELS] =>
        !!platform
    );

  return (
    <article className="border border-border-subtle rounded-2xl bg-white overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Gradient banner */}
      <div className={`w-full h-24 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white`} aria-hidden="true">
        <DynamicIcon name={project.icon} className="w-10 h-10 opacity-90" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-[1rem]">{project.name}</h3>
          {project.featured && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700 shrink-0">Featured</span>
          )}
        </div>
        <p className="text-sm text-ink-muted mb-3">{project.tagline}</p>
        <p className="text-sm text-ink-muted leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {platforms.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-accent-light text-accent">
              <DynamicIcon name={p.icon} className="w-3 h-3" />
              {p.label}
            </span>
          ))}
        </div>

        {/* Industry + outcome */}
        <div className="flex items-center gap-2 text-xs text-ink-faint mb-4">
          <span className="bg-surface border border-border-subtle rounded-full px-2 py-0.5 font-medium text-ink-muted capitalize">{project.industry}</span>
          <span>·</span>
          <span>{project.outcome}</span>
        </div>

        {/* CTA */}
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            View project →
          </a>
        ) : project.downloadUrl ? (
          <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline">
            Download program →
          </a>
        ) : (
          <Link href="/showcase" className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            View details →
          </Link>
        )}
      </div>
    </article>
  );
}
