// Single source of truth for public marketing content.
// English is the default/indexed language; Arabic is secondary UI language.

export type Lang = 'en' | 'ar';

export const content = {
  en: {
    nav: {
      work: 'Work',
      pricing: 'Pricing',
      about: 'About',
      cta: 'Book a call',
    },
    hero: {
      eyebrow: 'Founder-led studio',
      headline: 'The digital foundation your startup needs.',
      subheadline:
        'Web apps, desktop apps, and Android apps — built by a founder who ships. Clean code, sharp design, fixed scope.',
      primaryCta: 'Book a discovery call',
      secondaryCta: 'See selected work',
    },
    proofStrip: [
      { label: 'Founder-led', detail: 'Direct line to the builder' },
      { label: 'Fixed scope', detail: 'No surprise invoices' },
      { label: 'Fast delivery', detail: 'Typical turnaround 2–6 weeks' },
      { label: 'Global clients', detail: 'Remote-first workflow' },
    ],
    offers: {
      eyebrow: 'What we build',
      title: 'Three focused services.',
      subtitle: 'Clear deliverables. Fixed pricing.',
      webApp: {
        name: 'Web App',
        tagline: 'Full-featured web applications, shipped fast.',
        description:
          'SaaS platforms, internal tools, and customer portals. Built with modern React stack and deployed to production.',
        includes: [
          'Custom UI/UX design',
          'Full-stack Next.js build',
          'Auth, database & API layer',
          'Admin dashboard',
          'Production deployment & handoff',
        ],
        cta: 'Book a discovery call',
        link: '/lp/startup-mvp-development',
      },
      desktopApp: {
        name: 'Desktop App',
        tagline: 'Native desktop software for serious workflows.',
        description:
          'Cross-platform desktop applications built with Electron or Tauri. Fast, native-feeling, and fully yours.',
        includes: [
          'Cross-platform (Windows / macOS / Linux)',
          'Native OS integration',
          'Offline-capable',
          'Auto-update support',
          'Full source code handoff',
        ],
        cta: 'Book a discovery call',
        link: '/contact',
      },
      androidApp: {
        name: 'Android App',
        tagline: 'Android apps built to ship.',
        description:
          'Native or React Native Android apps from design to Play Store. Scoped, priced, and delivered.',
        includes: [
          'Android-native or React Native',
          'Clean UI/UX design',
          'Backend & API integration',
          'Play Store submission',
          'Full source code handoff',
        ],
        cta: 'Book a discovery call',
        link: '/contact',
      },
    },
    selectedWork: {
      eyebrow: 'Portfolio',
      title: 'Selected work',
      empty: 'Case studies coming soon.',
      viewAll: 'View all work',
    },
    process: {
      eyebrow: 'The process',
      title: 'How it works',
      steps: [
        {
          number: '01',
          title: 'Discovery call',
          desc: 'We talk through your goals, constraints, and timeline in a focused 30-minute call.',
        },
        {
          number: '02',
          title: 'Scoping & proposal',
          desc: 'You receive a detailed scope, timeline, and fixed price within 24 hours.',
        },
        {
          number: '03',
          title: 'Build cycle',
          desc: 'Weekly check-ins. You review progress, I iterate. No black-box builds.',
        },
        {
          number: '04',
          title: 'Launch & handoff',
          desc: 'Deployed to your infrastructure with full documentation and ongoing support options.',
        },
      ],
    },
    founder: {
      eyebrow: 'Who builds this',
      title: 'Built by someone with skin in the game.',
      body: "I'm a software developer who builds for early-stage startups. Not an agency, not a team of contractors — one builder who owns the outcome.\n\nEvery project gets my direct attention. You won't get passed to a junior or ghosted after deposit.",
      name: '[Your Name]',
      role: 'Founder, Azinag',
      cta: 'Book a discovery call',
    },
    faq: {
      title: 'Common questions',
      items: [
        {
          q: 'Do you work with international clients?',
          a: 'Yes. Most of my active clients are remote-first startups. I work async across time zones with no friction.',
        },
        {
          q: "What's a typical project timeline?",
          a: 'Landing pages typically take 2–3 weeks. MVPs are scoped individually but most fit within 6–12 weeks.',
        },
        {
          q: 'How is pricing structured?',
          a: 'All projects are fixed-scope, fixed-price. No hourly billing, no retainer surprises. You know the number before any work starts.',
        },
        {
          q: 'What stack do you build with?',
          a: 'Web: Next.js, React, TypeScript, Supabase, Tailwind. Desktop: Electron or Tauri. Android: React Native or native Android. All production-grade and handoff-ready.',
        },
        {
          q: 'Can I see examples first?',
          a: 'Yes — the Work section has selected projects with context on the problem, solution, and outcome.',
        },
      ],
    },
    finalCta: {
      headline: 'Ready to build something that works?',
      sub: 'Book a 30-minute call. No hard sell, no commitment required.',
      primaryCta: 'Book a discovery call',
      secondaryCta: 'View pricing',
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Clear, fixed pricing.',
      subtitle: 'Every engagement is scoped upfront. No surprises, no hourly billing.',
      bookCta: 'Book a discovery call',
      contactCta: 'Talk first',
      fallback: 'Pricing is managed in the admin. Configure packages in the dashboard.',
    },
    showcase: {
      eyebrow: 'Work',
      title: 'Selected work',
      subtitle: 'Projects with context — not just screenshots.',
      empty: 'Case studies are coming soon.',
      problem: 'Problem',
      solution: 'Solution',
      stack: 'Stack',
      outcome: 'Outcome',
    },
    about: {
      eyebrow: 'About',
      headline: 'Founder-led. Outcome-focused.',
      body: "Azinag is a one-person software studio specializing in web apps, desktop apps, and Android apps. I work with early-stage startups and businesses who want a direct line to the person actually doing the work.\n\nI build across the full product surface — from web-based SaaS platforms to cross-platform desktop tools and Android apps. My focus is clean code, maintainable architecture, and outcomes that matter.",
      stack: {
        title: 'What I build with',
        items: ['Next.js / React', 'TypeScript', 'Supabase / PostgreSQL', 'Tailwind CSS', 'Electron / Tauri', 'React Native / Android'],
      },
      values: {
        title: 'How I work',
        items: [
          'Fixed scopes — no billing surprises',
          'Direct communication, no account managers',
          'Weekly check-ins, async-friendly',
          'Clean, documented code handoffs',
        ],
      },
      cta: 'Book a discovery call',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's talk.",
      subtitle: "Fill this in and I'll reply within one business day.",
      bookAlt: 'Prefer to book a call directly?',
      bookLinkLabel: 'Choose a time →',
      fields: {
        name: 'Your name',
        email: 'Work email',
        company: 'Company / Project',
        message: 'What are you building?',
        submit: 'Send message',
        sending: 'Sending…',
        sent: 'Message sent',
        error: 'Something went wrong. Please try emailing directly.',
      },
    },
    lp: {
      landingPage: {
        badge: 'Landing Page Development',
        headline: 'A landing page built to convert — not just look good.',
        sub: 'Founder-built, performance-optimized, shipped in 2–3 weeks.',
        primaryCta: 'Book a discovery call',
        secondaryCta: 'See examples',
        features: [
          {
            title: 'Built for performance',
            desc: 'Core Web Vitals optimized. Fast on mobile and desktop. No bloated builders.',
          },
          {
            title: 'Conversion-focused structure',
            desc: 'CTA hierarchy and copy flow built around your offer — not a generic template.',
          },
          {
            title: 'Fixed scope & price',
            desc: 'One clear deliverable. One fixed price. No scope creep, no surprises.',
          },
          {
            title: 'Live in 2–3 weeks',
            desc: 'From kickoff call to deployed URL. Fast without cutting corners.',
          },
        ],
        process: [
          '30-min discovery call',
          'Scoping + wireframe',
          'Design + build',
          'Launch & review',
        ],
        footerCta: 'Ready to launch?',
        footerSub: 'Book a 30-minute call. Fixed price, fast delivery.',
      },
      mvp: {
        badge: 'Startup MVP Development',
        headline: 'Your MVP built and shipped — by one builder who owns the outcome.',
        sub: 'Full-stack SaaS builds. Scoped, priced, and delivered.',
        primaryCta: 'Book a discovery call',
        secondaryCta: 'See examples',
        features: [
          {
            title: 'Full-stack build',
            desc: 'Next.js + Supabase. Auth, database, API — all production-ready from day one.',
          },
          {
            title: 'Fixed scope',
            desc: 'No feature creep. We agree on scope before a single line is written.',
          },
          {
            title: 'Handoff-ready',
            desc: 'Clean code + documentation. Own it fully after delivery.',
          },
          {
            title: 'Founder-led',
            desc: 'Direct line to the builder. No PMs, no contractors, no handoffs.',
          },
        ],
        process: [
          'Discovery call + scoping',
          'Proposal + agreement',
          'Weekly build cycles',
          'Launch + handoff',
        ],
        footerCta: 'Ready to build?',
        footerSub: 'Book a 30-minute call. Fixed price, clear scope.',
      },
    },
    bookThanks: {
      eyebrow: "You're booked.",
      headline: "See you at the scheduled time.",
      body: "Check your email for a calendar confirmation. In the meantime, take a look at selected work.",
      cta: 'See selected work',
    },
    footer: {
      tagline: 'Web apps, desktop apps, and Android apps for global clients.',
      links: {
        work: 'Work',
        pricing: 'Pricing',
        about: 'About',
        contact: 'Contact',
      },
      legal: {
        privacy: 'Privacy',
        terms: 'Terms',
      },
    },
  },

  ar: {
    nav: {
      work: 'الأعمال',
      pricing: 'الأسعار',
      about: 'عنّا',
      cta: 'احجز موعد',
    },
    hero: {
      eyebrow: 'استوديو يقوده المؤسس',
      headline: 'الأساس الرقمي الذي تحتاجه شركتك الناشئة.',
      subheadline:
        'تطبيقات ويب وتطبيقات سطح المكتب وتطبيقات أندرويد — مبنية من مؤسس يُنجز. كود نظيف، تصميم حاد، نطاق ثابت.',
      primaryCta: 'احجز موعداً اكتشافياً',
      secondaryCta: 'شاهد الأعمال',
    },
    proofStrip: [
      { label: 'مؤسس يقود', detail: 'تواصل مباشر مع المطوّر' },
      { label: 'نطاق ثابت', detail: 'لا فواتير مفاجئة' },
      { label: 'تسليم سريع', detail: 'عادةً 2-6 أسابيع' },
      { label: 'عملاء دوليون', detail: 'عمل عن بُعد بالكامل' },
    ],
    offers: {
      eyebrow: 'ماذا نبني',
      title: 'ثلاث خدمات محددة.',
      subtitle: 'مخرجات واضحة. أسعار ثابتة.',
      webApp: {
        name: 'تطبيق ويب',
        tagline: 'تطبيقات ويب متكاملة، تُشحن بسرعة.',
        description:
          'منصات SaaS وأدوات داخلية وبوابات العملاء. مبنية بـ React وجاهزة للإنتاج.',
        includes: [
          'تصميم UI/UX مخصص',
          'بناء Next.js متكامل',
          'طبقة المصادقة وقاعدة البيانات والـ API',
          'لوحة إدارة',
          'نشر ونقل ملكية',
        ],
        cta: 'احجز موعداً اكتشافياً',
        link: '/lp/startup-mvp-development',
      },
      desktopApp: {
        name: 'تطبيق سطح المكتب',
        tagline: 'برمجيات سطح مكتب أصيلة للمهام الجدية.',
        description:
          'تطبيقات سطح مكتب متعددة المنصات مبنية بـ Electron أو Tauri. سريعة وأصيلة الشعور.',
        includes: [
          'متعدد المنصات (Windows / macOS / Linux)',
          'تكامل مع نظام التشغيل',
          'يعمل بدون إنترنت',
          'دعم التحديث التلقائي',
          'تسليم الكود المصدري كاملاً',
        ],
        cta: 'احجز موعداً اكتشافياً',
        link: '/contact',
      },
      androidApp: {
        name: 'تطبيق أندرويد',
        tagline: 'تطبيقات أندرويد مبنية للشحن.',
        description:
          'تطبيقات أندرويد أصيلة أو React Native من التصميم إلى Play Store.',
        includes: [
          'أندرويد أصيل أو React Native',
          'تصميم UI/UX نظيف',
          'تكامل مع الـ Backend',
          'رفع على Play Store',
          'تسليم الكود المصدري كاملاً',
        ],
        cta: 'احجز موعداً اكتشافياً',
        link: '/contact',
      },
    },
    selectedWork: {
      eyebrow: 'المحفظة',
      title: 'أعمال مختارة',
      empty: 'دراسات الحالة قادمة قريباً.',
      viewAll: 'عرض جميع الأعمال',
    },
    process: {
      eyebrow: 'العملية',
      title: 'كيف يعمل',
      steps: [
        {
          number: '01',
          title: 'موعد اكتشافي',
          desc: 'نتحدث عن أهدافك وقيودك وجدولك الزمني في مكالمة مدتها 30 دقيقة.',
        },
        {
          number: '02',
          title: 'تحديد النطاق والعرض',
          desc: 'تتلقى نطاقاً تفصيلياً وجدولاً زمنياً وسعراً ثابتاً خلال 24 ساعة.',
        },
        {
          number: '03',
          title: 'دورة البناء',
          desc: 'متابعة أسبوعية. تراجع التقدم، أنا أُكرر. لا عمل غامض.',
        },
        {
          number: '04',
          title: 'الإطلاق والتسليم',
          desc: 'نشر على بنيتك التحتية مع وثائق كاملة وخيارات دعم مستمر.',
        },
      ],
    },
    founder: {
      eyebrow: 'من يبني هذا',
      title: 'مبني من شخص لديه مصلحة حقيقية.',
      body: 'أنا مطور برمجيات يبني للشركات الناشئة في المراحل الأولى. لست وكالة، ولا فريقاً من المقاولين — مطوّر واحد يمتلك النتيجة.\n\nكل مشروع يحظى باهتمامي المباشر.',
      name: '[اسم المؤسس]',
      role: 'مؤسس، أزيناغ',
      cta: 'احجز موعداً اكتشافياً',
    },
    faq: {
      title: 'أسئلة شائعة',
      items: [
        {
          q: 'هل تعمل مع عملاء دوليين؟',
          a: 'نعم. معظم عملائي يعملون عن بُعد. أعمل بشكل غير متزامن عبر مناطق زمنية مختلفة.',
        },
        {
          q: 'ما هو الجدول الزمني المعتاد؟',
          a: 'صفحات الهبوط عادةً 2-3 أسابيع. MVPs تُحدد بشكل فردي، لكن معظمها 6-12 أسبوعاً.',
        },
        {
          q: 'كيف تُحدد الأسعار؟',
          a: 'جميع المشاريع ذات نطاق ثابت وسعر ثابت. لا فواتير بالساعة، لا مفاجآت.',
        },
        {
          q: 'ما هي التقنيات التي تستخدمها؟',
          a: 'ويب: Next.js وReact وTypeScript وSupabase وTailwind. سطح المكتب: Electron أو Tauri. أندرويد: React Native أو أندرويد أصيل. كل شيء جاهز للإنتاج وقابل للتسليم.',
        },
        {
          q: 'هل يمكنني رؤية أمثلة أولاً؟',
          a: 'نعم — قسم الأعمال يضم مشاريع مختارة مع سياق المشكلة والحل والنتيجة.',
        },
      ],
    },
    finalCta: {
      headline: 'هل أنت مستعد لبناء شيء يعمل؟',
      sub: 'احجز مكالمة لمدة 30 دقيقة. لا ضغط، لا التزام مطلوب.',
      primaryCta: 'احجز موعداً اكتشافياً',
      secondaryCta: 'عرض الأسعار',
    },
    pricing: {
      eyebrow: 'الأسعار',
      title: 'أسعار ثابتة وواضحة.',
      subtitle: 'كل مشاركة محددة النطاق مسبقاً. لا مفاجآت.',
      bookCta: 'احجز موعداً اكتشافياً',
      contactCta: 'تحدث أولاً',
      fallback: 'يتم إدارة الأسعار من لوحة التحكم.',
    },
    showcase: {
      eyebrow: 'الأعمال',
      title: 'أعمال مختارة',
      subtitle: 'مشاريع بسياق — ليست مجرد لقطات شاشة.',
      empty: 'دراسات الحالة قادمة قريباً.',
      problem: 'المشكلة',
      solution: 'الحل',
      stack: 'التقنيات',
      outcome: 'النتيجة',
    },
    about: {
      eyebrow: 'عنّا',
      headline: 'مؤسس يقود. متمحور حول النتائج.',
      body: 'أزيناغ هو استوديو برمجيات بشخص واحد متخصص في تطبيقات الويب وتطبيقات سطح المكتب وتطبيقات أندرويد. أعمل مع الشركات الناشئة والأعمال التي تريد تواصلاً مباشراً مع من يقوم بالعمل فعلاً.\n\nأبني عبر كامل سطح المنتج — من منصات SaaS إلى أدوات سطح مكتب متعددة المنصات وتطبيقات أندرويد.',
      stack: {
        title: 'ما أبني به',
        items: ['Next.js / React', 'TypeScript', 'Supabase / PostgreSQL', 'Tailwind CSS', 'Electron / Tauri', 'React Native / Android'],
      },
      values: {
        title: 'كيف أعمل',
        items: [
          'نطاق ثابت — لا مفاجآت في الفواتير',
          'تواصل مباشر، لا مديري حسابات',
          'متابعة أسبوعية، صديق للعمل غير المتزامن',
          'تسليم كود نظيف مع وثائق',
        ],
      },
      cta: 'احجز موعداً اكتشافياً',
    },
    contact: {
      eyebrow: 'تواصل',
      title: 'لنتحدث.',
      subtitle: 'تعبّأ هذا وسأرد خلال يوم عمل واحد.',
      bookAlt: 'تفضّل حجز موعد مباشرة؟',
      bookLinkLabel: 'اختر وقتاً →',
      fields: {
        name: 'اسمك',
        email: 'البريد الإلكتروني',
        company: 'الشركة / المشروع',
        message: 'ماذا تبني؟',
        submit: 'إرسال',
        sending: 'جارٍ الإرسال…',
        sent: 'تم الإرسال',
        error: 'حدث خطأ ما. الرجاء المحاولة مرة أخرى.',
      },
    },
    lp: {
      landingPage: {
        badge: 'تطوير صفحات الهبوط',
        headline: 'صفحة هبوط مبنية للتحويل — ليس فقط للمظهر.',
        sub: 'مبنية من مؤسس، محسّنة للأداء، تُشحن في 2-3 أسابيع.',
        primaryCta: 'احجز موعداً اكتشافياً',
        secondaryCta: 'شاهد أمثلة',
        features: [
          { title: 'مبني للأداء', desc: 'محسّن لـ Core Web Vitals. سريع على الجوال وسطح المكتب.' },
          { title: 'هيكل يركز على التحويل', desc: 'تسلسل الدعوة للعمل مبني حول عرضك.' },
          { title: 'نطاق وسعر ثابت', desc: 'مخرج واضح. سعر ثابت. لا مفاجآت.' },
          { title: 'يعمل في 2-3 أسابيع', desc: 'من مكالمة الإطلاق إلى الرابط المنشور.' },
        ],
        process: ['مكالمة اكتشافية 30 دقيقة', 'تحديد النطاق + الهيكل', 'التصميم + البناء', 'الإطلاق والمراجعة'],
        footerCta: 'هل أنت مستعد للإطلاق؟',
        footerSub: 'احجز مكالمة 30 دقيقة. سعر ثابت، تسليم سريع.',
      },
      mvp: {
        badge: 'تطوير MVP للشركات الناشئة',
        headline: 'MVP مبني ومُشحن — من مطوّر واحد يمتلك النتيجة.',
        sub: 'بناء SaaS متكامل. محدد النطاق، مسعَّر، ومُسلَّم.',
        primaryCta: 'احجز موعداً اكتشافياً',
        secondaryCta: 'شاهد أمثلة',
        features: [
          { title: 'بناء متكامل', desc: 'Next.js + Supabase. مصادقة وقاعدة بيانات وAPI — كل شيء جاهز للإنتاج.' },
          { title: 'نطاق ثابت', desc: 'لا زحف في الميزات. نتفق على النطاق قبل كتابة أي سطر.' },
          { title: 'جاهز للتسليم', desc: 'كود نظيف + وثائق. امتلكه بالكامل بعد التسليم.' },
          { title: 'مؤسس يقود', desc: 'تواصل مباشر مع المطوّر. لا مديري مشاريع، لا مقاولين.' },
        ],
        process: ['مكالمة اكتشافية + تحديد النطاق', 'الاقتراح + الاتفاق', 'دورات بناء أسبوعية', 'الإطلاق + التسليم'],
        footerCta: 'هل أنت مستعد للبناء؟',
        footerSub: 'احجز مكالمة 30 دقيقة. سعر ثابت، نطاق واضح.',
      },
    },
    bookThanks: {
      eyebrow: 'تم الحجز.',
      headline: 'سأراك في الموعد المحدد.',
      body: 'تحقق من بريدك الإلكتروني للتأكيد. في غضون ذلك، ألقِ نظرة على الأعمال المختارة.',
      cta: 'شاهد الأعمال المختارة',
    },
    footer: {
      tagline: 'تطبيقات ويب وسطح المكتب وأندرويد للعملاء العالميين.',
      links: {
        work: 'الأعمال',
        pricing: 'الأسعار',
        about: 'عنّا',
        contact: 'اتصل بنا',
      },
      legal: {
        privacy: 'الخصوصية',
        terms: 'الشروط',
      },
    },
  },
} as const;

export type ContentTree = typeof content;
export type ContentEn = ContentTree['en'];
export type ContentAr = ContentTree['ar'];
export type LangContent = ContentEn | ContentAr;
