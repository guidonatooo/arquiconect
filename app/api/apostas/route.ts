import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, escolha, valor } = body

    // Validation
    if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
      return NextResponse.json({ error: 'Nome inválido' }, { status: 400 })
    }
    if (!['menino', 'menina'].includes(escolha)) {
      return NextResponse.json({ error: 'Escolha inválida' }, { status: 400 })
    }
    const valorNum = parseFloat(valor)
    if (isNaN(valorNum) || valorNum < 5) {
      return NextResponse.json({ error: 'Valor mínimo: R$ 5,00' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('apostas')
      .insert({
        nome: nome.trim(),
        escolha,
        valor: valorNum,
        status: 'pendente',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Erro ao salvar aposta' }, { status: 500 })
    }

    return NextResponse.json({ aposta: data }, { status: 201 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
