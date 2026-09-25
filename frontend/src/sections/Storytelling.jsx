import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Storytelling() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.fromTo(
        bgRef.current,
        { y: -50 },
        {
          y: 50,
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
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.story-quote',
            start: 'top 75%',
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
            radial-gradient(ellipse at 20% 50%, rgba(255, 0, 127, 0.1) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, #040508 0%, #080910 100%)
          `,
        }}
      />

      {/* Huge Decorative Cinematic Watermark in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-[15vw] font-display font-black tracking-tighter text-white/[0.015] whitespace-nowrap">
        EMOTION • LIGHT • COLOR
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex items-start gap-4 md:gap-6 mb-12 md:mb-16">
          <TextReveal type="slideUp" className="text-section-number">05</TextReveal>
          <div>
            <TextReveal type="slideUp" delay={0.1}>
              <h2 className="text-display-lg mb-2">CINEMATIC STORYTELLING</h2>
            </TextReveal>
            <TextReveal type="fadeIn" delay={0.2}>
              <p className="text-xs font-mono tracking-[0.25em] text-cyan-400">
                SCULPTING SUBCONSCIOUS EMOTION FRAME BY FRAME
              </p>
            </TextReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Main Quote with High-Impact Gradient Text */}
          <div className="lg:col-span-7">
            <div className="story-quote">
              <p
                className="story-quote-line text-3xl sm:text-5xl lg:text-6xl font-light leading-tight mb-3 text-white"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                I don't just grade pixels.
              </p>
              <p
                className="story-quote-line text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #34D399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(56, 189, 248,0.3))'
                }}
              >
                I sculpt how the audience feels.
              </p>
            </div>

            <TextReveal type="fadeIn" delay={0.5}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded text-xs tracking-[0.2em] font-semibold text-black bg-[#38BDF8] hover:bg-[#7DD3FC] shadow-[0_0_25px_rgba(56, 189, 248,0.4)] transition-all font-mono"
                  data-cursor="EXPLORE"
                >
                  EXPLORE FILM PORTFOLIO
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                  >
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </a>

                <a
                  href="#lab"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded text-xs tracking-[0.2em] font-mono text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                >
                  TEST FILM STOCK LAB ↗
                </a>
              </div>
            </TextReveal>
          </div>

          {/* Right: Technical Creative Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-[#080a12]/80 border border-white/10 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-2xl pointer-events-none" />
              
              <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase block mb-2">
                // THE CHROMATIC PHILOSOPHY
              </span>
              <p className="text-sm text-gray-300 leading-relaxed font-light mb-4">
                "Light sets the stage, but <strong className="text-white">color creates the memory</strong>. From shadow roll-off to specular highlight density, every decision is tuned to transport the viewer into the world of the director's narrative."
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] font-mono text-gray-400">
                <span>ACES 1.3 • KODAK 2383 PRINT</span>
                <span className="text-cyan-400">SURAAJ SINGH SUITE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider mt-16 md:mt-24" />
    </section>
  )
}
