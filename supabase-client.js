// Supabase configuration and initialization
const SUPABASE_URL = 'https://katnogfsabcprozrxvjh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthdG5vZ2ZzYWJjcHJvenJ4dmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzkyNTksImV4cCI6MjA5MzExNTI1OX0.g29_l5Y35ZH0JqNzKZ5zesSqaLou1tcgQP8KJ3yuElM';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

window.supabaseClient = supabaseClient;
