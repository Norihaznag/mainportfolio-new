"use client";

import { motion } from 'framer-motion';
import { Utensils, ShoppingBag, Home, Coffee } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

const industries = [
  {
    icon: Utensils,
    key: 'industryRestaurants',
    descKey: 'industryRestaurantsDesc',
  },
  {
    icon: ShoppingBag,
    key: 'industryShops',
    descKey: 'industryShopsDesc',
  },
  {
    icon: Home,
    key: 'industryRentals',
    descKey: 'industryRentalsDesc',
  },
  {
    icon: Coffee,
    key: 'industryCafes',
    descKey: 'industryCafesDesc',
  },
];

export default function Industries() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {getTranslation('industriesTitle', language)}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {getTranslation('industriesDescription', language)}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {industries.map(({ icon: Icon, key, descKey }) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-muted/40 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow group flex flex-col items-center text-center"
            >
              <Icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{getTranslation(key, language)}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{getTranslation(descKey, language)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 