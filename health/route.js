// app/api/health/route.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Ensure these are set in .env.local
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(req) {
  try {
    // Check Supabase connection
    const { data, error } = await supabase.from('messages').select('*').limit(1);

    if (error) {
      throw new Error('Error connecting to Supabase');
    }

    return new Response(JSON.stringify({ message: 'Supabase connection is healthy', data }), { status: 200 });
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
    return new Response(JSON.stringify({ error: 'Error connecting to Supabase' }), { status: 500 });
  }
}
