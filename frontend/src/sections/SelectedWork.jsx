import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'CHRONICLES OF SHADOW',
    category: 'FEATURE FILM',
    genre: 'Neo-Noir Crime Thriller',
    year: '2024',
    director: 'Aryan Kapoor',
    dop: 'Vikram Mehta, ISC',
    camera: 'ARRI Alexa Mini LF • Master Anamorphic',
    aspectRatio: '2.39:1 Anamorphic',
    palette: ['#0A1128', '#1C2541', '#3A86FF', '#38BDF8', '#E2E8F0'],
    description: 'High-contrast moody color grading utilizing deep cyan shadows balanced with rich amber tungsten skin tones.',
    tags: ['DaVinci Resolve Studio', 'Kodak 5219 Emulation', 'Grain Synthesis', 'ACEScc 1.3'],
    bgGradient: 'radial-gradient(ellipse at center, rgba(14,35,64,0.8) 0%, rgba(5,6,10,0.95) 100%)'
  },
  {
    id: 2,
    title: 'EUPHORIA IN VELVET',
    category: 'MUSIC VIDEO',
    genre: 'Synthwave / Hyper-pop',
    year: '2024',
    director: 'Meera Sen',
    dop: 'Rohit Shenoy',
    camera: 'Sony Venice 2 8K • Atlas Orion Anamorphic',
    aspectRatio: '16:9 Scope',
    palette: ['#6366F1', '#7928CA', '#00DFD8', '#FFB703', '#11002C'],
    description: 'Vibrant neon hues and split-toning designed to elevate pulse-pounding rhythm with hyper-saturated chromatic dynamics.',
    tags: ['ACEScc', 'Halation FX', 'Glow Diffusion', 'Custom 3D LUT'],
    bgGradient: 'radial-gradient(ellipse at center, rgba(70,10,60,0.8) 0%, rgba(5,6,10,0.95) 100%)'
  },
  {
    id: 3,
    title: 'AURORA HORIZON',
    category: 'COMMERCIAL',
    genre: 'Luxury Automotive',
    year: '2024',
    director: 'David Vance',
    dop: 'Marcus Lindberg',
    camera: 'RED V-Raptor 8K VV • Cooke S7/i Full Frame Plus',
    aspectRatio: '2.35:1 Cinematic',
    palette: ['#0F2027', '#203A43', '#2C5364', '#C0C0C0', '#F4D03F'],
    description: 'Precision automotive grading with clean metallic speculars, pristine reflections, and controlled golden hour skies.',
    tags: ['Custom 3D LUTs', 'Power Windows', 'Planar Tracking', 'HDR10+'],
    bgGradient: 'radial-gradient(ellipse at center, rgba(20,45,60,0.8) 0%, rgba(5,6,10,0.95) 100%)'
  },
  {
    id: 4,
    title: 'WHISPERS OF THE VALLEY',
    category: 'DOCUMENTARY',
    genre: 'Nature & Human Spirit',
    year: '2023',
    director: 'Kavita Rao',
    dop: 'Tenzing Norbu',
    camera: 'Blackmagic URSA 12K • Leica R Vintage',
    aspectRatio: '1.85:1 Natural',
    palette: ['#283618', '#606C38', '#DDA15E', '#BC6C25', '#FEFAE0'],
    description: 'Organic, earthy color tone preserving the raw tactile beauty of mountain flora and intimate natural light portraits.',
    tags: ['Blackmagic Film Gen 5', 'Natural Print LUT', 'Texture Preservation', 'DCI-P3'],
    bgGradient: 'radial-gradient(ellipse at center, rgba(30,45,25,0.8) 0%, rgba(5,6,10,0.95) 100%)'
  }
]

const categories = ['ALL', 'FEATURE FILM', 'MUSIC VIDEO', 'COMMERCIAL', 'DOCUMENTARY']

export default function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedProject, setSelectedProject] = useState(null)
  const [copiedHex, setCopiedHex] = useState(null)
  const sectionRef = useRef(null)

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 40, opacity: 0 },
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
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [activeCategory])

  const copyToClipboard = (hex) => {
    navigator.clipboard?.writeText(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 2000)
  }

  return (
    <section ref={sectionRef} id="work" className="section relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-start gap-4 md:gap-6 mb-8 md:mb-12">
          <TextReveal type="slideUp" className="text-section-number">05</TextReveal>
          <div>
            <TextReveal type="slideUp" delay={0.1}>
              <h2 className="text-display-lg mb-3">SELECTED WORK</h2>
            </TextReveal>
            <TextReveal type="fadeIn" delay={0.3}>
              <p className="text-xs tracking-[0.2em] font-mono text-[#38BDF8]">
                FEATURE FILMS • MUSIC VIDEOS • COMMERCIALS • DOCUMENTARIES
              </p>
            </TextReveal>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase font-mono tracking-wider transition-all duration-300 rounded ${
                activeCategory === cat
                  ? 'bg-[#38BDF8] text-black font-bold shadow-[0_0_15px_rgba(56, 189, 248,0.4)]'
                  : 'bg-[rgba(255,255,255,0.03)] text-gray-400 hover:text-white border border-[rgba(255,255,255,0.08)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="project-card group relative rounded-lg overflow-hidden cursor-pointer"
                style={{
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  background: project.bgGradient
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Cinematic Letterbox effect on preview */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden flex items-center justify-center p-6">
                  {/* Decorative film frame graphic */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0" y1="15%" x2="100%" y2="15%" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="4 4" />
                      <line x1="0" y1="85%" x2="100%" y2="85%" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="4 4" />
                      <circle cx="50%" cy="50%" r="40" fill="none" stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
                      <circle cx="50%" cy="50%" r="80" fill="none" stroke="#7EDAB9" strokeWidth="0.5" opacity="0.2" />
                    </svg>
                  </div>

                  <div className="text-center z-10">
                    <span className="inline-block text-[10px] tracking-[0.25em] text-[#38BDF8] mb-2 px-2.5 py-0.5 rounded-full border border-[rgba(56, 189, 248,0.3)] bg-black/40">
                      {project.aspectRatio}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display tracking-wider text-white group-hover:text-[#38BDF8] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 font-mono tracking-wider">
                      Dir. {project.director} • DOP: {project.dop}
                    </p>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2.5 text-xs font-mono tracking-[0.2em] font-semibold text-black bg-[#38BDF8] shadow-[0_0_20px_rgba(56, 189, 248,0.5)]">
                      INSPECT GRADE & TECH SHEET
                    </span>
                  </div>
                </div>

                {/* Project Metadata & Color Palette Footer */}
                <div className="p-6 bg-[#08090E]/95 border-t border-[rgba(255,255,255,0.08)]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-400">
                      // {project.category} • {project.year}
                    </span>
                    {/* Color swatches */}
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {project.palette.map((color, i) => (
                        <div
                          key={i}
                          onClick={() => copyToClipboard(color)}
                          className="w-4 h-4 rounded-full border border-white/20 transition-transform hover:scale-125 cursor-copy"
                          style={{ backgroundColor: color }}
                          title={`Click to copy ${color}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-gray-300 border border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Toast for Hex Copy */}
        {copiedHex && (
          <div className="fixed bottom-8 right-8 z-[120] px-4 py-2 bg-[#38BDF8] text-black font-mono text-xs font-bold rounded shadow-2xl">
            ✓ COLOR CODE {copiedHex} COPIED
          </div>
        )}

        {/* Project Inspection Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative max-w-2xl w-full p-6 md:p-8 rounded-xl bg-[#0b0d14] border border-[#38BDF8]/30 shadow-[0_0_50px_rgba(56, 189, 248,0.15)]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg p-2"
                >
                  ✕
                </button>

                <div className="mb-4">
                  <span className="text-xs tracking-[0.2em] text-[#38BDF8] font-mono">
                    {selectedProject.category} • {selectedProject.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display text-white mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mt-1">
                    Directed by <strong className="text-white">{selectedProject.director}</strong> • Cinematography: <strong className="text-white">{selectedProject.dop}</strong>
                  </p>
                  <p className="text-xs font-mono text-cyan-400 mt-1">
                    Camera / Optics: {selectedProject.camera} • Aspect: {selectedProject.aspectRatio}
                  </p>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Color Palette breakdown with Copy */}
                <div className="mb-6 p-4 rounded-lg bg-black/40 border border-white/10">
                  <div className="text-xs font-mono text-gray-400 mb-3 tracking-wider flex justify-between">
                    <span>PRIMARY COLOR PALETTE (CLICK SWATCH TO COPY HEX)</span>
                    <span className="text-[#38BDF8]">ACEScc 1.3</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {selectedProject.palette.map((color, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                        onClick={() => copyToClipboard(color)}
                      >
                        <div
                          className="w-full h-12 rounded border border-white/20 shadow-inner group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[10px] font-mono text-gray-400 group-hover:text-white">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical grading breakdown */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
