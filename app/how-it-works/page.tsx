import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export const metadata = {
  title: 'كيفاش كتشتغل - Azinag',
  description: 'شوف عملية تطوير موقعك خطوة بخطوة',
};

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: 'الاستشارة الأولية',
      description:
        'نتحدث معك عن أهدافك واحتياجاتك. نفهم عملك وما تريد تحقيقه من الموقع.',
      duration: 'اليوم الأول',
    },
    {
      step: 2,
      title: 'التصميم والتخطيط',
      description:
        'نقوم بتصميم الموقع وإنشء خطة العمل. نعرض عليك التصاميم لنتأكد من رضاك.',
      duration: 'الأيام 2-5',
    },
    {
      step: 3,
      title: 'التطوير والبناء',
      description:
        'نقوم بكتابة الأكواد وبناء الموقع بأحدث التقنيات والممارسات الفضلى.',
      duration: 'الأيام 6-12',
    },
    {
      step: 4,
      title: 'الاختبار والإطلاق',
      description:
        'نختبر الموقع على جميع الأجهزة والمتصفحات ثم نطلقه للعالم.',
      duration: 'الأيام 13-14',
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            عملية بسيطة وموثوق
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            رانا ندازو شي واضح ومنظم باش نتر ليك أحسن نتيجة
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 max-w-4xl mx-auto">
            {steps.map((item, idx) => (
              <div key={item.step} className="flex gap-6 sm:gap-8">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold">
                    {item.step}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-0.5 h-20 bg-blue-200 ml-8 mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-lg">
                    {item.description}
                  </p>
                  <p className="text-sm font-semibold text-blue-600">
                    ⏱️ {item.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-20 sm:py-32 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            ماذا تحصل عليه؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              '✓ موقع سريع وآمن',
              '✓ متوافق مع الهاتف بنسبة 100%',
              '✓ محسّن لمحركات البحث',
              '✓ دعم فني احترافي',
              '✓ تدريب على استخدام الموقع',
              '✓ ضمان الرضا',
              '✓ تحديثات مجانية',
              '✓ نسخة احتياطية يومية',
            ].map((item, idx) => (
              <Card key={idx}>
                <p className="text-lg text-gray-900 font-semibold">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            لماذا نحن؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'خبرة محلية',
                description:
                  'نفهم السوق المغربية واحتياجات عملائك المحليين',
              },
              {
                title: 'أسعار عادلة',
                description:
                  'أسعار منافسة بدون تخفيف الجودة أو الخدمة',
              },
              {
                title: 'دعم مستمر',
                description:
                  'نبقى معك بعد الإطلاق لضمان نجاح موقعك',
              },
            ].map((item, idx) => (
              <Card key={idx}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            هل أنت مستعد لبدء المشروع؟
          </h2>
          <Button href="/order" size="lg">
            اطلب موقعك الآن
          </Button>
        </div>
      </section>
    </div>
  );
}
