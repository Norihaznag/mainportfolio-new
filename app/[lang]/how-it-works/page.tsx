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
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(37, 99, 235, 0);
          }
        }

        .animate-slide-in {
          animation: slideInUp 0.6s ease-out forwards;
        }

        .animate-fade-scale {
          animation: fadeInScale 0.5s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .step-icon {
          font-size: 3rem;
          animation: float 3s ease-in-out infinite;
          display: block;
        }

        .feature-item {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .feature-item:nth-child(1) { animation-delay: 0.1s; }
        .feature-item:nth-child(2) { animation-delay: 0.2s; }
        .feature-item:nth-child(3) { animation-delay: 0.3s; }
        .feature-item:nth-child(4) { animation-delay: 0.4s; }

        .progress-indicator {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5rem;
          position: relative;
          padding: 2rem 0;
        }

        .progress-indicator::before {
          content: '';
          position: absolute;
          top: 3rem;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2563eb 0%, #60a5fa 50%, #dbeafe 100%);
          z-index: 0;
        }

        .progress-dot {
          width: 4rem;
          height: 4rem;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border-radius: 50%;
          z-index: 10;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          box-shadow: 0 0 25px rgba(37, 99, 235, 0.5);
          animation: fadeInScale 0.6s ease-out;
          transition: all 0.3s ease;
        }

        .progress-dot:hover {
          transform: scale(1.15);
          box-shadow: 0 0 35px rgba(37, 99, 235, 0.8);
        }

        .progress-dot:nth-child(1) { animation-delay: 0s; }
        .progress-dot:nth-child(3) { animation-delay: 0.2s; }
        .progress-dot:nth-child(5) { animation-delay: 0.4s; }
        .progress-dot:nth-child(7) { animation-delay: 0.6s; }

        .connector-arrow {
          position: absolute;
          top: 2.5rem;
          z-index: 1;
          color: #2563eb;
          font-size: 1.5rem;
          animation: slideDown 0.8s ease-out forwards;
          opacity: 0;
        }

        .connector-arrow:nth-child(2) { left: 17%; animation-delay: 0.4s; }
        .connector-arrow:nth-child(4) { left: 45%; animation-delay: 0.6s; }
        .connector-arrow:nth-child(6) { left: 73%; animation-delay: 0.8s; }

        .timeline-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .timeline-item {
          text-align: center;
          padding: 1.5rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%);
          transition: all 0.3s ease;
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .timeline-item:nth-child(1) { animation-delay: 0.2s; }
        .timeline-item:nth-child(2) { animation-delay: 0.3s; }
        .timeline-item:nth-child(3) { animation-delay: 0.4s; }
        .timeline-item:nth-child(4) { animation-delay: 0.5s; }

        .timeline-item:hover {
          transform: translateY(-10px);
          background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
          box-shadow: 0 15px 35px rgba(37, 99, 235, 0.15);
        }

        @media (max-width: 768px) {
          .progress-indicator {
            margin-bottom: 2rem;
            flex-wrap: wrap;
            padding: 1rem 0;
          }

          .progress-indicator::before {
            display: none;
          }

          .connector-arrow {
            display: none;
          }

          .timeline-content {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .progress-dot {
            width: 3rem;
            height: 3rem;
            font-size: 0.9rem;
            flex: 0 0 calc(25% - 0.25rem);
            margin-bottom: 1rem;
          }

          .timeline-item {
            padding: 1rem;
          }
        }
      `}</style>

      {/* Header */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-slide-in">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-in" style={{ animationDelay: '0.2s' }}>
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Steps with Infographic */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Timeline Infographic */}
          <div className="max-w-6xl mx-auto">
            {/* Step Details */}
            <div className="timeline-content">
              {steps.map((item) => (
                <div key={item.step} className="timeline-item feature-item">
                  <div className="mb-4 flex justify-center">
                    <span className="step-icon">{item.icon}</span>
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
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-20 sm:py-32 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center animate-slide-in">
            {t.whatYouGet}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.features.map((feature, idx) => (
              <div key={feature} className="feature-item">
                <Card>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold animate-fade-scale" style={{ animationDelay: `${idx * 0.1}s` }}>
                        ✓
                      </div>
                    </div>
                    <p className="text-lg text-gray-700 pt-1">{feature}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 animate-slide-in">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-slide-in" style={{ animationDelay: '0.2s' }}>
            Let&apos;s transform your business with a professional website
          </p>
          <Button href={`/${lang}/order`} variant="secondary" size="lg" className="animate-fade-scale" style={{ animationDelay: '0.4s' }}>
            Order Now
          </Button>
        </div>
      </section>
    </div>
  );
}
