import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    step: '01',
    title: 'CONFORM & COLOR SCIENCE',
    subtitle: 'Pipeline Setup',
    description: 'Importing XML/EDL cuts, verifying frame-accurate conforms, and establishing a robust scene-referred color management pipeline (ACEScc or DaVinci YRGB Color Managed).',
    badge: 'STAGE 1',
    accentColor: '#38BDF8'
  },
  {
    step: '02',
    title: 'PRIMARY BALANCING',
    subtitle: 'Shot-to-Shot Continuity',
    description: 'Normalizing exposures, neutralizing unwanted camera casts, aligning contrast ratios, and ensuring skin tone consistency across varied camera angles and light conditions.',
    badge: 'STAGE 2',
    accentColor: '#7EDAB9'
  },
  {
    step: '03',
    title: 'LOOK DEVELOPMENT',
    subtitle: 'Cinematic Aesthetic',
    description: 'Collaborating directly with the director and DP to craft distinctive visual palettes, proprietary film stock emulations (Kodak/Fujifilm), and emotional atmosphere.',
    badge: 'STAGE 3',
    accentColor: '#6366F1'
  },
  {
    step: '04',
    title: 'SECONDARIES & PRECISION',
    subtitle: 'VFX & Micro-Adjustments',
    description: 'Fine-tuned power windows, dynamic tracking, selective hue shifts, beauty passes, atmospheric glows, film grain synthesis, and optical halation.',
    badge: 'STAGE 4',
    accentColor: '#9D4EDD'
  },
  {
    step: '05',
    title: 'MASTERING & DELIVERABLES',
    subtitle: 'Multi-Format Delivery',
    description: 'Color quality control across calibrated reference monitors (FSI & Sony BVM), followed by pristine rendering in Rec.709, DCI-P3, HDR10, and Dolby Vision.',
    badge: 'STAGE 5',
    accentColor: '#38BDF8'
  }
]

export default function Process() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const startFloatingCards = () => {
        gsap.to('.process-card--float-first', {
          y: -12,
          duration: 2.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
        gsap.to('.process-card--float-second', {
          y: 10,
          duration: 3.3,
          delay: 0.35,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }

      gsap.fromTo(
        '.process-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onComplete: startFloatingCards,
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="section relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-start gap-4 md:gap-6 mb-12 md:mb-16">
          <TextReveal type="slideUp" className="text-section-number">06</TextReveal>
          <div>
            <TextReveal type="slideUp" delay={0.1}>
              <h2 className="text-display-lg mb-3">THE PROCESS</h2>
            </TextReveal>
            <TextReveal type="fadeIn" delay={0.3}>
              <p className="text-xs tracking-[0.15em]" style={{ color: 'var(--color-gold-dim)' }}>
                HOW WE TRANSFORM RAW CAPTURE INTO CINEMATIC ART
              </p>
            </TextReveal>
          </div>
        </div>

        {/* Timeline Grid */}
        <div ref={timelineRef} className="relative grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(56, 189, 248,0.3)] to-transparent pointer-events-none" />

          {steps.map((item, index) => (
            <div
              key={item.step}
              className={`process-card group relative flex flex-col justify-between rounded-lg border border-white/[0.08] bg-[#08090E]/90 p-6 transition-all duration-500 hover:border-[var(--card-accent,#38BDF8)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${
                index === 2 ? 'process-card--float-first' : index === 3 ? 'process-card--float-second' : ''
              }`}
              style={{ '--card-accent': item.accentColor }}
            >
              {/* Top Step Number Indicator */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-2xl font-display font-bold"
                    style={{ color: item.accentColor }}
                  >
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-white/[0.04] text-gray-400 border border-white/[0.05]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-display tracking-wider text-white mb-1 group-hover:text-[var(--card-accent,#38BDF8)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] font-mono text-cyan-400/80 mb-4 tracking-wider">
                  {item.subtitle}
                </p>

                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Bottom decorative tick */}
              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-500">
                  STEP {index + 1} OF 5
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: item.accentColor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
