'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import Card from '@/components/admin/Card';
import Badge from '@/components/admin/Badge';
import Button from '@/components/admin/Button';
import EmptyState from '@/components/admin/EmptyState';

interface Order {
  id: string;
  created_at: string;
  business_name: string;
  contact_name: string;
  email: string;
  status: 'pending' | 'in_progress' | 'delivered';
  price: number;
}

export default function OrdersPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/check');
        if (res.ok) {
          setIsLoggedIn(true);
          const ordersRes = await fetch('/api/admin/orders');
          if (ordersRes.ok) {
            const data = await ordersRes.json();
            setOrders(data.orders || []);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <AdminLayout currentPage="orders">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
          <Button variant="primary">Add New Order</Button>
        </div>

        {orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="Orders will appear here when customers place them"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Business</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-800">{order.business_name}</td>
                    <td className="px-6 py-3 text-sm text-gray-800">{order.contact_name}</td>
                    <td className="px-6 py-3 text-sm text-gray-800">{order.email}</td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-800">${order.price}</td>
                    <td className="px-6 py-3 text-sm">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-800">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </AdminLayout>
  );
}
