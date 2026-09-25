import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* =============================================
   FILM REEL — Procedural torus + spokes
   ============================================= */
function FilmReel({ position = [0, 0, 0], scale = 1, speed = 0.1, color = '#888' }) {
  const groupRef = useRef()

  const spokes = useMemo(() => {
    const count = 8
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      return {
        position: [Math.cos(angle) * 0.95, Math.sin(angle) * 0.95, 0],
        rotation: [0, 0, angle],
        key: i,
      }
    })
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += speed * 0.008
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.001
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[1.5, 0.06, 12, 48]} />
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Inner ring */}
      <mesh>
        <torusGeometry args={[0.4, 0.05, 12, 32]} />
        <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Hub */}
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
        <meshStandardMaterial color="#aaa" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Spokes */}
      {spokes.map(({ position: pos, rotation, key }) => (
        <mesh key={key} position={pos} rotation={rotation}>
          <boxGeometry args={[1.1, 0.025, 0.025]} />
          <meshStandardMaterial color="#777" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}
      {/* Film holes on outer ring */}
      <mesh>
        <torusGeometry args={[1.2, 0.03, 8, 48]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

/* =============================================
   FILM STRIP — Animated floating strip
   ============================================= */
function FilmStrip({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, speed = 0.2 }) {
  const groupRef = useRef()

  const frames = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [0, i * 0.55 - 1.4, 0.01],
      key: i,
    }))
  }, [])

  const holes = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      position: [0.22, i * 0.24 - 1.6, 0.015],
      positionRight: [-0.22, i * 0.24 - 1.6, 0.015],
      key: i,
    }))
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * speed + position[1]) * 0.002
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1 + rotation[0]
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.1) * 0.05 + rotation[2]
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main strip body */}
      <mesh>
        <boxGeometry args={[0.5, 3.2, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} transparent opacity={0.85} />
      </mesh>
      {/* Film frames */}
      {frames.map(({ position: pos, key }) => (
        <mesh key={key} position={pos}>
          <planeGeometry args={[0.38, 0.42]} />
          <meshStandardMaterial
            color={key % 2 === 0 ? '#2a2a35' : '#252530'}
            metalness={0.1}
            roughness={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
      {/* Sprocket holes */}
      {holes.map(({ position: pos, positionRight, key }) => (
        <group key={key}>
          <mesh position={pos}>
            <boxGeometry args={[0.03, 0.06, 0.025]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={positionRight}>
            <boxGeometry args={[0.03, 0.06, 0.025]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* =============================================
   CINEMA CAMERA — Composite geometry
   ============================================= */
function CinemaCamera({ position = [0, 0, 0], scale = 1, speed = 0.1 }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.05
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.001
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Camera body */}
      <mesh>
        <boxGeometry args={[1.2, 0.8, 0.9]} />
        <meshStandardMaterial color="#2a2a30" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Lens barrel */}
      <mesh position={[0, 0, 0.65]}>
        <cylinderGeometry args={[0.25, 0.3, 0.5, 16]} />
        <meshStandardMaterial color="#1a1a20" metalness={0.8} roughness={0.2} />
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.5, 16]} />
          <meshStandardMaterial color="#1a1a20" metalness={0.8} roughness={0.2} />
        </mesh>
      </mesh>
      {/* Lens front glass */}
      <mesh position={[0, 0, 0.92]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.22, 24]} />
        <meshStandardMaterial color="#1a2a3a" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>
      {/* Viewfinder */}
      <mesh position={[-0.15, 0.55, -0.1]}>
        <boxGeometry args={[0.35, 0.25, 0.4]} />
        <meshStandardMaterial color="#252528" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Film magazine (top) */}
      <mesh position={[0.2, 0.65, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Handle grip */}
      <mesh position={[0, -0.5, 0.1]}>
        <boxGeometry args={[0.15, 0.3, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Red recording indicator */}
      <mesh position={[0.55, 0.3, 0.46]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff2222" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

/* =============================================
   METALLIC SPHERE — Chrome/Gold reflective
   ============================================= */
function MetallicSphere({
  position = [0, 0, 0],
  scale = 1,
  color = '#38BDF8',
  speed = 0.3,
  emissiveIntensity = 0.05,
}) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed * 0.5 + position[1]) * 0.3
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed * 0.4 + position[0]) * 0.4
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.15
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.08}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

/* =============================================
   LIGHT BEAM — Volumetric-like effect
   ============================================= */
function LightBeam({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#38BDF8', opacity = 0.04 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.opacity = opacity + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[0.3, 15]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

/* =============================================
   MAIN: FLOATING OBJECTS
   Organized in 3 depth layers with parallax
   ============================================= */
export default function FloatingObjects({
  scrollProgress = 0,
  mousePosition = { x: 0, y: 0 },
  performanceTier = 'high',
}) {
  const backgroundRef = useRef()
  const midgroundRef = useRef()
  const foregroundRef = useRef()

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    // Background parallax (subtle)
    if (backgroundRef.current) {
      backgroundRef.current.position.x = THREE.MathUtils.lerp(
        backgroundRef.current.position.x,
        -mousePosition.x * 0.5,
        delta * 1.5
      )
      backgroundRef.current.position.y = THREE.MathUtils.lerp(
        backgroundRef.current.position.y,
        -mousePosition.y * 0.3 - scrollProgress * 3,
        delta * 1.5
      )
      backgroundRef.current.rotation.y = Math.sin(time * 0.05) * 0.02
    }

    // Midground parallax (moderate)
    if (midgroundRef.current) {
      midgroundRef.current.position.x = THREE.MathUtils.lerp(
        midgroundRef.current.position.x,
        -mousePosition.x * 1.2,
        delta * 2
      )
      midgroundRef.current.position.y = THREE.MathUtils.lerp(
        midgroundRef.current.position.y,
        -mousePosition.y * 0.8 - scrollProgress * 5,
        delta * 2
      )
    }

    // Foreground parallax (stronger)
    if (foregroundRef.current) {
      foregroundRef.current.position.x = THREE.MathUtils.lerp(
        foregroundRef.current.position.x,
        -mousePosition.x * 2.5,
        delta * 2.5
      )
      foregroundRef.current.position.y = THREE.MathUtils.lerp(
        foregroundRef.current.position.y,
        -mousePosition.y * 1.5 - scrollProgress * 8,
        delta * 2.5
      )
    }
  })

  const showDetail = performanceTier !== 'low'

  return (
    <>
      {/* ===== BACKGROUND LAYER (z: -20 to -10) ===== */}
      <group ref={backgroundRef}>
        <FilmReel position={[-9, 3, -18]} scale={1.8} speed={0.08} color="#666" />
        <FilmReel position={[10, -4, -20]} scale={2.2} speed={0.06} color="#555" />
        {showDetail && (
          <>
            <FilmReel position={[0, 8, -22]} scale={1.2} speed={0.1} color="#777" />
            <MetallicSphere position={[-6, 6, -15]} scale={0.4} color="#b8b8c0" speed={0.2} />
            <MetallicSphere position={[7, -6, -16]} scale={0.3} color="#38BDF8" speed={0.25} />
            <MetallicSphere position={[-3, -8, -19]} scale={0.5} color="#4a9ead" speed={0.15} emissiveIntensity={0.1} />
          </>
        )}
        <LightBeam position={[-5, 0, -17]} rotation={[0, 0, 0.3]} color="#38BDF8" opacity={0.03} />
        <LightBeam position={[6, 2, -16]} rotation={[0, 0, -0.2]} color="#4a9ead" opacity={0.025} />
      </group>

      {/* ===== MIDGROUND LAYER (z: -10 to -3) ===== */}
      <group ref={midgroundRef}>
        <FilmStrip position={[-5, 1, -7]} rotation={[0.1, 0.2, 0.05]} scale={1.3} speed={0.3} />
        <FilmStrip position={[6, -2, -6]} rotation={[-0.05, -0.15, 0.1]} scale={1.1} speed={0.25} />
        {showDetail && (
          <>
            <FilmStrip position={[0, 5, -8]} rotation={[0.2, 0, -0.1]} scale={0.9} speed={0.35} />
            <CinemaCamera position={[8, 2, -5]} scale={0.7} speed={0.15} />
            <CinemaCamera position={[-7, -3, -6]} scale={0.5} speed={0.12} />
          </>
        )}
        <MetallicSphere position={[-4, -3, -5]} scale={0.7} color="#7DD3FC" speed={0.2} />
        <MetallicSphere position={[3, 4, -4]} scale={0.5} color="#b8b8c0" speed={0.3} />
        <LightBeam position={[2, 0, -5]} rotation={[0, 0, 0.6]} color="#7DD3FC" opacity={0.04} />
      </group>

      {/* ===== FOREGROUND LAYER (z: -3 to 2) ===== */}
      <group ref={foregroundRef}>
        <MetallicSphere position={[5, -4, -1]} scale={0.18} color="#38BDF8" speed={0.4} emissiveIntensity={0.15} />
        <MetallicSphere position={[-7, 5, 0]} scale={0.12} color="#4a9ead" speed={0.35} emissiveIntensity={0.2} />
        <MetallicSphere position={[3, 6, -2]} scale={0.08} color="#b8b8c0" speed={0.5} />
        {showDetail && (
          <>
            <MetallicSphere position={[-5, -6, -1.5]} scale={0.1} color="#7DD3FC" speed={0.45} emissiveIntensity={0.1} />
            <FilmStrip position={[9, 0, -2]} rotation={[0, 0.3, 0.5]} scale={0.6} speed={0.4} />
          </>
        )}
      </group>
    </>
  )
}
