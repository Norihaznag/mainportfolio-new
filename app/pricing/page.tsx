import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export const metadata = {
  title: 'الثمن - Azinag',
  description: 'شوف الباقات ديالنا للمواقع والتطبيقات',
};

export default function Pricing() {
  const packages = [
    {
      name: 'موقع الشركة',
      price: 4999,
      deliveryDays: 14,
      features: [
        'موقع احترافي ديال شركتك',
        '5 صفحات',
        'تصميم عصري وحديث',
        'يشتغل بحال على التليفون',
        'بريد إلكتروني احترافي',
        'دعم فني 3 شهور',
      ],
    },
    {
      name: 'موقع ديال مطعم',
      price: 5999,
      deliveryDays: 14,
      features: [
        'موقع كامل',
        'قائمة رقمية الأكلات',
        'نظام الحجز',
        'واتساب مدموج',
        'صور الأطباق الجميلة',
        'دعم فني 6 شهور',
      ],
      highlighted: true,
    },
    {
      name: 'متجر على الإنترنت',
      price: 7999,
      deliveryDays: 21,
      features: [
        'متجر كامل',
        'نظام الدفع آمن',
        'إدارة المنتجات',
        'فواتير تلقائية',
        'إحصائيات المبيعات',
        'دعم فني سنة كاملة',
      ],
    },
    {
      name: 'تطبيق خاص بيك',
      price: 12999,
      deliveryDays: 30,
      features: [
        'تطبيق أندرويد + iPhone',
        'سيرفر خاص بيك',
        'قاعدة بيانات آمنة',
        'نظام إدارة متقدم',
        'تحديثات مجانية',
        'دعم فني سنة كاملة',
      ],
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            الثمن واضح وبسيط
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اختار الباقة اللي تناسب عملك وابدا معنا الحيط الرقمية
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`flex flex-col h-full ${
                  pkg.highlighted ? 'ring-2 ring-blue-600 transform lg:scale-105' : ''
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {pkg.name}
                  </h3>
                  <p className="text-4xl font-bold text-blue-600 mb-2">
                    {pkg.price.toLocaleString('ar-MA')}
                  </p>
                  <p className="text-gray-600">درهم</p>
                  <p className="text-sm text-gray-500 mt-2">
                    التسليم في {pkg.deliveryDays} يوم
                  </p>
                </div>

                <div className="flex-1">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="text-blue-600 font-bold mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button href="/order" className="w-full">
                  اطلب الآن
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            أسئلة شائعة
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                q: 'هل يمكن تعديل الموقع بعد الانتهاء؟',
                a: 'نعم، نوفر دعم مجاني لتعديلات بسيطة لمدة 3 أشهر',
              },
              {
                q: 'ماذا لو احتجت ميزات إضافية؟',
                a: 'يمكنك إضافة ميزات إضافية بسعر منفصل حسب التعقيد',
              },
              {
                q: 'هل الموقع متوافق مع الهاتف؟',
                a: 'جميع مواقعنا متوافقة تماماً مع جميع الأجهزة والشاشات',
              },
              {
                q: 'هل تشمل الأسعار اسم النطاق والاستضافة؟',
                a: 'لا، يتم تحديد تكاليف النطاق والاستضافة بشكل منفصل',
              },
            ].map((faq, idx) => (
              <Card key={idx}>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h4>
                <p className="text-gray-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
