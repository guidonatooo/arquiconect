'use client'

import React, { useState, useEffect } from 'react'
import { formatDistanceToNow, parseISO, isPast } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(dateStr: string): TimeLeft {
  const target = parseISO(dateStr)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function Header() {
  const nomePais = process.env.NEXT_PUBLIC_NOME_PAIS || 'Os Papais'
  const dataRevelacao = process.env.NEXT_PUBLIC_DATA_REVELACAO || ''

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!dataRevelacao) return

    const update = () => {
      const t = getTimeLeft(dataRevelacao)
      setTimeLeft(t)
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
        setRevealed(true)
      }
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [dataRevelacao])

  return (
    <header className="relative z-20 w-full py-6 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <h1 className="font-playfair text-5xl md:text-6xl font-extrabold tracking-tight mb-2">
          <span className="text-pink-dark">Bebê</span>
          <span className="text-blue-dark">Bet</span>
          <span className="ml-2 text-4xl">🍼</span>
        </h1>

        {/* Parents name */}
        <p className="text-gray-600 font-nunito text-lg mb-4">
          O bolão do chá revelação de{' '}
          <span className="font-bold text-gray-800">{nomePais}</span> 🎉
        </p>

        {/* Countdown */}
        {dataRevelacao && (
          <div className="inline-block">
            {revealed ? (
              <div className="bg-gradient-to-r from-pink-baby to-blue-baby text-white rounded-2xl px-6 py-3 font-bold text-lg shadow-md">
                🎊 É hora da revelação!
              </div>
            ) : timeLeft ? (
              <div className="bg-white/80 backdrop-blur rounded-2xl px-6 py-3 shadow-md border border-cream-dark">
                <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-widest">
                  Revelação em
                </p>
                <div className="flex items-center gap-1 justify-center">
                  {[
                    { value: timeLeft.days, label: 'dias' },
                    { value: timeLeft.hours, label: 'hrs' },
                    { value: timeLeft.minutes, label: 'min' },
                    { value: timeLeft.seconds, label: 'seg' },
                  ].map((item, idx) => (
                    <React.Fragment key={item.label}>
                      {idx > 0 && (
                        <span className="text-gray-400 font-bold text-xl mb-3">:</span>
                      )}
                      <div className="flex flex-col items-center">
                        <span className="font-playfair font-bold text-2xl text-gray-800 min-w-[2.2rem] text-center">
                          {pad(item.value)}
                        </span>
                        <span className="text-xs text-gray-400 font-semibold">{item.label}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </header>
  )
}
