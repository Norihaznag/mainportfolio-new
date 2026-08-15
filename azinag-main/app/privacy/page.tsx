import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Azinag',
  description: 'How Azinag handles personal data for SaaS subscriptions and software applications.',
};

export default function PrivacyPage() {
  return (
    <div className="text-ink">
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-ink-muted mb-12">Last updated: May 12, 2026</p>

          <div className="space-y-8 text-[0.9375rem] leading-relaxed text-ink">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Data controller</h2>
              <p>
                Azinag operates azinag.site and related software products. Contact:{' '}
                <a href="mailto:hello@azinag.site" className="text-accent underline">
                  hello@azinag.site
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Data we collect</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contact data: name, email, product, and support message details.</li>
                <li>Account and product data: subscription status, license information, and support history.</li>
                <li>Payment and billing data: order references, invoices, and refund/cancellation records.</li>
                <li>Technical data needed for security and service reliability.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. How we use data</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide product access, downloads, and support.</li>
                <li>Process billing, renewals, cancellations, and refunds.</li>
                <li>Maintain service quality, stability, and security.</li>
                <li>Meet legal, tax, and accounting obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Processors</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Payment processing providers (billing and transaction handling).</li>
                <li>Supabase (database and storage infrastructure).</li>
                <li>Vercel (hosting infrastructure).</li>
                <li>Cloudinary (media hosting for product assets).</li>
                <li>Resend (email delivery).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Retention</h2>
              <p>We retain personal data only for support, service delivery, and legal requirements.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Your rights</h2>
              <p>
                You may request access, correction, or deletion of personal data where applicable by emailing{' '}
                <a href="mailto:hello@azinag.site" className="text-accent underline">
                  hello@azinag.site
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Cookies</h2>
              <p>
                Required storage is used for core site behavior and consent preferences. Optional analytics scripts are
                loaded only after consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Changes</h2>
              <p>Policy updates are published here with the latest update date.</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
