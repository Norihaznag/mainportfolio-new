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

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: string;
  published: boolean;
  created_at: string;
}

export default function ContentPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'blog',
    published: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/check');
        if (res.ok) {
          setIsLoggedIn(true);
          const contentRes = await fetch('/api/admin/content');
          if (contentRes.ok) {
            const data = await contentRes.json();
            setContent(data.content || []);
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

  const handleAddContent = async () => {
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newContent = await res.json();
        setContent([...content, newContent]);
        setShowModal(false);
        setFormData({ title: '', description: '', type: 'blog', published: false });
      }
    } catch (error) {
      console.error('Error adding content:', error);
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
    <AdminLayout currentPage="content">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Content Management</h1>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add New Content
          </Button>
        </div>

        {content.length === 0 ? (
          <EmptyState
            title="No content items yet"
            description="Start by creating your first content"
            action={{
              label: 'Create First Content',
              onClick: () => setShowModal(true),
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {content.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-800">{item.title}</td>
                    <td className="px-6 py-3 text-sm text-gray-800 capitalize">{item.type}</td>
                    <td className="px-6 py-3 text-sm">
                      <Badge variant={item.published ? 'success' : 'warning'}>
                        {item.published ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-800">
                      {new Date(item.created_at).toLocaleDateString()}
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

      <Modal isOpen={showModal} title="Add New Content" onClose={() => setShowModal(false)}>
        <form onSubmit={(e) => { e.preventDefault(); handleAddContent(); }} className="space-y-4">
          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
            label="Type"
            name="type"
            type="select"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={[
              { value: 'blog', label: 'Blog' },
              { value: 'page', label: 'Page' },
              { value: 'service', label: 'Service' },
            ]}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-700">
              Publish immediately
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" className="flex-1">
              Add Content
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
