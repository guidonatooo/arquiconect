import React from 'react'
import { formatCurrency } from '@/lib/pix'

interface ScoreboardProps {
  meninoCount: number
  meninoTotal: number
  meninaCount: number
  meninaTotal: number
}

export default function Scoreboard({
  meninoCount,
  meninoTotal,
  meninaCount,
  meninaTotal,
}: ScoreboardProps) {
  const total = meninoCount + meninaCount
  const totalVal = meninoTotal + meninaTotal
  const meninoPct = total > 0 ? Math.round((meninoCount / total) * 100) : 50
  const meninaPct = total > 0 ? 100 - meninoPct : 50

  return (
    <section className="w-full animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <h2 className="text-center font-playfair text-2xl font-bold text-gray-700 mb-4">
        Placar ao vivo 📊
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Menino */}
        <div className="bg-blue-light border-2 border-blue-baby rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl mb-2">💙</div>
          <h3 className="font-playfair font-bold text-2xl text-blue-dark">Menino</h3>
          <p className="text-3xl font-extrabold text-blue-dark mt-1">
            {meninoCount}
            <span className="text-base font-semibold ml-1 text-blue-baby">
              {meninoCount === 1 ? 'aposta' : 'apostas'}
            </span>
          </p>
          <p className="text-blue-dark font-bold text-lg mt-1">
            {formatCurrency(meninoTotal)}
          </p>
          <p className="text-blue-dark/60 text-sm font-semibold mt-1">{meninoPct}% dos votos</p>
        </div>

        {/* Menina */}
        <div className="bg-pink-light border-2 border-pink-baby rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl mb-2">💗</div>
          <h3 className="font-playfair font-bold text-2xl text-pink-dark">Menina</h3>
          <p className="text-3xl font-extrabold text-pink-dark mt-1">
            {meninaCount}
            <span className="text-base font-semibold ml-1 text-pink-baby">
              {meninaCount === 1 ? 'aposta' : 'apostas'}
            </span>
          </p>
          <p className="text-pink-dark font-bold text-lg mt-1">
            {formatCurrency(meninaTotal)}
          </p>
          <p className="text-pink-dark/60 text-sm font-semibold mt-1">{meninaPct}% dos votos</p>
        </div>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="flex rounded-full overflow-hidden h-3 bg-gray-100 mb-3 shadow-inner">
          <div
            className="score-bar bg-blue-baby transition-all duration-700"
            style={{ width: `${meninoPct}%` }}
          />
          <div
            className="score-bar bg-pink-baby transition-all duration-700"
            style={{ width: `${meninaPct}%` }}
          />
        </div>
      )}

      {totalVal > 0 && (
        <p className="text-center text-sm text-gray-500 font-semibold">
          Total arrecadado:{' '}
          <span className="text-gray-700 font-bold">{formatCurrency(totalVal)}</span>
        </p>
      )}

      {total === 0 && (
        <p className="text-center text-gray-400 text-sm py-2">
          Nenhuma aposta confirmada ainda. Seja o primeiro! 🎉
        </p>
      )}
    </section>
  )
}
