import Header from '@/components/header';
import Footer from '@/components/footer';
import { FaWhatsapp, FaCheckCircle, FaClock, FaHandshake } from 'react-icons/fa';
import { WHATSAPP_URL_BASE } from '@/lib/utils';

export function generateMetadata() {
  return {
    title: 'من نحن - مواقع ويب و تطبيقات موبايل تجلب طلبات واتساب',
    description: 'ننشئ مواقع ويب سريعة، تطبيقات موبايل، و تطبيقات ويب متقدمة لأصحاب المحلات في كازابلانكا. كلها مصممة لجلب طلبات واتساب مباشرة.',
    keywords: [
      'موقع ويب كازابلانكا',
      'تطبيق موبايل',
      'تطبيق ويب',
      'طلبات واتساب',
    ],
    alternates: {
      canonical: '/about',
    },
  };
}

export default function About() {
  const whatsappMessage = encodeURIComponent(
    'مرحبا، بغيت نعرف أكثر على خدماتكم.'
  );

  const values = [
    {
      icon: FaCheckCircle,
      title: 'حلول احترافية',
      description: 'مواقع ويب، تطبيقات موبايل، و تطبيقات ويب متقدمة. كلها مصممة لجلب طلبات واتساب.',
    },
    {
      icon: FaClock,
      title: 'سرعة في التسليم',
      description: 'مواقع بسيطة في 7-10 أيام، تطبيقات متقدمة في 14-30 يوم. ما كتحتاجش تنتظر أسابيع.',
    },
    {
      icon: FaHandshake,
      title: 'دعم بعد الإطلاق',
      description: 'نكون معاك بعد ما يطلع المشروع. نجاوب على أسئلتك و نساعدك.',
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  من <span className="text-red-500">نحن</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  ننشئ مواقع ويب، تطبيقات موبايل، و تطبيقات ويب متقدمة لأصحاب المحلات في كازابلانكا
                </p>
              </div>

              <div className="prose prose-lg max-w-none mb-16">
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  إذا كنت صاحب مطعم، صالون، أو محل في كازابلانكا، و بغيتي حل رقمي يجلب ليك طلبات واتساب بسرعة، 
                  أنت في المكان الصحيح.
                </p>
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  ننشئ مواقع ويب سريعة و محسنة، تطبيقات موبايل احترافية لـ iOS و Android، و تطبيقات ويب بميزات متقدمة. 
                  كلها مصممة لجعل زبونك يتصل بيك مباشرة عبر واتساب.
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  هدفنا واضح: نجعل الناس يتصلون بيك و يطلبون من عندك. بدون تعقيد، بدون انتظار طويل، فقط نتائج.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-muted/20 border border-border/50 rounded-xl p-6 text-center hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <value.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center bg-muted/20 border border-border/50 rounded-2xl p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  جاهزين نبداو مشروعك؟
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  تواصل معنا عبر واتساب و ناقش تفاصيل مشروعك
                </p>
                <a
                  href={`${WHATSAPP_URL_BASE}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] border border-[#25D366]/70 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  <span>تواصل معنا عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
