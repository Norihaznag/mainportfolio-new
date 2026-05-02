import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Azinag',
  description: 'How Azinag collects, uses, and protects personal information for its website and software products.',
};

export default function PrivacyPage() {
  return (
    <div className="text-ink">
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-ink-muted mb-12">Last updated: May 2, 2026</p>

          <div className="space-y-8 text-[0.9375rem] leading-relaxed text-ink">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Who we are</h2>
              <p>
                Azinag is a software studio operated by Noureddine Azinag in Morocco. Our website is{' '}
                <strong>azinag.site</strong>. You can contact us at{' '}
                <a href="mailto:hello@azinag.com" className="text-accent underline">
                  hello@azinag.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Information we collect</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Contact details:</strong> name, email address, company or project name, and message content
                  submitted through forms or support channels.
                </li>
                <li>
                  <strong>Product and account details:</strong> app name, plan, license or subscription status, support
                  history, and technical information needed to deliver software access.
                </li>
                <li>
                  <strong>Billing details:</strong> transaction, invoice, tax, receipt, payment status, subscription,
                  and refund data processed by Paddle when you buy through Paddle checkout.
                </li>
                <li>
                  <strong>Usage and diagnostics:</strong> basic product usage, browser/device information, errors, and
                  security logs needed to operate and protect the service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. How we use information</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To respond to inquiries and provide support.</li>
                <li>To deliver SaaS/app access, subscriptions, downloads, updates, and license entitlements.</li>
                <li>To process payments, receipts, refunds, tax, and subscription changes through Paddle.</li>
                <li>To improve reliability, security, product quality, and website performance.</li>
                <li>To comply with legal, tax, accounting, fraud-prevention, and security obligations.</li>
              </ul>
              <p className="mt-3">We do not sell personal information.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Cookies, analytics, and marketing pixels</h2>
              <p>
                Azinag uses necessary local storage and cookies for basic site operation, admin sessions, and remembering
                your cookie preference. The public site stores your cookie choice under{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 text-sm">azinag_cookie_consent</code>.
              </p>
              <p className="mt-3">
                Google Analytics and Meta Pixel are loaded only after you accept optional analytics and marketing
                cookies. If you decline, those optional scripts are not loaded by the public site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Third-party services</h2>
              <p>We use selected service providers to operate the website and products:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Paddle:</strong> payment processing, merchant-of-record services, receipts, tax, billing,
                  subscription management, and refund handling for checkout transactions.
                </li>
                <li>
                  <strong>Supabase:</strong> database, storage, and authentication infrastructure.
                </li>
                <li>
                  <strong>Vercel:</strong> website hosting and deployment infrastructure.
                </li>
                <li>
                  <strong>Cloudinary:</strong> image and media hosting for public product assets.
                </li>
                <li>
                  <strong>Resend:</strong> email delivery for contact and support messages.
                </li>
                <li>
                  <strong>Google Analytics and Meta Pixel:</strong> optional analytics and marketing measurement after
                  consent.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Data retention</h2>
              <p>
                We keep personal information only as long as needed for the purposes described above. Contact inquiries
                are kept while the inquiry or business relationship is active. Billing, tax, accounting, and legal
                records may be retained for the period required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Your rights</h2>
              <p>
                You may request access, correction, deletion, or restriction of your personal information where
                applicable. Email{' '}
                <a href="mailto:hello@azinag.com" className="text-accent underline">
                  hello@azinag.com
                </a>{' '}
                and we will respond within a reasonable time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Security</h2>
              <p>
                We use reasonable technical and organizational measures to protect personal information. No internet
                service can be guaranteed completely secure, but we limit access and use reputable infrastructure
                providers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">9. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The date at the top of this page shows the most recent
                revision.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
