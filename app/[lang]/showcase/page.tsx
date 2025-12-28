import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

interface ShowcaseProps {
  params: Promise<{
    lang: 'en' | 'fr' | 'ar';
  }>;
}

export default async function Showcase({ params }: ShowcaseProps) {
  const { lang } = await params;

  const content = {
    en: {
      title: 'Our Work',
      subtitle: 'See the projects and work we have created for Moroccan companies',
      testimonials: 'Client Testimonials',
      cta: 'Want a professional website for your business?',
      ctaDesc: 'We are here to help you achieve your digital dreams. Contact us today!',
      ctaBtn: 'Order Your Website Now',
      ctaBtn2: 'Contact on WhatsApp',
      completed: 'Completed Projects',
      satisfied: 'Satisfied Clients',
      rating: 'Satisfaction Rate',
      support: '24/7 Support',
    },
    fr: {
      title: 'Nos Travaux',
      subtitle: 'Voir les projets et les travaux que nous avons créés pour les entreprises marocaines',
      testimonials: 'Témoignages des Clients',
      cta: 'Vous voulez un site Web professionnel pour votre entreprise?',
      ctaDesc: 'Nous sommes là pour vous aider à réaliser vos rêves numériques. Contactez-nous aujourd\'hui!',
      ctaBtn: 'Commandez Votre Site Web',
      ctaBtn2: 'Contactez sur WhatsApp',
      completed: 'Projets Complétés',
      satisfied: 'Clients Satisfaits',
      rating: 'Taux de Satisfaction',
      support: 'Support 24/7',
    },
    ar: {
      title: 'الأعمال ديالنا',
      subtitle: 'اكتشف بعض المشاريع اللي خدمنا عليها مع شركات ومؤسسات مغربية',
      testimonials: 'آراء الزبناء',
      cta: 'باغي موقع احترافي لعملك؟',
      ctaDesc: 'حنا هنا باش نعاونوك تبني حضور رقمي قوي. تاصل معنا دابا!',
      ctaBtn: 'طلب موقعك دابا',
      ctaBtn2: 'تواصل فالواتساب',
      completed: 'مشروع تكمّل',
      satisfied: 'عميل راضي',
      rating: 'نسبة الرضا',
      support: 'دعم تقني 24/7',
    },
  };

  const t = content[lang as keyof typeof content] || content.ar;

  const projects = [
    { id: 1, title: 'Restaurant Website', image: '🍽️', category: 'Restaurant' },
    { id: 2, title: 'Online Store', image: '👕', category: 'E-commerce' },
    { id: 3, title: 'School Website', image: '🎓', category: 'Institution' },
    { id: 4, title: 'Dental Clinic', image: '🦷', category: 'Services' },
    { id: 5, title: 'Products Store', image: '🍊', category: 'E-commerce' },
    { id: 6, title: 'Photography Studio', image: '📸', category: 'Portfolio' },
  ];

  return (
    <div>
      {/* Hero Section */}
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

      {/* Projects Grid */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4 text-center">{project.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-sm text-blue-600 font-semibold">{project.category}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-32 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">+50</p>
              <p className="text-gray-600">{t.completed}</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">+40</p>
              <p className="text-gray-600">{t.satisfied}</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">95%</p>
              <p className="text-gray-600">{t.rating}</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">24/7</p>
              <p className="text-gray-600">{t.support}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t.cta}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={`/${lang}/order`} variant="secondary" size="lg">
              {t.ctaBtn}
            </Button>
            <Button
              href="https://wa.me/212661234567"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              {t.ctaBtn2}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
