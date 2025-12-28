import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

interface PricingProps {
  params: Promise<{
    lang: 'en' | 'fr' | 'ar';
  }>;
}

export default async function Pricing({ params }: PricingProps) {
  const { lang } = await params;

  const content = {
    en: {
      title: 'Clear and Simple Pricing',
      subtitle: 'Choose the package that suits your business and start your digital journey with us',
      companyWebsite: 'Company Website',
      restaurantWebsite: 'Restaurant Website',
      ecommerce: 'E-commerce Store',
      customApp: 'Custom App',
      daysDelivery: 'Delivery in',
      days: 'days',
      drh: 'DRH',
    },
    fr: {
      title: 'Tarifs Clairs et Simples',
      subtitle: 'Choisissez le forfait qui convient à votre entreprise et commencez votre voyage numérique avec nous',
      companyWebsite: 'Site Web Professionnel',
      restaurantWebsite: 'Site Web Restauration',
      ecommerce: 'Boutique en Ligne',
      customApp: 'Application Personnalisée',
      daysDelivery: 'Livraison en',
      days: 'jours',
      drh: 'DRH',
    },
    ar: {
      title: 'أثمنة واضحة وبلا تعقيد',
      subtitle: 'اختار الباقة اللي مناسبة ليك وبدا الرحلة الرقمية ديالك معنا',
      companyWebsite: 'موقع شركة',
      restaurantWebsite: 'موقع ديال مطعم',
      ecommerce: 'متجر إلكتروني',
      customApp: 'تطبيق مفصّل على قياسك',
      daysDelivery: 'التسليم فـ',
      days: 'يوم',
      drh: 'درهم',
    },
  };

  const t = content[lang as keyof typeof content] || content.ar;

  const packages = [
    {
      name: t.companyWebsite,
      price: 4999,
      deliveryDays: 14,
      features: [
        lang === 'ar' ? 'موقع احترافي مع تصميم حديث' : lang === 'fr' ? 'Site professionnel avec design moderne' : 'Professional website with modern design',
        lang === 'ar' ? 'متوافق 100% مع الهاتف' : lang === 'fr' ? '100% compatible mobile' : '100% mobile compatible',
        lang === 'ar' ? 'محسّن لمحركات البحث (SEO)' : lang === 'fr' ? 'Optimisé pour les moteurs de recherche' : 'SEO optimized',
        lang === 'ar' ? 'نموذج اتصال' : lang === 'fr' ? 'Formulaire de contact' : 'Contact form',
        lang === 'ar' ? 'ربط وسائل التواصل' : lang === 'fr' ? 'Liens réseaux sociaux' : 'Social media links',
        lang === 'ar' ? 'دعم تقني لمدة سنة' : lang === 'fr' ? 'Support technique 1 an' : '1 year technical support',
      ],
    },
    {
      name: t.restaurantWebsite,
      price: 5999,
      deliveryDays: 14,
      features: [
        lang === 'ar' ? 'كل ميزات موقع الشركة' : lang === 'fr' ? 'Toutes les fonctionnalités du site professionnel' : 'All company website features',
        lang === 'ar' ? 'قائمة طعام رقمية' : lang === 'fr' ? 'Menu numérique' : 'Digital menu system',
        lang === 'ar' ? 'نظام حجز الطاولات' : lang === 'fr' ? 'Système de réservation' : 'Reservation system',
        lang === 'ar' ? 'عرض الموقع على الخريطة' : lang === 'fr' ? 'Affichage sur Google Maps' : 'Google Maps integration',
        lang === 'ar' ? 'عرض ساعات العمل' : lang === 'fr' ? 'Affichage des heures d\'ouverture' : 'Business hours display',
        lang === 'ar' ? 'معرض صور للطعام' : lang === 'fr' ? 'Galerie de photos de plats' : 'Food photo gallery',
      ],
      highlighted: true,
    },
    {
      name: t.ecommerce,
      price: 7999,
      deliveryDays: 21,
      features: [
        lang === 'ar' ? 'متجر إلكتروني كامل' : lang === 'fr' ? 'Boutique en ligne complète' : 'Complete e-commerce store',
        lang === 'ar' ? 'نظام إدارة المنتجات' : lang === 'fr' ? 'Gestion des produits' : 'Product management system',
        lang === 'ar' ? 'سلة تسوق وخروج آمن' : lang === 'fr' ? 'Panier et paiement sécurisé' : 'Secure shopping cart & checkout',
        lang === 'ar' ? 'تكامل البوابات المالية' : lang === 'fr' ? 'Intégration des passerelles de paiement' : 'Payment gateway integration',
        lang === 'ar' ? 'نظام إدارة الطلبات' : lang === 'fr' ? 'Gestion des commandes' : 'Order management system',
        lang === 'ar' ? 'تقارير المبيعات' : lang === 'fr' ? 'Rapports de ventes' : 'Sales reports & analytics',
      ],
    },
    {
      name: t.customApp,
      price: 12999,
      deliveryDays: 30,
      features: [
        lang === 'ar' ? 'تطبيق مخصص حسب احتياجاتك' : lang === 'fr' ? 'Application personnalisée selon vos besoins' : 'Custom application tailored to your needs',
        lang === 'ar' ? 'ميزات متقدمة مخصصة' : lang === 'fr' ? 'Fonctionnalités avancées personnalisées' : 'Advanced custom features',
        lang === 'ar' ? 'لوحة تحكم متقدمة' : lang === 'fr' ? 'Tableau de bord avancé' : 'Advanced admin dashboard',
        lang === 'ar' ? 'تكامل قواعد البيانات' : lang === 'fr' ? 'Intégration de bases de données' : 'Database integration',
        lang === 'ar' ? 'واجهة برمجية (API)' : lang === 'fr' ? 'Interface de programmation (API)' : 'API integration',
        lang === 'ar' ? 'دعم تقني ممتد' : lang === 'fr' ? 'Support technique étendu' : 'Extended technical support',
      ],
    },
  ];

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
                    {pkg.price.toLocaleString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US')}
                  </p>
                  <p className="text-gray-600">{t.drh}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {t.daysDelivery} {pkg.deliveryDays} {t.days}
                  </p>
                </div>
                <div className="flex-1">
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-600">
                        <span className="text-blue-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button href={`/${lang}/order`} className="w-full">
                  Order
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
