import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { translations } from '@/lib/translations';
import type { Language } from '@/lib/translations';

interface PricingProps {
  params: Promise<{
    lang: Language;
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
const packageConfig = [
  { id: 1, key: 'starter', price: 999, color: 'blue', featured: false },
  { id: 2, key: 'professional', price: 1999, color: 'green', featured: true },
  { id: 3, key: 'enterprise', price: 3999, color: 'purple', featured: false },
  { id: 4, key: 'custom', price: null, color: 'orange', featured: false },
];

export default async function Pricing({ params }: PricingProps) {
  const { lang } = await params;
  const t = translations[lang] || translations.ar;

  const pricingContent = t.pricing;
  const packages = packageConfig.map((config) => {
    const pkg = pricingContent.packages[config.key as keyof typeof pricingContent.packages];
    return {
      ...config,
      ...pkg,
    };
  });

  return (
    <div>
      {/* Header */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {pricingContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            {pricingContent.subtitle}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
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
                      <p className="text-gray-600">{pricingContent.drh}</p>
                    </>
                  ) : (
                    <p className="text-3xl font-bold text-gray-700 mb-2">{pricingContent.customPrice}</p>
                  )}
                </div>
                <p className={`text-gray-600 mb-6 text-sm ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {pkg.description}
                </p>
                <div className="flex-1">
                  <ul className={`space-y-3 mb-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {pkg.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                        {lang === 'ar' ? (
                          <>
                            <span>{feature}</span>
                            <span className="text-gray-800 font-bold">✓</span>
                          </>
                        ) : (
                          <>
                            <span className="text-gray-800 font-bold">✓</span>
                            <span>{feature}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button href={`/${lang}/order`} className="w-full">
                  {pkg.price ? pricingContent.orderButton : pricingContent.customPrice}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
