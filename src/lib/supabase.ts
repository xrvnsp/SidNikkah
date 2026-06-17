import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface RSVPEntry {
  id?: string
  name: string
  phone: string
  guest_count: number
  message?: string
  created_at?: string
}

export async function submitRSVP(entry: Omit<RSVPEntry, 'id' | 'created_at'>): Promise<{ error: string | null }> {
  const { error } = await supabase.from('rsvp').insert([entry])
  if (error) return { error: error.message }
  return { error: null }
}
