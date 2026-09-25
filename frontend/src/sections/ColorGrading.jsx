import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/ui/TextReveal'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'

gsap.registerPlugin(ScrollTrigger)

const categoriesData = {
  'Feature Film': {
    genre: 'Neo-Noir Crime Thriller',
    camera: 'ARRI Alexa Mini LF • ARRI LogC3 to ACEScc',
    palette: ['#0A1128', '#1C2541', '#3A86FF', '#38BDF8', '#E2E8F0'],
    description: 'Deep midnight cyans in shadow regions balanced against rich 3200K tungsten tungsten highlights on skin tones.',
    filmStock: 'Kodak Vision3 5219 500T Print Emulation',
    beforeSvg: ['#22252a', '#30343a', '#282b30', '#666a70', '#444850'],
    afterSvg: ['#06101e', '#0f2744', '#081729', '#38BDF8', '#3a86ff', '#00e5ff']
  },
  'Commercial': {
    genre: 'Luxury Automotive Campaign',
    camera: 'RED V-Raptor 8K VV • REDWideGamutRGB / Log3G10',
    palette: ['#0d131a', '#1e293b', '#64748b', '#cbd5e1', '#f59e0b'],
    description: 'Precision specular highlight roll-off with deep neutral blacks and crisp metallic chrome reflections.',
    filmStock: 'Custom 3D Commercial Clean Rec.709 LUT',
    beforeSvg: ['#2e2e2e', '#3a3a3a', '#333333', '#777777', '#555555'],
    afterSvg: ['#0a0f18', '#152238', '#0f172a', '#f59e0b', '#38bdf8', '#e2e8f0']
  },
  'Music Video': {
    genre: 'Synthwave & Hyper-Pop',
    camera: 'Sony Venice 2 8K • S-Log3 / S-Gamut3.Cine',
    palette: ['#4c0519', '#831843', '#ec4899', '#06b6d4', '#facc15'],
    description: 'High chromatic separation with rich magenta glows, halation bloom, and complementary turquoise shadows.',
    filmStock: 'Optical Halation + 35mm 500T Grain',
    beforeSvg: ['#2b2729', '#383336', '#2d282b', '#736d71', '#4a4448'],
    afterSvg: ['#2a0820', '#4a0e38', '#1a0525', '#38BDF8', '#7EDAB9', '#ffe600']
  },
  'Documentary': {
    genre: 'Highland Nature & Human Spirit',
    camera: 'Blackmagic URSA 12K • Blackmagic Film Gen 5',
    palette: ['#1c1917', '#44403c', '#78716c', '#ca8a04', '#fef08a'],
    description: 'Subtle organic color harmony preserving the natural sun angles, mountain textures, and organic skin tones.',
    filmStock: 'Fuji Eterna 8543 Print Stock Emulation',
    beforeSvg: ['#2c2a27', '#3a3734', '#312e2b', '#78736d', '#524d47'],
    afterSvg: ['#121510', '#242a1e', '#192014', '#d97706', '#84cc16', '#fef3c7']
  },
  'Fashion': {
    genre: 'Editorial Haute Couture',
    camera: 'ARRI Alexa 35 • LogC4 / ARRIRAW',
    palette: ['#18181b', '#27272a', '#e4e4e7', '#fda4af', '#f43f5e'],
    description: 'Velvety pastel tones with soft highlight diffusion, creamy roll-off, and refined skin smoothing.',
    filmStock: 'Kodak Portra 400 Editorial Emulation',
    beforeSvg: ['#2b2b2d', '#39393c', '#303033', '#75757a', '#4e4e53'],
    afterSvg: ['#1a1518', '#2e2026', '#171215', '#fb7185', '#e0e7ff', '#fbcfe8']
  },
  'Narrative': {
    genre: 'Period Drama (1970s)',
    camera: 'ARRI Alexa Mini • Kodak 35mm 5247 Film Look',
    palette: ['#1c140c', '#382314', '#78431f', '#d97706', '#fef3c7'],
    description: 'Warm sepia-tinted shadows, amber mids, and authentic optical gate weave and grain emulation.',
    filmStock: 'Vintage Kodak 5247 35mm Scan',
    beforeSvg: ['#2d2925', '#3b3631', '#322d28', '#7a736a', '#534d45'],
    afterSvg: ['#1f1208', '#381c0c', '#241208', '#f59e0b', '#d97706', '#fed7aa']
  }
}

// Generate realistic SVG image data URIs for each genre
const generateCinemaSVG = (colors, isRaw = false, title = '') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
    <defs>
      <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stop-color="${colors[1]}"/>
        <stop offset="60%" stop-color="${colors[0]}"/>
        <stop offset="100%" stop-color="#020305"/>
      </radialGradient>
      <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colors[3]}" stop-opacity="${isRaw ? '0.1' : '0.4'}"/>
        <stop offset="100%" stop-color="${colors[4]}" stop-opacity="0"/>
      </linearGradient>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="${isRaw ? '0.9' : '0.65'}" numOctaves="3" result="noise"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${isRaw ? '0.04' : '0.08'} 0"/>
        <feComposite in2="SourceGraphic" in="gl" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
      </filter>
    </defs>
    
    <!-- Background Scene -->
    <rect width="1920" height="1080" fill="url(#skyGrad)"/>
    <rect width="1920" height="1080" fill="url(#beam)"/>
    
    <!-- Cinematic Silhouette Scene Elements -->
    <path d="M0,800 Q400,650 960,750 T1920,700 L1920,1080 L0,1080 Z" fill="${isRaw ? '#33373d' : colors[2]}" opacity="${isRaw ? '0.4' : '0.8'}"/>
    <circle cx="1350" cy="400" r="180" fill="${colors[3]}" opacity="${isRaw ? '0.12' : '0.35'}" filter="blur(40px)"/>
    <circle cx="550" cy="520" r="120" fill="${colors[4]}" opacity="${isRaw ? '0.1' : '0.3'}" filter="blur(30px)"/>
    
    <!-- Silhouette Subject / Actor Frame -->
    <ellipse cx="960" cy="650" rx="140" ry="240" fill="#040507" opacity="0.95"/>
    <circle cx="960" cy="450" r="90" fill="#040507" opacity="0.95"/>
    
    <!-- Halation Rim Glow on Subject -->
    ${!isRaw ? `<path d="M870,450 Q960,360 1050,450" stroke="${colors[3]}" stroke-width="6" fill="none" opacity="0.7" filter="blur(3px)"/>` : ''}
    
    <!-- Technical Frame Label -->
    <text x="80" y="1000" font-family="monospace" font-size="22" font-weight="bold" fill="${isRaw ? '#777' : colors[3]}" letter-spacing="4">
      ${isRaw ? 'LOG-C3 / S-LOG3 RAW UNGRADED' : 'FINAL 35mm PRINT GRADE [ACES 1.3]'}
    </text>
    <text x="1840" y="1000" text-anchor="end" font-family="monospace" font-size="18" fill="rgba(255,255,255,0.4)" letter-spacing="2">
      ${title}
    </text>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export default function ColorGrading() {
  const sectionRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('Feature Film')
  const cat = categoriesData[activeCategory]

  const beforeImage = generateCinemaSVG(cat.beforeSvg, true, activeCategory)
  const afterImage = generateCinemaSVG(cat.afterSvg, false, activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cg-slider-container',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="grading" className="section relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Info */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <TextReveal type="slideUp" className="text-section-number mb-4">02</TextReveal>
              <TextReveal type="slideUp" delay={0.1}>
                <h2 className="text-display-lg mb-3">COLOR SUITE</h2>
              </TextReveal>
              <TextReveal type="fadeIn" delay={0.2}>
                <p className="text-body mb-6">
                  Every frame has a psychological mood.<br />
                  Every grade sculpts the emotional subtext.
                </p>
              </TextReveal>

              {/* Genre Categories Selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(categoriesData).map((catName) => (
                  <button
                    key={catName}
                    className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all rounded ${
                      activeCategory === catName
                        ? 'bg-[#38BDF8] text-black font-bold shadow-[0_0_15px_rgba(56, 189, 248,0.4)]'
                        : 'bg-white/[0.03] text-gray-400 hover:text-white border border-white/[0.08]'
                    }`}
                    onClick={() => setActiveCategory(catName)}
                  >
                    {catName}
                  </button>
                ))}
              </div>

              {/* Technical Grade Sheet */}
              <div className="p-4 rounded bg-black/40 border border-white/10 space-y-3 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">GENRE / STYLE</span>
                  <span className="text-xs font-medium text-white">{cat.genre}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">CAMERA / COLOR SPACE</span>
                  <span className="text-xs font-mono text-cyan-400">{cat.camera}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">FILM STOCK EMULATION</span>
                  <span className="text-xs font-mono text-[#38BDF8]">{cat.filmStock}</span>
                </div>

                {/* Palette */}
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1.5">GRADE RECIPE PALETTE</span>
                  <div className="flex items-center gap-1.5">
                    {cat.palette.map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded border border-white/20 shadow-inner"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <TextReveal type="slideUp" delay={0.4}>
              <a
                href="#lab"
                className="inline-flex items-center gap-3 text-xs tracking-[0.2em] font-semibold text-[#38BDF8] group hover:text-[#7DD3FC] transition-colors"
              >
                OPEN INTERACTIVE COLOR LAB
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </TextReveal>
          </div>

          {/* Right: Before/After Slider with Scopes */}
          <div className="lg:col-span-8 cg-slider-container">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="CAMERA RAW (LOG-C)"
              afterLabel={`${cat.genre.toUpperCase()} GRADE`}
              cameraMeta={cat.camera}
              activeCategory={activeCategory}
            />
          </div>
        </div>
      </div>

      <div className="section-divider mt-16 md:mt-24" />
    </section>
  )
}

