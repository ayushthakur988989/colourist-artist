import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMousePosition, useScrollProgress, useDeviceDetect } from './hooks'

gsap.registerPlugin(ScrollTrigger)

// 3D & Visual Layer Components
import CinematicScene from './components/3d/CinematicScene'
import ForegroundParticles from './components/ui/ForegroundParticles'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Page Sections (00 through 09)
import Hero from './sections/Hero'
import Showreel from './sections/Showreel'
import ColorGrading from './sections/ColorGrading'
import ColorLab from './sections/ColorLab'
import VisualEffects from './sections/VisualEffects'
import Storytelling from './sections/Storytelling'
import SelectedWork from './sections/SelectedWork'
import Process from './sections/Process'
import Tools from './sections/Tools'
import About from './sections/About'
import Contact from './sections/Contact'

export default function App() {
  const { normalized: mousePos } = useMousePosition()
  const { progress: scrollProgress } = useScrollProgress()
  const { performanceTier, isMobile } = useDeviceDetect()

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Force ScrollTrigger refresh after initial mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      clearTimeout(timer)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#E8E8EC] selection:bg-[#38BDF8] selection:text-black overflow-x-hidden font-sans">
      {/* Dynamic Cursor */}
      {!isMobile && <CustomCursor />}

      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Global 3D Cinematic Canvas (Three.js floating reels, particles, parallax) */}
      <CinematicScene
        mousePosition={mousePos}
        scrollProgress={scrollProgress}
        performanceTier={performanceTier}
      />

      {/* Foreground Ambient Dust Particles */}
      <ForegroundParticles />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <Showreel />
        <ColorGrading />
        <ColorLab />
        <VisualEffects />
        <Storytelling />
        <SelectedWork />
        <Process />
        <Tools />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
