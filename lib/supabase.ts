import { createClient } from '@supabase/supabase-js'

// Fallback placeholders allow the build to succeed without env vars configured.
// In production (Vercel), these must be set as environment variables.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Aposta = {
  id: string
  nome: string
  escolha: 'menino' | 'menina'
  valor: number
  status: 'pendente' | 'confirmado'
  created_at: string
}

export type Config = {
  chave: string
  valor: string | null
}
