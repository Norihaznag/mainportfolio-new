import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

interface AboutProps {
  params: Promise<{
    lang: 'en' | 'fr' | 'ar';
  }>;
}

export default async function About({ params }: AboutProps) {
  const { lang } = await params;

  const content = {
    en: {
      title: 'About Azinag',
      intro: 'We are a specialized team in web and app development for Moroccan companies. Our mission is to turn your ideas into digital reality that contributes to the growth of your business.',
      mission: 'Our Mission',
      missionDesc: 'Empower Moroccan companies and projects to have a strong presence on the Internet through professional technical solutions at reasonable prices.',
      vision: 'Our Vision',
      visionDesc: 'To be the trusted partner for every Moroccan company in its digital journey. We strive to build long-term relationships with our clients and support them at every step of their digital growth.',
      founder: 'About the Founder',
      founderDesc: 'Hello, I am Noor El-Din, a web developer and founder of Azinag. I started my journey in web development over 5 years ago, and I am passionate about helping Moroccan companies grow and thrive.',
      values: 'Our Values',
      value1: 'Quality',
      value1Desc: 'We never compromise on quality. Every project executed by our team is done with the highest standards of professionalism.',
      value2: 'Transparency',
      value2Desc: 'We communicate clearly with you throughout the project. There are no surprises or hidden costs.',
      value3: 'Support',
      value3Desc: 'Our support does not end at launch. We are always here to help you succeed.',
    },
    fr: {
      title: 'À Propos d\'Azinag',
      intro: 'Nous sommes une équipe spécialisée dans le développement web et d\'applications pour les entreprises marocaines. Notre mission est de transformer vos idées en réalité numérique qui contribue à la croissance de votre entreprise.',
      mission: 'Notre Mission',
      missionDesc: 'Autonomiser les entreprises et les projets marocains d\'avoir une présence forte sur Internet grâce à des solutions techniques professionnelles à des prix raisonnables.',
      vision: 'Notre Vision',
      visionDesc: 'Être le partenaire de confiance de chaque entreprise marocaine dans son parcours numérique. Nous nous efforçons de construire des relations à long terme avec nos clients et de les soutenir à chaque étape de leur croissance numérique.',
      founder: 'À Propos du Fondateur',
      founderDesc: 'Bonjour, je suis Noor El-Din, développeur web et fondateur d\'Azinag. J\'ai commencé mon parcours dans le développement web il y a plus de 5 ans, et je suis passionné par l\'aide aux entreprises marocaines à croître et à prospérer.',
      values: 'Nos Valeurs',
      value1: 'Qualité',
      value1Desc: 'Nous ne transigeons jamais sur la qualité. Chaque projet exécuté par notre équipe est réalisé selon les plus hauts standards de professionnalisme.',
      value2: 'Transparence',
      value2Desc: 'Nous communiquons clairement avec vous tout au long du projet. Il n\'y a pas de surprises ou de frais cachés.',
      value3: 'Soutien',
      value3Desc: 'Notre soutien ne s\'arrête pas au lancement. Nous sommes toujours là pour vous aider à réussir.',
    },
    ar: {
      title: 'علينا',
      intro: 'رانا فريق متخصص في تطوير الويب والتطبيقات للشركات والمشاريع المغربية. مهمتنا هي تحويل أفكارك إلى حقيقة رقمية تساهم في نمو عملك.',
      mission: 'مهمتنا',
      missionDesc: 'تمكين الشركات والمشاريع المغربية من وجود قوي على الإنترنت من خلال حلول تقنية احترافية بأسعار معقولة.',
      vision: 'رؤيتنا',
      visionDesc: 'أن نصبح الشريك الموثوق لكل شركة مغربية في رحلتها الرقمية. نسعى لبناء علاقات طويلة الأمد مع عملائنا ودعمهم في كل خطوة من خطوات نموهم الرقمي.',
      founder: 'عن مؤسس Azinag',
      founderDesc: 'مرحباً، أنا نور الدين، مطور ويب ومؤسس Azinag. بدأت رحلتي مع تطوير الويب منذ أكثر من 5 سنوات، وأنا شغوف بمساعدة الشركات المغربية على النمو والازدهار.',
      values: 'قيمنا',
      value1: 'الجودة',
      value1Desc: 'لا نتنازل أبداً عن الجودة. كل مشروع ينجزه فريقنا بأعلى معايير الاحترافية.',
      value2: 'الشفافية',
      value2Desc: 'نتواصل معك بوضوح طوال فترة المشروع. لا توجد مفاجآت أو خفايا.',
      value3: 'الدعم',
      value3Desc: 'دعمنا لا ينتهي عند الإطلاق. رانا هنا باش نساعدك تنجح.',
    },
  };

  const t = content[lang];

  return (
    <div>
      {/* Header */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 sm:py-32 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.mission}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t.missionDesc}
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.vision}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t.visionDesc}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t.founder}
            </h2>
            <Card>
              <p className="text-gray-600 leading-relaxed">
                {t.founderDesc}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-32 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.values}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.value1}</h3>
              <p className="text-gray-600">{t.value1Desc}</p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.value2}</h3>
              <p className="text-gray-600">{t.value2Desc}</p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.value3}</h3>
              <p className="text-gray-600">{t.value3Desc}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to work with us?
          </h2>
          <Button href={`/${lang}/order`} size="lg">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}
