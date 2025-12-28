'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getOrders, updateOrderStatus } from '@/lib/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Select } from '@/components/Select';
import type { Database } from '@/lib/database.types';

type Order = Database['public']['Tables']['orders']['Row'];

export default function AdminOrders() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/admin/login');
        return;
      }

      // Fetch orders
      const data = await getOrders();
      setOrders(data as Order[]);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  async function handleStatusChange(orderId: string, newStatus: string) {
    setError('');
    const result = await updateOrderStatus(
      orderId,
      newStatus as 'pending' | 'in_progress' | 'delivered'
    );

    if (result.success) {
      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus as 'pending' | 'in_progress' | 'delivered' }
            : order
        )
      );
      setSelectedOrder(null);
    } else {
      setError(result.error || 'Failed to update');
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            الطلبات ({orders.length})
          </h1>
          <Button variant="secondary" onClick={handleLogout}>
            تسجيل خروج
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {selectedOrder && (
          <Card className="mb-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                تفاصيل الطلب
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  اسم الشركة
                </p>
                <p className="text-lg text-gray-900">
                  {selectedOrder.business_name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  جهة الاتصال
                </p>
                <p className="text-lg text-gray-900">
                  {selectedOrder.contact_name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  رقم WhatsApp
                </p>
                <a
                  href={`https://wa.me/${selectedOrder.whatsapp_number.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-600 hover:underline"
                >
                  {selectedOrder.whatsapp_number}
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  البريد الإلكتروني
                </p>
                <a
                  href={`mailto:${selectedOrder.email}`}
                  className="text-lg text-blue-600 hover:underline"
                >
                  {selectedOrder.email}
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  نوع الموقع
                </p>
                <p className="text-lg text-gray-900">
                  {selectedOrder.website_type}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  السعر
                </p>
                <p className="text-lg text-gray-900">
                  {selectedOrder.price.toLocaleString('ar-MA')} درهم
                </p>
              </div>
            </div>

            {selectedOrder.notes && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  الملاحظات
                </p>
                <p className="text-gray-700">{selectedOrder.notes}</p>
              </div>
            )}

            <div className="space-y-4">
              <Select
                label="تحديث الحالة"
                options={[
                  { value: 'pending', label: 'قيد الانتظار' },
                  { value: 'in_progress', label: 'قيد الإنجاز' },
                  { value: 'delivered', label: 'تم التسليم' },
                ]}
                value={selectedOrder.status}
                onChange={(e) =>
                  handleStatusChange(selectedOrder.id, e.target.value)
                }
              />
            </div>
          </Card>
        )}

        {/* Orders List */}
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="cursor-pointer hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1" onClick={() => setSelectedOrder(order)}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {order.business_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    اسم الشخص: {order.contact_name}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    نوع الموقع: {order.website_type}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('ar-MA')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600 mb-3">
                    {order.price.toLocaleString('ar-MA')} درهم
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.status === 'pending'
                      ? 'قيد الانتظار'
                      : order.status === 'in_progress'
                        ? 'قيد الإنجاز'
                        : 'تم التسليم'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-gray-600 text-lg">لا توجد طلبات حالياً</p>
          </Card>
        )}
      </div>
    </div>
  );
}
