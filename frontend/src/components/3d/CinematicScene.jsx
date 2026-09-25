import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import FloatingObjects from './FloatingObjects'
import ParticleField from './ParticleField'

/* Subtle camera movement responding to mouse + scroll */
function CameraRig({ mousePosition, scrollProgress }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 12))

  useFrame((state, delta) => {
    // Mouse-driven camera rotation (very subtle)
    const mouseX = mousePosition.x * 0.3
    const mouseY = mousePosition.y * 0.15

    // Scroll-driven camera Y position
    const scrollY = scrollProgress * -8

    target.current.set(mouseX, scrollY + mouseY, 12)
    camera.position.lerp(target.current, delta * 1.5)

    // Subtle camera rotation
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, mousePosition.y * 0.02, delta * 2)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -mousePosition.x * 0.02, delta * 2)
  })

  return null
}

/* Post-processing effects */
function Effects({ performanceTier }) {
  if (performanceTier === 'low') return null

  return (
    <EffectComposer>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette darkness={0.5} offset={0.3} />
    </EffectComposer>
  )
}

/* Scene lighting */
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.12} color="#8888aa" />
      <pointLight position={[15, 10, 10]} intensity={0.6} color="#38BDF8" distance={40} decay={2} />
      <pointLight position={[-15, -8, 8]} intensity={0.4} color="#4a9ead" distance={35} decay={2} />
      <pointLight position={[0, 15, -5]} intensity={0.2} color="#7DD3FC" distance={30} decay={2} />
      <directionalLight position={[5, 5, 5]} intensity={0.15} color="#ffffff" />
    </>
  )
}

export default function CinematicScene({
  mousePosition = { x: 0, y: 0 },
  scrollProgress = 0,
  performanceTier = 'high',
}) {
  const particleCount = useMemo(() => {
    switch (performanceTier) {
      case 'low': return 200
      case 'medium': return 500
      default: return 1000
    }
  }, [performanceTier])

  const dprRange = useMemo(() => {
    switch (performanceTier) {
      case 'low': return [0.5, 1]
      case 'medium': return [0.75, 1.5]
      default: return [1, 2]
    }
  }, [performanceTier])

  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 100 }}
        dpr={dprRange}
        gl={{
          antialias: performanceTier !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          <fog attach="fog" args={['#050507', 10, 40]} />

          <Lighting />

          <CameraRig
            mousePosition={mousePosition}
            scrollProgress={scrollProgress}
          />

          <FloatingObjects
            scrollProgress={scrollProgress}
            mousePosition={mousePosition}
            performanceTier={performanceTier}
          />

          <ParticleField count={particleCount} />

          <Effects performanceTier={performanceTier} />
        </Suspense>
      </Canvas>
    </div>
  )
}
