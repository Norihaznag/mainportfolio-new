'use client';
import Link from 'next/link';
import { useContent } from '@/components/LanguageContext';

export function Footer() {
  const c = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-canvas py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="text-[0.9375rem] font-semibold text-ink mb-2">Azinag</p>
            <p className="text-sm text-ink-muted max-w-[240px] leading-relaxed">{c.footer.tagline}</p>
          </div>

          {/* Links */}
          <div className="flex gap-10 sm:gap-16">
            <div className="flex flex-col gap-3">
              <p className="eyebrow mb-1">Pages</p>
              <Link href="/showcase" className="text-sm text-ink-muted hover:text-ink transition-colors">
                {c.footer.links.work}
              </Link>
              <Link href="/applications" className="text-sm text-ink-muted hover:text-ink transition-colors">
                Applications
              </Link>
              <Link href="/pricing" className="text-sm text-ink-muted hover:text-ink transition-colors">
                {c.footer.links.pricing}
              </Link>
              <Link href="/about" className="text-sm text-ink-muted hover:text-ink transition-colors">
                {c.footer.links.about}
              </Link>
              <Link href="/contact" className="text-sm text-ink-muted hover:text-ink transition-colors">
                {c.footer.links.contact}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="eyebrow mb-1">Légal</p>
              <Link href="/privacy" className="text-sm text-ink-muted hover:text-ink transition-colors">
                {c.footer.legal.privacy}
              </Link>
              <Link href="/terms" className="text-sm text-ink-muted hover:text-ink transition-colors">
                {c.footer.legal.terms}
              </Link>
              <Link href="/cgv" className="text-sm text-ink-muted hover:text-ink transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-ink-faint">© {year} Azinag. Tous droits réservés.</p>
          <p className="text-xs text-ink-faint">Software house · Maroc</p>
        </div>
      </div>
    </footer>
  );
}
