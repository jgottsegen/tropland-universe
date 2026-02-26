import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Gracefully handle missing env vars (portal won't work, but site won't crash)
const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (null as any);

export { isConfigured };
