import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — Azinag',
  description:
    'Conditions Générales de Vente d\'Azinag. Abonnements SaaS et solutions personnalisées — paiements en MAD, droit marocain.',
};

export default function CGVPage() {
  const sections = [
    {
      id: 'objet',
      title: '1. Objet du contrat',
      content: (
        <>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des relations contractuelles entre
            la société <strong>Azinag</strong> (ci-après «&nbsp;le Prestataire&nbsp;») et tout client personne physique
            ou morale (ci-après «&nbsp;le Client&nbsp;») souhaitant souscrire à ses services, qu'il s'agisse
            d'abonnements à des applications SaaS ou de solutions informatiques personnalisées.
          </p>
          <p className="mt-3">
            Toute commande ou souscription implique l'adhésion pleine et entière du Client aux présentes CGV.
          </p>
        </>
      ),
    },
    {
      id: 'services',
      title: '2. Description des services',
      content: (
        <>
          <p>Azinag propose deux catégories de services :</p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li>
              <strong>Applications SaaS en abonnement&nbsp;:</strong> accès à des outils logiciels hébergés en cloud
              (DataSync Pro, InvoiceFlow, TeamCollab, AnalyticsHub), facturés mensuellement ou annuellement en MAD.
              L'abonnement comprend l'accès à l'application, les mises à jour et le support technique selon le plan
              choisi.
            </li>
            <li>
              <strong>Solutions personnalisées&nbsp;:</strong> développement sur mesure d'applications desktop
              (Windows, macOS, Linux), mobiles (iOS, Android), web et backend/serveur. Ces projets font l'objet d'un
              devis distinct et sont régis par un contrat spécifique.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'paiement',
      title: '3. Modalités de paiement',
      content: (
        <>
          <p className="font-semibold mb-2">3.1 Abonnements SaaS</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              Facturation mensuelle ou annuelle, exprimée en <strong>Dirhams marocains (MAD)</strong>.
            </li>
            <li>
              Le paiement est exigible à chaque date de renouvellement. En cas de non-paiement, l'accès au service
              peut être suspendu après un délai de grâce de 7 jours.
            </li>
            <li>
              L'abonnement annuel est facturé en une seule fois et bénéficie d'une remise de <strong>20%</strong> par
              rapport au tarif mensuel.
            </li>
          </ul>
          <p className="font-semibold mb-2">3.2 Solutions personnalisées</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Facturation selon le devis accepté, exprimée en MAD. Les modalités (acompte, échéances, solde) sont
              précisées dans le contrat de projet.
            </li>
            <li>
              Un acompte de 30% à 50% est généralement requis avant le début des travaux.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'resiliation',
      title: '4. Résiliation',
      content: (
        <>
          <p className="font-semibold mb-2">4.1 Abonnements SaaS</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              Le Client peut résilier son abonnement mensuel à tout moment, sans frais, avec effet à la fin de la
              période en cours.
            </li>
            <li>
              L'abonnement annuel peut être résilié mais ne donne pas droit à un remboursement des mois restants, sauf
              accord exceptionnel du Prestataire.
            </li>
            <li>
              À la résiliation, le Client conserve l'accès au service jusqu'à la fin de la période facturée. Ses
              données sont conservées 30 jours après la résiliation avant suppression définitive.
            </li>
          </ul>
          <p className="font-semibold mb-2">4.2 Solutions personnalisées</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Les contrats de développement sur mesure peuvent être résiliés par accord mutuel. Les prestations
              réalisées jusqu'à la date de résiliation restent dues.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'tarification',
      title: '5. Tarification et conditions d\'accès',
      content: (
        <>
          <p>
            Les tarifs des applications SaaS sont affichés sur le site <Link href="/applications" className="text-accent hover:underline">azinag.site/applications</Link> et
            sur la page <Link href="/pricing" className="text-accent hover:underline">Formules</Link>. Azinag se réserve
            le droit de modifier ses tarifs, avec un préavis d'au moins 30 jours envoyé par email ou WhatsApp.
          </p>
          <p className="mt-3">
            L'accès aux applications SaaS est conditionné à la souscription d'un abonnement actif. Toute tentative
            d'accès non autorisé expose le Client à la résiliation immédiate sans remboursement.
          </p>
        </>
      ),
    },
    {
      id: 'assistance',
      title: '6. Assistance technique',
      content: (
        <>
          <p>
            Le support technique est fourni selon le plan souscrit&nbsp;:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li>
              <strong>Plan Starter&nbsp;:</strong> support par email, réponse sous 48h ouvrées.
            </li>
            <li>
              <strong>Plan Pro&nbsp;:</strong> support prioritaire par WhatsApp et email, réponse sous 24h ouvrées.
            </li>
          </ul>
          <p className="mt-3">
            Azinag s'engage à maintenir une disponibilité du service de 99% par mois. En cas d'interruption
            prolongée imputable au Prestataire, le Client pourra demander un avoir au prorata des jours d'indisponibilité.
          </p>
        </>
      ),
    },
    {
      id: 'droit',
      title: '7. Droit applicable et juridiction',
      content: (
        <>
          <p>
            Les présentes CGV sont soumises au droit marocain. En cas de litige, les parties s'engagent à
            rechercher une solution amiable avant tout recours judiciaire.
          </p>
          <p className="mt-3">
            À défaut de règlement amiable, tout litige sera soumis à la compétence exclusive des tribunaux
            compétents du lieu du siège social d'Azinag, au Maroc.
          </p>
        </>
      ),
    },
    {
      id: 'divers',
      title: '8. Dispositions diverses',
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Azinag se réserve le droit de modifier les présentes CGV. Les modifications entrent en vigueur 30 jours
              après notification au Client.
            </li>
            <li>
              La nullité d'une clause n'entraîne pas la nullité des autres clauses des CGV.
            </li>
            <li>
              Le fait pour Azinag de ne pas se prévaloir d'une clause des CGV ne saurait être interprété comme une
              renonciation à s'en prévaloir ultérieurement.
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-14 px-6" aria-label="CGV hero">
        <div className="relative max-w-3xl mx-auto">
          <p className="eyebrow mb-4">Légal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-ink-muted text-[1.0625rem]">
            Dernière mise à jour&nbsp;: avril 2025. Ces CGV s'appliquent à tous les services proposés par Azinag.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24" aria-label="Contenu des CGV">
        <div className="max-w-3xl mx-auto">
          {/* Table of contents */}
          <nav
            className="mb-12 border border-border-subtle rounded-2xl bg-surface p-6"
            aria-label="Table des matières"
          >
            <p className="text-sm font-semibold text-ink mb-3">Sommaire</p>
            <ol className="space-y-1.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm text-ink-muted hover:text-accent transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl font-bold mb-4 pb-3 border-b border-border-subtle">{s.title}</h2>
                <div className="text-sm text-ink-muted leading-relaxed">{s.content}</div>
              </div>
            ))}
          </div>

          {/* Contact block */}
          <div className="mt-16 border border-border-subtle rounded-2xl bg-surface p-8">
            <h2 className="text-lg font-bold mb-3">Des questions sur nos CGV ?</h2>
            <p className="text-sm text-ink-muted mb-5">
              Contactez-nous par WhatsApp ou via notre formulaire de contact. Nous répondons sous 24h ouvrées.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/212609343953?text=${encodeURIComponent('Bonjour, j\'ai une question concernant vos CGV.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-blue-700 transition-colors"
              >
                WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white border border-border-subtle text-ink font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-surface-raised transition-colors"
              >
                Formulaire de contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
