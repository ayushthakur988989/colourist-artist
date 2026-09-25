import { useState, useEffect, useCallback } from 'react'

/**
 * Track normalized mouse position (-1 to 1)
 * Used for 3D parallax and custom cursor
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rawPosition, setRawPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let rafId = null

    const handleMouseMove = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        setPosition({ x, y })
        setRawPosition({ x: e.clientX, y: e.clientY })
        rafId = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return { normalized: position, raw: rawPosition }
}

/**
 * Track scroll progress (0 to 1)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let rafId = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const prog = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
        setProgress(prog)
        setScrollY(scrollTop)
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return { progress, scrollY }
}

/**
 * Detect device capabilities for adaptive 3D quality
 */
export function useDeviceDetect() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasWebGL: true,
    pixelRatio: 1,
    performanceTier: 'high', // 'low', 'medium', 'high'
  })

  useEffect(() => {
    const width = window.innerWidth
    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1024
    const isDesktop = width >= 1024

    // Check WebGL support
    let hasWebGL = false
    try {
      const canvas = document.createElement('canvas')
      hasWebGL = !!(
        canvas.getContext('webgl2') || canvas.getContext('webgl')
      )
    } catch (e) {
      hasWebGL = false
    }

    // Determine performance tier
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    let performanceTier = 'high'
    if (isMobile) performanceTier = 'low'
    else if (isTablet) performanceTier = 'medium'
    else if (pixelRatio < 1.5) performanceTier = 'medium'

    setDevice({
      isMobile,
      isTablet,
      isDesktop,
      hasWebGL,
      pixelRatio,
      performanceTier,
    })

    const handleResize = () => {
      const w = window.innerWidth
      setDevice((prev) => ({
        ...prev,
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1024,
        isDesktop: w >= 1024,
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return device
}

/**
 * Detect prefers-reduced-motion
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)

    const handler = (e) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}

/**
 * Intersection observer for scroll-triggered animations
 */
export function useInView(options = {}) {
  const [ref, setRef] = useState(null)
  const [isInView, setIsInView] = useState(false)

  const callbackRef = useCallback((node) => {
    setRef(node)
  }, [])

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (options.once) {
            observer.unobserve(ref)
          }
        } else if (!options.once) {
          setIsInView(false)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, options.once, options.threshold, options.rootMargin])

  return [callbackRef, isInView]
}
