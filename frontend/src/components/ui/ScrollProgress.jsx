import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #38BDF8 0%, #7EDAB9 100%)',
        boxShadow: '0 0 10px rgba(56, 189, 248, 0.5), 0 0 20px rgba(0, 240, 255, 0.3)'
      }}
    />
  )
}
