import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for general operations (uses anon key)
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for privileged operations (uses service role key)
// Use this carefully - it bypasses RLS policies
export const supabaseAdmin: SupabaseClient = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : supabase;
