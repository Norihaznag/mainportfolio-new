import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const [ordersRes, contentRes, pricingRes, usersRes] = await Promise.all([
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('content').select('id', { count: 'exact', head: true }),
      supabase.from('pricing').select('id', { count: 'exact', head: true }),
      supabase.from('users').select('id', { count: 'exact', head: true }),
    ]);

    return NextResponse.json({
      orders: ordersRes.count || 0,
      content: contentRes.count || 0,
      pricing: pricingRes.count || 0,
      users: usersRes.count || 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        orders: 0,
        content: 0,
        pricing: 0,
        users: 0,
      }
    );
  }
}
