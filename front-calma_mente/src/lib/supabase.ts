import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://jsgxzgxxiquwllivbnyp.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzZ3h6Z3h4aXF1d2xsaXZibnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MzQ2NzUsImV4cCI6MjA3ODQxMDY3NX0.GtVx72JQrErtwaV-UNb872b9is-6l7GyHszZIfBKkDc"

export const supabase = createClient(supabaseUrl, supabaseKey)
