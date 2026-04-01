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
    const { resultado } = await req.json()
    if (!['menino', 'menina'].includes(resultado)) {
      return NextResponse.json({ error: 'Resultado inválido' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { error } = await supabase
      .from('config')
      .update({ valor: resultado })
      .eq('chave', 'resultado')

    if (error) {
      return NextResponse.json({ error: 'Erro ao salvar resultado' }, { status: 500 })
    }

    return NextResponse.json({ success: true, resultado })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
