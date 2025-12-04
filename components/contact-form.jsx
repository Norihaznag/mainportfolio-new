"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { event } from '@/lib/analytics';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';
import { WHATSAPP_NUMBER } from '@/lib/utils';

export default function ContactForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format WhatsApp message
  const formatWhatsAppMessage = (data) => {
    const greetings = {
      en: `Hi Noureddine! 👋\n\nMy name is ${data.name} and I'd like to discuss a project with you.\n\n📧 Email: ${data.email}\n\n💬 Message:\n${data.message}\n\nLooking forward to hearing from you!`,
      fr: `Salut Noureddine! 👋\n\nJe m'appelle ${data.name} et j'aimerais discuter d'un projet avec vous.\n\n📧 Email: ${data.email}\n\n💬 Message:\n${data.message}\n\nJ'ai hâte d'avoir de vos nouvelles!`,
      ar: `مرحباً نور الدين! 👋\n\nاسمي ${data.name} وأود مناقشة مشروع معك.\n\n📧 البريد الإلكتروني: ${data.email}\n\n💬 الرسالة:\n${data.message}\n\nأتطلع إلى سماع ردك!`
    };

    return encodeURIComponent(greetings[language] || greetings.en);
  };

  // Send to WhatsApp
  const sendToWhatsApp = (data) => {
    const message = formatWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    // Track WhatsApp click
    event({
      action: 'whatsapp_contact',
      category: 'Contact',
      label: 'WhatsApp Message Sent'
    });
    
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) {
        throw error;
      }

      // Track form submission
      event({
        action: 'form_submit',
        category: 'Contact',
        label: `Contact Form Submitted - ${language}`
      });

      // Send to WhatsApp
      sendToWhatsApp(formData);
      
      const successMessages = {
        en: 'Message saved and WhatsApp opened! Please send the message to complete your inquiry.',
        fr: 'Message sauvegardé et WhatsApp ouvert! Veuillez envoyer le message pour compléter votre demande.',
        ar: 'تم حفظ الرسالة وفتح واتساب! يرجى إرسال الرسالة لإكمال استفسارك.'
      };
      
      toast.success(successMessages[language] || successMessages.en);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error saving contact:', error);
      
      // Still send to WhatsApp even if Supabase fails
      sendToWhatsApp(formData);
      
      const fallbackMessages = {
        en: 'WhatsApp opened! Please send the message. (Note: Message not saved to database)',
        fr: 'WhatsApp ouvert! Veuillez envoyer le message. (Note: Message non sauvegardé en base de données)',
        ar: 'تم فتح واتساب! يرجى إرسال الرسالة. (ملاحظة: لم يتم حفظ الرسالة في قاعدة البيانات)'
      };
      
      toast.success(fallbackMessages[language] || fallbackMessages.en);
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8">{getTranslation('getInTouch', language)}</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {getTranslation('getInTouchDesc', language)}
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{getTranslation('email', language)}</h3>
                <p className="text-muted-foreground">noureddine@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <FaWhatsapp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-muted-foreground">+{WHATSAPP_NUMBER}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{getTranslation('location', language)}</h3>
                <p className="text-muted-foreground">{getTranslation('morocco', language)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {getTranslation('nameRequired', language)}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={getTranslation('namePlaceholder', language)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {getTranslation('emailRequired', language)}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={getTranslation('emailPlaceholder', language)}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {getTranslation('messageRequired', language)}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder={getTranslation('messagePlaceholder', language)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {isSubmitting ? getTranslation('processing', language) : getTranslation('sendViaWhatsApp', language)}
              <FaWhatsapp size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}