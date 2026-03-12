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
          router.push('/adminos/login');
        }
      } catch (error) {
        router.push('/adminos/login');
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
        <h1 className="text-4xl font-black text-black mb-4 uppercase tracking-wide">Welcome to Azinag Admin</h1>
        <p className="text-xl font-bold text-gray-700 mb-10">Manage your site content, orders, and services from here.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Orders"
            count={stats.orders}
            href="/adminos/dashboard/orders"
            colorClass="bg-cartoon-yellow"
          />
          <StatCard
            title="Content Items"
            count={stats.content}
            href="/adminos/dashboard/content"
            colorClass="bg-cartoon-pink"
          />
          <StatCard
            title="Pricing Packages"
            count={stats.pricing}
            href="/adminos/dashboard/pricing"
            colorClass="bg-cartoon-green"
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
  colorClass = "bg-white",
}: {
  title: string;
  count: number;
  href: string;
  colorClass?: string;
}) {
  return (
    <Link href={href}>
      <div className={`${colorClass} rounded-2xl border-3 border-black p-6 shadow-neo hover:-translate-y-1 hover:shadow-neo-md active:translate-y-1 active:shadow-none transition-all cursor-pointer`}>
        <h3 className="text-black font-bold text-lg mb-2 uppercase">{title}</h3>
        <p className="text-5xl font-black text-black">{count}</p>
      </div>
    </Link>
  );
}
