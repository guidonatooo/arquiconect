'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Aposta } from '@/lib/supabase'
import Confetti from '@/components/Confetti'
import { formatCurrency } from '@/lib/pix'

export default function RevelacaoPage() {
  const [resultado, setResultado] = useState<'menino' | 'menina' | null>(null)
  const [apostas, setApostas] = useState<Aposta[]>([])
  const [loading, setLoading] = useState(true)

  const mensagemPais =
    process.env.NEXT_PUBLIC_MENSAGEM_PAIS ||
    'Obrigado por fazer parte deste momento especial! Com muito amor, os papais. 💕'

  useEffect(() => {
    async function load() {
      // Fetch config
      const { data: configData } = await supabase
        .from('config')
        .select('*')
        .eq('chave', 'resultado')
        .single()

      if (configData?.valor) {
        setResultado(configData.valor as 'menino' | 'menina')
      }

      // Fetch confirmed bets
      const { data: apostasData } = await supabase
        .from('apostas')
        .select('*')
        .eq('status', 'confirmado')
        .order('valor', { ascending: false })

      if (apostasData) setApostas(apostasData as Aposta[])
      setLoading(false)
    }

    load()

    // Subscribe to config changes (real-time reveal)
    const channel = supabase
      .channel('config-reveal')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'config' },
        (payload) => {
          if (payload.new.chave === 'resultado' && payload.new.valor) {
            setResultado(payload.new.valor as 'menino' | 'menina')
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pink-baby border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!resultado) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl mb-6 animate-bounce">🍼</div>
        <h1 className="font-playfair text-4xl font-bold text-gray-700 mb-4">
          A revelação está chegando...
        </h1>
        <p className="text-gray-500 text-lg max-w-sm">
          Aguarde! O resultado ainda não foi revelado.
          Esta página será atualizada automaticamente! 🎉
        </p>
        <a href="/" className="mt-8 text-sm text-gray-400 hover:text-gray-600 underline">
          ← Voltar ao bolão
        </a>
      </div>
    )
  }

  const isMenino = resultado === 'menino'
  const vencedores = apostas.filter((a) => a.escolha === resultado)
  const perdedores = apostas.filter((a) => a.escolha !== resultado)
  const totalPremio = apostas.reduce((s, a) => s + a.valor, 0)
  const totalVencedores = vencedores.reduce((s, a) => s + a.valor, 0)

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: isMenino ? '#D4E6FB' : '#FCD5DF' }}
    >
      <Confetti resultado={resultado} count={100} />

      <div className="relative z-20 container mx-auto px-4 py-12 max-w-2xl">
        {/* Main announcement */}
        <div className="text-center mb-10 animate-bounce-in">
          <div className="text-8xl mb-6">{isMenino ? '💙' : '💗'}</div>
          <h1
            className="font-playfair text-6xl md:text-7xl font-extrabold mb-4"
            style={{ color: isMenino ? '#2563eb' : '#be185d' }}
          >
            É {isMenino ? 'MENINO' : 'MENINA'}!
          </h1>
          <div
            className="text-5xl font-bold animate-bounce"
            style={{ color: isMenino ? '#7AAAE8' : '#E8819A' }}
          >
            {isMenino ? '👶💙🎉' : '👶💗🎉'}
          </div>
        </div>

        {/* Parents message */}
        <div
          className="rounded-2xl p-6 text-center mb-8 shadow-md border-2 animate-fade-up"
          style={{
            background: 'rgba(255,255,255,0.8)',
            borderColor: isMenino ? '#A7C4F4' : '#F4A7B9',
            animationDelay: '0.3s',
          }}
        >
          <p className="text-lg text-gray-700 italic leading-relaxed">
            &ldquo;{mensagemPais}&rdquo;
          </p>
        </div>

        {/* Financial summary */}
        <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white/80 rounded-xl p-4 text-center shadow-sm border border-white">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total arrecadado</p>
            <p className="font-playfair text-2xl font-bold text-gray-800">
              {formatCurrency(totalPremio)}
            </p>
          </div>
          <div className="bg-white/80 rounded-xl p-4 text-center shadow-sm border border-white">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Apostas certas</p>
            <p className="font-playfair text-2xl font-bold text-gray-800">{vencedores.length}</p>
          </div>
        </div>

        {/* Winners */}
        {vencedores.length > 0 && (
          <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <h2 className="font-playfair text-2xl font-bold text-center text-gray-800 mb-4">
              🏆 Quem acertou!
            </h2>
            <div className="space-y-3">
              {vencedores.map((a, i) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between bg-white/90 rounded-xl px-5 py-3 shadow-sm border border-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-500 text-sm w-6">
                      {i + 1}.
                    </span>
                    <div>
                      <p className="font-bold text-gray-800">{a.nome}</p>
                      <p className="text-xs text-gray-400">{formatCurrency(a.valor)} apostados</p>
                    </div>
                  </div>
                  <span className="text-2xl">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '✨'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Losers (with grace) */}
        {perdedores.length > 0 && (
          <div className="mt-8 animate-fade-up" style={{ animationDelay: '0.7s' }}>
            <h2 className="font-playfair text-lg font-bold text-center text-gray-600 mb-3">
              Participantes que torceram por {isMenino ? 'menina' : 'menino'} 🤍
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {perdedores.map((a) => (
                <span
                  key={a.id}
                  className="bg-white/60 rounded-full px-3 py-1 text-sm text-gray-600 border border-white/80"
                >
                  {a.nome}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-10">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700 underline">
            ← Voltar ao bolão
          </a>
        </div>
      </div>
    </div>
  )
}
