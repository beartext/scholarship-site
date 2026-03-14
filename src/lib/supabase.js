import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vltchymkhcsooelkmbws.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdGNoeW1raGNzb29lbGttYndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMzEyOTIsImV4cCI6MjA4ODgwNzI5Mn0.F3oDlcKEVhTHmZGuPIMCdA4xE-_ZKoyv9szqTf2jXUI'

export const supabase = createClient(supabaseUrl, supabaseKey)
