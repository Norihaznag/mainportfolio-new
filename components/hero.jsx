"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { event } from '@/lib/analytics';
// Removed: import { useLanguage } from '@/lib/language-context';
// Removed: import { getTranslation } from '@/lib/translations';

export default function Hero() {
  const trackButtonClick = (buttonName) => {
    event({
      action: 'click',
      category: 'Hero',
      label: buttonName
    });
  };
  return (
    <section className="min-h-[70vh] p-20 pt-22 flex flex-col justify-center items-center bg-background text-foreground px-4 transition-colors duration-300">
      {/* Optional Badge */}
      <div className="mb-6">
        <span className="inline-block bg-red-900/20 text-red-500 dark:text-red-400 px-4 py-1 rounded-full font-medium text-sm">
          🚀 Fast apps for modern businesses
        </span>
      </div>
      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 leading-tight">
        <span className="text-red-500">Fast</span> websites,<br />
        mobile apps & PWAs
      </h1>
      {/* Subheadline */}
      <p className="text-lg md:text-2xl text-muted-foreground text-center max-w-2xl mb-10">
        We build ultra-fast static websites, React Native mobile apps, and PWAs with WhatsApp built in — no slow, expensive CMS like WordPress.
      </p>
      {/* CTA Buttons with glassy neo-skeuomorphic style, original brand colors */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://wa.me/212600000000?text=Hi%20Azinag%20Team%2C%20I%20want%20to%20build%20a%20fast%20website%20or%20mobile%20app.%20Please%20contact%20me."
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-full font-semibold text-base md:text-lg text-white bg-gradient-to-r from-red-500 via-red-600 to-red-500 border border-red-300/70 shadow-[0_0_0_1px_rgba(254,226,226,0.6),0_18px_35px_rgba(127,29,29,0.8)] backdrop-blur-[14px] before:absolute before:inset-[1px] before:rounded-full before:bg-gradient-to-r before:from-red-500/70 before:via-red-600/60 before:to-red-500/60 before:opacity-90 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-x-4 after:top-0.5 after:h-[1px] after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-red-200/70 after:to-transparent hover:shadow-[0_0_0_1px_rgba(254,226,226,0.8),0_22px_40px_rgba(127,29,29,0.95)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_0_1px_rgba(254,226,226,1),0_8px_18px_rgba(127,29,29,0.95)] transition-all duration-200 ease-out overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>Talk to us</span>
          </span>
        </a>
        <a
          href="/apps"
          className="relative inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-full font-semibold text-base md:text-lg text-foreground bg-muted/90 border border-border/80 shadow-[0_0_0_1px_rgba(148,163,184,0.45),0_14px_30px_rgba(15,23,42,0.75)] backdrop-blur-[14px] before:absolute before:inset-[1px] before:rounded-full before:bg-muted/80 before:opacity-90 hover:before:bg-muted after:pointer-events-none after:absolute after:inset-x-4 after:top-0.5 after:h-[1px] after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-white/35 after:to-transparent hover:shadow-[0_0_0_1px_rgba(148,163,184,0.7),0_18px_36px_rgba(15,23,42,0.9)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_0_1px_rgba(148,163,184,0.9),0_8px_18px_rgba(15,23,42,0.9)] transition-all duration-200 ease-out overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>See Apps</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </a>
      </div>
    </section>
  );
}