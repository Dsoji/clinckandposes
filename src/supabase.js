import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'site-images';
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'snow@mailinator.com';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("CRITICAL: Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env or your hosting environment.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
    },
});

export default supabase;
