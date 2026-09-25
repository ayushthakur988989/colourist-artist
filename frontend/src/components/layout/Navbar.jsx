import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import SSLogo from '../ui/SSLogo'

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'SHOWREEL', href: '#showreel' },
  { label: 'COLOR SUITE', href: '#grading' },
  { label: 'COLOR LAB', href: '#lab' },
  { label: 'WORK', href: '#work' },
  { label: 'PROCESS', href: '#process' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [lightingMode, setLightingMode] = useState('cinema') // 'cinema' | 'd65' | 'warm'
  const audioRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  // Handle Suite Ambient Lighting Mode
  useEffect(() => {
    const root = document.documentElement
    if (lightingMode === 'd65') {
      root.style.setProperty('--color-cinematic-black', '#0a0d12')
      root.style.setProperty('--color-charcoal', '#141820')
    } else if (lightingMode === 'warm') {
      root.style.setProperty('--color-cinematic-black', '#0d0a06')
      root.style.setProperty('--color-charcoal', '#1c150c')
    } else {
      root.style.setProperty('--color-cinematic-black', '#050507')
      root.style.setProperty('--color-charcoal', '#0f0f12')
    }
  }, [lightingMode])

  const playAudio = async () => {
    const audio = audioRef.current
    if (!audio) return false
    try {
      const promise = audio.play()
      if (promise !== undefined) {
        await promise
        setIsPlayingAudio(true)
        return true
      }
      return false
    } catch (err) {
      console.log('Autoplay deferred until user interaction:', err)
      return false
    }
  }

  useEffect(() => {
    let played = false

    const attemptPlay = () => {
      if (played) return
      playAudio().then((didPlay) => {
        if (didPlay) {
          played = true
          removeListeners()
        }
      })
    }

    const interactionEvents = ['click', 'pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel', 'mousemove']

    const removeListeners = () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, attemptPlay, { capture: true })
      })
    }

    // Attempt immediate autoplay on page load/reload
    attemptPlay()

    // Attach listeners for immediate playback on first interaction if blocked by browser policy
    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, attemptPlay, { capture: true, passive: true })
    })

    return () => {
      removeListeners()
    }
  }, [])

  const toggleAmbientAudio = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      await playAudio()
    } else {
      audio.pause()
      setIsPlayingAudio(false)
    }
  }

  const handleNavClick = (href) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/intro-audio.mpeg"
        autoPlay
        preload="auto"
        onPlay={() => setIsPlayingAudio(true)}
        onPause={() => setIsPlayingAudio(false)}
        onEnded={() => setIsPlayingAudio(false)}
      />
      <nav
        className="fixed top-0 left-0 right-0 z-[90] transition-all duration-500"
        style={{
          background: isScrolled ? 'rgba(5, 5, 7, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3.5 md:py-4 flex items-center justify-between">
          {/* SS Brand Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
            className="flex items-center gap-3 group relative z-10"
            data-cursor="HOME"
          >
            <SSLogo size="nav" />
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-[0.2em] text-white group-hover:text-[#38BDF8] transition-colors">
                SURAJ SINGH
              </span>
              <span className="text-[8px] tracking-[0.25em] font-mono text-gray-400">
                COLOR & FINISHING
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6 lg:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.2em] font-medium text-gray-400 hover:text-[#38BDF8] transition-colors duration-300 relative py-1 group"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#38BDF8] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Tools: Ambient Sound & Bias Lighting & CTA */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Bias Lighting Selector (Cinema / D65 / Warm) */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-black/50 border border-white/10 text-[10px] font-mono">
              <button
                onClick={() => setLightingMode('cinema')}
                title="Cinema Dark Room (0 Nit Ambient)"
                className={`px-2 py-0.5 rounded-full transition-all ${
                  lightingMode === 'cinema' ? 'bg-[#38BDF8] text-black font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                CINEMA
              </button>
              <button
                onClick={() => setLightingMode('d65')}
                title="D65 6500K Broadcast Suite"
                className={`px-2 py-0.5 rounded-full transition-all ${
                  lightingMode === 'd65' ? 'bg-cyan-500 text-black font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                D65
              </button>
              <button
                onClick={() => setLightingMode('warm')}
                title="3200K Warm Tungsten"
                className={`px-2 py-0.5 rounded-full transition-all ${
                  lightingMode === 'warm' ? 'bg-amber-600 text-white font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                3200K
              </button>
            </div>

            {/* Ambient Sound Audio Toggle */}
            <button
              onClick={toggleAmbientAudio}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-white/10 bg-black/40 hover:border-[#38BDF8]/50 transition-all text-[10px] font-mono text-gray-300"
              title={isPlayingAudio ? 'Mute Studio Ambient Tone' : 'Play Studio Ambient Hum'}
            >
              <div className="flex items-end gap-0.5 h-3">
                <span className={`w-0.5 bg-[#38BDF8] rounded-full transition-all duration-300 ${isPlayingAudio ? 'h-3 animate-pulse' : 'h-1'}`} />
                <span className={`w-0.5 bg-[#38BDF8] rounded-full transition-all duration-300 ${isPlayingAudio ? 'h-2 animate-bounce' : 'h-1.5'}`} />
                <span className={`w-0.5 bg-[#38BDF8] rounded-full transition-all duration-300 ${isPlayingAudio ? 'h-3.5 animate-pulse' : 'h-1'}`} />
              </div>
              <span className="hidden sm:inline">
                {isPlayingAudio ? 'AUDIO ON' : 'AUDIO OFF'}
              </span>
            </button>

            {/* Let's Talk CTA */}
            <MagneticButton
              href="#contact"
              strength={0.2}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] font-medium border border-[rgba(56, 189, 248,0.4)] text-[#38BDF8] hover:bg-[rgba(56, 189, 248,0.15)] transition-all duration-300 rounded-sm"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
              dataCursor="TALK"
            >
              LET'S TALK
            </MagneticButton>

            {/* Mobile hamburger */}
            <button
              className="xl:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5 p-1 rounded bg-black/40 border border-white/10"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-0.5 bg-[#e8e8ec] transition-all duration-300"
                style={{
                  transform: isMobileOpen ? 'rotate(45deg) translateY(4px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-0.5 bg-[#e8e8ec] transition-all duration-300"
                style={{
                  opacity: isMobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 bg-[#e8e8ec] transition-all duration-300"
                style={{
                  transform: isMobileOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col items-center justify-center gap-6 p-6"
            style={{
              background: 'rgba(5, 5, 7, 0.96)',
              backdropFilter: 'blur(30px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-xl tracking-[0.25em] font-light text-[#e8e8ec] hover:text-[#38BDF8] transition-colors"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              className="mt-4 px-8 py-3 text-xs tracking-[0.2em] font-semibold bg-[#38BDF8] text-black rounded"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              BOOK COLOR SESSION
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
