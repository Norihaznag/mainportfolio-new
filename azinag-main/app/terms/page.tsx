import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - Azinag',
  description: 'Terms and conditions for Azinag SaaS applications and software products.',
};

export default function TermsPage() {
  return (
    <div className="text-ink">
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-ink-muted mb-12">Last updated: May 2, 2026</p>

          <div className="space-y-8 text-[0.9375rem] leading-relaxed text-ink">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Overview</h2>
              <p>
                These Terms of Service govern your use of the Azinag website at <strong>azinag.site</strong>, Azinag
                SaaS applications, desktop software, digital software products, and related support. Azinag is operated
                by <strong>Noureddine Azinag</strong> in Morocco.
              </p>
              <p className="mt-3">
                By using the website, creating an account, purchasing software access, downloading a product, or using
                an Azinag application, you agree to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Products sold through Paddle</h2>
              <p>
                Paddle checkout is used only for Azinag SaaS/app products, including software subscriptions, desktop app
                licenses, paid feature access, and related digital software entitlements. Current product descriptions,
                pricing, platforms, and included deliverables are shown on the{' '}
                <Link href="/pricing" className="text-accent underline">
                  pricing page
                </Link>{' '}
                and relevant application pages.
              </p>
              <p className="mt-3">
                Paddle acts as merchant of record for purchases processed through Paddle. Paddle may handle payment
                processing, tax calculation, invoices, receipts, subscription-management links, and billing support for
                those purchases.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Custom projects and services</h2>
              <p>
                Azinag may also provide custom software development, implementation, migration, training, maintenance,
                and consulting services. These services are inquiry-only and are not the default products sold through
                Paddle checkout.
              </p>
              <p className="mt-3">
                Custom projects require a separate written proposal or project agreement that defines scope,
                deliverables, timeline, price, payment schedule, acceptance criteria, and cancellation terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Accounts and access</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>You are responsible for keeping account credentials and license keys secure.</li>
                <li>You may not share paid access, license keys, or subscription entitlements outside the agreed use.</li>
                <li>Azinag may suspend access for non-payment, abuse, security risk, or violation of these terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Pricing and billing</h2>
              <p>
                SaaS/app prices are listed in Moroccan dirhams (MAD) unless another currency is shown at checkout.
                Subscription plans renew at the billing interval selected during purchase until cancelled. Taxes, where
                applicable, may be calculated and collected by Paddle at checkout.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Updates and support</h2>
              <p>
                Active SaaS/app subscriptions include access to hosted software or licensed app functionality, product
                updates made generally available for that product, and support according to the plan or product details
                shown at purchase.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Intellectual property</h2>
              <p>
                Azinag retains ownership of its software, source code, product designs, documentation, brand assets,
                templates, and pre-existing tools. A paid subscription or license gives you a limited, non-transferable
                right to use the relevant product according to these terms and the selected plan.
              </p>
              <p className="mt-3">
                For custom projects, ownership and usage rights are defined in the separate project agreement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Acceptable use</h2>
              <p>
                You may not use Azinag products to violate laws, infringe third-party rights, attempt unauthorized
                access, distribute malware, abuse infrastructure, or process data in a way that violates privacy or
                security obligations. Azinag may refuse or discontinue access where use creates legal, security, fraud,
                or chargeback risk.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">9. Refunds and cancellations</h2>
              <p>
                Refunds for SaaS/app purchases are handled under the{' '}
                <Link href="/refund" className="text-accent underline">
                  Refund Policy
                </Link>
                . Cancelling a subscription stops future renewals but does not automatically refund the current billing
                period unless required by law or approved after review.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">10. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, Azinag is not liable for indirect, incidental, consequential, or
                lost-profit damages. Azinag&apos;s total liability for a claim is limited to the amount paid for the
                affected product or service during the three months before the event giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">11. Governing law</h2>
              <p>
                These terms are governed by the laws of Morocco. Disputes will first be addressed through good-faith
                negotiation. If unresolved, disputes may be brought before the competent courts in Morocco.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">12. Contact</h2>
              <p>
                Questions about these terms? Email{' '}
                <a href="mailto:hello@azinag.com" className="text-accent underline">
                  hello@azinag.com
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
