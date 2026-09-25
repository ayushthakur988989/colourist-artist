import { useRef, useEffect, useState } from 'react'

/**
 * Ultra-responsive GPU-accelerated Custom Cursor
 * Instant dot tracking + smooth responsive trailing ring
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const textRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const mouse = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Check for touch devices
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) return

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      // Update dot instantly on mousemove for zero-latency response
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        setIsHovering(true)
        setCursorText(target.getAttribute('data-cursor') || '')
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        setIsHovering(false)
        setCursorText('')
      }
    }

    const handleOverInteractive = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select, label')
      if (interactive && !interactive.hasAttribute('data-cursor')) {
        setIsHovering(true)
      }
    }

    const handleOutInteractive = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select, label')
      if (interactive && !interactive.hasAttribute('data-cursor')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    document.addEventListener('mouseover', handleOverInteractive, { passive: true })
    document.addEventListener('mouseout', handleOutInteractive, { passive: true })

    // Animation loop for snappy, responsive ring trailing
    let rafId
    const animate = () => {
      // Ring follows with responsive lerp factor (0.35 for snappy yet smooth motion)
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.35
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.35

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y + 30}px, 0) translate(-50%, -50%)`
      }

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseover', handleOverInteractive)
      document.removeEventListener('mouseout', handleOutInteractive)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${isHovering ? 'hovering' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${isHovering ? 'hovering' : ''}`} />
      <div ref={textRef} className={`cursor-text ${cursorText ? 'visible' : ''}`}>
        {cursorText}
      </div>
    </>
  )
}
