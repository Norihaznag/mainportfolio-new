import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Azinag',
  description: 'How Azinag collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="text-ink">
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-ink-muted mb-12">Last updated: April 5, 2026</p>

          <div className="prose prose-sm max-w-none space-y-8 text-[0.9375rem] leading-relaxed text-ink">

            <section>
              <h2 className="text-lg font-semibold mb-3">1. Who we are</h2>
              <p>Azinag is a one-person software studio operated by Noureddine Azinag, based in Morocco. Our website is <strong>azinag.site</strong>. You can contact us at <a href="mailto:hello@azinag.com" className="text-accent underline">hello@azinag.com</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. What data we collect</h2>
              <p>We collect only the minimum data needed to operate:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Contact form submissions:</strong> name, email address, company name, and your message.</li>
                <li><strong>Analytics:</strong> anonymous usage data (pages viewed, clicks) via Google Analytics. No personally identifiable information is stored in analytics.</li>
                <li><strong>Cookies:</strong> only first-party session cookies necessary for the admin panel. No advertising or tracking cookies are used.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. How we use your data</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To respond to your project inquiry.</li>
                <li>To improve the website through anonymous analytics.</li>
                <li>We do not sell, rent, or share your data with third parties for marketing.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Data storage</h2>
              <p>Contact form submissions are stored in a Supabase (PostgreSQL) database hosted on secure cloud infrastructure. Data is retained only as long as needed to manage your inquiry.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Your rights</h2>
              <p>You have the right to access, correct, or request deletion of your personal data at any time. Email <a href="mailto:hello@azinag.com" className="text-accent underline">hello@azinag.com</a> and we will respond within 5 business days.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Third-party services</h2>
              <p>We use the following third-party services that may process your data:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Supabase</strong> — database and authentication (<a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent underline">privacy policy</a>)</li>
                <li><strong>Vercel</strong> — website hosting (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent underline">privacy policy</a>)</li>
                <li><strong>Google Analytics</strong> — anonymous analytics (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent underline">privacy policy</a>)</li>
                <li><strong>Resend</strong> — email delivery for contact form submissions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Changes to this policy</h2>
              <p>We may update this policy occasionally. The date at the top of this page reflects the most recent revision.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Contact</h2>
              <p>Questions about this policy? Email <a href="mailto:hello@azinag.com" className="text-accent underline">hello@azinag.com</a>.</p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
