import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { SphereGeometry } from 'three'
import type { Group, Mesh, MeshBasicMaterial } from 'three'
import { computeOrbitState } from '../animations/orbitTimeline'
import { scrollSignal } from '../hooks/useScrollProgress'
import { blendFor } from '../blend'
import type { OrbitLayer } from '../types/orbit.types'

interface EnergyPulseProps {
  radius: number
  color: string
  layer: OrbitLayer
  mode: 'light' | 'dark'
  count?: number
  direction?: 1 | -1
}

/** Bright packets of energy travelling around an orbital ring. */
export const EnergyPulse = ({ radius, color, layer, mode, count = 3, direction = 1 }: EnergyPulseProps) => {
  const group = useRef<Group>(null)
  const materials = useRef<MeshBasicMaterial[]>([])
  const geometry = useMemo(() => new SphereGeometry(0.05, 12, 12), [])
  const pulses = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ offset: (i / count) * Math.PI * 2, speed: 0.5 + (i % 3) * 0.12 })),
    [count],
  )

  useFrame((state) => {
    const s = computeOrbitState(scrollSignal.progress)
    const op = s.ringOpacity[layer] * s.glow
    const t = state.clock.elapsedTime
    materials.current.forEach((m) => {
      if (m) m.opacity += (op - m.opacity) * 0.1
    })
    if (group.current) {
      group.current.children.forEach((child, i) => {
        const a = pulses[i].offset + t * pulses[i].speed * direction
        ;(child as Mesh).position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0)
      })
    }
  })

  return (
    <group ref={group}>
      {pulses.map((p, i) => (
        <mesh key={p.offset} geometry={geometry}>
          <meshBasicMaterial
            ref={(m) => {
              if (m) materials.current[i] = m
            }}
            color={color}
            transparent
            opacity={0}
            depthWrite={false}
            blending={blendFor(mode)}
          />
        </mesh>
      ))}
    </group>
  )
}
