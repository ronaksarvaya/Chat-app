// pages/api/health.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Ensure these are set in .env.local
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  try {
    // Check if this is a GET request
    if (req.method === 'GET') {
      // Example Supabase query to check if the connection is working
      const { data, error } = await supabase.from('messages').select('*').limit(1);

      if (error) {
        throw new Error('Error connecting to Supabase');
      }

      // If no errors, the connection is healthy
      res.status(200).json({ message: 'Supabase connection is healthy', data });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
    res.status(500).json({ error: 'Error connecting to Supabase' });
  }
}
