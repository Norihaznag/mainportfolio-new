import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund Policy - Azinag',
  description: 'Refund and cancellation policy for Azinag SaaS subscriptions and app licenses.',
};

export default function RefundPage() {
  return (
    <div className="text-ink">
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Refund Policy</h1>
          <p className="text-sm text-ink-muted mb-12">Last updated: May 12, 2026</p>

          <div className="space-y-8 text-[0.9375rem] leading-relaxed text-ink">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Scope</h2>
              <p>
                This policy covers Azinag software subscriptions and downloadable licenses purchased on our website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. When refunds may be issued</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>The product materially differs from its published description.</li>
                <li>A confirmed technical issue blocks normal use and cannot be resolved in reasonable time.</li>
                <li>Duplicate charges occur for the same customer and billing cycle.</li>
                <li>A refund is required by applicable law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Cancellations</h2>
              <p>
                You can cancel to stop future renewals. Cancellation does not automatically refund a billing period
                already started unless required by law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Access after refund</h2>
              <p>When a refund is issued, related app or subscription access may be revoked.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Support for refund requests</h2>
              <p>
                Send your request to{' '}
                <a href="mailto:hello@azinag.site" className="text-accent underline">
                  hello@azinag.site
                </a>{' '}
                with order details and reason.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Related policies</h2>
              <p>
                See also the{' '}
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
