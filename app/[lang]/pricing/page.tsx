import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

interface PricingProps {
  params: Promise<{
    lang: 'en' | 'fr' | 'ar';
  }>;
}

const colorClasses: { [key: string]: string } = {
  blue: 'ring-blue-600',
  green: 'ring-green-600',
  purple: 'ring-purple-600',
  orange: 'ring-orange-600',
};

const colorBgClasses: { [key: string]: string } = {
  blue: 'from-blue-50 to-blue-100 border-blue-200',
  green: 'from-green-50 to-green-100 border-green-200',
  purple: 'from-purple-50 to-purple-100 border-purple-200',
  orange: 'from-orange-50 to-orange-100 border-orange-200',
};

// Static pricing packages
const staticPackages = [
  {
    id: 1,
    name: 'Starter',
    price: 999,
    color: 'blue',
    featured: false,
    description: 'Perfect for small businesses getting started',
    features: [
      'Professional Website',
      'Mobile Responsive',
      'Up to 5 Pages',
      'Contact Form',
      'Basic SEO',
      'SSL Certificate',
    ],
  },
  {
    id: 2,
    name: 'Professional',
    price: 1999,
    color: 'green',
    featured: true,
    description: 'Most popular for growing businesses',
    features: [
      'Everything in Starter',
      'Up to 10 Pages',
      'Blog Section',
      'Advanced SEO',
      'Google Analytics',
      'Email Support',
      'Monthly Updates',
    ],
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 3999,
    color: 'purple',
    featured: false,
    description: 'Complete solution for established companies',
    features: [
      'Everything in Professional',
      'Unlimited Pages',
      'E-commerce Features',
      'Payment Gateway',
      'Advanced Analytics',
      'Priority Support',
      'Custom Features',
    ],
  },
  {
    id: 4,
    name: 'Custom',
    price: null,
    color: 'orange',
    featured: false,
    description: 'Tailored solutions for unique needs',
    features: [
      'Fully Customized',
      'Your Requirements',
      'Your Timeline',
      'Dedicated Team',
      'Full Support',
      'Lifetime Updates',
    ],
  },
];

export default async function Pricing({ params }: PricingProps) {
  const { lang } = await params;

  const content = {
    en: {
      title: 'Clear and Simple Pricing',
      subtitle: 'Choose the package that suits your business and start your digital journey with us',
      drh: 'DRH',
      orderButton: 'Order Now',
      customPrice: 'Contact Us',
    },
    fr: {
      title: 'Tarifs Clairs et Simples',
      subtitle: 'Choisissez le forfait qui convient à votre entreprise et commencez votre voyage numérique avec nous',
      drh: 'DRH',
      orderButton: 'Commander Maintenant',
      customPrice: 'Contactez-nous',
    },
    ar: {
      title: 'أثمنة واضحة وبلا تعقيد',
      subtitle: 'اختار الباقة اللي مناسبة ليك وبدا الرحلة الرقمية ديالك معنا',
      drh: 'درهم',
      orderButton: 'اطلب الآن',
      customPrice: 'اتاصل معنا',
    },
  };

  const t = content[lang as keyof typeof content] || content.ar;

  return (
    <div>
      {/* Header */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-gradient-to-br ${colorBgClasses[pkg.color]} rounded-lg p-6 flex flex-col h-full border-2 ${
                  pkg.featured ? `${colorClasses[pkg.color]} shadow-lg` : 'border-gray-200 shadow-sm hover:shadow-md'
                } transition-shadow`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {pkg.name}
                  </h3>
                  {pkg.price ? (
                    <>
                      <p className="text-4xl font-bold text-gray-800 mb-2">
                        {pkg.price.toLocaleString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US')}
                      </p>
                      <p className="text-gray-600">{t.drh}</p>
                    </>
                  ) : (
                    <p className="text-3xl font-bold text-gray-700 mb-2">{t.customPrice}</p>
                  )}
                </div>
                <p className="text-gray-600 mb-6 text-sm">{pkg.description}</p>
                <div className="flex-1">
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                        <span className="text-gray-800 font-bold">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button href={`/${lang}/order`} className="w-full">
                  {pkg.price ? t.orderButton : t.customPrice}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
