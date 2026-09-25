import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '8+', label: 'YEARS IN COLOR SUITE' },
  { value: '140+', label: 'COMMERCIALS & FILMS' },
  { value: '45M+', label: 'STREAM & THEATRICAL VIEWS' },
  { value: '100%', label: 'D65 COLOR ACCURACY' }
]

const portraitGrades = {
  'original': {
    name: 'NATURAL STUDIO',
    filter: 'contrast(1.05) saturate(1.05) brightness(1.0)',
    accent: '#38BDF8',
    desc: 'Calibrated D65 Reference Master'
  },
  'cyberpunk': {
    name: 'CYBER NEON 2077',
    filter: 'contrast(1.3) saturate(1.4) hue-rotate(-15deg) brightness(1.05)',
    accent: '#38BDF8',
    desc: 'Hot Magenta & Electric Cyan Separation'
  },
  'kodak': {
    name: '35mm KODAK 5219',
    filter: 'contrast(1.2) saturate(1.1) sepia(0.2) brightness(0.98)',
    accent: '#FFB703',
    desc: 'Golden Tungsten Skin & Rich Halation'
  },
  'noir': {
    name: 'NOIR MONOCHROME',
    filter: 'contrast(1.5) grayscale(1) brightness(0.95)',
    accent: '#E2E8F0',
    desc: 'High-Density Silver Halide Emulation'
  },
  'tealOrange': {
    name: 'TEAL & ORANGE',
    filter: 'contrast(1.25) saturate(1.3) hue-rotate(15deg) brightness(1.02)',
    accent: '#7EDAB9',
    desc: 'Complementary Chromatic Dynamics'
  }
}

export default function About() {
  const sectionRef = useRef(null)
  const [activeGrade, setActiveGrade] = useState('original')
  const currentGrade = portraitGrades[activeGrade]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section relative bg-[#040508] overflow-hidden">
      {/* Crazy Ambient Neon Background Lights */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#38BDF8]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#7EDAB9]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#38BDF8]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-start gap-4 md:gap-6 mb-12 md:mb-16">
          <TextReveal type="slideUp" className="text-section-number">08</TextReveal>
          <div>
            <TextReveal type="slideUp" delay={0.1}>
              <h2 className="text-display-lg mb-3">THE ARTIST</h2>
            </TextReveal>
            <TextReveal type="fadeIn" delay={0.3}>
              <p className="text-xs tracking-[0.25em] font-mono text-[#38BDF8]">
                SURAJ SINGH • SENIOR CINEMATIC COLORIST & MASTERING ARTIST
              </p>
            </TextReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: High-Tech Interactive Artist Portrait Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-[#38BDF8]/40 via-[#38BDF8]/40 to-[#7EDAB9]/40 shadow-[0_0_50px_rgba(56, 189, 248,0.2)] group">
              
              {/* Inner Frame */}
              <div className="relative rounded-xl overflow-hidden bg-[#06080e] aspect-[3/4] flex flex-col justify-between">
                
                {/* Artist Photo with Live Dynamic CSS Grading Filter */}
                <img
                  src="/user image.jpeg"
                  alt="Suraj Singh - Senior Cinematic Colorist"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  style={{ filter: currentGrade.filter }}
                />

                {/* Cyberpunk Optical Scan Line */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30" />

                {/* Top HUD Overlay */}
                <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="w-2.5 h-2.5 -ml-4.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">
                      STUDIO MASTER
                    </span>
                  </div>
                  <span
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border tracking-widest uppercase transition-colors"
                    style={{
                      borderColor: `${currentGrade.accent}60`,
                      color: currentGrade.accent,
                      background: 'rgba(0,0,0,0.6)'
                    }}
                  >
                    {currentGrade.name}
                  </span>
                </div>

                {/* Bottom HUD Information Overlay */}
                <div className="relative z-20 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white tracking-wider">
                        SURAJ SINGH
                      </h3>
                      <p className="text-[11px] font-mono text-[#38BDF8] tracking-widest uppercase">
                        COLORIST & FINISHING ARTIST
                      </p>
                    </div>
                    <div className="text-right font-mono text-[9px] text-cyan-400">
                      <div>DCI-P3 / ACES 1.3</div>
                      <div className="text-gray-400">MUMBAI & GLOBAL</div>
                    </div>
                  </div>

                  {/* Active Look Tagline */}
                  <p className="text-[10px] font-mono text-gray-300 pt-2 border-t border-white/10 flex items-center justify-between">
                    <span>LOOK: {currentGrade.desc}</span>
                    <span className="text-[#38BDF8]">● 24 FPS D65</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Portrait Look Selector Switcher */}
            <div className="mt-4 p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col gap-2">
              <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase">
                // CLICK TO SWITCH REAL-TIME PORTRAIT GRADE:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {Object.keys(portraitGrades).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveGrade(key)}
                    className={`px-2 py-1 text-[9px] font-mono rounded uppercase transition-all truncate text-center ${
                      activeGrade === key
                        ? 'bg-[#38BDF8] text-black font-bold shadow-[0_0_12px_rgba(56, 189, 248,0.4)]'
                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                    }`}
                    title={portraitGrades[key].name}
                  >
                    {portraitGrades[key].name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Credentials */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <TextReveal type="slideUp" delay={0.1}>
                <h3 className="text-3xl md:text-5xl font-display text-white mb-6 leading-tight font-bold">
                  "Color is the subconscious heartbeat of cinema."
                </h3>
              </TextReveal>

              <TextReveal type="fadeIn" delay={0.2}>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light mb-5">
                  I am <strong className="text-white font-medium">Suraj Singh</strong>, a senior colorist and visual finishing specialist based in Mumbai, collaborating with acclaimed directors, cinematographers, and global production houses across feature films, commercial campaigns, and music videos.
                </p>
              </TextReveal>

              <TextReveal type="fadeIn" delay={0.3}>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mb-5">
                  My craft merges the tactile nostalgia of photochemical film stocks (<strong className="text-[#38BDF8]">Kodak Vision3 5219, Fuji Eterna</strong>) with rigorous 32-bit float <strong className="text-cyan-400">ACES & DaVinci Resolve Studio</strong> color science. Whether sculpting skin tones under harsh sunlight or building high-concept cyberpunk neons, every frame is treated with surgical precision.
                </p>
              </TextReveal>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-3 py-1 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 text-xs font-mono">
                  ★ DAVINCI RESOLVE STUDIO CERTIFIED
                </span>
                <span className="px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono">
                  ★ ACES 1.3 COLOR PIPELINE
                </span>
                <span className="px-3 py-1 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 text-xs font-mono">
                  ★ DOLBY VISION HDR & DCI-P3
                </span>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="stat-card p-4 rounded-xl bg-[#08090E]/90 border border-white/[0.08] text-center group hover:border-[#38BDF8]/50 transition-all hover:shadow-[0_0_20px_rgba(56, 189, 248,0.15)]"
                >
                  <div
                    className="text-2xl md:text-3xl font-display font-bold mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF, #38BDF8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono tracking-wider text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="section-divider mt-16 md:mt-24" />
    </section>
  )
}

