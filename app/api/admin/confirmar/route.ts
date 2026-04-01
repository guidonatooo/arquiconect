import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

function checkAuth(req: NextRequest) {
  const pwd = req.headers.get('x-admin-password')
  return pwd === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('apostas')
      .update({ status: 'confirmado' })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Erro ao confirmar aposta' }, { status: 500 })
    }

    return NextResponse.json({ aposta: data })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
