import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initialize Lenis smooth scrolling synced with GSAP ScrollTrigger
 */
export function useSmoothScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return lenisRef
}

/**
 * Create scroll-triggered animations using GSAP
 */
export function createScrollAnimation(element, animation, triggerOptions = {}) {
  if (!element) return null

  const defaultTrigger = {
    trigger: element,
    start: 'top 85%',
    end: 'bottom 15%',
    toggleActions: 'play none none reverse',
    ...triggerOptions,
  }

  return gsap.fromTo(element, animation.from, {
    ...animation.to,
    scrollTrigger: defaultTrigger,
  })
}

/**
 * Preset animation configs
 */
export const animationPresets = {
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 1, ease: 'power2.out' },
  },
  slideLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
  },
  slideRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
  },
  lineReveal: {
    from: { scaleX: 0, transformOrigin: 'left center' },
    to: { scaleX: 1, duration: 1.2, ease: 'power3.inOut' },
  },
}
