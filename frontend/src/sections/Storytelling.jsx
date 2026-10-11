import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const colorPillars = [
  {
    step: '01',
    title: 'TONAL CONTRAST & SHOULDER ROLL-OFF',
    description:
      'Sculpting a soft, organic shadow toe with velvety black levels and filmic highlight roll-off. Eliminating harsh digital clipping while preserving specular vibrancy.',
    tag: 'S-CURVE & DENSITY'
  },
  {
    step: '02',
    title: 'CHROMATIC HARMONY & SKIN FIDELITY',
    description:
      'Precision skin-tone isolation across diverse lighting setups. Establishing harmonious complementary separation between rich amber skin tones and atmospheric shadows.',
    tag: 'SPECTRAL ISOLATION'
  },
  {
    step: '03',
    title: 'PHOTOCHEMICAL FILM EMULATION',
    description:
      'Bespoke Look Development using Kodak Vision3 5219 negative emulation, 2383 print stock density, organic halation glow, and authentic 35mm optical grain synthesis.',
    tag: 'KODAK 2383 PRINT'
  },
  {
    step: '04',
    title: 'ACES SCENE-REFERRED PIPELINE',
    description:
      'Mathematical 32-bit floating-point color transforms normalizing ARRI RAW, RED IPP2, and Sony Venice for flawless delivery across Rec.709, DCI-P3, and Dolby Vision HDR.',
    tag: 'ACEScc 1.3 & HDR'
  }
]

export default function Storytelling() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background atmosphere
      gsap.fromTo(
        bgRef.current,
        { y: -40 },
        {
          y: 40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      // Text reveal on scroll
      gsap.fromTo(
        '.story-quote-line',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.story-quote',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Animate pillars
      gsap.fromTo(
        '.color-pillar-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.color-pillars-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section relative overflow-hidden py-24 md:py-36 bg-[#040507]">
      {/* Dynamic Glowing Chromatic Background Atmosphere */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20 -bottom-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 15% 45%, rgba(56, 189, 248, 0.09) 0%, transparent 60%),
            radial-gradient(ellipse at 85% 55%, rgba(126, 218, 185, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 25%, rgba(129, 140, 248, 0.07) 0%, transparent 50%),
            linear-gradient(135deg, #040508 0%, #080910 100%)
          `,
        }}
      />

      {/* Huge Decorative Cinematic Watermark in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-[13vw] font-display font-black tracking-tighter text-white/[0.015] whitespace-nowrap">
        COLOR • CONTRAST • EMOTION
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-start gap-4 md:gap-6 mb-12 md:mb-16">
          <TextReveal type="slideUp" className="text-section-number">05</TextReveal>
          <div>
            <TextReveal type="slideUp" delay={0.1}>
              <h2 className="text-display-lg mb-2">CINEMATIC COLOR STORYTELLING</h2>
            </TextReveal>
            <TextReveal type="fadeIn" delay={0.2}>
              <p className="text-xs font-mono tracking-[0.25em] text-[#38BDF8]">
                SCULPTING EMOTIONAL TRUTH THROUGH TONAL DENSITY, SKIN TONES & FILM SCIENCE
              </p>
            </TextReveal>
          </div>
        </div>

        {/* Hero Philosophy Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 md:mb-20">
          {/* Left: Main Quote with High-Impact Gradient Text */}
          <div className="lg:col-span-7">
            <div className="story-quote">
              <p
                className="story-quote-line text-2xl sm:text-4xl lg:text-5xl font-light leading-tight mb-2 text-white"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                A camera captures raw exposure.
              </p>
              <p
                className="story-quote-line text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #34D399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))'
                }}
              >
                Color grading dictates how the audience feels.
              </p>
              <p className="story-quote-line text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-xl">
                Color grading is never just about fixing footage. It is the invisible psychology of cinema. Every color choice sculpts subconscious character dynamics, deepens narrative tension, and imprints lasting visual memories.
              </p>
            </div>

            <TextReveal type="fadeIn" delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded text-xs tracking-[0.2em] font-semibold text-black bg-[#38BDF8] hover:bg-[#7DD3FC] shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all font-mono"
                  data-cursor="EXPLORE"
                >
                  VIEW COLOR PORTFOLIO
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </a>

                <a
                  href="#lab"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded text-xs tracking-[0.2em] font-mono text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                >
                  INTERACTIVE FILM LAB ↗
                </a>
              </div>
            </TextReveal>
          </div>

          {/* Right: Technical Creative Statement */}
          <div className="lg:col-span-5">
            <div className="p-6 md:p-8 rounded-xl bg-[#080a12]/85 border border-[#38BDF8]/20 backdrop-blur-md relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#38BDF8]/10 blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase">
                  // THE COLORIST'S PHILOSOPHY
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/25">
                  COLOR SCIENCE
                </span>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-light mb-4">
                "In digital cinematography, RAW sensors capture unbiased data. Color grading is where that data is infused with <strong className="text-white font-medium">narrative soul</strong>. By balancing subtractive color saturation, soft highlight shoulder roll-off, and chromatic separation, we shape the temperature, tension, and intimacy before a single word of dialogue is uttered."
              </p>

              <div className="pt-4 border-t border-white/10 space-y-2 text-[10px] font-mono text-gray-400">
                <div className="flex items-center justify-between">
                  <span>MONITORING CALIBRATION:</span>
                  <span className="text-white">FLANDERS D65 100% REC.709 / DCI-P3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>PROCESSING ENGINE:</span>
                  <span className="text-[#38BDF8]">32-BIT FLOAT ACEScc 1.3 COLOR PIPELINE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>PRINT ACCURACY:</span>
                  <span className="text-cyan-400">KODAK 2383 / FUJI 3513 DENSITY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Four Technical Color Grading Pillars Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#38BDF8] uppercase">
              // PILLARS OF CINEMATIC COLOR GRADING
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="color-pillars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {colorPillars.map((pillar) => (
              <div
                key={pillar.step}
                className="color-pillar-card p-6 rounded-lg bg-black/40 border border-white/[0.08] hover:border-[#38BDF8]/40 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#38BDF8]">
                      {pillar.step}
                    </span>
                    <span className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-gray-400 border border-white/[0.08] group-hover:text-[#38BDF8] group-hover:border-[#38BDF8]/30 transition-colors">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-display tracking-wider text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]/60 group-hover:bg-[#38BDF8] transition-colors" />
                  <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase group-hover:text-gray-300 transition-colors">
                    PROFESSIONAL COLOR GRADING
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mt-16 md:mt-24" />
    </section>
  )
}
