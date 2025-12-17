"use client";

import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { event } from '@/lib/analytics';
import { WHATSAPP_NUMBER } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguage();

  // Format WhatsApp message in Arabic
  const formatWhatsAppMessage = (data) => {
    const message = `مرحباً نور الدين! 👋\n\nاسمي ${data.name} وأود مناقشة مشروع معك.\n\n📧 البريد الإلكتروني: ${data.email}\n\n💬 الرسالة:\n${data.message}\n\nأتطلع إلى سماع ردك!`;
    return encodeURIComponent(message);
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
        label: 'Contact Form Submitted - Arabic'
      });

      // Send to WhatsApp
      sendToWhatsApp(formData);
      
      toast.success('تم حفظ الرسالة وفتح واتساب! يرجى إرسال الرسالة لإكمال استفسارك.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error saving contact:', error);
      
      // Still send to WhatsApp even if Supabase fails
      sendToWhatsApp(formData);
      
      toast.success('تم فتح واتساب! يرجى إرسال الرسالة. (ملاحظة: لم يتم حفظ الرسالة في قاعدة البيانات)');
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            {getTranslation('getInTouch', language)}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {getTranslation('getInTouchDesc', language)}
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">contact@azinag.site</p>
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
                <h3 className="font-semibold">
                  {getTranslation('location', language)}
                </h3>
                <p className="text-muted-foreground">حي الحسني، الدار البيضاء E45</p>
                <p className="text-sm text-muted-foreground">
                  {getTranslation('morocco', language)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
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
              {isSubmitting
                ? getTranslation('processing', language)
                : getTranslation('sendViaWhatsApp', language)}
              <FaWhatsapp size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
