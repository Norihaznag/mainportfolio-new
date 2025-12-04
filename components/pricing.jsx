"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/translations";

export default function Pricing() {
  const { language } = useLanguage();

  const tiers = [
    {
      name: "Starter Site",
      price: "9,000 MAD",
      description: "Fast one‑page Next.js site with WhatsApp contact — perfect for cafés, rentals, and local services.",
      features: [
        "One high‑converting landing page",
        "Static generation (SSG) for instant load",
        "WhatsApp button with pre‑filled message",
        "Basic analytics setup",
      ],
      highlight: false,
    },
    {
      name: "Business",
      price: "19,000 MAD",
      description: "Multi‑page website with Supabase backend for products, menus, or properties.",
      features: [
        "Up to 6 custom pages",
        "Supabase database + API",
        "Hybrid SSG / SSR for SEO and fresh data",
        "WhatsApp ordering or lead capture",
      ],
      highlight: true,
    },
    {
      name: "Custom App",
      price: "On request",
      description: "Full web app or PWA tailored to your business flow, with advanced integrations.",
      features: [
        "Custom features & dashboards",
        "Role‑based access and auth",
        "Scalable infrastructure",
        "Priority support",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pricing that reflects{" "}
            <span className="text-primary">
              speed and quality
            </span>
            .
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Every project is built on the same stack — Next.js, Supabase, and WhatsApp — so even the starter plan feels
            premium and fast.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className={`relative flex flex-col rounded-2xl border ${
                tier.highlight ? "border-primary/70 bg-background" : "border-border/70 bg-background/80"
              } shadow-sm p-6`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold shadow-sm">
                  Most popular
                </span>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
              <div className="mb-5">
                <p className="text-3xl font-bold">
                  {tier.price}
                  {tier.price !== "On request" && <span className="text-sm font-normal text-muted-foreground"> one‑time</span>}
                </p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/212645140071"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  tier.highlight
                    ? "bg-[#25D366] text-black hover:bg-[#1ebe5a]"
                    : "bg-muted text-foreground hover:bg-muted/70"
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Discuss this plan on WhatsApp</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


