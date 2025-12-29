import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { Card } from '@/components/Card';
import { seoMetadata } from '@/lib/seo-metadata';

interface HomeProps {
  params: Promise<{
    lang: 'en' | 'fr' | 'ar';
  }>;
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { lang } = await params;
  const meta = seoMetadata.pages.home[lang as keyof typeof seoMetadata.pages.home] || seoMetadata.pages.home.ar;

  return {
    title: meta?.title || 'Azinag',
    description: meta?.description || 'Professional websites for Moroccan businesses',
    keywords: meta?.keywords || 'website, moroccan, business',
    openGraph: {
      title: meta?.title || 'Azinag',
      description: meta?.description || 'Professional websites for Moroccan businesses',
      type: 'website',
      url: `${seoMetadata.baseUrl}/${lang}`,
    },
  };
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
      heroDesc: 'كنبنيو ليك مواقع ويب وتطبيقات سريعة وفعالة، ومناسبة لاحتياجات الشركات المغربية.',
      ctaPrimary: 'طلب موقعك دابا',
      ctaSecondary: 'شوف الأثمنة',
      social: 'موثوق فيه من طرف شركات مغربية',
      projects: 'مشروع تكمّل',
      clients: 'عميل راضي',
      rating: 'معدل الرضا',
      howTitle: 'طريقة خدمة بسيطة وواضحة',
      step1: 'نهضرو معاك',
      step1Desc: 'كنسمعو ليك ونفهمو شنو باغي',
      step2: 'التصميم',
      step2Desc: 'كنصممو ليك شكل الموقع',
      step3: 'البرمجة',
      step3Desc: 'كنطورو الموقع ديالك',
      step4: 'الإطلاق',
      step4Desc: 'كنطلقو الموقع ديالك للعموم',
    },
  };

  const t = content[lang as keyof typeof content] || content.ar;

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        lang={lang}
        title={t.heroTitle}
        highlight={t.heroHighlight}
        description={t.heroDesc}
        ctaPrimaryText={t.ctaPrimary}
        ctaSecondaryText={t.ctaSecondary}
        ctaPrimaryHref={`/${lang}/order`}
        ctaSecondaryHref={`/${lang}/pricing`}
      />

      {/* Social Proof */}
      <section className="py-16 sm:py-20 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.social}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '+50', label: t.projects },
              { number: '+40', label: t.clients },
              { number: '95+', label: t.rating },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
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
              <Card key={item.step}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
