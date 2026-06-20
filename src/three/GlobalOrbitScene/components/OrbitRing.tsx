import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { MeshBasicMaterial } from 'three'
import { computeOrbitState } from '../animations/orbitTimeline'
import { scrollSignal } from '../hooks/useScrollProgress'
import { blendFor } from '../blend'
import type { OrbitLayer } from '../types/orbit.types'

interface OrbitRingProps {
  radius: number
  color: string
  layer: OrbitLayer
  mode: 'light' | 'dark'
}

/** A thin, softly glowing orbital path (lies in the local XY plane). */
export const OrbitRing = ({ radius, color, layer, mode }: OrbitRingProps) => {
  const material = useRef<MeshBasicMaterial>(null)

  useFrame(() => {
    if (!material.current) return
    const s = computeOrbitState(scrollSignal.progress)
    // light needs higher opacity (normal blending) to stay visible on white
    const factor = mode === 'dark' ? 0.06 + s.glow * 0.08 : 0.22 + s.glow * 0.1
    const target = s.ringOpacity[layer] * factor
    material.current.opacity += (target - material.current.opacity) * 0.1
  })

  return (
    <mesh frustumCulled={false}>
      <torusGeometry args={[radius, mode === 'dark' ? 0.012 : 0.016, 12, 180]} />
      <meshBasicMaterial
        ref={material}
        color={color}
        transparent
        opacity={0}
        depthWrite={false}
        blending={blendFor(mode)}
      />
    </mesh>
  )
}
