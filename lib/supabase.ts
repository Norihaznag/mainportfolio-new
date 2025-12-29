import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'set' : 'missing');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'set' : 'missing');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

// Server-side client with service key
export const supabaseAdmin = createClient(
  supabaseUrl || '',
  process.env.SUPABASE_SERVICE_KEY || supabaseKey || ''
);
