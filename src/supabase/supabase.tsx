import { createClient } from '@supabase/supabase-js';

export const PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const PROJECT_ANON_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(PROJECT_URL!, PROJECT_ANON_API_KEY!);
