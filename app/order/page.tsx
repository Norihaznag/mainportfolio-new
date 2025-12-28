'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/actions';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Card } from '@/components/Card';

const websiteTypes = [
  { value: 'website', label: 'موقع شركة' },
  { value: 'restaurant', label: 'موقع مطعم' },
  { value: 'ecommerce', label: 'متجر إلكتروني' },
  { value: 'app', label: 'تطبيق' },
  { value: 'custom', label: 'مخصص' },
];

const businessTypes = [
  { value: 'restaurant', label: 'مطعم / كافيه' },
  { value: 'cafe', label: 'مقهى' },
  { value: 'school', label: 'مدرسة' },
  { value: 'shop', label: 'متجر' },
  { value: 'service', label: 'خدمات' },
  { value: 'other', label: 'أخرى' },
];

const languages = [
  { value: 'ar', label: 'العربية' },
  { value: 'fr', label: 'الفرنسية' },
  { value: 'en', label: 'الإنجليزية' },
];

const prices: { [key: string]: number } = {
  website: 4999,
  restaurant: 5999,
  ecommerce: 7999,
  app: 12999,
  custom: 10000,
};

export default function OrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [websiteType, setWebsiteType] = useState('');

  const currentPrice = websiteType ? prices[websiteType] || 4999 : 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await createOrder({
      business_name: formData.get('businessName'),
      business_type: formData.get('businessType'),
      contact_name: formData.get('contactName'),
      whatsapp_number: formData.get('whatsappNumber'),
      email: formData.get('email'),
      website_type: formData.get('websiteType'),
      language: formData.get('language'),
      notes: formData.get('notes'),
      price: currentPrice,
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } else {
      setError(result.error || 'حدث خطأ ما');
    }
  }

  if (success) {
    return (
      <div className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto text-center">
            <div className="text-5xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              تم استقبال طلبك!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              شكراً لك! سنتواصل معك قريباً عبر WhatsApp والبريد الإلكتروني.
            </p>
            <p className="text-gray-500">إعادة التوجيه...</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            اطلب موقعك الآن
          </h1>
          <p className="text-gray-600 text-center mb-12">
            ملء النموذج أدناه وسنتواصل معك في أقرب وقت
          </p>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {/* Business Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  معلومات الشركة
                </h3>
                <div className="space-y-4">
                  <Input
                    label="اسم الشركة"
                    name="businessName"
                    required
                    placeholder="مثل: مطعم السعادة"
                  />
                  <Select
                    label="نوع النشاط"
                    name="businessType"
                    options={businessTypes}
                    required
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  بيانات التواصل
                </h3>
                <div className="space-y-4">
                  <Input
                    label="اسمك"
                    name="contactName"
                    required
                    placeholder="احمد محمد"
                  />
                  <Input
                    label="رقم WhatsApp"
                    name="whatsappNumber"
                    type="tel"
                    required
                    placeholder="+212661234567"
                  />
                  <Input
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Website Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  تفاصيل المشروع
                </h3>
                <div className="space-y-4">
                  <Select
                    label="نوع الموقع"
                    name="websiteType"
                    options={websiteTypes}
                    required
                    onChange={(e) => setWebsiteType(e.target.value)}
                  />
                  <Select
                    label="اللغة"
                    name="language"
                    options={languages}
                    required
                  />
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      ملاحظات إضافية
                    </label>
                    <textarea
                      name="notes"
                      placeholder="أخبرنا عن احتياجاتك وأفكارك..."
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">السعر المتوقع:</span>
                  <span className="text-3xl font-bold text-blue-600">
                    {currentPrice.toLocaleString('ar-MA')} درهم
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  قد يتغير السعر حسب احتياجاتك الخاصة
                </p>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1"
                />
                <span className="text-sm text-gray-600">
                  أوافق على
                  <a href="#" className="text-blue-600 hover:underline">
                    {' '}
                    شروط الخدمة{' '}
                  </a>
                  و
                  <a href="#" className="text-blue-600 hover:underline">
                    {' '}
                    سياسة الخصوصية
                  </a>
                </span>
              </label>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'جاري الإرسال...' : 'أرسل الطلب'}
              </Button>
            </form>
          </Card>

          <p className="text-center text-gray-600 mt-8">
            تفضل بالتواصل معنا مباشرة عبر WhatsApp للأسئلة الفورية
          </p>
        </div>
      </div>
    </div>
  );
}
