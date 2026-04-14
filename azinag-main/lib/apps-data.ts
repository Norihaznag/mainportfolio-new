// Single source of truth for SaaS application catalog.
// All pages import from here — zero duplication.

export interface SaasApp {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string; // emoji
  sector: 'pme' | 'logistique' | 'gestion' | 'services';
  badge?: 'Nouveau' | 'Populaire';
  monthlyPrice: number; // MAD
  annualPrice: number; // MAD/month (already discounted 20%)
  features: { icon: string; title: string; description: string }[];
  screenshots: { alt: string; bg: string }[]; // bg = tailwind gradient class
  faq: { question: string; answer: string }[];
  tiers: Array<{
    name: 'Starter' | 'Pro';
    monthlyPrice: number;
    annualPrice: number;
    features: string[];
  }>;
}

export const apps: SaasApp[] = [
  {
    slug: 'datasync-pro',
    name: 'DataSync Pro',
    tagline: 'Vos données d\'entreprise en temps réel, partout.',
    description: 'Synchronisation cloud de données d\'entreprise en temps réel. Connectez vos outils, centralisez vos données et collaborez sans friction.',
    icon: '🔄',
    sector: 'gestion',
    badge: 'Populaire',
    monthlyPrice: 199,
    annualPrice: 159, // 20% off
    features: [
      {
        icon: '⚡',
        title: 'Sync en temps réel',
        description: 'Synchronisation instantanée entre tous vos outils et équipes, sans délai.',
      },
      {
        icon: '🔗',
        title: 'Intégrations natives',
        description: 'Connectez Google Sheets, Notion, Airtable et plus de 40 outils métier.',
      },
      {
        icon: '🛡️',
        title: 'Chiffrement bout-en-bout',
        description: 'Vos données sont protégées avec un chiffrement AES-256 de bout en bout.',
      },
      {
        icon: '📊',
        title: 'Historique complet',
        description: 'Accédez à l\'historique de toutes les modifications sur 12 mois.',
      },
      {
        icon: '🔔',
        title: 'Alertes intelligentes',
        description: 'Recevez des notifications instantanées en cas d\'anomalie ou de conflit.',
      },
      {
        icon: '🌍',
        title: 'Multi-équipes',
        description: 'Gérez plusieurs équipes avec des droits d\'accès personnalisés par rôle.',
      },
    ],
    screenshots: [
      { alt: 'Dashboard de synchronisation DataSync Pro', bg: 'from-blue-600 to-indigo-700' },
      { alt: 'Vue des intégrations et connecteurs', bg: 'from-indigo-600 to-purple-700' },
      { alt: 'Historique et logs de synchronisation', bg: 'from-violet-600 to-blue-700' },
    ],
    faq: [
      {
        question: 'Combien d\'outils puis-je connecter avec DataSync Pro ?',
        answer: 'Avec le plan Starter vous pouvez connecter jusqu\'à 5 outils. Le plan Pro offre des connexions illimitées avec plus de 40 intégrations natives disponibles.',
      },
      {
        question: 'Est-ce que mes données sont sécurisées ?',
        answer: 'Oui. Toutes les données transitent via HTTPS et sont chiffrées avec AES-256. Nous ne stockons jamais le contenu de vos données — uniquement les métadonnées de synchronisation.',
      },
      {
        question: 'Puis-je tester avant de m\'abonner ?',
        answer: 'Absolument. Contactez-nous sur WhatsApp et nous vous offrons un essai gratuit de 14 jours, sans carte bancaire requise.',
      },
      {
        question: 'Que se passe-t-il si je dépasse la limite de syncs ?',
        answer: 'Nous vous prévenons par email avant d\'atteindre la limite. Aucune interruption de service — vous pouvez upgrader à tout moment depuis votre espace.',
      },
    ],
    tiers: [
      {
        name: 'Starter',
        monthlyPrice: 199,
        annualPrice: 159,
        features: [
          '5 connexions d\'outils',
          'Sync toutes les 5 minutes',
          'Historique 30 jours',
          '2 membres d\'équipe',
          'Support par email',
        ],
      },
      {
        name: 'Pro',
        monthlyPrice: 349,
        annualPrice: 279,
        features: [
          'Connexions illimitées',
          'Sync en temps réel',
          'Historique 12 mois',
          'Équipes illimitées',
          'Support prioritaire WhatsApp',
          'Rapports avancés',
        ],
      },
    ],
  },
  {
    slug: 'invoiceflow',
    name: 'InvoiceFlow',
    tagline: 'Facturez plus vite, encaissez sans effort.',
    description: 'Facturation et gestion de trésorerie automatisées pour PME et indépendants. Créez, envoyez et suivez vos factures en quelques clics.',
    icon: '🧾',
    sector: 'pme',
    badge: 'Nouveau',
    monthlyPrice: 149,
    annualPrice: 119, // 20% off
    features: [
      {
        icon: '📄',
        title: 'Factures en 30 secondes',
        description: 'Générez des factures professionnelles aux normes marocaines en quelques clics.',
      },
      {
        icon: '📬',
        title: 'Envoi automatique',
        description: 'Envoyez vos factures par email ou WhatsApp directement depuis l\'application.',
      },
      {
        icon: '💸',
        title: 'Suivi des paiements',
        description: 'Visualisez en temps réel quelles factures sont payées, en attente ou en retard.',
      },
      {
        icon: '📈',
        title: 'Tableau de trésorerie',
        description: 'Dashboard de cash-flow avec prévisions à 30 et 90 jours pour planifier sereinement.',
      },
      {
        icon: '🔁',
        title: 'Factures récurrentes',
        description: 'Automatisez la facturation de vos clients réguliers avec des modèles sauvegardés.',
      },
      {
        icon: '🏷️',
        title: 'Devis convertibles',
        description: 'Transformez un devis accepté en facture en un seul clic, sans ressaisie.',
      },
    ],
    screenshots: [
      { alt: 'Création de facture InvoiceFlow', bg: 'from-emerald-600 to-teal-700' },
      { alt: 'Dashboard de trésorerie et cash-flow', bg: 'from-teal-600 to-cyan-700' },
      { alt: 'Liste et suivi des paiements', bg: 'from-cyan-600 to-emerald-700' },
    ],
    faq: [
      {
        question: 'Les factures sont-elles conformes aux normes marocaines ?',
        answer: 'Oui. InvoiceFlow génère des factures conformes aux exigences DGI (numérotation séquentielle, mentions légales obligatoires, TVA). Vous pouvez aussi personnaliser votre logo et coordonnées.',
      },
      {
        question: 'Puis-je facturer en devises étrangères ?',
        answer: 'Le plan Starter prend en charge le MAD et l\'EUR. Le plan Pro ajoute toutes les devises principales avec conversion automatique au taux du jour.',
      },
      {
        question: 'Comment fonctionne le rappel automatique des impayés ?',
        answer: 'InvoiceFlow envoie des relances par email à J+7, J+15 et J+30 après l\'échéance. Vous pouvez personnaliser le texte et la fréquence depuis vos paramètres.',
      },
      {
        question: 'Mes données sont-elles exportables ?',
        answer: 'Oui. Exportez toutes vos factures, clients et données comptables en PDF, Excel ou CSV à tout moment. Vos données vous appartiennent.',
      },
    ],
    tiers: [
      {
        name: 'Starter',
        monthlyPrice: 149,
        annualPrice: 119,
        features: [
          '20 factures/mois',
          'Envoi email automatique',
          'Suivi des paiements',
          '1 utilisateur',
          'Support par email',
        ],
      },
      {
        name: 'Pro',
        monthlyPrice: 299,
        annualPrice: 239,
        features: [
          'Factures illimitées',
          'Envoi WhatsApp + email',
          'Trésorerie & prévisions',
          '5 utilisateurs',
          'Factures récurrentes',
          'Support prioritaire',
        ],
      },
    ],
  },
  {
    slug: 'teamcollab',
    name: 'TeamCollab',
    tagline: 'Votre équipe, enfin alignée et productive.',
    description: 'Plateforme de collaboration interne pour équipes. Tâches, messages, fichiers et projets centralisés dans un seul espace de travail.',
    icon: '🤝',
    sector: 'services',
    monthlyPrice: 129,
    annualPrice: 103, // 20% off
    features: [
      {
        icon: '📋',
        title: 'Gestion de tâches',
        description: 'Créez, assignez et suivez les tâches de votre équipe avec des deadlines et priorités.',
      },
      {
        icon: '💬',
        title: 'Messagerie d\'équipe',
        description: 'Canaux de discussion par projet ou équipe. Moins d\'emails, plus de clarté.',
      },
      {
        icon: '📁',
        title: 'Partage de fichiers',
        description: 'Partagez documents, images et fichiers directement dans les conversations.',
      },
      {
        icon: '🗓️',
        title: 'Calendrier partagé',
        description: 'Planifiez réunions, deadlines et événements visibles par toute l\'équipe.',
      },
      {
        icon: '📊',
        title: 'Suivi de progression',
        description: 'Tableau de bord visuel pour suivre l\'avancement de chaque projet en temps réel.',
      },
      {
        icon: '🔐',
        title: 'Espaces privés',
        description: 'Créez des espaces confidentiels pour les RH, la direction ou les projets sensibles.',
      },
    ],
    screenshots: [
      { alt: 'Tableau de bord équipe TeamCollab', bg: 'from-violet-600 to-purple-700' },
      { alt: 'Vue des tâches et projets en cours', bg: 'from-purple-600 to-pink-700' },
      { alt: 'Messagerie et partage de fichiers', bg: 'from-pink-600 to-violet-700' },
    ],
    faq: [
      {
        question: 'TeamCollab fonctionne-t-il sur mobile ?',
        answer: 'Oui. TeamCollab est une Progressive Web App (PWA) optimisée pour mobile. Accédez à votre espace de travail depuis n\'importe quel smartphone, sans télécharger d\'application.',
      },
      {
        question: 'Combien de membres peuvent rejoindre un espace ?',
        answer: 'Le plan Starter inclut jusqu\'à 10 membres. Le plan Pro est illimité. Des tarifs spéciaux sont disponibles pour les grandes équipes — contactez-nous.',
      },
      {
        question: 'Est-ce que je peux importer des projets existants ?',
        answer: 'Oui. Importez vos projets depuis Trello, Asana ou fichiers CSV. Notre équipe vous accompagne dans la migration sans perte de données.',
      },
      {
        question: 'Quelle est la limite de stockage pour les fichiers ?',
        answer: 'Le plan Starter offre 5 Go de stockage partagé. Le plan Pro monte à 50 Go. Les fichiers individuels peuvent peser jusqu\'à 2 Go.',
      },
    ],
    tiers: [
      {
        name: 'Starter',
        monthlyPrice: 129,
        annualPrice: 103,
        features: [
          '10 membres max',
          'Projets illimités',
          '5 Go de stockage',
          'Messagerie d\'équipe',
          'Support par email',
        ],
      },
      {
        name: 'Pro',
        monthlyPrice: 249,
        annualPrice: 199,
        features: [
          'Membres illimités',
          'Projets & espaces illimités',
          '50 Go de stockage',
          'Espaces privés & droits avancés',
          'Calendrier + intégrations',
          'Support prioritaire',
        ],
      },
    ],
  },
  {
    slug: 'analyticshub',
    name: 'AnalyticsHub',
    tagline: 'Des insights actionnables, sans être data scientist.',
    description: 'Dashboard d\'analyse et rapports business en 1 clic. Connectez vos sources de données et obtenez des rapports visuels clairs pour décider plus vite.',
    icon: '📊',
    sector: 'gestion',
    badge: 'Nouveau',
    monthlyPrice: 179,
    annualPrice: 143, // 20% off
    features: [
      {
        icon: '🎯',
        title: 'KPIs en temps réel',
        description: 'Suivez vos indicateurs clés de performance en temps réel sur un dashboard central.',
      },
      {
        icon: '📉',
        title: 'Rapports automatiques',
        description: 'Recevez vos rapports hebdomadaires et mensuels par email, sans manipulation.',
      },
      {
        icon: '🔌',
        title: 'Multi-sources',
        description: 'Connectez Google Analytics, votre CRM, Excel, et autres sources en quelques clics.',
      },
      {
        icon: '🗺️',
        title: 'Visualisations évoluées',
        description: 'Graphiques interactifs, cartes géographiques et tableaux croisés dynamiques.',
      },
      {
        icon: '🤖',
        title: 'Alertes sur seuils',
        description: 'Définissez des seuils critiques et recevez une alerte instantanée si une métrique dévie.',
      },
      {
        icon: '📤',
        title: 'Export & partage',
        description: 'Exportez vos rapports en PDF ou partagez-les avec vos parties prenantes par lien sécurisé.',
      },
    ],
    screenshots: [
      { alt: 'Dashboard principal AnalyticsHub', bg: 'from-orange-500 to-amber-600' },
      { alt: 'Vue des graphiques et tendances', bg: 'from-amber-500 to-yellow-600' },
      { alt: 'Rapport mensuel automatisé', bg: 'from-yellow-500 to-orange-600' },
    ],
    faq: [
      {
        question: 'Ai-je besoin de compétences techniques pour utiliser AnalyticsHub ?',
        answer: 'Non. AnalyticsHub est conçu pour les décideurs, pas les data scientists. L\'interface est intuitive et nous vous accompagnons lors de la configuration initiale.',
      },
      {
        question: 'Quelles sources de données puis-je connecter ?',
        answer: 'Google Analytics, Google Sheets, Meta Ads, Supabase, PostgreSQL, MySQL, et fichiers CSV/Excel. De nouvelles intégrations sont ajoutées chaque trimestre.',
      },
      {
        question: 'Les données sont-elles actualisées en temps réel ?',
        answer: 'Le plan Starter actualise les données toutes les heures. Le plan Pro offre une actualisation en temps réel avec un délai inférieur à 5 minutes.',
      },
      {
        question: 'Puis-je personnaliser les dashboards pour different membres ?',
        answer: 'Oui. Créez des vues personnalisées par rôle. Le responsable commercial voit ses KPIs, le directeur voit la vue consolidée. Chacun a son dashboard.',
      },
    ],
    tiers: [
      {
        name: 'Starter',
        monthlyPrice: 179,
        annualPrice: 143,
        features: [
          '3 sources de données',
          'Actualisation horaire',
          '5 dashboards',
          '2 utilisateurs',
          'Rapports PDF mensuels',
        ],
      },
      {
        name: 'Pro',
        monthlyPrice: 329,
        annualPrice: 263,
        features: [
          'Sources illimitées',
          'Temps réel (< 5 min)',
          'Dashboards illimités',
          '10 utilisateurs',
          'Alertes sur seuils',
          'Support prioritaire + onboarding',
        ],
      },
    ],
  },
];

export function getAppBySlug(slug: string): SaasApp | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getAppsBySector(sector: SaasApp['sector']): SaasApp[] {
  return apps.filter((app) => app.sector === sector);
}

export const SECTORS = [
  { value: 'all', label: 'Tous' },
  { value: 'pme', label: 'PME / Commerce' },
  { value: 'logistique', label: 'Logistique' },
  { value: 'gestion', label: 'Gestion' },
  { value: 'services', label: 'Services Professionnels' },
] as const;
