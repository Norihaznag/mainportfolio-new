import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export const metadata = {
  title: 'عننا - Azinag',
  description: 'تعرف على فريق Azinag ومهمتنا في دعم الشركات المغربية',
};

export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              حول Azinag
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              نحن فريق متخصص في تطوير الويب والتطبيقات للشركات والمشاريع المغربية. 
              مهمتنا هي تحويل أفكارك إلى حقيقة رقمية تساهم في نمو عملك.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 sm:py-32 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">مهمتنا</h2>
              <p className="text-gray-600 leading-relaxed">
                تمكين الشركات والمشاريع المغربية من وجود قوي على الإنترنت من خلال 
                حلول تقنية احترافية بأسعار معقولة. نؤمن أن كل عمل يستحق موقعاً 
                احترافياً يعكس قيمته وجودة خدماته.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">رؤيتنا</h2>
              <p className="text-gray-600 leading-relaxed">
                أن نصبح الشريك الموثوق لكل شركة مغربية في رحلتها الرقمية. 
                نسعى لبناء علاقات طويلة الأمد مع عملائنا ودعمهم في كل خطوة 
                من خطوات نموهم الرقمي.
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
              عن مؤسس Azinag
            </h2>
            <Card>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  مرحباً، أنا نور الدين، مطور ويب ومؤسس Azinag. 
                  بدأت رحلتي مع تطوير الويب منذ أكثر من 5 سنوات، وأنا شغوف 
                  بمساعدة الشركات المغربية على النمو والازدهار.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  لاحظت أن الكثير من الشركات المغربية الصغيرة والمتوسطة تحتاج 
                  إلى حضور رقمي قوي، لكن الأسعار في السوق غالية جداً. 
                  لذلك قررت تأسيس Azinag لتوفير خدمات تطوير ويب احترافية 
                  بأسعار معقولة وجودة عالية.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  اليوم، ساعدنا أكثر من 50 شركة مغربية على بناء وجود قوي 
                  على الإنترنت وزيادة مبيعاتهم. أنا فخور بكل مشروع أنجزناه 
                  والعلاقات التي بنيناها مع عملائنا.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-32 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            قيمنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'الجودة',
                description:
                  'لا نتنازل أبداً عن الجودة. كل مشروع ينجزه فريقنا بأعلى معايير الاحترافية.',
              },
              {
                title: 'الشفافية',
                description:
                  'نتواصل معك بوضوح طوال فترة المشروع. لا توجد مفاجآت أو خفايا.',
              },
              {
                title: 'الدعم',
                description:
                  'لا ننتهي عند الإطلاق. نبقى معك لدعمك وحل أي مشكلة تواجهك.',
              },
            ].map((value, idx) => (
              <Card key={idx}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            تواصل معنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <Card className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                📧 البريد الإلكتروني
              </h3>
              <a
                href="mailto:hello@azinag.site"
                className="text-blue-600 hover:underline"
              >
                hello@azinag.site
              </a>
            </Card>
            <Card className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                📱 WhatsApp
              </h3>
              <a
                href="https://wa.me/212661234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                +212 661 23 45 67
              </a>
            </Card>
            <Card className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                📍 الموقع
              </h3>
              <p className="text-gray-600">الرباط، المغرب</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            هل تريد البدء معنا؟
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            سواء أكان لديك سؤال أو تريد بدء مشروع جديد، نحن هنا لمساعدتك.
          </p>
          <Button href="/order" size="lg">
            اطلب موقعك الآن
          </Button>
        </div>
      </section>
    </div>
  );
}
