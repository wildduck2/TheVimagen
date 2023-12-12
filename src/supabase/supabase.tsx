import { createClient } from '@supabase/supabase-js';
// import { Database } from './supabase.types';

const PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const PROJECT_ANON_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

{
  /* <Database></Database> */
}
export const supabase = createClient(PROJECT_URL!, PROJECT_ANON_API_KEY!);
