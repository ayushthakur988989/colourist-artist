import { useEffect, useRef, useMemo } from 'react'

/**
 * CSS-based foreground particles that float across the viewport
 * Creates the illusion of depth in front of content
 */
export default function ForegroundParticles({ count = 15 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const type = Math.random()
      let colorClass = 'fg-particle--gold'
      if (type > 0.6) colorClass = 'fg-particle--white'
      else if (type > 0.35) colorClass = 'fg-particle--cyan'

      const size = 2 + Math.random() * 4
      const duration = 15 + Math.random() * 25
      const delay = Math.random() * duration

      return {
        key: i,
        colorClass,
        size,
        left: Math.random() * 100,
        duration,
        delay,
        drift: (Math.random() - 0.5) * 100,
      }
    })
  }, [count])

  return (
    <div className="foreground-particles">
      {particles.map((p) => (
        <div
          key={p.key}
          className={`fg-particle ${p.colorClass}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: '-10px',
            animation: `particleFloat ${p.duration}s linear ${p.delay}s infinite`,
            filter: `blur(${p.size > 4 ? 1 : 0}px)`,
            opacity: 0.4 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  )
}

/**
 * Scroll progress bar at top of viewport
 */
export function ScrollProgress({ progress = 0 }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-px z-[100]"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, var(--color-gold-dim), var(--color-gold), var(--color-gold-bright))',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 10px rgba(56, 189, 248, 0.3)',
        }}
      />
    </div>
  )
}
