import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Text reveal animation component
 * Supports: 'slideUp', 'fadeIn', 'charByChar', 'wordByWord'
 */
export default function TextReveal({
  children,
  type = 'slideUp',
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  className = '',
  as: Tag = 'div',
  triggerOnScroll = true,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const el = containerRef.current
    let ctx = gsap.context(() => {
      const triggerConfig = triggerOnScroll
        ? {
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        : {}

      switch (type) {
        case 'slideUp':
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration, delay, ease: 'power3.out', ...triggerConfig }
          )
          break

        case 'fadeIn':
          gsap.fromTo(
            el,
            { opacity: 0 },
            { opacity: 1, duration, delay, ease: 'power2.out', ...triggerConfig }
          )
          break

        case 'charByChar': {
          const text = el.textContent
          el.innerHTML = ''
          el.style.opacity = 1
          const chars = text.split('').map((char) => {
            const span = document.createElement('span')
            span.textContent = char === ' ' ? '\u00A0' : char
            span.style.display = 'inline-block'
            span.style.opacity = '0'
            span.style.transform = 'translateY(30px)'
            el.appendChild(span)
            return span
          })
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger,
            delay,
            ease: 'power3.out',
            ...triggerConfig,
          })
          break
        }

        case 'wordByWord': {
          const text = el.textContent
          el.innerHTML = ''
          el.style.opacity = 1
          const words = text.split(' ').map((word, i) => {
            const span = document.createElement('span')
            span.textContent = word
            span.style.display = 'inline-block'
            span.style.opacity = '0'
            span.style.transform = 'translateY(20px)'
            span.style.marginRight = '0.3em'
            el.appendChild(span)
            return span
          })
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: stagger * 3,
            delay,
            ease: 'power3.out',
            ...triggerConfig,
          })
          break
        }

        default:
          break
      }
    }, el)

    return () => ctx.revert()
  }, [type, delay, duration, stagger, triggerOnScroll])

  return (
    <Tag ref={containerRef} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  )
}
