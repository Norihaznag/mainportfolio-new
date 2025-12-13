"use client";

import { MessageCircle, Zap, Smartphone, CheckCircle, Globe, Code } from 'lucide-react';

export default function CasablancaSolution() {
  const benefits = [
    {
      icon: Globe,
      title: 'مواقع ويب سريعة و محسنة',
      description: 'مواقع ويب احترافية مصممة للسرعة و الأداء العالي. تجلب ليك زبائن جدد عبر البحث و الإعلانات.',
    },
    {
      icon: Smartphone,
      title: 'تطبيقات موبايل',
      description: 'تطبيقات موبايل احترافية لـ iOS و Android. زبونك كيستعمل تطبيقك مباشرة من موبايله.',
    },
    {
      icon: Code,
      title: 'تطبيقات ويب متقدمة',
      description: 'تطبيقات ويب بميزات متقدمة: لوحات تحكم، إدارة محتوى، و ميزات مخصصة حسب احتياجاتك.',
    },
    {
      icon: MessageCircle,
      title: 'طلبات مباشرة عبر واتساب',
      description: 'كل الحلول مصممة لجلب طلبات واتساب مباشرة. زبونك كيضغط زر و كيطلب منك مباشرة.',
    },
    {
      icon: Zap,
      title: 'جاهز بسرعة',
      description: 'ما كتحتاجش تنتظر أسابيع. مواقع بسيطة في 7 أيام، تطبيقات متقدمة في 14-21 يوم.',
    },
    {
      icon: CheckCircle,
      title: 'يعمل على كل الأجهزة',
      description: 'موبايل، تابلط، كمبيوتر... كل الحلول كتظهر حلوة و كتعمل على كل شي. زبونك كيوصلك من أي جهاز.',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            الحلول <span className="text-emerald-600 dark:text-emerald-400">الاحترافية</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            مواقع ويب، تطبيقات موبايل، و تطبيقات ويب متقدمة. كلها مصممة لجلب طلبات واتساب مباشرة. بدون تعقيد، فقط نتائج.
          </p>
        </div>

        {/* How it works */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-muted/30 border border-border/50 rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-semibold mb-8 text-center">كيفاش كيخدم؟</h3>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <p className="font-semibold mb-1 text-lg">زبونك كيدخل على موقعك أو تطبيقك</p>
                  <p className="text-muted-foreground">كيشوف منتجاتك، خدماتك، صورك، و معلوماتك</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <p className="font-semibold mb-1 text-lg">كيفوت على زر واتساب</p>
                  <p className="text-muted-foreground">زر واضح و كبير في كل مكان. مصمم لجلب الطلبات</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <p className="font-semibold mb-1 text-lg">واتساب كيفتح مع رسالة جاهزة</p>
                  <p className="text-muted-foreground">زبونك كيطلب مباشرة، و أنت كترد عليه في واتساب</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-muted/20 border border-border/50 rounded-xl p-6 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-foreground">
            <span className="text-emerald-600 dark:text-emerald-400">احترافي، سريع، و فعال.</span> هاد هو كل ما تحتاجه لجلب عملاء جدد.
          </p>
        </div>
      </div>
    </section>
  );
}
