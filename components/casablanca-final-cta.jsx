"use client";

import { MessageCircle, Clock, ArrowRight } from 'lucide-react';
import { WHATSAPP_URL_BASE } from '@/lib/utils';

export default function CasablancaFinalCTA() {
  const whatsappMessage = encodeURIComponent(
    'مرحبا، بغيت نعرف على الخدمات ديال المواقع و التطبيقات اللي تجيب طلبات واتساب. متاح دابا؟'
  );

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            كل يوم كيضيع عليك <span className="text-red-500">زبون</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            الناس كيدورو على خدماتك على النت. إذا ما كان عندك موقع أو تطبيق، كيضيعو عليك.
            <br />
            حلولنا كتكون جاهزة بسرعة و كتجيب ليك طلبات مباشرة.
          </p>

          {/* Urgency elements */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" />
              <span>جاهز في 7-30 يوم حسب الخدمة</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>طلبات واتساب مباشرة</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span>بدون تعقيد</span>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mb-8">
            <a
              href={`${WHATSAPP_URL_BASE}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full font-bold text-xl md:text-2xl text-white bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] border border-[#25D366]/70 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out"
            >
              <MessageCircle className="w-7 h-7" />
              <span>تواصل معنا دابا عبر واتساب</span>
            </a>
          </div>

          {/* Secondary message */}
          <p className="text-base text-muted-foreground mb-4">
            💬 ناقش تفاصيل مشروعك و احصل على عرض مخصص
          </p>
          <p className="text-sm text-muted-foreground">
            ⏱️ لا تنتظر أكثر. كل يوم كيضيع عليك فرصة جديدة.
          </p>
        </div>
      </div>
    </section>
  );
}
