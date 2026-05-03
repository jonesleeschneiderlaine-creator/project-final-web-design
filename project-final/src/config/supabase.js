import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xgpasglgseftsistwrkx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhncGFzZ2xnc2VmdHNpc3R3cmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNzk4MjgsImV4cCI6MjA5MjY1NTgyOH0.Cem1GG3GzuDeeXm-qSQjl1Rl2f0zs-NSawUXSIVXgEE';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key chargée:', supabaseAnonKey.substring(0, 20) + '...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);