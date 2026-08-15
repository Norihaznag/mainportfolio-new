'use client';

import Link from 'next/link';

interface ProductHelpCTAProps {
  variant?: 'default' | 'compact';
}

export function CustomSolutionsCTA({ variant = 'default' }: ProductHelpCTAProps) {
  if (variant === 'compact') {
    return (
      <div className="border border-border-subtle rounded-2xl bg-white p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-bold mb-1">Need product help?</p>
          <p className="text-sm text-ink-muted">Ask about app availability, billing, subscription plans, or account access.</p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-accent/90 transition-colors"
        >
          Contact support
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border border-border-subtle rounded-3xl bg-white p-10 md:p-12">
      <div className="relative flex flex-col lg:flex-row lg:items-center gap-10">
        <div className="flex-1">
          <p className="eyebrow mb-3">Product Support</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Need help picking the right Azinag app?
          </h2>
          <p className="text-ink-muted text-[1.0625rem] leading-relaxed mb-6 max-w-xl">
            We can help with product fit, platform compatibility, pricing, billing, and support expectations before purchase.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-6 py-3.5 text-[0.9375rem] hover:bg-accent/90 transition-colors"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
