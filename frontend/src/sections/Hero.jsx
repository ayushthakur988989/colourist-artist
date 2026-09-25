import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import MagneticButton from '../components/ui/MagneticButton'
import SSLogo from '../components/ui/SSLogo'

const services = [
  { icon: '🎨', label: 'COLOR GRADING & ACES PIPELINE' },
  { icon: '🎬', label: 'OFFLINE & ONLINE CONFORM' },
  { icon: '✨', label: 'DCI MASTERING (DAVINCI RESOLVE STUDIO)' },
]

const techBadges = [
  'ACES 1.3',
  'ARRI RAW',
  'RED IPP2',
  'DOLBY VISION',
  'DCI-P3 D65',
  'KODAK 5219 EMULATION'
]

export default function Hero() {
  const containerRef = useRef(null)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIntroComplete(true),
      })

      // Cinematic intro sequence
      tl.set('.hero-content', { visibility: 'visible' })
        .fromTo('.hero-particles-overlay', { opacity: 1 }, { opacity: 0, duration: 1.5, delay: 0.3 })
        .fromTo(
          '.hero-status-badge',
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=1.2'
        )
        .fromTo(
          '.hero-ss-logo',
          { opacity: 0, scale: 0.7, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
          '-=0.9'
        )
        .fromTo(
          '.hero-logo-shine',
          { left: '-100%', opacity: 1 },
          { left: '200%', opacity: 0, duration: 1, ease: 'power2.inOut' },
          '-=0.5'
        )
        .fromTo(
          '.hero-name',
          { opacity: 0, y: 40, filter: 'blur(5px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-tagline',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-divider',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
          '-=0.3'
        )
        .fromTo(
          '.hero-service',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          '.hero-tech-badges',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          '.hero-scroll-indicator',
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-[#030405] py-28 md:py-32"
    >
      {/* Dark overlay that fades out during intro */}
      <div
        className="hero-particles-overlay absolute inset-0 z-10"
        style={{ background: 'var(--color-cinematic-black)', pointerEvents: 'none' }}
      />

      {/* Editorial light, film-grain, and frame details */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_37%,rgba(56,189,248,0.18),transparent_26%),radial-gradient(circle_at_72%_28%,rgba(217,168,75,0.13),transparent_22%),linear-gradient(115deg,#030405_8%,#0b1117_50%,#030405_90%)]" />
      <div className="pointer-events-none absolute inset-x-[7%] top-20 h-px bg-gradient-to-r from-transparent via-[#D9A84B]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-[7%] bottom-20 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/50 to-transparent" />
      <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 xl:block">
        <p className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-mono tracking-[0.38em] text-white/30">SURAJ SINGH · COLOR SCIENCE · 2025</p>
      </div>
      <div className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 xl:block">
        <p className="[writing-mode:vertical-rl] text-[9px] font-mono tracking-[0.38em] text-[#D9A84B]/60">REC 709 · DCI-P3 · ACES 1.3</p>
      </div>

      {/* Main content */}
      <div className="hero-content relative z-20 w-full max-w-6xl px-5 text-center" style={{ visibility: 'hidden' }}>
        
        {/* Availability Badge */}
        <div className="hero-status-badge mb-8 inline-flex items-center gap-2 rounded-full border border-[#D9A84B]/35 bg-black/45 px-4 py-2 shadow-[0_0_30px_rgba(217,168,75,0.08)] backdrop-blur-md lg:ml-[42%]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 -ml-3.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono text-[#F3C56B]">
            Available for Worldwide Commissions • Remote & On-Site
          </span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24 xl:gap-44">
          {/* SS Metallic Emblem Logo */}
          <div className="flex justify-center lg:justify-end">
            <div className="hero-ss-logo inline-block rounded-full p-1 shadow-[0_0_80px_rgba(56,189,2cd 48,0.12)]">
              <SSLogo size="hero" />
            </div>
          </div>

          <div className="text-center lg:text-left">

            {/* Name */}
            <p className="hero-name mb-3 text-[10px] font-mono tracking-[0.48em] text-[#D9A84B] md:text-xs">THE COLORIST&apos;S CUT</p>
            <h1 className="hero-name mb-4 text-5xl font-black tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[5.8rem]">
              <span className="bg-gradient-to-b from-white via-[#F4F4F2] to-[#94A3B8] bg-clip-text text-transparent">SURAJ </span>
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#D9A84B] to-[#F6D78B] bg-clip-text text-transparent">SINGH</span>
            </h1>

        {/* Tagline */}
            <p
              className="hero-tagline mx-auto mb-7 max-w-xl text-xs font-light uppercase tracking-[0.28em] text-slate-300 md:mb-9 md:text-base md:tracking-[0.38em] lg:mx-0"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Cinematic Colorist & Finishing Artist
            </p>

        {/* Divider */}
        <div
          className="hero-divider mx-auto mb-8 md:mb-10 lg:mx-0"
          style={{
            width: '210px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #D9A84B, #38BDF8, #D9A84B, transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Core Services */}
        <div className="mb-10 flex flex-wrap justify-center gap-2.5 md:mb-12 md:gap-3 lg:justify-start">
          {services.map((service) => (
            <div
              key={service.label}
              className="hero-service flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.035] px-3 py-2 backdrop-blur-sm transition-colors hover:border-[#D9A84B]/45"
            >
              <span className="text-sm">{service.icon}</span>
              <span
                className="text-xs tracking-[0.15em] font-light"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'Inter, sans-serif' }}
              >
                {service.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mb-11 flex flex-col items-center justify-center gap-4 sm:flex-row md:mb-12 md:gap-6 lg:justify-start">
          <MagneticButton
            href="#showreel"
            className="hero-cta btn-primary"
            dataCursor="PLAY"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#showreel')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2L14 8L4 14V2Z" fill="currentColor" />
            </svg>
            WATCH 2024-2025 SHOWREEL
          </MagneticButton>

          <MagneticButton
            href="#grading"
            className="hero-cta btn-outline"
            dataCursor="EXPLORE"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#grading')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            EXPLORE COLOR SUITE
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
        </div>

        {/* Technical Badges Banner */}
        <div className="hero-tech-badges mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-3 backdrop-blur-sm md:gap-3 lg:mx-0 lg:justify-start">
          {techBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-sm border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400"
            >
              {badge}
            </span>
          ))}
        </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.3em] font-mono text-gray-500 uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, #38BDF8, transparent)' }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="cinematic-gradient-bottom" />
    </section>
  )
}
