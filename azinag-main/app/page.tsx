import AdSenseAd from '@/components/AdSenseAd';
import Script from 'next/script';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Azinag - Business Apps and SaaS Products',
  description:
    'Business apps from Azinag. Simple SaaS and desktop software for systems and everyday business workflows.',
};

const featuredApps = [
  {
    name: 'Dovi',
    description: 'Invoice management software for small businesses that need faster billing and cleaner records.',
    platforms: 'Windows desktop',
    monthly: '90 MAD/mo',
    annual: '800 MAD/yr',
    href: '/applications/dovi',
  },
  {
    name: 'Azinag Restuara',
    description: 'Restaurant operations app for POS, order management, and daily service workflows.',
    platforms: 'Windows desktop',
    monthly: '90 MAD/mo',
    annual: '900 MAD/yr',
    href: '/applications/azinag-restuara',
  },
];

const categories = ['Invoicing and billing', 'Restaurant operations', 'Business management'];

const accessSteps = [
  {
    title: 'Choose your app',
    body: 'Pick the application that matches your workflow and platform requirements.',
  },
  {
    title: 'Review pricing and plan',
    body: 'Compare monthly or annual options, included features, and support coverage.',
  },
  {
    title: 'Start checkout on the website',
    body: 'Checkout is handled in a website-based flow for Azinag software products.',
  },
  {
    title: 'Receive access, download, and support',
    body: 'You get product access details, download instructions when relevant, and support channels.',
  },
];

const complianceItems = [
  'Secure website checkout',
  'Clear pricing before purchase',
  'Software updates and release notes',
  'Product support by email and contact form',
  'Cancellation and refund policy links',
];

const faq = [
  {
    q: 'How do I access an app after purchase?',
    a: 'After confirmation, you receive access details by email, including account or download instructions based on the app.',
  },
  {
    q: 'Are these subscriptions or one-time licenses?',
    a: 'Azinag products can be monthly or annual subscriptions, and some apps may include downloadable license-based access.',
  },
  {
    q: 'How do updates work?',
    a: 'Active customers receive product updates based on the selected plan and product release schedule.',
  },
  {
    q: 'Where can I get support?',
    a: 'Use the contact page for product support, billing questions, subscription changes, and account access help.',
  },
  {
    q: 'How do cancellation and refunds work?',
    a: 'Cancellation stops future renewals. Refund handling follows the published refund policy and applicable law.',
  },
];

export default function Home() {
  return (
    <main className="text-ink">
      <div aria-label="Advertisement" className="my-8">
        <AdSenseAd />
      </div>

      <section
        aria-label="Sponsored advertisement"
        className="px-6 pb-8"
      >
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl border border-border-subtle bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Sponsored
            </p>
            <Script
              async
              strategy="afterInteractive"
              data-cfasync="false"
              src="https://pl30894330.effectivecpmnetwork.com/8737b674aeea3a529372ad4f7645471a/invoke.js"
            />
            <div
              id="container-8737b674aeea3a529372ad4f7645471a"
              className="min-h-[120px] w-full"
            />
            <a
              href="https://www.effectivecpmnetwork.com/bxtpyr1y?key=7d793a27b03422769a74a962a6d2fa3c"
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="mt-3 inline-block text-xs text-ink-faint hover:text-accent hover:underline"
            >
              Sponsored link
            </a>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-78px)] px-6">
        <p className="eyebrow mb-4">Azinag Software Products</p>
        <h1 className="font-black tracking-tight leading-[1.05] text-[2.6rem] sm:text-[3.8rem] md:text-[5rem] max-w-[900px] mb-6">
          Business apps from Azinag.
        </h1>
        <p className="text-[1.0625rem] text-ink-muted max-w-[720px] mb-10">
          Simple SaaS and desktop software for Systems And Business Operations, and everyday business workflows.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/applications"
            className="inline-flex items-center bg-accent hover:bg-[#D93621] text-white font-semibold rounded-lg px-7 py-3.5 text-[0.9375rem] transition-colors"
          >
            View applications
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center bg-white text-ink font-semibold rounded-lg px-7 py-3.5 text-[0.9375rem] border border-border-subtle hover:bg-surface-raised transition-colors"
          >
            See pricing
          </Link>
        </div>
      </section>

      <section className="px-6 py-16" aria-labelledby="featured-apps-heading">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-2">Featured Applications</p>
          <h2
            id="featured-apps-heading"
            className="font-black tracking-tight leading-[1.05] text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] mb-8"
          >
            Ready-made software products.
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredApps.map((app) => (
              <article key={app.name} className="rounded-xl border border-border-subtle bg-white p-6">
                <h3 className="text-xl font-bold tracking-tight">{app.name}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{app.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-faint">{app.platforms}</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border-subtle bg-surface p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Monthly</p>
                    <p className="text-sm font-semibold text-ink mt-1">{app.monthly}</p>
                  </div>
                  <div className="rounded-lg border border-border-subtle bg-surface p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Annual</p>
                    <p className="text-sm font-semibold text-ink mt-1">{app.annual}</p>
                  </div>
                </div>
                <Link href={app.href} className="inline-flex mt-5 text-sm font-semibold text-accent hover:underline">
                  View details
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" aria-labelledby="categories-heading">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-2">Product Categories</p>
          <h2
            id="categories-heading"
            className="font-black tracking-tight leading-[1.05] text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] mb-6"
          >
            Built for daily operations.
          </h2>
          <ul className="space-y-3 inline-flex flex-col text-left" role="list">
            {categories.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[1.0625rem] text-ink-muted">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-16" aria-labelledby="how-it-works-heading">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-2">How Access Works</p>
          <h2
            id="how-it-works-heading"
            className="font-black tracking-tight leading-[1.05] text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] mb-8"
          >
            Purchase and access flow.
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {accessSteps.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-border-subtle bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-ink-faint mb-2">
                  Step {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-y border-border-subtle bg-surface" aria-labelledby="compliance-heading">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-2">Trust and Compliance</p>
          <h2
            id="compliance-heading"
            className="font-black tracking-tight leading-[1.05] text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] mb-6"
          >
            Clear software purchase terms.
          </h2>
          <ul className="grid gap-3 md:grid-cols-2" role="list">
            {complianceItems.map((item) => (
              <li key={item} className="rounded-lg border border-border-subtle bg-white px-4 py-3 text-sm text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-16" aria-labelledby="faq-heading">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-2">FAQ</p>
          <h2
            id="faq-heading"
            className="font-black tracking-tight leading-[1.05] text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] mb-8"
          >
            Product access and billing answers.
          </h2>
          <div className="space-y-5">
            {faq.map((item) => (
              <article key={item.q} className="rounded-xl border border-border-subtle bg-white p-6">
                <h3 className="text-base font-semibold text-ink">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
