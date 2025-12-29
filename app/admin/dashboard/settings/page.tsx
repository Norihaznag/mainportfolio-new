'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import Card from '@/components/admin/Card';
import Button from '@/components/admin/Button';
import FormField from '@/components/admin/FormField';

export default function SettingsPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    whatsapp_number: '',
    whatsapp_message: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/check');
        if (res.ok) {
          setIsLoggedIn(true);
          await fetchSettings();
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

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings/whatsapp');
      if (res.ok) {
        const data = await res.json();
        setFormData({
          whatsapp_number: data.whatsapp_number || '',
          whatsapp_message: data.whatsapp_message || '',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/settings/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('WhatsApp settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Failed to save settings: ${data.error || data.message}`);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage(`Error saving settings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
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
    <AdminLayout currentPage="settings">
      <div className="space-y-6">
        <Card>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Site Settings</h1>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">WhatsApp Configuration</h2>

            {message && (
              <div className={`p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {message}
              </div>
            )}

            <FormField
              label="WhatsApp Phone Number"
              name="whatsapp_number"
              placeholder="+212612345678"
              value={formData.whatsapp_number}
              onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
              required
            />

            <FormField
              label="Default WhatsApp Message"
              name="whatsapp_message"
              type="textarea"
              placeholder="Enter the default message to be sent via WhatsApp"
              value={formData.whatsapp_message}
              onChange={(e) => setFormData({ ...formData, whatsapp_message: e.target.value })}
            />

            <p className="text-sm text-gray-600">
              The phone number should be in international format (e.g., +212612345678). 
              The message will be used as the default text when users click the WhatsApp button.
            </p>

            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-4">WhatsApp Integration Preview</h2>
          {formData.whatsapp_number && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700 mb-4">
                WhatsApp Number: <span className="font-semibold text-green-700">{formData.whatsapp_number}</span>
              </p>
              {formData.whatsapp_message && (
                <p className="text-sm text-gray-700 mb-4">
                  Message: <span className="font-semibold text-green-700">{formData.whatsapp_message}</span>
                </p>
              )}
              <a
                href={`https://wa.me/${formData.whatsapp_number.replace('+', '')}?text=${encodeURIComponent(formData.whatsapp_message || 'Hello')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold"
              >
                Test WhatsApp Link
              </a>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
