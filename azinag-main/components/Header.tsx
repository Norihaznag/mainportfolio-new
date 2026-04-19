'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/applications', label: 'Applications' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FDF4E3] border-b border-black/10">
      <div className="max-w-[1100px] mx-auto px-6 h-[78px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[1.6rem] sm:text-[1.75rem] font-black leading-none text-[#0B0D10] hover:opacity-80 transition-opacity"
          aria-label="Azinag — Home"
        >
          Azinag
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-12" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[1.05rem] font-medium leading-none tracking-tight transition-colors ${
                  isActive ? 'text-[#0B0D10]' : 'text-black/85 hover:text-[#0B0D10]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center h-[50px] px-9 bg-[#ED3F27] border border-black/40 text-white text-[1.05rem] font-semibold leading-none tracking-tight hover:bg-[#D93621] transition-colors"
          >
            Contact
          </Link>
          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-black/70 hover:text-black hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M14 6l-8 8" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden border-t border-black/10 bg-[#FDF4E3] px-6 py-5 flex flex-col gap-5 ${mobileOpen ? '' : 'hidden'}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[1.05rem] font-medium transition-colors ${
                isActive ? 'text-[#0B0D10]' : 'text-black/80 hover:text-black'
              }`}
              onClick={() => setMobileOpen(false)}
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/contact"
          onClick={() => setMobileOpen(false)}
          className="self-start inline-flex items-center justify-center h-[46px] px-8 bg-[#ED3F27] border border-black/40 text-white text-[1rem] font-semibold leading-none tracking-tight hover:bg-[#D93621] transition-colors"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
