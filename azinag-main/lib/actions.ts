'use server';

import { supabaseAdmin } from './supabase';
import { orderSchema } from './schemas';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData: unknown) {
  try {
    const data = orderSchema.parse(formData);

    const { error: insertError } = await supabaseAdmin.from('orders').insert([
      {
        business_name: data.business_name,
        business_type: data.business_type,
        contact_name: data.contact_name,
        whatsapp_number: data.whatsapp_number,
        email: data.email,
        website_type: data.website_type,
        language: data.language,
        notes: data.notes || null,
        status: 'pending',
        price: data.price,
      },
    ]);

    if (insertError) {
      return {
        success: false,
        error: 'Failed to create order. Please try again.',
      };
    }

    // Send WhatsApp notification
    await notifyWhatsApp(data);

    revalidatePath('/');

    return {
      success: true,
      message: 'Order created successfully! Check your email for confirmation.',
    };
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      return {
        success: false,
        error: 'Invalid form data',
      };
    }
    return {
      success: false,
      error: 'An error occurred. Please try again.',
    };
  }
}

async function notifyWhatsApp(data: unknown) {
  // This would integrate with WhatsApp API (Twilio, etc.)
  // For now, just log the notification
  console.log('WhatsApp notification sent for order:', data);
}

export async function getOrders() {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return [];
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: 'pending' | 'in_progress' | 'delivered'
) {
  try {
    const { error } = await supabaseAdmin
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;

    revalidatePath('/admin/orders');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update order status',
    };
  }
}
