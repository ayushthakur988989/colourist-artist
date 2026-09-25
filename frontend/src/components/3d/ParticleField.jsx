import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Instanced particle system for cinematic dust/light particles
 * Gold, cyan, and white particles floating through 3D space
 */
export default function ParticleField({ count = 800 }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Generate particle data
  const particles = useMemo(() => {
    const data = []
    for (let i = 0; i < count; i++) {
      const colorType = Math.random()
      let color
      if (colorType < 0.4) {
        // Gold particles
        color = new THREE.Color().setHSL(0.12, 0.6 + Math.random() * 0.3, 0.4 + Math.random() * 0.3)
      } else if (colorType < 0.65) {
        // Cyan particles
        color = new THREE.Color().setHSL(0.52, 0.5 + Math.random() * 0.3, 0.35 + Math.random() * 0.2)
      } else {
        // White/silver particles
        color = new THREE.Color().setHSL(0, 0, 0.5 + Math.random() * 0.4)
      }

      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 40 - 5
        ),
        scale: 0.02 + Math.random() * 0.06,
        speed: 0.1 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        drift: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          0.005 + Math.random() * 0.015,
          (Math.random() - 0.5) * 0.01
        ),
        color,
        opacity: 0.3 + Math.random() * 0.7,
      })
    }
    return data
  }, [count])

  // Pre-compute colors for instanced mesh
  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3)
    particles.forEach((p, i) => {
      colors[i * 3] = p.color.r
      colors[i * 3 + 1] = p.color.g
      colors[i * 3 + 2] = p.color.b
    })
    return colors
  }, [particles, count])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime

    particles.forEach((particle, i) => {
      const { position, scale, speed, offset, drift } = particle

      // Continuous drift movement
      const x = position.x + Math.sin(time * speed * 0.5 + offset) * 1.5
      const y = position.y + time * drift.y * 2 // Slow upward drift
      const z = position.z + Math.cos(time * speed * 0.3 + offset) * 0.8

      // Wrap particles that drift too far
      const wrappedY = ((y + 25) % 50) - 25

      dummy.position.set(x, wrappedY, z)

      // Subtle pulsing scale
      const pulsingScale = scale * (1 + Math.sin(time * speed * 2 + offset) * 0.3)
      dummy.scale.setScalar(pulsingScale)
      dummy.updateMatrix()

      meshRef.current.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </sphereGeometry>
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  )
}
