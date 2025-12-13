"use client";

import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_URL_BASE } from '@/lib/utils';

export default function CasablancaHero() {
  const whatsappMessage = encodeURIComponent(
    'مرحبا، بغيت نعرف على الخدمات ديال المواقع و التطبيقات اللي تجيب طلبات واتساب.'
  );

  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-center bg-background text-foreground px-4 pt-24 pb-16">
      {/* Badge */}
      <div className="mb-8">
        <span className="inline-block bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-5 py-1.5 rounded-full font-medium text-sm border border-emerald-500/20">
          ⚡ حلول رقمية تجلب عملاء جدد
        </span>
      </div>

      {/* Headline - Problem-focused */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center mb-8 leading-tight max-w-6xl">
        <span className="text-red-500">مشكلتك:</span> الناس ما كيوصلوش ليك<br />
        <span className="text-foreground">و ما كيطلبوش من عندك</span>
      </h1>

      {/* Promise */}
      <div className="mb-10 text-center">
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
          الحل: مواقع ويب، تطبيقات موبايل، و تطبيقات ويب متقدمة
        </p>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          كلها مصممة لجلب طلبات واتساب مباشرة. بدون تعقيد، بدون انتظار طويل. حلول احترافية تجعل الناس يتصلون بيك و يطلبون من عندك.
        </p>
      </div>

      {/* Services Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto w-full">
        <div className="bg-muted/40 border border-border/50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">🌐</div>
          <p className="font-semibold text-sm">مواقع ويب</p>
          <p className="text-xs text-muted-foreground mt-1">سريعة و محسنة</p>
        </div>
        <div className="bg-muted/40 border border-border/50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">📱</div>
          <p className="font-semibold text-sm">تطبيقات موبايل</p>
          <p className="text-xs text-muted-foreground mt-1">لـ iOS و Android</p>
        </div>
        <div className="bg-muted/40 border border-border/50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">⚡</div>
          <p className="font-semibold text-sm">تطبيقات ويب متقدمة</p>
          <p className="text-xs text-muted-foreground mt-1">ميزات متقدمة</p>
        </div>
      </div>

      {/* Primary CTA Button */}
      <div className="mt-6">
        <a
          href={`${WHATSAPP_URL_BASE}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full font-bold text-lg md:text-xl text-white bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] border border-[#25D366]/70 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out"
        >
          <FaWhatsapp className="w-6 h-6" />
          <span>تواصل معنا دابا عبر واتساب</span>
        </a>
      </div>

      {/* Trust indicator */}
      <p className="mt-8 text-sm text-muted-foreground text-center">
        ⏱️ جاهز في 7-14 يوم • 💬 طلبات مباشرة عبر واتساب • 📱 يعمل على كل الأجهزة • ⚡ أداء عالي
      </p>
    </section>
  );
}
