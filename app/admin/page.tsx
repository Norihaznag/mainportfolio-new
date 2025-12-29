'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import Card from '@/components/admin/Card';

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    orders: 0,
    content: 0,
    pricing: 0,
    users: 0,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/check');
        if (res.ok) {
          setIsLoggedIn(true);
          // Fetch stats
          const statsRes = await fetch('/api/admin/stats');
          if (statsRes.ok) {
            const data = await statsRes.json();
            setStats(data);
          }
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <AdminLayout currentPage="dashboard">
      <Card>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Azinag Admin</h1>
        <p className="text-gray-600 mb-8">Manage your site content, orders, and services from here.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Orders"
            count={stats.orders}
            href="/admin/dashboard/orders"
          />
          <StatCard
            title="Content Items"
            count={stats.content}
            href="/admin/dashboard/content"
          />
          <StatCard
            title="Pricing Packages"
            count={stats.pricing}
            href="/admin/dashboard/pricing"
          />
          <StatCard
            title="Users"
            count={stats.users}
            href="/admin/dashboard/users"
          />
        </div>
      </Card>
    </AdminLayout>
  );
}

function StatCard({
  title,
  count,
  href,
}: {
  title: string;
  count: number;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
        <h3 className="text-gray-800 font-semibold text-sm mb-2">{title}</h3>
        <p className="text-3xl font-bold text-blue-600">{count}</p>
      </div>
    </Link>
  );
}
