import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Azinag',
  description: 'Terms and conditions for working with Azinag.',
};

export default function TermsPage() {
  return (
    <div className="text-ink">
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-ink-muted mb-12">Last updated: April 5, 2026</p>

          <div className="space-y-8 text-[0.9375rem] leading-relaxed text-ink">

            <section>
              <h2 className="text-lg font-semibold mb-3">1. Overview</h2>
              <p>These terms govern your use of the Azinag website (<strong>azinag.site</strong>) and any services provided by Azinag, operated by Noureddine Azinag. By using this website or engaging our services, you agree to these terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Services</h2>
              <p>Azinag provides custom software development services including web applications, desktop applications, and Android applications. Each engagement is governed by a separate project agreement that outlines scope, deliverables, timeline, and price.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Project agreements</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All projects are fixed-scope and fixed-price. A written proposal is provided before any work begins.</li>
                <li>A deposit (typically 50%) is required before work starts. The remainder is due upon delivery.</li>
                <li>Scope changes requested after an agreement is signed may require a revised proposal.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Intellectual property</h2>
              <p>Upon receipt of full payment, all custom code written specifically for your project is transferred to you. Azinag retains the right to showcase the project (with your permission) in its portfolio. Third-party libraries and frameworks remain subject to their respective open-source licenses.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Confidentiality</h2>
              <p>We treat all project information as confidential and do not share details of your project with third parties without your consent.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Limitation of liability</h2>
              <p>Azinag is not liable for indirect or consequential damages. Our total liability for any claim is limited to the amount paid for the specific project in question.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Cancellations and refunds</h2>
              <p>If you cancel a project after work has begun, the deposit covers work completed to date and is non-refundable. If Azinag is unable to deliver the agreed scope, a proportional refund will be issued.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Website use</h2>
              <p>This website is provided for informational purposes. You may not use it to transmit harmful, illegal, or misleading content. We reserve the right to refuse service to anyone.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">9. Governing law</h2>
              <p>These terms are governed by the laws of Morocco. Disputes will be resolved through good-faith negotiation first, and if unresolved, through appropriate legal channels in Morocco.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">10. Contact</h2>
              <p>Questions? Email <a href="mailto:hello@azinag.com" className="text-accent underline">hello@azinag.com</a>.</p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
