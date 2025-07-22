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
          🚀 New: WhatsApp-Integrated PWAs!
        </span>
      </div>
      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 leading-tight">
        Build <span className="text-red-500">PWAs</span> that<br />
        <span className="text-red-500">Sell More</span> & Ship Fast
      </h1>
      {/* Subheadline */}
      <p className="text-lg md:text-2xl text-muted-foreground text-center max-w-2xl mb-10">
        Azinag delivers installable web apps with WhatsApp integration. Launch quickly, reach more customers, and grow your business with ease.
      </p>
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://wa.me/212600000000?text=Hi%20Azinag%20Team!%20I%20want%20to%20get%20started%20with%20a%20new%20website.%20I%20am%20interested%20in%3A%20%5BType%20of%20site%20(e.g.%20restaurant%2C%20shop%2C%20booking%2C%20portfolio)%5D.%20Please%20contact%20me!"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow hover:bg-red-700 transition"
        >
          Get Started
        </a>
        <a
          href="/apps"
          className="bg-muted text-foreground px-8 py-4 rounded-full font-semibold text-lg border border-border hover:bg-muted/70 transition"
        >
          See Apps
        </a>
      </div>
    </section>
  );
}