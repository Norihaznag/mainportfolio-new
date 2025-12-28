import { z } from 'zod';

export const orderSchema = z.object({
  business_name: z.string().min(2, 'Business name required').max(100),
  business_type: z.enum([
    'restaurant',
    'cafe',
    'school',
    'shop',
    'service',
    'other',
  ]),
  contact_name: z.string().min(2, 'Contact name required').max(100),
  whatsapp_number: z
    .string()
    .regex(/^\+212\d{9}$/, 'Valid Moroccan number required (+212...)'),
  email: z.string().email('Valid email required'),
  website_type: z.enum(['website', 'app', 'ecommerce', 'custom']),
  language: z.enum(['ar', 'fr', 'en']),
  notes: z.string().max(500).optional(),
  price: z.number().positive(),
});

export type OrderFormData = z.infer<typeof orderSchema>;

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
