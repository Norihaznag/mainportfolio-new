"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { FaWhatsapp, FaCheckCircle, FaClock, FaGlobe, FaMobileAlt, FaCode } from 'react-icons/fa';
import { WHATSAPP_URL_BASE } from '@/lib/utils';

export default function Pricing() {
  const whatsappMessage = encodeURIComponent(
    'مرحبا، بغيت نعرف على الأسعار ديال المواقع و التطبيقات اللي تجيب طلبات واتساب.'
  );

  const services = [
    {
      title: 'مواقع ويب',
      icon: FaGlobe,
      timeframe: '7-10 أيام',
      features: [
        'موقع ويب احترافي و سريع',
        'محسن للبحث (SEO)',
        'أزرار واتساب واضحة',
        'يعمل على كل الأجهزة',
        'أداء عالي',
      ],
    },
    {
      title: 'تطبيقات موبايل',
      icon: FaMobileAlt,
      timeframe: '14-21 يوم',
      features: [
        'تطبيق موبايل لـ iOS و Android',
        'تصميم احترافي',
        'تكامل مع واتساب',
        'إشعارات و تحديثات',
        'أداء عالي',
      ],
    },
    {
      title: 'تطبيقات ويب متقدمة',
      icon: FaCode,
      timeframe: '21-30 يوم',
      features: [
        'تطبيق ويب بميزات متقدمة',
        'لوحة تحكم للإدارة',
        'إدارة محتوى و منتجات',
        'تكامل مع واتساب',
        'أداء عالي',
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  الأسعار <span className="text-red-500">الواضحة</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  مواقع ويب، تطبيقات موبايل، و تطبيقات ويب متقدمة. كلها مصممة لجلب طلبات واتساب مباشرة.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-background border border-border/50 rounded-xl p-6 hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <p className="text-xs text-muted-foreground">{service.timeframe}</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FaCheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Common Features */}
              <div className="bg-muted/20 border border-border/50 rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">كل الحلول تتضمن</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">أزرار واتساب واضحة في كل مكان</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">رسائل واتساب جاهزة و مخصصة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">أداء عالي و سرعة فائقة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">دعم و مساعدة بعد الإطلاق</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center bg-background border-2 border-emerald-500/30 rounded-2xl p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  بغيتي تعرف السعر؟
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  ناقش احتياجاتك معنا على واتساب و احصل على عرض مخصص
                </p>
                <a
                  href={`${WHATSAPP_URL_BASE}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-lg md:text-xl text-white bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] border border-[#25D366]/70 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  <span>ناقش السعر على واتساب</span>
                </a>
                <p className="mt-4 text-sm text-muted-foreground">
                  💬 ناقش السعر و التفاصيل مباشرة على واتساب
                </p>
              </div>

              {/* FAQ */}
              <div className="mt-12 bg-muted/20 border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">أسئلة شائعة</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">كيفاش كيتم تحديد السعر؟</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      نبداو بمناقشة مجانية على واتساب. نفهم احتياجاتك و نعطيك سعر واضح و شفاف حسب نوع المشروع.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">واش ممكن نطلب تغييرات بعد الإطلاق؟</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      نعم! نقدم دعم مرن و مساعدة بعد الإطلاق. إذا بغيتي تضيف أو تغير شي حاجة، نتا هنا.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">كيفاش كيتم الدفع؟</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      في العادة، نطلب دفعة مقدمة للبداية، و الباقي عند التسليم. بسيط و واضح.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
