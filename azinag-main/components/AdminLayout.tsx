'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: 'dashboard' | 'orders' | 'content' | 'pricing' | 'users' | 'settings';
}

export default function AdminLayout({ children, currentPage }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/adminos/login');
  };

  return (
    <div className="flex min-h-screen bg-cartoon-bg font-sans selection:bg-cartoon-pink selection:text-black">
      <Sidebar currentPage={currentPage} onLogout={handleLogout} />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

function Sidebar({ currentPage, onLogout }: { currentPage?: string; onLogout: () => void }) {
  const menuItems = [
    { label: 'Dashboard', href: '/adminos', key: 'dashboard' },
    { label: 'Orders', href: '/adminos/dashboard/orders', key: 'orders' },
    { label: 'Content', href: '/adminos/dashboard/content', key: 'content' },
    { label: 'Pricing', href: '/adminos/dashboard/pricing', key: 'pricing' },
  ];

  return (
    <aside className="w-64 bg-white border-r-3 border-black shadow-neo h-screen sticky top-0 flex flex-col pt-8 pb-6 px-6">
      <h1 className="text-3xl font-bold tracking-wide text-black mb-10 hover:-translate-y-1 transition-transform cursor-pointer">
        Azinag Admin
      </h1>
      <nav className="space-y-3 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`block px-5 py-3 rounded-xl border-3 transition-all font-bold text-lg ${
              currentPage === item.key
                ? 'bg-cartoon-yellow border-black shadow-neo-sm translate-x-1 -translate-y-1 text-black'
                : 'border-transparent text-gray-700 hover:border-black hover:shadow-neo-sm hover:text-black hover:-translate-y-1'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={onLogout}
        className="w-full text-center px-5 py-3 rounded-xl font-bold bg-[#f5f5f7] border-3 border-black text-black hover:bg-cartoon-pink hover:-translate-y-1 hover:shadow-neo-sm transition-all active:translate-y-1 active:shadow-none"
      >
        Logout
      </button>
    </aside>
  );
}
