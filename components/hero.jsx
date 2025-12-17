"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WHATSAPP_URL_BASE } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

export default function Hero() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-background/95 to-background">
      {/* Background orbits / gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-emerald-400/25 via-primary/10 to-transparent blur-3xl" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{getTranslation('tagline', language)}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                <span className="block">
                  {getTranslation('heroTitle', language)}
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl">
                {getTranslation('heroDescription', language)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`${WHATSAPP_URL_BASE}?text=${encodeURIComponent(
                  'Hi Azinag Team, I want to build a fast website or mobile app. Please contact me.',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-primary via-primary to-primary border border-primary/40 shadow-[0_18px_40px_rgba(15,23,42,0.6)] backdrop-blur before:absolute before:inset-[1px] before:rounded-full before:bg-gradient-to-r before:from-primary/80 before:via-primary/70 before:to-primary/80 before:opacity-90 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-x-4 after:top-0.5 after:h-[1px] after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent hover:shadow-[0_22px_48px_rgba(15,23,42,0.75)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_10px_24px_rgba(15,23,42,0.7)] transition-all duration-200 ease-out overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{getTranslation('getConsultation', language)}</span>
                </span>
              </a>
              <a
                href="/apps"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-background/80 px-6 py-2.5 text-sm sm:text-base font-medium text-foreground shadow-sm hover:bg-muted/70 hover:border-border transition-colors"
              >
                <span>{getTranslation('seeOurWork', language)}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{getTranslation('heroAvailable', language)}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>{getTranslation('heroLocation', language)}</span>
              </div>
            </div>
          </motion.div>

          {/* Right: visual system / cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-border/70 bg-background/80 shadow-[0_25px_80px_rgba(15,23,42,0.9)] p-5 sm:p-6 lg:p-7 overflow-hidden">
              {/* subtle grid */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,#ffffff12_1px,transparent_0)] [background-size:18px_18px]" />
              </div>

              <div className="relative space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 px-2.5 py-1 text-[11px] font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      Next.js · Supabase · WhatsApp
                    </span>
                    <p className="text-xs text-muted-foreground max-w-[220px]">
                      A single, fast stack for web apps, PWAs, and mobile-like experiences.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-muted-foreground">Median LCP</p>
                    <p className="text-sm font-semibold text-emerald-400">&lt; 1.8s</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-muted/40 p-3.5 space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Static pages
                    </p>
                    <p className="text-sm font-medium text-foreground">SEO‑ready marketing site</p>
                    <p className="text-[11px] text-muted-foreground">
                      Home, About, Pricing – pre‑rendered and cached globally.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/40 p-3.5 space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Dynamic apps
                    </p>
                    <p className="text-sm font-medium text-foreground">Live data from Supabase</p>
                    <p className="text-[11px] text-muted-foreground">
                      Projects, menus, and orders update instantly without redeploys.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/60 p-3.5 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-200/80">
                      WhatsApp conversion
                    </p>
                    <p className="text-sm text-emerald-50">
                      Customers jump straight into pre‑filled WhatsApp chats.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-emerald-100/80">Time to first message</p>
                    <p className="text-sm font-semibold text-emerald-300">&lt; 30 sec</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}