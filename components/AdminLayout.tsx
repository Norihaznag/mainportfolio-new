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
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} onLogout={handleLogout} />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

function Sidebar({ currentPage, onLogout }: { currentPage?: string; onLogout: () => void }) {
  const menuItems = [
    { label: 'Dashboard', href: '/admin', key: 'dashboard' },
    { label: 'Orders', href: '/admin/dashboard/orders', key: 'orders' },
    { label: 'Content', href: '/admin/dashboard/content', key: 'content' },
    { label: 'Pricing', href: '/admin/dashboard/pricing', key: 'pricing' },
    { label: 'Users', href: '/admin/dashboard/users', key: 'users' },
    { label: 'Settings', href: '/admin/dashboard/settings', key: 'settings' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-6 h-screen sticky top-0">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">Azinag Admin</h1>
      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`block px-4 py-2 rounded transition ${
              currentPage === item.key
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={onLogout}
        className="w-full text-left px-4 py-2 rounded text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
      >
        Logout
      </button>
    </aside>
  );
}
