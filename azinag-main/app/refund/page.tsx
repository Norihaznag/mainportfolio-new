import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund Policy - Azinag',
  description: 'Refund policy for Azinag SaaS applications and digital software products sold through Paddle.',
};

export default function RefundPage() {
  return (
    <div className="text-ink">
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Refund Policy</h1>
          <p className="text-sm text-ink-muted mb-12">Last updated: May 2, 2026</p>

          <div className="space-y-8 text-[0.9375rem] leading-relaxed text-ink">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Scope</h2>
              <p>
                This refund policy applies to Azinag SaaS subscriptions, desktop app licenses, and digital software
                products purchased through Azinag checkout flows. Azinag is operated by Noureddine Azinag in Morocco.
              </p>
              <p className="mt-3">
                Custom development, implementation, migration, and consulting projects are handled separately under a
                written project agreement and are not covered by the default SaaS/app checkout policy unless that
                agreement says otherwise.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Paddle transactions</h2>
              <p>
                Where a purchase is processed by Paddle, Paddle acts as merchant of record. Your receipt, payment
                method, tax details, and subscription-management links are provided by Paddle. Refund requests may be
                submitted through the Paddle receipt or subscription-management link, or by contacting Azinag support.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Statutory rights</h2>
              <p>
                Nothing in this policy limits any mandatory consumer rights that apply in your country or region. If
                applicable law gives you a non-waivable cancellation, withdrawal, refund, or repair right, that right
                continues to apply.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. When refunds may be issued</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>The product is materially different from the description shown at the time of purchase.</li>
                <li>A confirmed technical defect prevents normal use and cannot be resolved within a reasonable time.</li>
                <li>The same customer was charged twice for the same product and billing period.</li>
                <li>A refund is required by applicable consumer-protection law.</li>
              </ul>
              <p className="mt-3">
                Other refund requests are reviewed case by case, taking into account the product, billing period,
                activation status, usage, and the reason for the request.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Subscriptions and cancellations</h2>
              <p>
                You may cancel a subscription to stop future renewals. Cancellation does not automatically refund a
                billing period that has already started unless required by law or approved after review.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Access after refund</h2>
              <p>
                If a refund is issued, access to the relevant SaaS product, license key, downloadable app entitlement,
                support plan, or paid feature may be cancelled or revoked.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. How to request a refund</h2>
              <p>
                To request a refund, use the support or subscription-management link in your Paddle receipt, or email{' '}
                <a href="mailto:hello@azinag.com" className="text-accent underline">
                  hello@azinag.com
                </a>{' '}
                with your name, purchase email, product name, order or receipt reference, and the reason for the
                request.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Related terms</h2>
              <p>
                This policy should be read together with the{' '}
                <Link href="/terms" className="text-accent underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-accent underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
