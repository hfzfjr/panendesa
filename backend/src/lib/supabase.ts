import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

// Admin client for privileged operations (uses service role key)
// Backend always uses service role key to bypass RLS policies
// Authorization is enforced at Express middleware level
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);
