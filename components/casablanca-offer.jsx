"use client";

import { CheckCircle, MessageCircle, Clock, Smartphone, Globe, Code, Zap } from 'lucide-react';
import { WHATSAPP_URL_BASE } from '@/lib/utils';

export default function CasablancaOffer() {
  const whatsappMessage = encodeURIComponent(
    'مرحبا، بغيت نعرف على الخدمات ديال المواقع و التطبيقات اللي تجيب طلبات واتساب.'
  );

  const services = [
    {
      title: 'مواقع ويب',
      icon: Globe,
      features: [
        'موقع ويب احترافي و سريع',
        'محسن للبحث (SEO)',
        'أزرار واتساب واضحة',
        'يعمل على كل الأجهزة',
        'جاهز في 7-10 أيام',
      ],
    },
    {
      title: 'تطبيقات موبايل',
      icon: Smartphone,
      features: [
        'تطبيق موبايل لـ iOS و Android',
        'تصميم احترافي و سهل الاستخدام',
        'تكامل مع واتساب',
        'إشعارات و تحديثات',
        'جاهز في 14-21 يوم',
      ],
    },
    {
      title: 'تطبيقات ويب متقدمة',
      icon: Code,
      features: [
        'تطبيق ويب بميزات متقدمة',
        'لوحة تحكم للإدارة',
        'إدارة محتوى و منتجات',
        'تكامل مع واتساب',
        'جاهز في 21-30 يوم',
      ],
    },
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            خدماتنا <span className="text-red-500">الاحترافية</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            مواقع ويب، تطبيقات موبايل، و تطبيقات ويب متقدمة. كلها مصممة لجلب طلبات واتساب مباشرة.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background border border-border/50 rounded-xl p-6 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
              </div>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Common Features */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-background border-2 border-emerald-500/30 rounded-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                كل الحلول تتضمن
              </h3>
              <p className="text-muted-foreground">
                ميزات مشتركة في كل خدمة
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="text-sm">أزرار واتساب واضحة في كل مكان</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="text-sm">أداء عالي و سرعة فائقة</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="text-sm">رسائل واتساب جاهزة و مخصصة</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="text-sm">دعم و مساعدة بعد الإطلاق</span>
              </div>
            </div>

            <div className="text-center">
              <a
                href={`${WHATSAPP_URL_BASE}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-lg md:text-xl text-white bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] border border-[#25D366]/70 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out"
              >
                <MessageCircle className="w-6 h-6" />
                <span>ناقش احتياجاتك على واتساب</span>
              </a>
              <p className="mt-4 text-sm text-muted-foreground">
                💬 ناقش السعر و التفاصيل مباشرة على واتساب
              </p>
            </div>
          </div>
        </div>

        {/* Urgency note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            ⚡ كل يوم كيضيع عليك زبون. حلولنا كتكون جاهزة بسرعة.
          </p>
        </div>
      </div>
    </section>
  );
}
