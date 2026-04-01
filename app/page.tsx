'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Aposta } from '@/lib/supabase'
import Header from '@/components/Header'
import Scoreboard from '@/components/Scoreboard'
import RecentBets from '@/components/RecentBets'
import BettingModal from '@/components/BettingModal'
import Balloons from '@/components/Balloons'

type Escolha = 'menino' | 'menina'

export default function HomePage() {
  const [apostas, setApostas] = useState<Aposta[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<Escolha>('menino')

  const fetchApostas = useCallback(async () => {
    const { data } = await supabase
      .from('apostas')
      .select('*')
      .eq('status', 'confirmado')
      .order('created_at', { ascending: false })
    if (data) setApostas(data as Aposta[])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchApostas()

    const channel = supabase
      .channel('apostas-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'apostas' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newBet = payload.new as Aposta
            if (newBet.status === 'confirmado') {
              setApostas((prev) => [newBet, ...prev])
            }
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as Aposta
            setApostas((prev) => {
              const exists = prev.find((a) => a.id === updated.id)
              if (exists) {
                if (updated.status === 'confirmado') {
                  return prev.map((a) => (a.id === updated.id ? updated : a))
                }
                return prev.filter((a) => a.id !== updated.id)
              } else if (updated.status === 'confirmado') {
                return [updated, ...prev]
              }
              return prev
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchApostas])

  const openModal = (choice: Escolha) => {
    setSelectedChoice(choice)
    setModalOpen(true)
  }

  const confirmed = apostas.filter((a) => a.status === 'confirmado')
  const menino = confirmed.filter((a) => a.escolha === 'menino')
  const menina = confirmed.filter((a) => a.escolha === 'menina')
  const meninoTotal = menino.reduce((s, a) => s + a.valor, 0)
  const meninaTotal = menina.reduce((s, a) => s + a.valor, 0)

  return (
    <main className="min-h-screen bg-cream relative overflow-x-hidden">
      <Balloons />

      <div className="relative z-10">
        <Header />

        <div className="container mx-auto px-4 pb-16 max-w-2xl">
          {/* Scoreboard */}
          {!loading && (
            <Scoreboard
              meninoCount={menino.length}
              meninoTotal={meninoTotal}
              meninaCount={menina.length}
              meninaTotal={meninaTotal}
            />
          )}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-pink-baby border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Bet buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center my-8 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <button
              onClick={() => openModal('menino')}
              className="bet-btn flex-1 sm:flex-none sm:min-w-[180px]"
              style={{
                background: 'linear-gradient(135deg, #A7C4F4 0%, #7AAAE8 100%)',
              }}
            >
              <span className="text-2xl mr-2">💙</span>
              <span className="font-playfair text-xl">Apostar Menino</span>
            </button>

            <button
              onClick={() => openModal('menina')}
              className="bet-btn flex-1 sm:flex-none sm:min-w-[180px]"
              style={{
                background: 'linear-gradient(135deg, #F4A7B9 0%, #E8819A 100%)',
              }}
            >
              <span className="text-2xl mr-2">💗</span>
              <span className="font-playfair text-xl">Apostar Menina</span>
            </button>
          </div>

          {/* Rules card */}
          <div
            className="bg-white/70 backdrop-blur rounded-2xl p-4 border border-cream-dark text-center mb-6 animate-fade-up"
            style={{ animationDelay: '0.35s' }}
          >
            <p className="text-sm text-gray-500">
              💡 Aposte a partir de{' '}
              <strong className="text-gray-700">R$ 5,00</strong> via PIX.
              Quem acertar divide o prêmio! Sua aposta é confirmada após verificação do pagamento.
            </p>
          </div>

          {/* Recent bets */}
          <RecentBets apostas={confirmed.slice(0, 10)} />
        </div>
      </div>

      <BettingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialChoice={selectedChoice}
      />
    </main>
  )
}
