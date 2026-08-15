'use client';
import Link from 'next/link';

const SUPPORT_EMAIL = 'hello@azinag.site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-canvas py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="text-[0.9375rem] font-semibold text-ink mb-2">Azinag</p>
            <p className="text-sm text-ink-muted max-w-[260px] leading-relaxed">
              SaaS and desktop business apps for invoicing, restaurant operations, and management workflows.
            </p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline mt-4">
              {SUPPORT_EMAIL}
            </a>
          </div>

          {/* Links */}
          <div className="flex gap-10 sm:gap-14">
            <div className="flex flex-col gap-3">
              <p className="eyebrow mb-1">Navigation</p>
              <Link href="/" className="text-sm text-ink-muted hover:text-ink transition-colors">Home</Link>
              <Link href="/applications" className="text-sm text-ink-muted hover:text-ink transition-colors">Applications</Link>
              <Link href="/pricing" className="text-sm text-ink-muted hover:text-ink transition-colors">Pricing</Link>
              <Link href="/contact" className="text-sm text-ink-muted hover:text-ink transition-colors">Support</Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="eyebrow mb-1">Legal</p>
              <Link href="/privacy" className="text-sm text-ink-muted hover:text-ink transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-ink-muted hover:text-ink transition-colors">Terms of Service</Link>
              <Link href="/refund" className="text-sm text-ink-muted hover:text-ink transition-colors">Refund Policy</Link>
              <Link href="/cgv" className="text-sm text-ink-muted hover:text-ink transition-colors">CGV</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-ink-faint">(c) {year} Azinag. All rights reserved.</p>
          <p className="text-xs text-ink-faint">Software Products - Morocco</p>
        </div>
      </div>
    </footer>
  );
}
