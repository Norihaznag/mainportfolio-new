export const seoMetadata = {
  languages: ['en', 'fr', 'ar'] as const,
  baseUrl: 'https://azinag.com',
  
  pages: {
    home: {
      en: {
        title: 'Azinag - Professional Web Development for Moroccan Businesses',
        description: 'Build fast, effective websites and applications for Moroccan companies. Expert web development at affordable prices.',
        keywords: 'web development, Morocco, affordable websites, professional development, web apps',
      },
      fr: {
        title: 'Azinag - Développement Web Professionnel pour Entreprises Marocaines',
        description: 'Créez des sites web et des applications rapides et efficaces pour les entreprises marocaines. Développement web professionnel à prix abordable.',
        keywords: 'développement web, Maroc, sites web abordables, développement professionnel, applications web',
      },
      ar: {
        title: 'Azinag - تطوير مواقع احترافي للشركات المغربية',
        description: 'كنبنيو ليك مواقع ويب وتطبيقات سريعة وفعالة، موجهة خصيصاً للشركات المغربية وبثمن معقول.',
        keywords: 'تطوير ويب، المغرب، مواقع بأسعار معقولة، تطوير احترافي، تطبيقات ويب',
      },
    },
    pricing: {
      en: {
        title: 'Pricing - Azinag Web Development Services',
        description: 'Transparent, affordable pricing for website development. Choose from website, restaurant, e-commerce, or custom app packages.',
        keywords: 'web development pricing, affordable websites, e-commerce solutions, custom applications',
      },
      fr: {
        title: 'Tarifs - Services de Développement Web Azinag',
        description: 'Tarifs transparents et abordables pour développement de sites web. Choisissez parmi site professionnel, restaurant, e-commerce ou application personnalisée.',
        keywords: 'tarifs développement web, sites web abordables, solutions e-commerce, applications personnalisées',
      },
      ar: {
        title: 'الأثمنة - خدمات تطوير الويب في Azinag',
        description: 'أثمنة واضحة ومعقولة لتطوير المواقع. اختر من موقع شركة، مطعم، متجر إلكتروني أو تطبيق مفصّل.',
        keywords: 'أثمنة تطوير ويب، مواقع بأسعار معقولة، حلول للمتاجر، تطبيقات مخصصة',
      },
    },
    showcase: {
      en: {
        title: 'Portfolio - Our Completed Web Development Projects',
        description: 'See the portfolio of successful web development projects we\'ve completed for Moroccan businesses.',
        keywords: 'portfolio, web projects, case studies, successful websites, Morocco',
      },
      fr: {
        title: 'Portfolio - Nos Projets de Développement Web Réussis',
        description: 'Découvrez nos projets de développement web réussis pour les entreprises marocaines.',
        keywords: 'portfolio, projets web, études de cas, sites web réussis, Maroc',
      },
      ar: {
        title: 'الأعمال - مشاريعنا الناجحة في تطوير الويب',
        description: 'اكتشف مشاريعنا الناجحة في تطوير الويب للشركات المغربية.',
        keywords: 'الأعمال، مشاريع ويب، دراسات حالة، مواقع ناجحة، المغرب',
      },
    },
    howItWorks: {
      en: {
        title: 'How It Works - Our Web Development Process',
        description: 'Learn about our transparent, 4-step web development process from initial consultation to launch.',
        keywords: 'web development process, consultation, design, development, launch',
      },
      fr: {
        title: 'Comment ça Marche - Notre Processus de Développement Web',
        description: 'Découvrez notre processus de développement web transparent en 4 étapes, de la consultation au lancement.',
        keywords: 'processus développement web, consultation, conception, développement, lancement',
      },
      ar: {
        title: 'كيفاش كنخدمو - عملية تطوير الويب ديالنا',
        description: 'تعرّف على عملية تطوير الويب ديالنا الواضحة في 4 خطوات من الاستشارة إلى الإطلاق.',
        keywords: 'عملية تطوير ويب، استشارة، تصميم، تطوير، إطلاق',
      },
    },
    about: {
      en: {
        title: 'About Azinag - Professional Web Development Company',
        description: 'Learn about Azinag\'s mission, vision, values, and our commitment to Moroccan businesses.',
        keywords: 'about us, mission, vision, web development company, Morocco',
      },
      fr: {
        title: 'À Propos d\'Azinag - Entreprise de Développement Web',
        description: 'Découvrez la mission, la vision et les valeurs d\'Azinag, notre engagement envers les entreprises marocaines.',
        keywords: 'qui sommes nous, mission, vision, entreprise développement web, Maroc',
      },
      ar: {
        title: 'عن Azinag - شركة تطوير ويب احترافية',
        description: 'تعرّف على مهمة Azinag ورؤيتنا وقيمنا والتزامنا تجاه الشركات المغربية.',
        keywords: 'عننا، مهمتنا، رؤيتنا، شركة تطوير ويب، المغرب',
      },
    },
    order: {
      en: {
        title: 'Order Your Website - Azinag Web Development',
        description: 'Start your web development project with Azinag. Fill out our form or contact us via WhatsApp.',
        keywords: 'order website, web development quote, contact us, WhatsApp support',
      },
      fr: {
        title: 'Commandez Votre Site Web - Azinag',
        description: 'Commencez votre projet de développement web avec Azinag. Remplissez notre formulaire ou contactez-nous via WhatsApp.',
        keywords: 'commander site web, devis développement web, nous contacter, support WhatsApp',
      },
      ar: {
        title: 'طلب موقعك - Azinag تطوير الويب',
        description: 'ابدأ مشروع تطوير الويب ديالك مع Azinag. عمّر النموذج ديالنا أو تاصل معنا عبر الواتساب.',
        keywords: 'طلب موقع، عرض سعر تطوير ويب، تواصل معنا، دعم الواتساب',
      },
    },
  },
};

export type Language = typeof seoMetadata.languages[number];
