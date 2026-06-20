import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Points } from 'three'

interface ParticleFieldProps {
  count?: number
  color?: string
  radius?: number
}

/** A drifting cloud of points that gently rotates and parallaxes to the mouse. */
export const ParticleField = ({
  count = 1400,
  color = '#7C3AED',
  radius = 6,
}: ParticleFieldProps) => {
  const ref = useRef<Points>(null)

  const positions = useMemo(() => {
    // Deterministic PRNG (mulberry32) keeps render pure and the field stable.
    let seed = 0x9e3779b9
    const rand = () => {
      seed |= 0
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // distribute on a spherical shell with some jitter
      const r = radius * Math.cbrt(rand())
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count, radius])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.04
    ref.current.rotation.x = state.pointer.y * 0.1
    ref.current.rotation.z = state.pointer.x * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  )
}
