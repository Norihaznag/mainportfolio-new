"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_URL_BASE } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';
import Pricing from '@/components/pricing';

export default function PricingPage() {
  const { language } = useLanguage();

  const whatsappMessage = encodeURIComponent(
    'Hi Azinag team, I would like to discuss pricing for a website, PWA, or custom app.'
  );

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero / intro */}
        <section className="py-20 bg-gradient-to-b from-background via-background/95 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {getTranslation('pricingTitle', language)}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {getTranslation('pricingIntro', language)}
              </p>
            </div>

            {/* Two high-level tiers from translations */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
              <div className="rounded-2xl border border-border/70 bg-card/90 p-6 text-left shadow-sm">
                <h2 className="text-xl font-semibold mb-1">
                  {getTranslation('pricingTierLight', language)}
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {getTranslation('pricingTierLightDesc', language)}
                </p>
                <p className="text-sm font-medium text-primary">
                  {getTranslation('pricingTierLightPrice', language)}
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/90 p-6 text-left shadow-sm">
                <h2 className="text-xl font-semibold mb-1">
                  {getTranslation('pricingTierCustom', language)}
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {getTranslation('pricingTierCustomDesc', language)}
                </p>
                <p className="text-sm font-medium text-primary">
                  {getTranslation('pricingTierCustomPrice', language)}
                </p>
              </div>
            </div>

            <p className="text-sm md:text-base text-muted-foreground text-center max-w-2xl mx-auto mb-4">
              {getTranslation('pricingSupport', language)}
            </p>
          </div>
        </section>

        {/* Detailed pricing tiers component */}
        <Pricing />

        {/* FAQ + CTA */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 items-start">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {getTranslation('pricingTitle', language)}
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      {getTranslation('pricingFAQ1Q', language)}
                    </p>
                    <p>{getTranslation('pricingFAQ1A', language)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      {getTranslation('pricingFAQ2Q', language)}
                    </p>
                    <p>{getTranslation('pricingFAQ2A', language)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      {getTranslation('pricingFAQ3Q', language)}
                    </p>
                    <p>{getTranslation('pricingFAQ3A', language)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 border border-border/70 rounded-2xl p-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {getTranslation('pricingCTA', language)}
                </p>
                <a
                  href={`${WHATSAPP_URL_BASE}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-medium text-base text-white bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#25D366] border border-[#25D366]/70 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>{getTranslation('pricingContact', language)}</span>
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
