'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV = [
  { href: '/adminos/projects', label: 'Projects' },
  { href: '/adminos/pricing', label: 'Pricing' },
  { href: '/adminos/contacts', label: 'Contacts' },
  { href: '/adminos/settings', label: 'Settings' },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('/api/admin/auth/check')
      .then(r => r.ok ? setReady(true) : router.replace('/adminos/login'))
      .catch(() => router.replace('/adminos/login'));
  }, [router]);

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
    <div className="min-h-screen bg-canvas text-ink flex">
      {/* Sidebar */}
      <aside className="w-48 shrink-0 border-r border-border-subtle bg-surface flex flex-col py-8 px-4 fixed top-0 left-0 h-screen">
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

      {/* Main */}
      <main className="flex-1 ml-48 p-8 lg:p-12 max-w-5xl">
        {children}
      </main>
    </div>
  );
}
