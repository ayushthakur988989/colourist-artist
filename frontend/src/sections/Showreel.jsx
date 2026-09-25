import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const chapters = [
  { id: 1, title: 'NEO-NOIR THRILLER', timecode: '00:00:12:08', film: 'ARRI Alexa Mini LF • Master Anamorphic' },
  { id: 2, title: 'AUTOMOTIVE SPEC', timecode: '00:00:34:22', film: 'RED V-Raptor 8K • Cooke S7/i' },
  { id: 3, title: 'EUPHORIA VELVET', timecode: '00:01:05:14', film: 'Sony Venice 2 • Kowa Anamorphic' },
  { id: 4, title: 'HIMALAYAN SILENCE', timecode: '00:01:42:01', film: 'Blackmagic URSA 12K • Leica R' }
]

export default function Showreel() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const [isPlayingModal, setIsPlayingModal] = useState(false)
  const [activeAspect, setActiveAspect] = useState('2.39') // '2.39' | '16:9' | '4:3'
  const [activeChapter, setActiveChapter] = useState(0)
  const [currentTimecode, setCurrentTimecode] = useState('00:01:14:18')
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the showreel image
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Timecode animation when modal is active
  useEffect(() => {
    if (!isPlayingModal || !isPlaying) return
    const interval = setInterval(() => {
      const frame = Math.floor(Math.random() * 24).toString().padStart(2, '0')
      const sec = Math.floor(Math.random() * 59).toString().padStart(2, '0')
      setCurrentTimecode(`00:01:${sec}:${frame}`)
    }, 120)
    return () => clearInterval(interval)
  }, [isPlayingModal, isPlaying])

  return (
    <section ref={sectionRef} id="showreel" className="section relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex items-start gap-4 md:gap-6 mb-8 md:mb-12">
          <TextReveal type="slideUp" className="text-section-number">01</TextReveal>
          <div>
            <TextReveal type="slideUp" delay={0.1}>
              <h2 className="text-display-lg mb-3">SHOWREEL</h2>
            </TextReveal>
            <TextReveal type="fadeIn" delay={0.3}>
              <p className="text-xs tracking-[0.2em] font-mono" style={{ color: 'var(--color-gold)' }}>
                CINEMATIC REEL 2024 — 2025 • 4K DCI MASTER
              </p>
            </TextReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left text */}
          <div className="lg:col-span-4">
            <TextReveal type="fadeIn" delay={0.2}>
              <p className="text-body mb-6 lg:mb-8 leading-relaxed">
                A definitive collection of feature films, commercial campaigns, and music videos.
                Every grade is crafted to evoke subconscious emotional resonance and enhance the cinematographer's intent.
              </p>
            </TextReveal>

            {/* Quick Reel Chapters */}
            <div className="space-y-2.5 mb-8">
              {chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  onClick={() => { setActiveChapter(idx); setIsPlayingModal(true) }}
                  className="p-2.5 rounded bg-white/[0.02] border border-white/[0.06] hover:border-[#38BDF8]/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono text-[#38BDF8]">0{idx + 1}</span>
                    <div>
                      <div className="text-xs font-medium text-gray-200 group-hover:text-[#38BDF8] transition-colors">
                        {ch.title}
                      </div>
                      <div className="text-[9px] font-mono text-gray-500">
                        {ch.film}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors">
                    {ch.timecode}
                  </span>
                </div>
              ))}
            </div>

            <TextReveal type="slideUp" delay={0.4}>
              <button
                onClick={() => setIsPlayingModal(true)}
                className="inline-flex items-center gap-3 text-xs tracking-[0.2em] font-semibold text-[#38BDF8] hover:text-[#7DD3FC] group transition-colors"
                data-cursor="PLAY"
              >
                <span>LAUNCH FULLSCREEN THEATER</span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M4 2L14 8L4 14V2Z" fill="currentColor" />
                </svg>
              </button>
            </TextReveal>
          </div>

          {/* Right video area */}
          <div className="lg:col-span-8">
            <div
              className="relative overflow-hidden group cursor-pointer rounded-lg"
              style={{
                aspectRatio: '16/9',
                border: '1px solid rgba(56, 189, 248,0.2)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              }}
              data-cursor="PLAY"
              onClick={() => setIsPlayingModal(true)}
            >
              <div ref={imageRef} className="absolute inset-0">
                {/* Photorealistic cinematic backdrop representation */}
                <div
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105 flex items-center justify-center relative"
                  style={{
                    background: 'radial-gradient(ellipse at center, #1b263b 0%, #0d1b2a 40%, #050507 90%)',
                  }}
                >
                  {/* Subtle anamorphic flare overlay */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(74,158,173,0.3)_0%,transparent_60%)]" />
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4a9ead]/40 to-transparent" />
                  
                  {/* Film reel info banner */}
                  <div className="text-center z-10 p-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#38BDF8]/30 text-[#38BDF8] font-mono text-[10px] tracking-[0.2em] mb-4">
                      <span>4K DCI • 2.39:1 • ACES 1.3</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-display tracking-widest text-white mb-2">
                      TURNING FOOTAGE INTO EMOTION
                    </h3>
                    <p className="text-xs font-mono text-gray-400 tracking-widest">
                      CLICK ANYWHERE TO ENTER CINEMATIC THEATER
                    </p>
                  </div>
                </div>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="play-button shadow-[0_0_30px_rgba(56, 189, 248,0.3)]" />
              </div>

              {/* Bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none flex items-end justify-between p-6"
                style={{ background: 'linear-gradient(to top, rgba(5,5,7,0.9), transparent)' }}
              >
                <span className="text-[10px] font-mono tracking-widest text-gray-400">
                  SURAAJ SINGH • COLOR SUITE SHOWCASE
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#38BDF8]">
                  02:48 DURATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Fullscreen Video Theater Lightbox */}
      <AnimatePresence>
        {isPlayingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
            onClick={() => setIsPlayingModal(false)}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-20" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#38BDF8]">
                  // MASTERING SUITE • 4K DCI
                </span>
                <span className="hidden sm:inline text-xs font-mono text-gray-400">
                  {chapters[activeChapter].title} ({chapters[activeChapter].film})
                </span>
              </div>

              {/* Aspect Ratio Switcher */}
              <div className="flex items-center gap-2 bg-white/[0.06] p-1 rounded border border-white/10">
                <button
                  onClick={() => setActiveAspect('2.39')}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded ${activeAspect === '2.39' ? 'bg-[#38BDF8] text-black font-bold' : 'text-gray-400'}`}
                >
                  2.39:1
                </button>
                <button
                  onClick={() => setActiveAspect('16:9')}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded ${activeAspect === '16:9' ? 'bg-[#38BDF8] text-black font-bold' : 'text-gray-400'}`}
                >
                  16:9
                </button>
                <button
                  onClick={() => setActiveAspect('4:3')}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded ${activeAspect === '4:3' ? 'bg-[#38BDF8] text-black font-bold' : 'text-gray-400'}`}
                >
                  4:3
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsPlayingModal(false)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#38BDF8] transition-all"
              >
                ✕
              </button>
            </div>

            {/* Video Player Display Container */}
            <div
              className="relative my-auto mx-auto w-full max-w-6xl overflow-hidden rounded border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] flex items-center justify-center"
              style={{
                aspectRatio: activeAspect === '2.39' ? '2.39/1' : activeAspect === '16:9' ? '16/9' : '4/3',
                maxHeight: '72vh',
                background: '#040508'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dynamic Film Grade Canvas Preview */}
              <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#060e17] via-[#161a29] to-[#2b172a]">
                
                {/* Anamorphic Flare & Bokeh */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(56, 189, 248,0.25)_0%,transparent_50%)] animate-pulse" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(74,158,173,0.3)_0%,transparent_55%)]" />

                {/* Animated Film Grain Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Film Title Watermark */}
                <div className="text-center z-10 px-4">
                  <span className="text-[11px] font-mono tracking-[0.3em] text-[#38BDF8] uppercase">
                    CHAPTER {activeChapter + 1} OF 4
                  </span>
                  <h2 className="text-3xl md:text-5xl font-display tracking-widest text-white mt-2 mb-3">
                    {chapters[activeChapter].title}
                  </h2>
                  <p className="text-xs font-mono text-gray-300 tracking-wider">
                    {chapters[activeChapter].film}
                  </p>
                </div>

                {/* Live Timecode Overlay Top Right */}
                <div className="absolute top-4 right-4 bg-black/80 px-3 py-1.5 rounded border border-white/15 font-mono text-xs text-[#00ff88] tracking-widest">
                  TC: {currentTimecode} • 24.000 FPS
                </div>

                {/* Broadcast Safe Guides */}
                <div className="absolute inset-6 border border-white/10 pointer-events-none" />
              </div>
            </div>

            {/* Bottom Timeline Controls */}
            <div className="max-w-6xl w-full mx-auto z-20 space-y-3" onClick={(e) => e.stopPropagation()}>
              {/* Progress Scrub Bar */}
              <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-gradient-to-r from-[#38BDF8] to-cyan-400 w-2/3" />
              </div>

              {/* Control Buttons & Chapters */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-4 py-1.5 rounded bg-[#38BDF8] text-black font-semibold text-xs tracking-wider font-mono flex items-center gap-1.5"
                  >
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>
                  <span className="text-xs font-mono text-gray-400">
                    {currentTimecode} / 00:02:48:00
                  </span>
                </div>

                {/* Chapter Quick Jumps */}
                <div className="flex items-center gap-2">
                  {chapters.map((ch, idx) => (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChapter(idx)}
                      className={`px-3 py-1 text-[10px] font-mono rounded transition-all ${
                        activeChapter === idx ? 'bg-white text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {idx + 1}. {ch.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section divider */}
      <div className="section-divider mt-16 md:mt-24" />
    </section>
  )
}

