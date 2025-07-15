"use client";

import { motion } from 'framer-motion';
import { Smartphone, ShoppingCart, Coffee, Home } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

export default function Services() {
  const { language } = useLanguage();

  const services = [
    {
      icon: Smartphone,
      title: getTranslation('servicePwaWhatsapp', language),
      description: getTranslation('servicePwaWhatsappDesc', language)
    },
    {
      icon: ShoppingCart,
      title: getTranslation('serviceEcommerce', language),
      description: getTranslation('serviceEcommerceDesc', language)
    },
    {
      icon: Coffee,
      title: getTranslation('serviceCafe', language),
      description: getTranslation('serviceCafeDesc', language)
    },
    {
      icon: Home,
      title: getTranslation('serviceRental', language),
      description: getTranslation('serviceRentalDesc', language)
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {getTranslation('servicesTitle', language).split(' ').map((word, index, array) => 
              index === array.length - 1 ? (
                <span key={index} className="text-primary">{word}</span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {getTranslation('servicesDescription', language)}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="mb-6">
                <service.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}