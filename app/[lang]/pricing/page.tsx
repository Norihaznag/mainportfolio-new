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
  red: 'ring-red-600',
};

const colorBgClasses: { [key: string]: string } = {
  blue: 'from-blue-50 to-blue-100 border-blue-200',
  green: 'from-green-50 to-green-100 border-green-200',
  purple: 'from-purple-50 to-purple-100 border-purple-200',
  orange: 'from-orange-50 to-orange-100 border-orange-200',
  red: 'from-red-50 to-red-100 border-red-200',
};

export default async function Pricing({ params }: PricingProps) {
  const { lang } = await params;

  const content = {
    en: {
      title: 'Clear and Simple Pricing',
      subtitle: 'Choose the package that suits your business and start your digital journey with us',
      drh: 'DRH',
      orderButton: 'Order Now',
    },
    fr: {
      title: 'Tarifs Clairs et Simples',
      subtitle: 'Choisissez le forfait qui convient à votre entreprise et commencez votre voyage numérique avec nous',
      drh: 'DRH',
      orderButton: 'Commander Maintenant',
    },
    ar: {
      title: 'أثمنة واضحة وبلا تعقيد',
      subtitle: 'اختار الباقة اللي مناسبة ليك وبدا الرحلة الرقمية ديالك معنا',
      drh: 'درهم',
      orderButton: 'اطلب الآن',
    },
  };

  const t = content[lang as keyof typeof content] || content.ar;

  // Fetch pricing from the database
  let packages = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/public/pricing`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    packages = data.pricing || [];
  } catch (error) {
    console.error('Error fetching pricing:', error);
    packages = [];
  }

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
          {packages.length === 0 ? (
            <div className="text-center text-gray-600 py-12">
              <p>No pricing packages available at the moment.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 ${packages.length === 1 ? 'grid-cols-1' : packages.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
              {packages.map((pkg: any, index: number) => (
                <Card
                  key={pkg.id}
                  className={`flex flex-col h-full bg-gradient-to-br ${colorBgClasses[pkg.color] || colorBgClasses.blue} ${
                    pkg.featured ? `ring-2 ${colorClasses[pkg.color] || colorClasses.blue} transform lg:scale-105` : ''
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {pkg.name}
                    </h3>
                    <p className="text-4xl font-bold text-gray-800 mb-2">
                      {pkg.price.toLocaleString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US')}
                    </p>
                    <p className="text-gray-600">{t.drh}</p>
                  </div>
                  <div className="flex-1">
                    {pkg.description && (
                      <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
                    )}
                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="space-y-3 mb-6">
                        {pkg.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                            <span className="text-gray-800 font-bold">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <Button href={`/${lang}/order`} className="w-full">
                    {t.orderButton}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
