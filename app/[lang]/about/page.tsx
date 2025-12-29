import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

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
      cta: 'Ready to work with us?',
      ctaBtn: 'Get Started',
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
      cta: 'Prêt à travailler avec nous?',
      ctaBtn: 'Commencer',
    },
    ar: {
      title: 'شكون حنا',
      intro: 'حنا فريق متخصص فتصميم وتطوير المواقع والتطبيقات للشركات المغربية. الهدف ديالنا هو نحوّلو الأفكار ديالك لحلول رقمية كتعاون عملك يكبر.',
      mission: 'الهدف ديالنا',
      missionDesc: 'نعاونو الشركات والمشاريع المغربية يبنيو حضور قوي فالإنترنت بحلول تقنية احترافية وبثمن معقول.',
      vision: 'الرؤية ديالنا',
      visionDesc: 'نبغيو نكونو الشريك الموثوق لكل شركة مغربية فرحلتها الرقمية، ونبني علاقات طويلة المدى مع الزبناء ديالنا.',
      founder: 'على المؤسس',
      founderDesc: 'سلام، أنا نور الدين، مطور ويب ومؤسس Azinag. عندي أكثر من 5 سنين فمجال تطوير الويب، وكنحب نعاون الشركات المغربية تطوّر وتنجح.',
      values: 'القيم ديالنا',
      value1: 'الجودة',
      value1Desc: 'ما كنفرّطوش فالجودة. كل مشروع كنخدموه بمعايير عالية.',
      value2: 'الوضوح',
      value2Desc: 'كنكونو واضحين معاك من الأول حتى للآخر، بلا مفاجآت.',
      value3: 'الدعم',
      value3Desc: 'الدعم ديالنا كيبقى حتى من بعد الإطلاق، وما كنخليوكش بوحدك.',
      cta: 'باغي تخدموا معانا؟',
      ctaBtn: 'بدا دابا',
    },
  };

  const t = content[lang as keyof typeof content] || content.ar;

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
            {[
              { title: t.value1, desc: t.value1Desc },
              { title: t.value2, desc: t.value2Desc },
              { title: t.value3, desc: t.value3Desc },
            ].map((value) => (
              <Card key={value.title}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            {t.cta}
          </h2>
          <Button href={`/${lang}/order`} size="lg">
            {t.ctaBtn}
          </Button>
        </div>
      </section>
    </div>
  );
}
