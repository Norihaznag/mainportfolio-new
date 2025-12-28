import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

interface HowItWorksProps {
  params: Promise<{
    lang: 'en' | 'fr' | 'ar';
  }>;
}

export default async function HowItWorks({ params }: HowItWorksProps) {
  const { lang } = await params;

  const content = {
    en: {
      title: 'Simple and Reliable Process',
      subtitle: 'We follow a clear and organized approach to ensure the best results',
      step1: 'Contact Us',
      step1Desc: 'Tell us about your needs and use WhatsApp to communicate',
      step2: 'Design',
      step2Desc: 'We design your website according to your needs and budget',
      step3: 'Development',
      step3Desc: 'We build your website with the latest technologies',
      step4: 'Launch',
      step4Desc: 'We launch your website and give you all the help you need',
      whatYouGet: 'What You Get',
      features: ['Fast and Secure Website', '100% Mobile Compatible', 'SEO Optimized', 'Professional Support'],
    },
    fr: {
      title: 'Processus Simple et Fiable',
      subtitle: 'Nous suivons une approche claire et organisée pour assurer les meilleurs résultats',
      step1: 'Contactez-nous',
      step1Desc: 'Parlez-nous de vos besoins et utilisez WhatsApp pour communiquer',
      step2: 'Conception',
      step2Desc: 'Nous concevons votre site Web selon vos besoins et votre budget',
      step3: 'Développement',
      step3Desc: 'Nous construisons votre site Web avec les dernières technologies',
      step4: 'Lancement',
      step4Desc: 'Nous lançons votre site Web et vous donnons toute l\'aide dont vous avez besoin',
      whatYouGet: 'Ce que Vous Obtenez',
      features: ['Site Web Rapide et Sécurisé', '100% Compatible Mobile', 'Optimisé pour le SEO', 'Support Professionnel'],
    },
    ar: {
      title: 'كيفاش كنخدمو',
      subtitle: 'كنتبّعو خطوات واضحة ومنظمة باش نعطيوك أحسن نتيجة ممكنة',
      step1: 'نهضرو معاك',
      step1Desc: 'كنجلسو معاك باش نفهمو المشروع ديالك وشنو باغي توصل به.',
      step2: 'التصميم والتخطيط',
      step2Desc: 'كنصممو الهيكل ديال الموقع ونشاركو معاك التصور قبل ما نبداو.',
      step3: 'تطوير الموقع',
      step3Desc: 'كنبرمجو الموقع ديالك باستعمال أحدث التقنيات.',
      step4: 'الإطلاق',
      step4Desc: 'كنجربو الموقع مزيان ومن بعد كنطلقوه للعموم.',
      whatYouGet: 'شنوه اللي غادي تجيبو',
      features: ['أداء سريع وحماية مزيانة', 'متوافق مع الهاتف 100%', 'محسّن لمحركات البحث (SEO)', 'دعم تقني احترافي'],
    },
  };

  const t = content[lang as keyof typeof content] || content.ar;

  const steps = [
    { step: 1, title: t.step1, description: t.step1Desc },
    { step: 2, title: t.step2, description: t.step2Desc },
    { step: 3, title: t.step3, description: t.step3Desc },
    { step: 4, title: t.step4, description: t.step4Desc },
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
            {t.whatYouGet}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.features.map((feature) => (
              <Card key={feature}>
                <div className="flex gap-4">
                  <span className="text-2xl text-blue-600 font-bold">✓</span>
                  <p className="text-lg text-gray-700">{feature}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <Button href={`/${lang}/order`} variant="secondary" size="lg">
            Order Now
          </Button>
        </div>
      </section>
    </div>
  );
}
