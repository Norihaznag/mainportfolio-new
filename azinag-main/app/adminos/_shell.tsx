'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV = [
  { href: '/adminos/projects', label: 'Projects' },
  { href: '/adminos/applications', label: 'Applications' },
  { href: '/adminos/mentor', label: 'Mentor' },
  { href: '/adminos/pricing', label: 'Pricing' },
  { href: '/adminos/contacts', label: 'Contacts' },
  { href: '/adminos/settings', label: 'Settings' },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/admin/auth/check')
      .then(r => r.ok ? setReady(true) : router.replace('/adminos/login'))
      .catch(() => router.replace('/adminos/login'));
  }, [router]);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  if (!ready) return (
    <div className="min-h-screen bg-canvas flex items-center justify-center">
      <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  );

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.replace('/adminos/login');
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 bg-surface border-b border-border-subtle flex items-center justify-between px-4 h-14">
        <p className="text-[0.65rem] font-bold tracking-widest uppercase text-ink-faint">Azinag</p>
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          className="p-2 rounded-lg hover:bg-surface-raised transition-colors"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-30 bg-canvas border-t border-border-subtle p-4 flex flex-col gap-1">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname.startsWith(n.href)
                  ? 'bg-accent-light text-accent'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-raised'
              }`}
            >
              {n.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-auto px-4 py-3 text-left text-sm text-ink-faint hover:text-ink-muted rounded-xl hover:bg-surface-raised transition-colors"
          >
            Log out
          </button>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-48 shrink-0 border-r border-border-subtle bg-surface flex-col py-8 px-4 fixed top-0 left-0 h-screen">
          <p className="text-[0.65rem] font-bold tracking-widest uppercase text-ink-faint mb-8 px-2">
            Azinag
          </p>
          <nav className="flex flex-col gap-0.5 flex-1">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(n.href)
                    ? 'bg-accent-light text-accent'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-raised'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="text-xs text-ink-faint hover:text-ink-muted transition-colors px-3 py-2 text-left rounded-lg hover:bg-surface-raised"
          >
            Log out
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-48 p-4 sm:p-6 lg:p-12 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
