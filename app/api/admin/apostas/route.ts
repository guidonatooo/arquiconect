import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

function checkAuth(req: NextRequest) {
  const pwd = req.headers.get('x-admin-password')
  return pwd === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('apostas')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Erro ao buscar apostas' }, { status: 500 })
  }

  return NextResponse.json({ apostas: data })
}
