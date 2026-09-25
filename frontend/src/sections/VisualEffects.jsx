import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const layers = [
  { id: 1, name: '01. RAW FLAT', desc: 'Unprocessed ARRI Alexa LogC3 source frame with wide dynamic range.' },
  { id: 2, name: '02. SKY REPLACEMENT', desc: 'Clean alpha plate composite with golden hour cloud horizon.' },
  { id: 3, name: '03. BEAUTY & RETOUCH', desc: 'Frequency separation skin smoothing and wire / rig removal.' },
  { id: 4, name: '04. 35mm MASTER GRADE', desc: 'Kodak 5219 print LUT, red optical halation, and organic 35mm grain.' },
]

const vfxCategories = [
  {
    icon: '✨',
    label: 'COMPOSITING',
    desc: 'Multi-layer matte painting & CGI integration'
  },
  {
    icon: '🎯',
    label: 'BEAUTY CLEANUP',
    desc: 'Digital skin retouching & blemishes removal'
  },
  {
    icon: '🔍',
    label: 'RIG REMOVAL',
    desc: 'Boom mic, harness & tracking marker removal'
  },
  {
    icon: '🌅',
    label: 'SKY REPLACEMENT',
    desc: 'Atmospheric depth & cinematic light matching'
  },
  {
    icon: '🎞️',
    label: 'GRAIN SYNTHESIS',
    desc: 'Authentic 16mm & 35mm silver halide emulation'
  },
]

export default function VisualEffects() {
  const sectionRef = useRef(null)
  const [activeLayer, setActiveLayer] = useState(4)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vfx-category',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.vfx-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section relative bg-[#050609]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-start gap-4 md:gap-6 mb-8 md:mb-12">
          <TextReveal type="slideUp" className="text-section-number">04</TextReveal>
          <div>
            <TextReveal type="slideUp" delay={0.1}>
              <h2 className="text-display-lg mb-3">VFX & FINISHING</h2>
            </TextReveal>
            <TextReveal type="fadeIn" delay={0.2}>
              <p className="text-xs font-mono tracking-[0.2em] text-[#38BDF8]">
                SEAMLESS DIGITAL CLEANUP • MATTE PAINTING • OPTICAL CONFORM
              </p>
            </TextReveal>
          </div>
        </div>

        {/* Interactive 4-Layer Breakdown Studio */}
        <div className="mb-12 md:mb-16 p-6 rounded-xl bg-[#090b12] border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-white tracking-wider uppercase block">
                INTERACTIVE LAYER BREAKDOWN PIPELINE
              </span>
              <p className="text-xs text-gray-400 mt-1">
                Select a layer below to inspect the progressive finishing workflow on the frame.
              </p>
            </div>
            
            {/* Layer Selection Pills */}
            <div className="flex flex-wrap gap-2">
              {layers.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLayer(l.id)}
                  className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all ${
                    activeLayer === l.id
                      ? 'bg-[#38BDF8] text-black font-bold shadow-[0_0_15px_rgba(56, 189, 248,0.4)]'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* Viewport Frame */}
          <div
            className="relative w-full overflow-hidden rounded-lg border border-white/15 mb-4 shadow-2xl flex items-center justify-center"
            style={{
              aspectRatio: '21/9',
              background: activeLayer === 1
                ? 'linear-gradient(135deg, #2a2c33 0%, #3a3d45 100%)'
                : activeLayer === 2
                ? 'linear-gradient(135deg, #1c2738 0%, #44352a 100%)'
                : activeLayer === 3
                ? 'linear-gradient(135deg, #152233 0%, #302028 100%)'
                : 'linear-gradient(135deg, #071320 0%, #291224 50%, #061019 100%)'
            }}
          >
            {/* Grid guides overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#4a9ead_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Simulated Frame Content */}
            <div className="relative z-10 text-center px-4">
              <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase block mb-1">
                LAYER {activeLayer} OF 4 ACTIVE
              </span>
              <h3 className="text-2xl md:text-4xl font-display text-white tracking-widest drop-shadow-lg">
                {layers[activeLayer - 1].name}
              </h3>
              <p className="text-xs font-mono text-gray-300 mt-2 max-w-lg mx-auto">
                {layers[activeLayer - 1].desc}
              </p>
            </div>

            {/* Watermark Tag */}
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-gray-400 bg-black/60 px-2.5 py-1 rounded border border-white/10">
              DAVINCI RESOLVE FUSION PIPELINE • 32-BIT FLOAT
            </div>
          </div>
        </div>

        {/* VFX Capabilities Grid */}
        <div className="vfx-grid auto-marquee auto-marquee--right mb-10">
          <div className="auto-marquee__track gap-4 pr-4">
          {[...vfxCategories, ...vfxCategories].map((cat, index) => (
            <div
              key={`${cat.label}-${index}`}
              data-cursor="VFX"
              className="vfx-category auto-marquee__item group cursor-pointer rounded-lg border border-white/10 bg-[#0b0d14] p-5 transition-all hover:border-[#38BDF8]/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.14)]"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h4 className="text-xs font-bold font-mono tracking-widest text-white group-hover:text-[#38BDF8] transition-colors mb-1">
                {cat.label}
              </h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>

      <div className="section-divider mt-16 md:mt-24" />
    </section>
  )
}
