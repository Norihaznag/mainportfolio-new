import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - Azinag',
  description: 'Terms for Azinag SaaS subscriptions and downloadable software applications.',
};

export default function TermsPage() {
  return (
    <div className="text-ink">
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-ink-muted mb-12">Last updated: May 12, 2026</p>

          <div className="space-y-8 text-[0.9375rem] leading-relaxed text-ink">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Scope</h2>
              <p>
                These terms apply to azinag.site, Azinag software subscriptions, downloadable app licenses, and related
                support services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Products and checkout</h2>
              <p>
                Azinag sells software products only. Product details, platform availability, and pricing are published
                on the{' '}
                <Link href="/applications" className="text-accent underline">
                  applications
                </Link>{' '}
                and{' '}
                <Link href="/pricing" className="text-accent underline">
                  pricing
                </Link>{' '}
                pages.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Access and licensing</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access is granted after successful payment confirmation.</li>
                <li>Subscriptions renew by billing cycle until cancellation.</li>
                <li>Account and license access are for authorized use only.</li>
                <li>Sharing paid entitlements outside authorized use is not allowed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Pricing and billing</h2>
              <p>
                Prices are shown in MAD unless otherwise stated at checkout. Applicable taxes may be added according to
                billing location and local regulations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Support and updates</h2>
              <p>
                Active customers receive product support and updates according to their selected plan and product
                availability.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Cancellations and refunds</h2>
              <p>
                Cancellation stops future renewals. Refund handling follows our{' '}
                <Link href="/refund" className="text-accent underline">
                  Refund Policy
                </Link>{' '}
                and applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Acceptable use</h2>
              <p>
                Products may not be used for illegal activity, unauthorized access, malware distribution, or abuse of
                platform infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Contact</h2>
              <p>
                For billing, support, or account questions, email{' '}
                <a href="mailto:hello@azinag.site" className="text-accent underline">
                  hello@azinag.site
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
