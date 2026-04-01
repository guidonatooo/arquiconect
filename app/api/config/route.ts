import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase.from('config').select('*')

  if (error) {
    return NextResponse.json({ error: 'Erro ao buscar config' }, { status: 500 })
  }

  const config: Record<string, string | null> = {}
  data?.forEach((row: { chave: string; valor: string | null }) => {
    config[row.chave] = row.valor
  })

  return NextResponse.json({ config })
}
