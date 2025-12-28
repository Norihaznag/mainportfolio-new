import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

interface HomeProps {
  params: Promise<{
    lang: 'en' | 'fr' | 'ar';
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;

  const content = {
    en: {
      heroTitle: 'Professional Website For Your Business',
      heroHighlight: 'At Affordable Prices',
      heroDesc: 'We build fast and effective websites and applications for Moroccan businesses. From restaurants to schools, we have the right solution for you.',
      ctaPrimary: 'Order Your Website Now',
      ctaSecondary: 'View Pricing',
      social: 'Trusted by Moroccan Companies',
      projects: 'Completed Projects',
      clients: 'Satisfied Clients',
      rating: 'Performance Rating',
      howTitle: 'How It Works',
      step1: 'Contact Us',
      step1Desc: 'Tell us about your needs',
      step2: 'Design',
      step2Desc: 'We design your website',
      step3: 'Development',
      step3Desc: 'We build your website',
      step4: 'Launch',
      step4Desc: 'We launch your website',
    },
    fr: {
      heroTitle: 'Site Web Professionnel Pour Votre Entreprise',
      heroHighlight: 'À Prix Abordable',
      heroDesc: 'Nous construisons des sites web et des applications rapides et efficaces pour les entreprises marocaines.',
      ctaPrimary: 'Commandez Votre Site Web',
      ctaSecondary: 'Voir les Tarifs',
      social: 'Approuvé par les Entreprises Marocaines',
      projects: 'Projets Complétés',
      clients: 'Clients Satisfaits',
      rating: 'Note de Performance',
      howTitle: 'Comment ça marche',
      step1: 'Contactez-nous',
      step1Desc: 'Parlez-nous de vos besoins',
      step2: 'Conception',
      step2Desc: 'Nous concevons votre site',
      step3: 'Développement',
      step3Desc: 'Nous construisons votre site',
      step4: 'Lancement',
      step4Desc: 'Nous lançons votre site',
    },
    ar: {
      heroTitle: 'موقع ويب احترافي لعملك',
      heroHighlight: 'بثمن معقول',
      heroDesc: 'رانا نبنيو لك مواقع ويب وتطبيقات سريعة وفعالة للشركات المغربية.',
      ctaPrimary: 'طلب موقعك الآن',
      ctaSecondary: 'شوف الثمن',
      social: 'موثوق من قبل الشركات المغربية',
      projects: 'مشروع مكتمل',
      clients: 'عميل راضٍ',
      rating: 'تقييم الأداء',
      howTitle: 'عملية بسيطة وموثوق',
      step1: 'لقائنا بيك',
      step1Desc: 'نتحداو معاك',
      step2: 'الديزاين',
      step2Desc: 'رانا نرسمو لك',
      step3: 'البناء',
      step3Desc: 'رانا نبنيو لك',
      step4: 'الإطلاق',
      step4Desc: 'رانا نطلقو لك',
    },
  };

  const t = content[lang];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.heroTitle}
              <br />
              <span className="text-blue-600">{t.heroHighlight}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={`/${lang}/order`} size="lg">
                {t.ctaPrimary}
              </Button>
              <Button href={`/${lang}/pricing`} variant="secondary" size="lg">
                {t.ctaSecondary}
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
              {t.social}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">+50</p>
              <p className="text-gray-600">{t.projects}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">+40</p>
              <p className="text-gray-600">{t.clients}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">95+</p>
              <p className="text-gray-600">{t.rating}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            {t.howTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: t.step1, description: t.step1Desc },
              { step: '2', title: t.step2, description: t.step2Desc },
              { step: '3', title: t.step3, description: t.step3Desc },
              { step: '4', title: t.step4, description: t.step4Desc },
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
    </div>
  );
}
