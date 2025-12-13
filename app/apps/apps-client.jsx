"use client";

import { FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { WHATSAPP_URL_BASE } from '@/lib/utils';

export default function AppsClient() {
  const whatsappMessage = encodeURIComponent(
    'مرحبا، شفت الأمثلة ديال المواقع و التطبيقات و بغيت نعرف أكثر.'
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="w-4 h-4 text-emerald-500" />
          <span>مواقع ويب احترافية</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="w-4 h-4 text-emerald-500" />
          <span>تطبيقات موبايل</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="w-4 h-4 text-emerald-500" />
          <span>طلبات واتساب مباشرة</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="w-4 h-4 text-emerald-500" />
          <span>أداء عالي</span>
        </div>
      </div>

      <div className="mt-16 text-center bg-muted/20 border border-border/50 rounded-2xl p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          بغيتي حل مثل هاد الأمثلة؟
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
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
    </>
  );
}
