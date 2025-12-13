"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import ContactForm from '@/components/contact-form';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { WHATSAPP_URL_BASE } from '@/lib/utils';

export default function Contact() {
  const whatsappMessage = encodeURIComponent(
    'مرحبا، بغيت نعرف على الخدمات ديال المواقع و التطبيقات اللي تجيب طلبات واتساب.'
  );

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  تواصل <span className="text-red-500">معنا</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  جاهزين نبداو مشروعك؟ تواصل معنا عبر واتساب و ناقش تفاصيل مشروعك
                </p>
              </div>

              {/* Primary WhatsApp CTA */}
              <div className="text-center mb-12">
                <a
                  href={`${WHATSAPP_URL_BASE}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full font-bold text-xl text-white bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] border border-[#25D366]/70 shadow-[0_0_0_1px_rgba(37,211,102,0.6),0_24px_48px_rgba(37,211,102,0.4)] hover:shadow-[0_0_0_1px_rgba(37,211,102,0.8),0_28px_56px_rgba(37,211,102,0.5)] hover:-translate-y-1 active:translate-y-0 transition-all duration-200 ease-out"
                >
                  <FaWhatsapp className="w-7 h-7" />
                  <span>تواصل معنا دابا عبر واتساب</span>
                </a>
                <p className="mt-4 text-sm text-muted-foreground">
                  💬 أسرع طريقة للتواصل - نجاوبك في دقائق
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-muted/20 border border-border/50 rounded-xl p-6 text-center hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <FaWhatsapp className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">واتساب</h3>
                  <p className="text-sm text-muted-foreground">أفضل طريقة للتواصل</p>
                  <a
                    href={WHATSAPP_URL_BASE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline mt-2 inline-block text-sm"
                  >
                    اضغط هنا
                  </a>
                </div>

                <div className="bg-muted/20 border border-border/50 rounded-xl p-6 text-center hover:border-blue-500/30 transition-colors">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <FaMapMarkerAlt className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">الموقع</h3>
                  <p className="text-sm text-muted-foreground">حي الحسني، الدار البيضاء</p>
                </div>

                <div className="bg-muted/20 border border-border/50 rounded-xl p-6 text-center hover:border-purple-500/30 transition-colors">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <FaPhone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">الهاتف</h3>
                  <p className="text-sm text-muted-foreground">متاح عبر واتساب</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-muted/20 border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">أو املأ النموذج</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
