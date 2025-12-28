import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              موقع ويب احترافي لعملك
              <br />
              <span className="text-blue-600">بأسعار معقولة</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              نحن نبني مواقع ويب وتطبيقات سريعة وفعالة للشركات المغربية. من المطاعم إلى المدارس، لدينا الحل المناسب لك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/order" size="lg">
                اطلب موقعك الآن
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                عرض الأسعار
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 sm:py-20 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              موثوق من قبل الشركات المغربية
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">+50</p>
              <p className="text-gray-600">مشروع مكتمل</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">+40</p>
              <p className="text-gray-600">عميل راضٍ</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">95+</p>
              <p className="text-gray-600">تقييم الأداء</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            كيف يعمل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'اتصل بنا',
                description: 'تحدث معنا عن احتياجاتك واستخدم WhatsApp للتواصل',
              },
              {
                step: '2',
                title: 'تصميم',
                description: 'نقوم بتصميم موقعك حسب احتياجاتك وميزانيتك',
              },
              {
                step: '3',
                title: 'التطوير',
                description: 'نقوم ببناء موقعك بأحدث التقنيات',
              },
              {
                step: '4',
                title: 'الإطلاق',
                description: 'نطلق موقعك ونعطيك كل المساعدة التي تحتاجها',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 sm:py-32 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            خدماتنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'مواقع الشركات',
                description: 'موقع احترافي يعكس قيمة عملك',
              },
              {
                title: 'مواقع المطاعم',
                description: 'قوائم رقمية وحجوزات سهلة',
              },
              {
                title: 'متاجر إلكترونية',
                description: 'بيع منتجاتك عبر الإنترنت',
              },
              {
                title: 'تطبيقات مخصصة',
                description: 'حل تقني مخصص لاحتياجاتك',
              },
            ].map((service, idx) => (
              <Card key={idx}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center bg-blue-50 p-12 rounded-xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              هل أنت مستعد؟
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              احصل على موقع احترافي اليوم وابدأ بيع منتجاتك وخدماتك أون لاين
            </p>
            <Button href="/order" size="lg">
              ابدأ الآن
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
