'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import Card from '@/components/admin/Card';
import Badge from '@/components/admin/Badge';
import Button from '@/components/admin/Button';
import Modal from '@/components/admin/Modal';
import FormField from '@/components/admin/FormField';
import EmptyState from '@/components/admin/EmptyState';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  created_at: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'user',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/check');
        if (res.ok) {
          setIsLoggedIn(true);
          const usersRes = await fetch('/api/admin/users');
          if (usersRes.ok) {
            const data = await usersRes.json();
            setUsers(data.users || []);
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

  const handleAddUser = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newUser = await res.json();
        setUsers([...users, newUser]);
        setShowModal(false);
        setFormData({ email: '', name: '', role: 'user' });
      }
    } catch (error) {
      console.error('Error adding user:', error);
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

  return (
    <AdminLayout currentPage="users">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add New User
          </Button>
        </div>

        {users.length === 0 ? (
          <EmptyState
            title="No users yet"
            description="Add your first user to get started"
            action={{
              label: 'Add First User',
              onClick: () => setShowModal(true),
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Joined</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-800">{user.email}</td>
                    <td className="px-6 py-3 text-sm text-gray-800">{user.name || '-'}</td>
                    <td className="px-6 py-3 text-sm">
                      <Badge variant={user.role === 'admin' ? 'info' : 'default'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-800">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                      <button className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={showModal} title="Add New User" onClose={() => setShowModal(false)}>
        <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }} className="space-y-4">
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <FormField
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <FormField
            label="Role"
            name="role"
            type="select"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: 'user', label: 'User' },
              { value: 'admin', label: 'Admin' },
            ]}
          />
          <div className="flex gap-3 pt-4">
            <Button variant="primary" className="flex-1">
              Add User
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
