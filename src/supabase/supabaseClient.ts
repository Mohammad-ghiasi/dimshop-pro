import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const supabaseClient: SupabaseClient = createClient(
  "https://aiobrhqkxhmnpzhljono.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpb2JyaHFreGhtbnB6aGxqb25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NjU5NDgsImV4cCI6MjA1OTM0MTk0OH0.8EWJnZP7l50U9Cizq8_KnLnAcPA11yVnH_RL9VVGwYA"
);
