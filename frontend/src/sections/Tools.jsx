import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const toolset = [
  {
    name: 'DaVinci Resolve Studio',
    category: 'COLOR & FINISHING',
    icon: '🎛️',
    description: 'Primary grading environment. Node-based color science, ACES workflows, HDR grading palettes, and optical flow retiming.',
    proficiency: '99%',
    accent: '#38BDF8'
  },
  {
    name: 'Adobe Premiere Pro',
    category: 'EDITORIAL CONFORM',
    icon: '🎞️',
    description: 'Master conforming, roundtrip XML/EDL synchronization, high-bitrate ProRes/DNxHR master assembling, and audio sync.',
    proficiency: '95%',
    accent: '#7EDAB9'
  },
  {
    name: 'Adobe After Effects',
    category: 'VFX & COMPOSITING',
    icon: '✨',
    description: '3D camera tracking, sky replacements, complex rotoscoping, object cleanups, visual atmosphere, and motion graphics.',
    proficiency: '92%',
    accent: '#9D4EDD'
  },
  {
    name: 'Dehancer Pro & FilmConvert',
    category: 'FILM STOCK EMULATION',
    icon: '📽️',
    description: 'Accurate photochemical modeling: organic 35mm/16mm grain structures, halation, bloom, gate weave, and print film profiles.',
    proficiency: '96%',
    accent: '#6366F1'
  },
  {
    name: 'ACES Pipeline',
    category: 'COLOR MANAGEMENT',
    icon: '🌐',
    description: 'Academy Color Encoding System standard. Wide-gamut color space mapping ensuring consistent look across multi-camera shoots.',
    proficiency: '98%',
    accent: '#00DFD8'
  },
  {
    name: 'Hardware Reference Suite',
    category: 'MONITORING & CONTROL',
    icon: '🖥️',
    description: 'Flanders Scientific calibrated 10-bit reference displays, Blackmagic DeckLink 4K 12G-SDI output, and dedicated grading control surfaces.',
    proficiency: '100%',
    accent: '#38BDF8'
  }
]

export default function Tools() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tool-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
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
    <section ref={sectionRef} id="tools" className="section relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-start gap-4 md:gap-6 mb-10 md:mb-14">
          <TextReveal type="slideUp" className="text-section-number">07</TextReveal>
          <div>
            <TextReveal type="slideUp" delay={0.1}>
              <h2 className="text-display-lg mb-3">TOOLS & HARDWARE</h2>
            </TextReveal>
            <TextReveal type="fadeIn" delay={0.3}>
              <p className="text-xs tracking-[0.15em]" style={{ color: 'var(--color-gold-dim)' }}>
                INDUSTRY-STANDARD SOFTWARE & PRECISION COLOR HARDWARE
              </p>
            </TextReveal>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolset.map((tool) => (
            <div
              key={tool.name}
              className="tool-card group p-6 rounded-lg bg-[#08090E]/90 border border-white/[0.08] hover:border-[#38BDF8]/50 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(56, 189, 248,0.1)] relative overflow-hidden"
            >
              {/* Background gradient hint */}
              <div
                className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none"
                style={{ backgroundColor: tool.accent }}
              />

              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 px-2 py-1 rounded bg-cyan-950/30 border border-cyan-800/40">
                  {tool.category}
                </span>
              </div>

              <h3 className="text-lg font-display tracking-wider text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                {tool.name}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed font-light mb-6">
                {tool.description}
              </p>

              {/* Proficiency bar */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
                  <span>MASTERY</span>
                  <span className="text-white font-semibold">{tool.proficiency}</span>
                </div>
                <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: tool.proficiency,
                      background: `linear-gradient(90deg, #38BDF8, ${tool.accent})`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
