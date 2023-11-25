import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rcbjwwfsennwjovsztec.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjYmp3d2ZzZW5ud2pvdnN6dGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NDEzNjgsImV4cCI6MjAxNDIxNzM2OH0.SPDJnutq-4KH7ULt5kkvFP5zXx_-098y8l28iVEm4CY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
