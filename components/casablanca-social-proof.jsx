"use client";

import { Star, Quote } from 'lucide-react';

export default function CasablancaSocialProof() {
  const testimonials = [
    {
      name: 'محمد - صاحب مطعم',
      location: 'كازابلانكا',
      text: 'بعد ما عملت الموقع، الطلبات بدات كتجيني على واتساب كل يوم. الناس كيوصلو ليا بسهولة و كيطلبوا مباشرة.',
      rating: 5,
      note: '(مثال)',
    },
    {
      name: 'فاطمة - صالون تجميل',
      location: 'كازابلانكا',
      text: 'الموقع بسيط و واضح. الزبونات كيضغطو على زر واتساب و كيحجزو مباشرة. ما كيحتاجوش يبحثو على رقمي.',
      rating: 5,
      note: '(مثال)',
    },
    {
      name: 'عمر - محل ملابس',
      location: 'كازابلانكا',
      text: 'في 7 أيام كان الموقع جاهز. بديت كتلقى رسائل واتساب من زبائن جدد كل يوم. استثمار يستاهل.',
      rating: 5,
      note: '(مثال)',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            تجارب <span className="text-emerald-600 dark:text-emerald-400">أصحاب محلات</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            أصحاب محلات في كازابلانكا كيستفيدو من مواقع ويب و تطبيقات تجلب طلبات واتساب
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            (الأمثلة التالية هي أمثلة توضيحية)
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-muted/20 border border-border/50 rounded-xl p-6 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-muted-foreground/50 mb-4" />
              <p className="text-foreground mb-6 leading-relaxed italic text-sm">
                "{testimonial.text}"
              </p>
              <div className="border-t border-border/50 pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                <p className="text-xs text-muted-foreground mt-1">{testimonial.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>✅ جاهز في 7-30 يوم</span>
            <span>✅ دعم بعد الإطلاق</span>
            <span>✅ يعمل على كل الأجهزة</span>
            <span>✅ طلبات واتساب مباشرة</span>
            <span>✅ أداء عالي</span>
          </div>
        </div>
      </div>
    </section>
  );
}
