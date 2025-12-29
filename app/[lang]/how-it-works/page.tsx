import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

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
      step1Icon: '💬',
      step2: 'Design',
      step2Desc: 'We design your website according to your needs and budget',
      step2Icon: '🎨',
      step3: 'Development',
      step3Desc: 'We build your website with the latest technologies',
      step3Icon: '⚙️',
      step4: 'Launch',
      step4Desc: 'We launch your website and give you all the help you need',
      step4Icon: '🚀',
      whatYouGet: 'What You Get',
      features: ['Fast and Secure Website', '100% Mobile Compatible', 'SEO Optimized', 'Professional Support'],
      ready: 'Ready to get started?',
      readyDesc: 'Let\'s transform your business with a professional website',
      orderBtn: 'Order Now',
    },
    fr: {
      title: 'Processus Simple et Fiable',
      subtitle: 'Nous suivons une approche claire et organisée pour assurer les meilleurs résultats',
      step1: 'Contactez-nous',
      step1Desc: 'Parlez-nous de vos besoins et utilisez WhatsApp pour communiquer',
      step1Icon: '💬',
      step2: 'Conception',
      step2Desc: 'Nous concevons votre site Web selon vos besoins et votre budget',
      step2Icon: '🎨',
      step3: 'Développement',
      step3Desc: 'Nous construisons votre site Web avec les dernières technologies',
      step3Icon: '⚙️',
      step4: 'Lancement',
      step4Desc: 'Nous lançons votre site Web et vous donnons toute l\'aide dont vous avez besoin',
      step4Icon: '🚀',
      whatYouGet: 'Ce que Vous Obtenez',
      features: ['Site Web Rapide et Sécurisé', '100% Compatible Mobile', 'Optimisé pour le SEO', 'Support Professionnel'],
      ready: 'Prêt à commencer?',
      readyDesc: 'Transformons votre entreprise avec un site Web professionnel',
      orderBtn: 'Commander Maintenant',
    },
    ar: {
      title: 'كيفاش كنخدمو',
      subtitle: 'كنتبّعو خطوات واضحة ومنظمة باش نعطيوك أحسن نتيجة ممكنة',
      step1: 'نهضرو معاك',
      step1Desc: 'كنجلسو معاك باش نفهمو المشروع ديالك وشنو باغي توصل به.',
      step1Icon: '💬',
      step2: 'التصميم والتخطيط',
      step2Desc: 'كنصممو الهيكل ديال الموقع ونشاركو معاك التصور قبل ما نبداو.',
      step2Icon: '🎨',
      step3: 'تطوير الموقع',
      step3Desc: 'كنبرمجو الموقع ديالك باستعمال أحدث التقنيات.',
      step3Icon: '⚙️',
      step4: 'الإطلاق',
      step4Desc: 'كنجربو الموقع مزيان ومن بعد كنطلقوه للعموم.',
      step4Icon: '🚀',
      whatYouGet: 'شنوه اللي غادي تجيبو',
      features: ['أداء سريع وحماية مزيانة', 'متوافق مع الهاتف 100%', 'محسّن لمحركات البحث (SEO)', 'دعم تقني احترافي'],
      ready: 'هاداك المجال؟',
      readyDesc: 'خصنا نحولو الشركة ديالك لقدام مع موقع احترافي',
      orderBtn: 'طلب دابا',
    },
  };

  const t = content[lang as keyof typeof content] || content.ar;

  const steps = [
    { step: 1, title: t.step1, description: t.step1Desc, icon: t.step1Icon },
    { step: 2, title: t.step2, description: t.step2Desc, icon: t.step2Icon },
    { step: 3, title: t.step3, description: t.step3Desc, icon: t.step3Icon },
    { step: 4, title: t.step4, description: t.step4Desc, icon: t.step4Icon },
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
      <section className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {steps.map((item) => (
              <div key={item.step} className="text-center p-6 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                <div className="mb-4 flex justify-center">
                  <span className="text-4xl block">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-32 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.whatYouGet}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.features.map((feature) => (
              <Card key={feature}>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                      ✓
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 pt-1">{feature}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t.ready}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.readyDesc}
          </p>
          <Button href={`/${lang}/order`} variant="secondary" size="lg">
            {t.orderBtn}
          </Button>
        </div>
      </section>
    </div>
  );
}
