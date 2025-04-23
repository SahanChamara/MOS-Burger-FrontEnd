import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://bititinlzplyhjfdohif.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpdGl0aW5senBseWhqZmRvaGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTIyOTEsImV4cCI6MjA1NjE2ODI5MX0.IUUyx_X6wFuvjfJHKzC7txH12XG92sS1liWKSQ4vnTY';

export const supabase = createClient(supabaseUrl,supabaseAnonKey);