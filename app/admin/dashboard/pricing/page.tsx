'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import Card from '@/components/admin/Card';
import Button from '@/components/admin/Button';
import Modal from '@/components/admin/Modal';
import FormField from '@/components/admin/FormField';
import EmptyState from '@/components/admin/EmptyState';

interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  color: string;
  sort_order: number;
  active: boolean;
  created_at: string;
}

const colorOptions = [
  { value: 'blue', label: 'Blue', bgClass: 'from-blue-50 to-blue-100' },
  { value: 'green', label: 'Green', bgClass: 'from-green-50 to-green-100' },
  { value: 'purple', label: 'Purple', bgClass: 'from-purple-50 to-purple-100' },
  { value: 'orange', label: 'Orange', bgClass: 'from-orange-50 to-orange-100' },
  { value: 'red', label: 'Red', bgClass: 'from-red-50 to-red-100' },
];

export default function PricingPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pricing, setPricing] = useState<PricingPackage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    features: '',
    color: 'blue',
    sort_order: '0',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/check');
        if (res.ok) {
          setIsLoggedIn(true);
          await fetchPricing();
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

  const fetchPricing = async () => {
    try {
      const res = await fetch('/api/admin/pricing');
      if (res.ok) {
        const data = await res.json();
        setPricing(data.pricing || []);
      }
    } catch (error) {
      console.error('Error fetching pricing:', error);
    }
  };

  const handleAddPricing = async () => {
    try {
      const payload = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        features: formData.features.split('\n').filter(f => f.trim()),
        color: formData.color,
        sort_order: Number(formData.sort_order),
      };

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/pricing/${editingId}` : '/api/admin/pricing';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchPricing();
        setShowModal(false);
        setEditingId(null);
        setFormData({ name: '', price: '', description: '', features: '', color: 'blue', sort_order: '0' });
      }
    } catch (error) {
      console.error('Error saving pricing:', error);
    }
  };

  const handleEdit = (pkg: PricingPackage) => {
    setEditingId(pkg.id);
    setFormData({
      name: pkg.name,
      price: pkg.price.toString(),
      description: pkg.description || '',
      features: pkg.features?.join('\n') || '',
      color: pkg.color || 'blue',
      sort_order: pkg.sort_order.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE' });
      await fetchPricing();
    } catch (error) {
      console.error('Error deleting pricing:', error);
    }
  };

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

  const getColorClass = (color: string) => {
    const colorOption = colorOptions.find(c => c.value === color);
    return colorOption?.bgClass || colorOptions[0].bgClass;
  };

  return (
    <AdminLayout currentPage="pricing">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Pricing Management</h1>
          <Button 
            variant="primary" 
            onClick={() => {
              setEditingId(null);
              setFormData({ name: '', price: '', description: '', features: '', color: 'blue', sort_order: '0' });
              setShowModal(true);
            }}
          >
            Add New Package
          </Button>
        </div>

        {pricing.length === 0 ? (
          <EmptyState
            title="No pricing packages yet"
            description="Create your first pricing package to get started"
            action={{
              label: 'Add First Package',
              onClick: () => {
                setEditingId(null);
                setFormData({ name: '', price: '', description: '', features: '', color: 'blue', sort_order: '0' });
                setShowModal(true);
              },
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricing
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((pkg) => (
                <div key={pkg.id} className={`bg-gradient-to-br ${getColorClass(pkg.color)} rounded-lg p-6 border-2 border-gray-200 hover:shadow-lg transition`}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-gray-800 mb-4">${pkg.price}</p>
                  <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
                  {pkg.features && pkg.features.length > 0 && (
                    <div className="mb-4 text-sm text-gray-600">
                      <p className="font-semibold mb-2">Features:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(pkg)}
                      className="flex-1 text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(pkg.id)}
                      className="flex-1 text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Card>

      <Modal isOpen={showModal} title={editingId ? 'Edit Pricing Package' : 'Add New Pricing Package'} onClose={() => setShowModal(false)}>
        <form onSubmit={(e) => { e.preventDefault(); handleAddPricing(); }} className="space-y-4">
          <FormField
            label="Package Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <FormField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <FormField
            label="Features (one per line)"
            name="features"
            type="textarea"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
          />
          <FormField
            label="Color"
            name="color"
            type="select"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            options={colorOptions}
          />
          <FormField
            label="Display Order"
            name="sort_order"
            type="number"
            value={formData.sort_order}
            onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
          />
          <div className="flex gap-3 pt-4">
            <Button variant="primary" className="flex-1">
              {editingId ? 'Update Package' : 'Add Package'}
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowModal(false)}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
