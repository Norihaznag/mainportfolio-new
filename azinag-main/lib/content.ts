// Single source of truth for public marketing content.
// French (fr) is the default/indexed language stored under the 'en' key for
// backwards compatibility with existing code. Arabic is secondary.

export type Lang = 'en' | 'ar';

export const content = {
  en: {
    nav: {
      work: 'Réalisations',
      pricing: 'Formules',
      about: 'À propos',
      cta: 'Réserver un appel',
    },
    hero: {
      eyebrow: 'Sites web pour restaurants et cafés — Guelmim · Tan-Tan · Tiznit · Sidi Ifni',
      headline: 'Votre restaurant mérite d\'être trouvé sur Google.',
      subheadline:
        'Site professionnel, WhatsApp intégré, Google Maps, livré en 7 jours. Prix fixe en dirhams.',
      primaryCta: 'Réserver un appel gratuit',
      secondaryCta: 'Voir les formules',
    },
    proofStrip: [
      { label: 'Prix fixe en dirhams', detail: 'Pas de surprise, pas de facturation cachée' },
      { label: 'Livré en 7 jours', detail: 'Pack Présence garanti sous une semaine' },
      { label: 'Mobile-first', detail: '+80% des recherches se font sur téléphone' },
      { label: 'Google Maps inclus', detail: 'Fiche créée et optimisée avec votre site' },
    ],
    offers: {
      eyebrow: 'Nos formules',
      title: 'Trois formules. Prix fixe. Zéro surprise.',
      subtitle: 'Livrables clairs. Tarifs en dirhams. Paiement en 2 fois disponible.',
      webApp: {
        name: 'Présence',
        tagline: 'Soyez visible sur Google en 7 jours.',
        description:
          'Pour les cafés, snacks et restaurants qui n\'ont pas encore de site ou qui veulent être trouvés sur Google Maps.',
        includes: [
          'Site une page complet',
          'Menu et infos pratiques',
          'Bouton WhatsApp direct',
          'Fiche Google Maps créée',
          'Nom de domaine inclus (1 an)',
        ],
        cta: 'Réserver un appel gratuit',
        link: '/pricing',
      },
      desktopApp: {
        name: 'Vitrine',
        tagline: 'Un site complet qui convertit les visites en clients.',
        description:
          'Pour les restaurants actifs qui veulent impressionner, montrer leurs plats et recevoir des contacts directs.',
        includes: [
          'Site multi-pages (Accueil, Menu, Galerie, Contact)',
          'Galerie photos optimisée (jusqu\'à 20 photos)',
          'Formulaire de contact + WhatsApp',
          'Google Maps intégré',
          'Hébergement inclus 1 an',
        ],
        cta: 'Réserver un appel gratuit',
        link: '/pricing',
      },
      androidApp: {
        name: 'Réservation+',
        tagline: 'Ne perdez plus jamais une réservation.',
        description:
          'Pour les restaurants établis qui veulent un système de réservation en ligne et un menu dynamique.',
        includes: [
          'Tout le pack Vitrine',
          'Système de réservation en ligne',
          'Menu dynamique modifiable',
          'Commande WhatsApp par plat',
          'Google Analytics inclus',
        ],
        cta: 'Réserver un appel gratuit',
        link: '/pricing',
      },
    },
    selectedWork: {
      eyebrow: 'Portfolio',
      title: 'Nos réalisations',
      empty: 'Les premières réalisations arrivent bientôt.',
      viewAll: 'Voir toutes les réalisations',
    },
    process: {
      eyebrow: 'Comment ça marche',
      title: 'En 3 étapes simples',
      steps: [
        {
          number: '01',
          title: 'Vous appelez ou écrivez sur WhatsApp',
          desc: 'On discute de votre restaurant en 20 minutes. Pas besoin de préparer quoi que ce soit.',
        },
        {
          number: '02',
          title: 'Vous envoyez vos photos et votre menu',
          desc: 'Envoyez ce que vous avez sur WhatsApp — photos, menu, logo. On s\'occupe du reste.',
        },
        {
          number: '03',
          title: 'Votre site est en ligne en 7 jours',
          desc: 'Google Maps configuré, WhatsApp intégré, site livré. Vous recevez le lien.',
        },
      ],
    },
    founder: {
      eyebrow: 'Construit localement',
      title: 'Construit par quelqu\'un de la région, pas une agence anonyme.',
      body: 'Développeur web basé dans la région du Souss-Massa. Je travaille directement avec les propriétaires de restaurants et cafés — pas d\'intermédiaire, pas de sous-traitant.\n\nVous avez mon numéro WhatsApp dès le début. Je réponds le jour même.',
      name: 'Azinag',
      role: 'Studio web local — Souss-Massa',
      cta: 'Réserver un appel gratuit',
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        {
          q: 'Est-ce que je dois avoir du contenu prêt avant de vous contacter ?',
          a: 'Non. Envoyez-nous juste votre menu et quelques photos sur WhatsApp. On s\'occupe du reste — mise en page, textes, configuration.',
        },
        {
          q: 'Combien de temps ça prend vraiment ?',
          a: 'Le pack Présence est en ligne en 7 jours après réception de vos photos. Le pack Vitrine en 10 à 14 jours. Réservation+ en 3 semaines.',
        },
        {
          q: 'Est-ce que ça marche vraiment pour attirer des clients ?',
          a: 'Un site avec une fiche Google Maps active vous rend visible aux personnes qui cherchent un restaurant dans votre ville. C\'est mesurable — on vous montre vos statistiques après le lancement.',
        },
        {
          q: 'Je n\'ai pas de photos professionnelles — c\'est un problème ?',
          a: 'Non. Des photos prises avec un bon smartphone suffisent largement. On peut aussi vous guider sur comment les prendre pour un meilleur rendu.',
        },
        {
          q: 'Est-ce que je peux modifier mon site après la livraison ?',
          a: 'Oui. Pour les modifications simples (textes, menu), on vous explique comment faire. Pour les modifications complexes, une formule maintenance est disponible à 300 DH/mois.',
        },
      ],
    },
    finalCta: {
      headline: 'Votre restaurant mérite une présence en ligne professionnelle.',
      sub: 'Appelez ou envoyez un message WhatsApp — réponse dans la journée.',
      primaryCta: 'Réserver un appel gratuit',
      secondaryCta: 'Voir les formules',
    },
    pricing: {
      eyebrow: 'Formules',
      title: 'Prix clairs, fixes, en dirhams.',
      subtitle: 'Chaque formule est définie à l\'avance. Pas de surprise, pas de facturation cachée.',
      bookCta: 'Réserver un appel gratuit',
      contactCta: 'Nous écrire',
      fallback: 'Les formules sont configurées dans l\'administration.',
    },
    showcase: {
      eyebrow: 'Réalisations',
      title: 'Nos réalisations',
      subtitle: 'Sites livrés avec résultats concrets.',
      empty: 'Les premières réalisations arrivent bientôt.',
      problem: 'Problème',
      solution: 'Solution',
      stack: 'Inclus',
      outcome: 'Résultat',
    },
    about: {
      eyebrow: 'À propos',
      headline: 'Local. Direct. Spécialisé restaurants.',
      body: 'Azinag crée des sites web professionnels pour les restaurants, cafés et snacks du Souss-Massa — en français et en arabe, avec WhatsApp et Google Maps intégrés.\n\nJe travaille directement avec les propriétaires. Pas d\'agence intermédiaire, pas de sous-traitant inconnu. Vous avez mon numéro dès le début.\n\nAu-delà de la restauration, nous développons aussi des applications web, mobiles (Android & iOS) et desktop pour tous les secteurs d\'activité — commerces, services, immobilier, éducation. Un projet en tête ? Parlons-en.',
      stack: {
        title: 'Ce que nous créons',
        items: [
          'Sites web professionnels',
          'Applications mobiles Android & iOS',
          'Logiciels desktop (Windows / macOS)',
          'Tableaux de bord et outils internes',
          'Systèmes de réservation et commande',
          'Solutions sur mesure pour tous secteurs',
        ],
      },
      values: {
        title: 'Comment je travaille',
        items: [
          'Prix fixe en dirhams — pas de surprise',
          'Communication directe sur WhatsApp',
          'Livraison en 7 à 21 jours selon le projet',
          'Réponse le jour même, 6j/7',
        ],
      },
      cta: 'Réserver un appel gratuit',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'On vous rappelle.',
      subtitle: 'Remplissez ce formulaire et on vous répond dans la journée.',
      bookAlt: 'Préférez-vous réserver un appel directement ?',
      bookLinkLabel: 'Choisir un créneau →',
      fields: {
        name: 'Votre nom',
        email: 'Téléphone ou email',
        company: 'Nom du restaurant / café',
        message: 'Votre message (facultatif)',
        submit: 'Envoyer',
        sending: 'Envoi en cours…',
        sent: 'Message envoyé',
        error: 'Une erreur est survenue. Écrivez-nous directement sur WhatsApp.',
      },
    },
    lp: {
      landingPage: {
        badge: 'Site web pour restaurants',
        headline: 'Votre restaurant visible sur Google en 7 jours.',
        sub: 'Site professionnel avec WhatsApp, Google Maps et menu en ligne. Prix fixe en dirhams.',
        primaryCta: 'Réserver un appel gratuit',
        secondaryCta: 'Voir les formules',
        features: [
          {
            title: 'Visible sur Google Maps',
            desc: 'Fiche Google Maps créée et optimisée. Vos clients vous trouvent quand ils cherchent un restaurant dans votre ville.',
          },
          {
            title: 'WhatsApp intégré',
            desc: 'Bouton WhatsApp direct sur votre site. Vos clients vous écrivent en un clic — sans chercher votre numéro.',
          },
          {
            title: 'Prix fixe en dirhams',
            desc: 'Pas de facturation à l\'heure, pas de surprise. Un prix clair avant de commencer.',
          },
          {
            title: 'Livré en 7 jours',
            desc: 'Du premier appel à la mise en ligne : 7 jours pour le pack Présence. Vous envoyez vos photos, on s\'occupe du reste.',
          },
        ],
        process: [
          'Appel ou WhatsApp de 20 min',
          'Vous envoyez photos + menu',
          'On construit votre site',
          'Mise en ligne en 7 jours',
        ],
        footerCta: 'Prêt à être trouvé sur Google ?',
        footerSub: 'Réservez un appel gratuit de 20 minutes. Prix fixe, livraison garantie.',
      },
      mvp: {
        badge: 'Formule Réservation+',
        headline: 'Ne perdez plus jamais une réservation.',
        sub: 'Système de réservation en ligne, menu dynamique et WhatsApp intégrés.',
        primaryCta: 'Réserver un appel gratuit',
        secondaryCta: 'Voir toutes les formules',
        features: [
          {
            title: 'Réservation en ligne',
            desc: 'Vos clients réservent directement depuis votre site, 24h/24. Fini les appels manqués.',
          },
          {
            title: 'Menu dynamique',
            desc: 'Modifiez vos plats et prix vous-même, sans développeur. Rapide et simple.',
          },
          {
            title: 'Commande WhatsApp par plat',
            desc: 'Un bouton "Commander" par plat qui ouvre WhatsApp avec le message pré-rempli.',
          },
          {
            title: 'Prix fixe tout compris',
            desc: 'Pas de coûts cachés, pas de mensualités surprise.',
          },
        ],
        process: [
          'Appel de découverte',
          'Validation du contenu',
          'Construction du site',
          'Livraison + formation',
        ],
        footerCta: 'Prêt pour les réservations en ligne ?',
        footerSub: 'Réservez un appel gratuit. Prix fixe, livraison en 3 semaines.',
      },
    },
    bookThanks: {
      eyebrow: 'Rendez-vous confirmé.',
      headline: 'À très bientôt.',
      body: 'Vérifiez votre email pour la confirmation. En attendant, découvrez nos réalisations.',
      cta: 'Voir les réalisations',
    },
    footer: {
      tagline: 'Sites web, apps mobiles et logiciels desktop — spécialisés restauration, ouverts à tous les secteurs.',
      links: {
        work: 'Réalisations',
        pricing: 'Formules',
        about: 'À propos',
        contact: 'Contact',
      },
      legal: {
        privacy: 'Confidentialité',
        terms: 'Conditions',
      },
    },
  },

  ar: {
    nav: {
      work: 'أعمالنا',
      pricing: 'الباقات',
      about: 'من نحن',
      cta: 'احجز مكالمة',
    },
    hero: {
      eyebrow: 'مواقع للمطاعم والمقاهي — كلميم · طان طان · تيزنيت · سيدي إفني',
      headline: 'مطعمك يستحق أن يظهر في نتائج Google.',
      subheadline:
        'موقع احترافي بالعربية والفرنسية، واتساب، خرائط Google، التسليم في 7 أيام. سعر ثابت بالدرهم.',
      primaryCta: 'احجز مكالمة مجانية',
      secondaryCta: 'عرض الباقات',
    },
    proofStrip: [
      { label: 'سعر ثابت بالدرهم', detail: 'بدون مفاجآت أو رسوم خفية' },
      { label: 'تسليم في 7 أيام', detail: 'باقة الحضور مضمونة خلال أسبوع' },
      { label: 'مُحسَّن للجوال', detail: '+80% من البحث عبر الهاتف' },
      { label: 'خرائط Google مشمولة', detail: 'إنشاء وتحسين بطاقتك مجاناً' },
    ],
    offers: {
      eyebrow: 'باقاتنا',
      title: 'ثلاث باقات. سعر ثابت. بدون مفاجآت.',
      subtitle: 'مخرجات واضحة. أسعار بالدرهم. دفع على قسطين متاح.',
      webApp: {
        name: 'الحضور',
        tagline: 'كن مرئياً على Google في 7 أيام.',
        description:
          'للمقاهي والمطاعم التي لا تمتلك موقعاً أو تريد الظهور على خرائط Google.',
        includes: [
          'موقع صفحة واحدة كاملة',
          'القائمة والمعلومات الأساسية',
          'زر واتساب مباشر',
          'إنشاء بطاقة Google Maps',
          'اسم النطاق مشمول (سنة)',
        ],
        cta: 'احجز مكالمة مجانية',
        link: '/pricing',
      },
      desktopApp: {
        name: 'الواجهة',
        tagline: 'موقع متكامل يحوّل الزيارات إلى زبائن.',
        description:
          'للمطاعم النشطة التي تريد إبهار الزوار وعرض أطباقها واستقبال تواصل مباشر.',
        includes: [
          'موقع متعدد الصفحات (رئيسية، قائمة، معرض، اتصال)',
          'معرض صور محسّن (حتى 20 صورة)',
          'نموذج اتصال + واتساب',
          'خرائط Google مدمجة',
          'استضافة مشمولة سنة كاملة',
        ],
        cta: 'احجز مكالمة مجانية',
        link: '/pricing',
      },
      androidApp: {
        name: 'الحجوزات+',
        tagline: 'لا تخسر حجزاً بعد الآن.',
        description:
          'للمطاعم الراسخة التي تريد نظام حجز إلكتروني وقائمة ديناميكية.',
        includes: [
          'كل مزايا باقة الواجهة',
          'نظام حجز إلكتروني',
          'قائمة ديناميكية قابلة للتعديل',
          'طلب واتساب لكل طبق',
          'Google Analytics مشمول',
        ],
        cta: 'احجز مكالمة مجانية',
        link: '/pricing',
      },
    },
    selectedWork: {
      eyebrow: 'أعمالنا',
      title: 'إنجازاتنا',
      empty: 'أعمالنا الأولى قادمة قريباً.',
      viewAll: 'عرض جميع الأعمال',
    },
    process: {
      eyebrow: 'كيف يعمل',
      title: 'في 3 خطوات بسيطة',
      steps: [
        {
          number: '01',
          title: 'تتصل أو تكتب على واتساب',
          desc: 'نتحدث عن مطعمك في 20 دقيقة. لا تحتاج إلى تحضير أي شيء مسبقاً.',
        },
        {
          number: '02',
          title: 'ترسل صورك وقائمة طعامك',
          desc: 'أرسل ما لديك على واتساب — صور، قائمة، شعار. نحن نتكفل بالباقي.',
        },
        {
          number: '03',
          title: 'موقعك يعمل في 7 أيام',
          desc: 'خرائط Google مُعدَّة، واتساب مدمج، الموقع مُسلَّم. تستلم الرابط.',
        },
      ],
    },
    founder: {
      eyebrow: 'صُنع محلياً',
      title: 'مبني من شخص من المنطقة، لا وكالة مجهولة.',
      body: 'مطور مواقع من منطقة سوس ماسة. أعمل مباشرة مع أصحاب المطاعم والمقاهي — بدون وسيط، بدون مقاول من الباطن.\n\nرقم واتساب متاح لك من اليوم الأول. أرد في نفس اليوم.',
      name: 'أزيناغ',
      role: 'استوديو ويب محلي — سوس ماسة',
      cta: 'احجز مكالمة مجانية',
    },
    faq: {
      title: 'أسئلة شائعة',
      items: [
        {
          q: 'هل أحتاج إلى محتوى جاهز قبل التواصل؟',
          a: 'لا. أرسل لنا فقط قائمة طعامك وبعض الصور على واتساب. نحن نتولى كل شيء — التصميم، النصوص، الإعداد.',
        },
        {
          q: 'كم يستغرق التسليم فعلاً؟',
          a: 'باقة الحضور تُسلَّم في 7 أيام بعد استلام صورك. باقة الواجهة في 10 إلى 14 يوماً. الحجوزات+ في 3 أسابيع.',
        },
        {
          q: 'هل يجلب الموقع فعلاً زبائن جدد؟',
          a: 'موقع مع بطاقة Google Maps نشطة يجعلك مرئياً لمن يبحث عن مطعم في مدينتك. هذا قابل للقياس — نُريك إحصاءاتك بعد الإطلاق.',
        },
        {
          q: 'ليس لدي صور احترافية — هل هذه مشكلة؟',
          a: 'لا. صور بهاتف جيد تكفي تماماً. يمكننا أيضاً إرشادك حول كيفية التقاطها للحصول على أفضل نتيجة.',
        },
        {
          q: 'هل يمكنني تعديل موقعي بعد التسليم؟',
          a: 'نعم. للتعديلات البسيطة (النصوص، القائمة) نشرح لك كيف تفعل ذلك. للتعديلات الأكبر، خطة صيانة متاحة بـ 300 درهم/شهر.',
        },
      ],
    },
    finalCta: {
      headline: 'مطعمك يستحق حضوراً رقمياً احترافياً.',
      sub: 'اتصل أو أرسل رسالة على واتساب — رد في نفس اليوم.',
      primaryCta: 'احجز مكالمة مجانية',
      secondaryCta: 'عرض الباقات',
    },
    pricing: {
      eyebrow: 'الباقات',
      title: 'أسعار واضحة وثابتة بالدرهم.',
      subtitle: 'كل باقة محددة مسبقاً. بدون مفاجآت.',
      bookCta: 'احجز مكالمة مجانية',
      contactCta: 'راسلنا',
      fallback: 'الباقات تُدار من لوحة التحكم.',
    },
    showcase: {
      eyebrow: 'أعمالنا',
      title: 'إنجازاتنا',
      subtitle: 'مواقع مُسلَّمة مع نتائج ملموسة.',
      empty: 'أعمالنا الأولى قادمة قريباً.',
      problem: 'المشكلة',
      solution: 'الحل',
      stack: 'ما يشمله',
      outcome: 'النتيجة',
    },
    about: {
      eyebrow: 'من نحن',
      headline: 'محلي. مباشر. متخصص في المطاعم.',
      body: 'أزيناغ تصمم مواقع احترافية للمطاعم والمقاهي والسناكات في منطقة سوس ماسة — بالعربية والفرنسية، مع واتساب وخرائط Google مدمجين.\n\nأعمل مباشرة مع أصحاب المطاعم. بدون وكالة وسيطة، بدون مقاول مجهول. رقمي متاح لك من اليوم الأول.\n\nخارج قطاع المطاعم، نطور أيضاً تطبيقات الويب والجوال (Android وiOS) وبرامج سطح المكتب لجميع القطاعات — تجارة، خدمات، عقارات، تعليم. لديك مشروع؟ تحدث إلينا.',
      stack: {
        title: 'ما نصنعه',
        items: [
          'مواقع ويب احترافية',
          'تطبيقات جوال Android وiOS',
          'برامج سطح المكتب (Windows / macOS)',
          'لوحات تحكم وأدوات داخلية',
          'أنظمة حجز وطلب',
          'حلول مخصصة لجميع القطاعات',
        ],
      },
      values: {
        title: 'طريقة عملي',
        items: [
          'سعر ثابت بالدرهم — بدون مفاجآت',
          'تواصل مباشر على واتساب',
          'تسليم من 7 إلى 21 يوماً حسب المشروع',
          'رد في نفس اليوم، 6 أيام/7',
        ],
      },
      cta: 'احجز مكالمة مجانية',
    },
    contact: {
      eyebrow: 'تواصل',
      title: 'سنتصل بك.',
      subtitle: 'أملأ هذا النموذج وسنرد عليك في نفس اليوم.',
      bookAlt: 'تفضل حجز موعد مباشرة؟',
      bookLinkLabel: 'اختر وقتاً →',
      fields: {
        name: 'اسمك',
        email: 'هاتفك أو بريدك الإلكتروني',
        company: 'اسم المطعم / المقهى',
        message: 'رسالتك (اختياري)',
        submit: 'إرسال',
        sending: 'جارٍ الإرسال…',
        sent: 'تم الإرسال',
        error: 'حدث خطأ. اكتب لنا مباشرة على واتساب.',
      },
    },
    lp: {
      landingPage: {
        badge: 'موقع للمطاعم',
        headline: 'مطعمك مرئي على Google في 7 أيام.',
        sub: 'موقع احترافي مع واتساب وخرائط Google وقائمة إلكترونية. سعر ثابت بالدرهم.',
        primaryCta: 'احجز مكالمة مجانية',
        secondaryCta: 'عرض الباقات',
        features: [
          {
            title: 'ظهور على خرائط Google',
            desc: 'إنشاء وتحسين بطاقتك. زبائنك يجدونك عند البحث عن مطعم في مدينتك.',
          },
          {
            title: 'واتساب مدمج',
            desc: 'زر واتساب مباشر على موقعك. زبائنك يكتبون بنقرة واحدة بدون البحث عن رقمك.',
          },
          {
            title: 'سعر ثابت بالدرهم',
            desc: 'لا فوترة بالساعة، لا مفاجآت. سعر واضح قبل البدء.',
          },
          {
            title: 'تسليم في 7 أيام',
            desc: 'من أول مكالمة إلى الإطلاق: 7 أيام للباقة الأساسية. ترسل صورك، نتولى الباقي.',
          },
        ],
        process: [
          'مكالمة أو واتساب 20 دقيقة',
          'ترسل الصور والقائمة',
          'نبني موقعك',
          'إطلاق في 7 أيام',
        ],
        footerCta: 'هل أنت مستعد للظهور على Google؟',
        footerSub: 'احجز مكالمة مجانية 20 دقيقة. سعر ثابت، تسليم مضمون.',
      },
      mvp: {
        badge: 'باقة الحجوزات+',
        headline: 'لا تخسر حجزاً بعد الآن.',
        sub: 'نظام حجز إلكتروني وقائمة ديناميكية وواتساب مدمج.',
        primaryCta: 'احجز مكالمة مجانية',
        secondaryCta: 'عرض جميع الباقات',
        features: [
          {
            title: 'حجز إلكتروني',
            desc: 'زبائنك يحجزون من موقعك مباشرة على مدار الساعة. انتهت أيام المكالمات الفائتة.',
          },
          {
            title: 'قائمة ديناميكية',
            desc: 'عدّل أطباقك وأسعارك بنفسك دون مطور. سريع وسهل.',
          },
          {
            title: 'طلب واتساب لكل طبق',
            desc: 'زر "اطلب الآن" لكل طبق يفتح واتساب برسالة جاهزة.',
          },
          {
            title: 'سعر ثابت شامل',
            desc: 'كل شيء مشمول. بدون تكاليف خفية أو اشتراكات مفاجئة.',
          },
        ],
        process: [
          'مكالمة استكشافية',
          'مراجعة المحتوى',
          'بناء الموقع',
          'التسليم + التدريب',
        ],
        footerCta: 'هل أنت مستعد للحجوزات الإلكترونية؟',
        footerSub: 'احجز مكالمة مجانية. سعر ثابت، تسليم في 3 أسابيع.',
      },
    },
    bookThanks: {
      eyebrow: 'الموعد مؤكد.',
      headline: 'نراك قريباً.',
      body: 'تحقق من بريدك الإلكتروني للتأكيد. في غضون ذلك، اكتشف إنجازاتنا.',
      cta: 'عرض الإنجازات',
    },
    footer: {
      tagline: 'مواقع ويب، تطبيقات جوال وبرامج desktop — متخصصون في المطاعم، مفتوحون لجميع القطاعات.',
      links: {
        work: 'أعمالنا',
        pricing: 'الباقات',
        about: 'من نحن',
        contact: 'تواصل',
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
