"use client";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';
import Link from 'next/link';

export default function Pricing() {
  const { language } = useLanguage();
  // Pricing content in English, with placeholders for FR/AR
  const content = {
    en: {
      intro: "At Azinag, we believe in transparent, value-driven pricing. Whether you need a fast, installable PWA for your local business or a custom web app for your growing company, we offer clear packages and flexible options to fit your needs.",
      tiers: [
        {
          title: "Lightweight PWA Package",
          desc: "Perfect for local businesses who want a fast, installable app with WhatsApp ordering. Fixed-price, quick launch, and easy management.",
          price: "Starting at XXX MAD"
        },
        {
          title: "Custom Web App Solutions",
          desc: "For growing businesses needing advanced features, integrations, or custom workflows. Project-based or hourly pricing, tailored to your requirements.",
          price: "Starting at X,XXX MAD (Contact us for a quote)"
        }
      ],
      support: "Ongoing Support Plans: Monthly maintenance, updates, and support available for all clients.",
      faq: [
        {
          q: "How are projects scoped and quoted?",
          a: "We start with a free consultation to understand your needs, then provide a detailed proposal and transparent quote."
        },
        {
          q: "Can I request changes after launch?",
          a: "Yes! We offer flexible change requests and ongoing support as your business grows."
        },
        {
          q: "What are the payment terms?",
          a: "Most projects require a deposit to start, with the balance due on delivery. Maintenance plans are billed monthly."
        }
      ],
      cta: "Get in touch for a personalized quote and project estimate.",
      contact: "Contact Us"
    },
    fr: {
      intro: "[FR placeholder: Introduction à la tarification Azinag]",
      tiers: [
        { title: "[FR] Forfait PWA Léger", desc: "[FR] Idéal pour les entreprises locales...", price: "À partir de XXX MAD" },
        { title: "[FR] Solutions Web Sur Mesure", desc: "[FR] Pour les entreprises en croissance...", price: "À partir de X,XXX MAD (Contactez-nous)" }
      ],
      support: "[FR] Plans de support mensuel disponibles.",
      faq: [
        { q: "[FR] Comment sont évalués les projets?", a: "[FR] Consultation gratuite..." },
        { q: "[FR] Puis-je demander des modifications?", a: "[FR] Oui, support flexible..." },
        { q: "[FR] Quelles sont les modalités de paiement?", a: "[FR] Acompte requis..." }
      ],
      cta: "[FR] Contactez-nous pour un devis personnalisé.",
      contact: "[FR] Nous Contacter"
    },
    ar: {
      intro: "[AR placeholder: مقدمة عن التسعير في أزيناغ]",
      tiers: [
        { title: "[AR] باقة PWA خفيفة", desc: "[AR] مثالي للأعمال المحلية...", price: "ابتداءً من XXX MAD" },
        { title: "[AR] حلول ويب مخصصة", desc: "[AR] للأعمال المتنامية...", price: "ابتداءً من X,XXX MAD (اتصل بنا)" }
      ],
      support: "[AR] خطط دعم شهرية متوفرة.",
      faq: [
        { q: "[AR] كيف يتم تقييم المشاريع؟", a: "[AR] استشارة مجانية..." },
        { q: "[AR] هل يمكنني طلب تغييرات؟", a: "[AR] نعم، دعم مرن..." },
        { q: "[AR] ما هي شروط الدفع؟", a: "[AR] دفعة مقدمة مطلوبة..." }
      ],
      cta: "[AR] تواصل معنا للحصول على عرض سعر مخصص.",
      contact: "[AR] اتصل بنا"
    }
  };
  const t = content[language] || content.en;

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Pricing</h1>
          <p className="text-lg text-muted-foreground mb-12 text-center">{t.intro}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {t.tiers.map((tier) => (
              <div key={tier.title} className="bg-muted/40 p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <h2 className="text-2xl font-semibold mb-2">{tier.title}</h2>
                <p className="mb-4 text-muted-foreground">{tier.desc}</p>
                <div className="text-3xl font-bold text-primary mb-2">{tier.price}</div>
              </div>
            ))}
          </div>

          <div className="mb-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
            <p className="text-muted-foreground">{t.support}</p>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-center">FAQ</h3>
            <div className="space-y-6">
              {t.faq.map((item, i) => (
                <div key={i} className="bg-background p-6 rounded-lg shadow-sm">
                  <div className="font-semibold mb-2">{item.q}</div>
                  <div className="text-muted-foreground">{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="mb-4 text-lg font-medium">{t.cta}</p>
            <Link href="/contact" className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors">
              {t.contact}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 