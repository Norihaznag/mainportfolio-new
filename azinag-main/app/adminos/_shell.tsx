'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FolderKanban, AppWindow, Sparkles, Tag, Mail, Settings, LogOut, Menu, X,
} from 'lucide-react';

const NAV = [
  { href: '/adminos/projects',     label: 'Projects',      Icon: FolderKanban },
  { href: '/adminos/applications', label: 'Apps',          Icon: AppWindow    },
  { href: '/adminos/mentor',       label: 'Mentor',        Icon: Sparkles     },
  { href: '/adminos/pricing',      label: 'Pricing',       Icon: Tag          },
  { href: '/adminos/contacts',     label: 'Contacts',      Icon: Mail         },
  { href: '/adminos/settings',     label: 'Settings',      Icon: Settings     },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/admin/auth/check')
      .then(r => (r.ok ? setReady(true) : router.replace('/adminos/login')))
      .catch(() => router.replace('/adminos/login'));
  }, [router]);

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
      <header className="md:hidden sticky top-0 z-40 bg-surface border-b border-border-subtle flex items-center justify-between px-4 h-12">
        <span className="text-[0.6rem] font-bold tracking-widest uppercase text-ink-faint">Azinag</span>
        <button onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu" className="p-1.5 rounded-lg hover:bg-surface-raised transition-colors">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-12 z-30 bg-canvas border-t border-border-subtle p-3 flex flex-col gap-0.5">
          {NAV.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname.startsWith(href) ? 'bg-accent-light text-accent' : 'text-ink-muted hover:text-ink hover:bg-surface-raised'
            }`}>
              <Icon size={15} />
              {label}
            </Link>
          ))}
          <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-3 py-2.5 text-sm text-ink-faint hover:text-ink-muted rounded-lg hover:bg-surface-raised transition-colors">
            <LogOut size={15} />
            Log out
          </button>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-40 shrink-0 border-r border-border-subtle bg-surface flex-col py-6 px-3 fixed top-0 left-0 h-screen">
          <p className="text-[0.6rem] font-bold tracking-widest uppercase text-ink-faint mb-5 px-2">Azinag</p>
          <nav className="flex flex-col gap-0.5 flex-1">
            {NAV.map(({ href, label, Icon }) => (
              <Link key={href} href={href} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(href) ? 'bg-accent-light text-accent' : 'text-ink-muted hover:text-ink hover:bg-surface-raised'
              }`}>
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </nav>
          <button onClick={handleLogout} className="flex items-center gap-2.5 px-2.5 py-2 text-xs text-ink-faint hover:text-ink-muted rounded-lg hover:bg-surface-raised transition-colors">
            <LogOut size={13} />
            Log out
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-40 p-4 sm:p-6 lg:p-10 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
