import React from 'react'
import type { Aposta } from '@/lib/supabase'
import { formatCurrency } from '@/lib/pix'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface RecentBetsProps {
  apostas: Aposta[]
}

export default function RecentBets({ apostas }: RecentBetsProps) {
  if (apostas.length === 0) return null

  return (
    <section className="mt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
      <h2 className="font-playfair text-2xl font-bold text-gray-700 mb-4 text-center">
        Últimas apostas ✨
      </h2>
      <div className="space-y-2">
        {apostas.map((aposta, i) => (
          <div
            key={aposta.id}
            className={`flex items-center justify-between rounded-xl px-4 py-3 border-2 shadow-sm transition-all
              ${
                aposta.escolha === 'menino'
                  ? 'bg-blue-light border-blue-baby/50'
                  : 'bg-pink-light border-pink-baby/50'
              }`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{aposta.escolha === 'menino' ? '💙' : '💗'}</span>
              <div>
                <p className="font-bold text-gray-800 text-sm">{aposta.nome}</p>
                <p
                  className={`text-xs font-semibold ${
                    aposta.escolha === 'menino' ? 'text-blue-dark' : 'text-pink-dark'
                  }`}
                >
                  {aposta.escolha === 'menino' ? 'Menino' : 'Menina'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">{formatCurrency(aposta.valor)}</p>
              <p className="text-xs text-gray-400">
                {format(parseISO(aposta.created_at), "dd/MM 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
