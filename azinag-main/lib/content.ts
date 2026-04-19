// Single source of truth for public marketing content.
// English only — azinag.site is a software house for all industries.

export type Lang = 'en';

export const content = {
  en: {
    nav: {
      work: 'Showcase',
      pricing: 'Pricing',
      about: 'About',
      downloads: 'Downloads',
      applications: 'Applications',
      cta: 'Start Your Project',
    },
    hero: {
      eyebrow: 'Custom Software House — Morocco',
      headline: 'Custom Software Solutions for Every Business.',
      subheadline:
        'From concept to production. Desktop, Mobile, Web, Backend. We build software for every industry and every scale.',
      primaryCta: 'Start Your Project',
      secondaryCta: 'See Our Work',
    },
    proofStrip: [
      { label: 'All Platforms', detail: 'Desktop · Mobile · Web · Backend' },
      { label: 'All Industries', detail: 'Manufacturing to Healthcare to Finance' },
      { label: 'Morocco-based', detail: 'Optimized timezone and cost-effective' },
      { label: 'Long-term Support', detail: 'Maintenance, updates, and scaling' },
    ],
    offers: {
      eyebrow: 'Our Capabilities',
      title: 'Every platform. Every industry.',
      subtitle: 'We build software tailored to your processes — not the other way around.',
      webApp: {
        name: 'Web Applications',
        tagline: 'Modern web portals, SaaS platforms, and progressive web apps.',
        description:
          'From customer-facing portals to internal tools and full SaaS products. We architect scalable web applications that perform at any load.',
        includes: [
          'Single-page & multi-page applications',
          'SaaS platforms with multi-tenant architecture',
          'Progressive Web Apps (PWA)',
          'Admin dashboards & internal tools',
          'SEO-optimized public sites',
        ],
        cta: 'Discuss Your Project',
      },
      desktopApp: {
        name: 'Desktop Applications',
        tagline: 'High-performance apps for Windows, macOS, and Linux.',
        description:
          'Offline-first, hardware-integrated, enterprise-grade desktop software. We specialize in cross-platform desktop apps that feel native on every OS.',
        includes: [
          'Windows, macOS, Linux (cross-platform)',
          'Offline-first with cloud sync',
          'Hardware integrations (printers, scanners)',
          'ERP, POS, and management software',
          'Auto-update & deployment pipeline',
        ],
        cta: 'Discuss Your Project',
      },
      androidApp: {
        name: 'Mobile Applications',
        tagline: 'Native and cross-platform apps for iOS and Android.',
        description:
          'Field apps, customer apps, or internal mobile tools. We deliver polished mobile experiences that work in the real world — online and offline.',
        includes: [
          'iOS (App Store) & Android (Google Play)',
          'React Native cross-platform development',
          'Offline sync & push notifications',
          'GPS, camera, and device integrations',
          'App Store submission guidance',
        ],
        cta: 'Discuss Your Project',
      },
    },
    selectedWork: {
      eyebrow: 'Portfolio',
      title: 'Featured Projects',
      empty: 'Our first case studies are coming soon.',
      viewAll: 'See all projects',
    },
    process: {
      eyebrow: 'How It Works',
      title: 'From idea to production in 3 steps.',
      steps: [
        {
          number: '01',
          title: 'Discovery & Consultation',
          desc: 'We understand your business, your workflows, and your technical constraints. A 30-minute call is enough to scope your project.',
        },
        {
          number: '02',
          title: 'Design & Development',
          desc: 'We build iteratively, keeping you involved at every milestone. You see real progress — not just status updates.',
        },
        {
          number: '03',
          title: 'Launch & Long-term Support',
          desc: 'We deploy, optimize, and stay available for updates, scaling, and new features. Your software grows with your business.',
        },
      ],
    },
    founder: {
      eyebrow: 'Built Locally',
      title: 'Built by a team with real technical depth — not an anonymous agency.',
      body: 'Azinag is a software house based in Morocco. We work directly with founders, operations teams, and CTOs to build software that solves real problems.\n\nNo intermediaries, no outsourcing to unknown contractors. You work directly with the engineers building your product.\n\nWe have shipped desktop apps, SaaS platforms, mobile apps, POS systems, APIs, and integrations — for clients from Morocco to Europe.',
      name: 'Azinag',
      role: 'Software House — Morocco',
      cta: 'Start Your Project',
    },
    faq: {
      title: 'Common Questions',
      items: [
        {
          q: 'What types of software do you build?',
          a: 'We build desktop applications (Windows, macOS, Linux), mobile apps (iOS, Android), web applications (SaaS, PWA, portals), backend systems (APIs, microservices), and custom integrations. We cover the full stack.',
        },
        {
          q: 'Which industries do you work with?',
          a: 'All of them. We have built software for manufacturing, logistics, retail, hospitality, finance, education, healthcare, and professional services. If you have a process, we can automate it.',
        },
        {
          q: 'How long does a project take?',
          a: 'A simple web or mobile app takes 4-8 weeks. A full ERP or complex SaaS product takes 3-6 months. We give you a clear timeline after the discovery call.',
        },
        {
          q: 'Do you provide support after launch?',
          a: 'Yes. We offer maintenance plans covering bug fixes, performance optimization, and new feature development. Every project includes 30 days of post-launch support at no extra charge.',
        },
        {
          q: 'How do I start a project?',
          a: 'Send us a message on WhatsApp. We will schedule a 30-minute discovery call to understand your needs and provide a proposal — no obligation.',
        },
      ],
    },
    finalCta: {
      headline: 'Ready to start your software project?',
      sub: 'Talk directly with our technical team. No sales pitch — just engineering.',
      primaryCta: 'Start Your Project',
      secondaryCta: 'Chat on WhatsApp',
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Transparent pricing. No surprises.',
      subtitle: 'Custom projects are quoted by scope. SaaS apps have fixed monthly pricing in MAD.',
      bookCta: 'Book a Free Call',
      contactCta: 'Contact Us',
      fallback: 'Pricing packages are managed in the admin panel.',
    },
    showcase: {
      eyebrow: 'Portfolio',
      title: 'What We Have Built',
      subtitle: 'Shipped software with measurable outcomes.',
      empty: 'Case studies coming soon.',
      problem: 'Problem',
      solution: 'Solution',
      stack: 'Stack',
      outcome: 'Outcome',
    },
    about: {
      eyebrow: 'About',
      headline: 'A software house built for the long term.',
      body: 'Azinag builds custom software for businesses across all industries — web applications, desktop software, mobile apps, and backend systems.\n\nWe work directly with you: no intermediary agencies, no unknown subcontractors. Your project is built and maintained by the same engineers who designed it.\n\nBased in Morocco, we serve clients across North Africa and Europe with competitive pricing and a timezone that works for everyone.',
      stack: {
        title: 'What We Build',
        items: [
          'Web applications & SaaS platforms',
          'Mobile apps (iOS & Android)',
          'Desktop software (Windows / macOS / Linux)',
          'Backend systems, APIs & microservices',
          'Custom integrations & ERP connectors',
          'Analytics dashboards & reporting tools',
        ],
      },
      values: {
        title: 'How We Work',
        items: [
          'Fixed-price or milestone-based contracts in MAD',
          'Direct communication with the building team',
          'Agile delivery with visible progress',
          'Same-day response, 6 days a week',
        ],
      },
      cta: 'Start Your Project',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's build something.",
      subtitle: 'Fill out this form and we will respond within the business day.',
      bookAlt: 'Prefer to schedule a call directly?',
      bookLinkLabel: 'Choose a time slot →',
      fields: {
        name: 'Your name',
        email: 'Phone or email',
        company: 'Company or project name',
        message: 'Tell us about your project (optional)',
        submit: 'Send',
        sending: 'Sending…',
        sent: 'Message sent',
        error: 'An error occurred. Write to us directly on WhatsApp.',
      },
    },
    lp: {
      landingPage: {
        badge: 'Custom Software House',
        headline: 'Custom software built for your business.',
        sub: 'Desktop, mobile, web, and backend. For every industry.',
        primaryCta: 'Start Your Project',
        secondaryCta: 'See Our Services',
        features: [
          {
            title: 'All Platforms',
            desc: 'Desktop (Windows, macOS, Linux), Mobile (iOS, Android), Web, and Backend. One team for your entire stack.',
          },
          {
            title: 'Direct Communication',
            desc: 'You work with the engineers building your product. No account managers, no hand-offs.',
          },
          {
            title: 'Fixed Pricing in MAD',
            desc: 'No time-and-materials surprises. A clear scope and a clear price before we start.',
          },
          {
            title: 'Long-term Support',
            desc: 'We stay with you after launch — updates, scaling, new features. Your software evolves with your business.',
          },
        ],
        process: [
          '30-min discovery call',
          'Detailed proposal & timeline',
          'Iterative development',
          'Launch & support',
        ],
        footerCta: 'Ready to build?',
        footerSub: 'Book a free 30-minute discovery call. Fixed pricing, guaranteed delivery.',
      },
      mvp: {
        badge: 'MVP Development',
        headline: 'From idea to working product — fast.',
        sub: 'We help startups and teams validate ideas with production-quality MVPs.',
        primaryCta: 'Start Your Project',
        secondaryCta: 'See All Services',
        features: [
          {
            title: 'Fast Delivery',
            desc: 'A working MVP in 4-8 weeks. Real product, not a prototype.',
          },
          {
            title: 'All Platforms',
            desc: 'Web, mobile, or desktop — we pick the right platform for your use case.',
          },
          {
            title: 'Production Quality',
            desc: 'Clean code, tested, deployed. Ready to scale from day one.',
          },
          {
            title: 'Fixed Price',
            desc: 'No hourly billing surprises. A scope, a price, a deadline.',
          },
        ],
        process: [
          'Discovery call',
          'Scope validation',
          'Build the MVP',
          'Launch + feedback loop',
        ],
        footerCta: 'Ready to validate your idea?',
        footerSub: 'Book a free call. Fixed price, 4-8 week delivery.',
      },
    },
    bookThanks: {
      eyebrow: 'Appointment confirmed.',
      headline: 'See you soon.',
      body: 'Check your email for the confirmation. In the meantime, explore our showcase.',
      cta: 'View Showcase',
    },
    footer: {
      tagline: 'Custom software for every business. Desktop · Mobile · Web · Backend.',
      links: {
        work: 'Showcase',
        pricing: 'Pricing',
        about: 'About',
        contact: 'Contact',
      },
      legal: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      },
    },
  },
} as const;

export type ContentTree = typeof content;
export type ContentEn = ContentTree['en'];
export type LangContent = ContentEn;
