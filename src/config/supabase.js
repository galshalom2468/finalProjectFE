import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jzhdvzerevmgqcklxdjm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6aGR2emVyZXZtZ3Fja2x4ZGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjQ4MDUsImV4cCI6MjA2NDgwMDgwNX0.XJt5rhZ5uPJs8-Av0NcH96y5apFvGx38BGldSvxDlYU'
export const supabase = createClient(supabaseUrl, supabaseKey)

