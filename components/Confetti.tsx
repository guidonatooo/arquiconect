'use client'

import React, { useMemo } from 'react'

const COLORS_MENINO = ['#A7C4F4', '#D4E6FB', '#7AAAE8', '#ffffff', '#c8dffa']
const COLORS_MENINA = ['#F4A7B9', '#FCD5DF', '#E8819A', '#ffffff', '#fce4ec']

interface ConfettiProps {
  resultado: 'menino' | 'menina'
  count?: number
}

export default function Confetti({ resultado, count = 80 }: ConfettiProps) {
  const colors = resultado === 'menino' ? COLORS_MENINO : COLORS_MENINA

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`,
        duration: `${2.5 + Math.random() * 3}s`,
        delay: `${Math.random() * 4}s`,
        width: `${6 + Math.random() * 8}px`,
        height: `${10 + Math.random() * 10}px`,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resultado, count]
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            backgroundColor: p.color,
            '--duration': p.duration,
            '--delay': p.delay,
            '--w': p.width,
            '--h': p.height,
            '--br': p.borderRadius,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
