import React from 'react'

const BALLOONS = [
  { color: '#F4A7B9', left: '5%', duration: '9s', delay: '0s', sway: '3.5s' },
  { color: '#A7C4F4', left: '14%', duration: '12s', delay: '2.5s', sway: '4.5s' },
  { color: '#F4A7B9', left: '25%', duration: '8s', delay: '5s', sway: '3s' },
  { color: '#A7C4F4', left: '38%', duration: '11s', delay: '1.2s', sway: '5s' },
  { color: '#FCD5DF', left: '52%', duration: '10s', delay: '3.8s', sway: '4s' },
  { color: '#D4E6FB', left: '64%', duration: '13s', delay: '0.8s', sway: '3.8s' },
  { color: '#F4A7B9', left: '75%', duration: '9.5s', delay: '6s', sway: '4.2s' },
  { color: '#A7C4F4', left: '85%', duration: '11.5s', delay: '2s', sway: '3.2s' },
  { color: '#FCD5DF', left: '92%', duration: '8.5s', delay: '4.5s', sway: '5s' },
]

export default function Balloons() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          className="balloon"
          style={{
            left: b.left,
            backgroundColor: b.color,
            '--duration': b.duration,
            '--delay': b.delay,
            '--sway-dur': b.sway,
            boxShadow: `inset -4px -6px 0 rgba(0,0,0,0.07)`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
