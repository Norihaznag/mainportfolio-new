"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { event } from '@/lib/analytics';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

export default function Hero() {
  const { language } = useLanguage();
  const trackButtonClick = (buttonName) => {
    event({
      action: 'click',
      category: 'Hero',
      label: buttonName
    });
  };
  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center bg-black text-white px-4">
      {/* Optional Badge */}
      <div className="mb-6">
        <span className="inline-block bg-red-900/20 text-red-400 px-4 py-1 rounded-full font-medium text-sm">
          🚀 New: WhatsApp-Integrated PWAs!
        </span>
      </div>
      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 leading-tight">
        Build <span className="text-red-500">PWAs</span> that<br />
        <span className="text-red-500">Sell More</span> & Ship Fast
      </h1>
      {/* Subheadline */}
      <p className="text-lg md:text-2xl text-white/80 text-center max-w-2xl mb-10">
        Azinag delivers installable web apps with WhatsApp integration. Launch quickly, reach more customers, and grow your business with ease.
      </p>
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/contact"
          className="bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow hover:bg-red-700 transition"
        >
          Get Started
        </a>
        <a
          href="/projects"
          className="bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition"
        >
          See Projects
        </a>
      </div>
    </section>
  );
}