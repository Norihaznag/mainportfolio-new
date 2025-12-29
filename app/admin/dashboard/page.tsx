'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import Card from '@/components/admin/Card';

export default function Dashboard() {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600 mb-8">Here's a summary of your site activity.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Orders" value={stats.orders} color="blue" />
          <StatCard title="Content Items" value={stats.content} color="green" />
          <StatCard title="Pricing Packages" value={stats.pricing} color="purple" />
          <StatCard title="Users" value={stats.users} color="orange" />
        </div>
      </Card>
    </AdminLayout>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  const colorClasses: { [key: string]: string } = {
    blue: 'from-blue-50 to-blue-100 text-blue-600',
    green: 'from-green-50 to-green-100 text-green-600',
    purple: 'from-purple-50 to-purple-100 text-purple-600',
    orange: 'from-orange-50 to-orange-100 text-orange-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-lg p-6`}>
      <p className="text-gray-700 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
