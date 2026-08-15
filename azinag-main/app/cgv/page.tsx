import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions Generales de Vente - Azinag',
  description: 'Conditions Generales de Vente pour les abonnements SaaS et licences applicatives Azinag.',
};

export default function CgvPage() {
  return (
    <div className="text-ink">
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Conditions Generales de Vente</h1>
          <p className="text-sm text-ink-muted mb-12">Mise a jour: 12 mai 2026</p>

          <div className="space-y-8 text-[0.9375rem] leading-relaxed text-ink">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Objet</h2>
              <p>Les presentes CGV regissent la vente des produits logiciels Azinag sur azinag.site.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Produits</h2>
              <p>
                Les pages{' '}
                <Link href="/applications" className="text-accent underline">
                  Applications
                </Link>{' '}
                et{' '}
                <Link href="/pricing" className="text-accent underline">
                  Pricing
                </Link>{' '}
                decrivent les produits, plateformes, limitations et tarifs.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Paiement et facturation</h2>
              <p>
                Les commandes sont traitees via un paiement en ligne securise. Les details de facturation, taxes,
                annulations et remboursements sont geres selon les politiques publiees sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Abonnements et resiliation</h2>
              <p>
                Les abonnements se renouvellent selon la periode choisie jusqu&apos;a resiliation. La resiliation stoppe les
                futurs renouvellements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Remboursement</h2>
              <p>
                La politique de remboursement est detaillee sur{' '}
                <Link href="/refund" className="text-accent underline">
                  Refund Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Support client</h2>
              <p>
                Le support produit, les questions de facturation et les demandes d&apos;acces sont traites via{' '}
                <Link href="/contact" className="text-accent underline">
                  Contact
                </Link>{' '}
                ou par email: <a href="mailto:hello@azinag.site" className="text-accent underline">hello@azinag.site</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
