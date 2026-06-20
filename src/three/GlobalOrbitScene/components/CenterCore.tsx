import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges, Float, Html } from '@react-three/drei'
import type { Mesh, MeshBasicMaterial } from 'three'
import { computeOrbitState } from '../animations/orbitTimeline'
import { scrollSignal } from '../hooks/useScrollProgress'
import { blendFor } from '../blend'
import type { ThemeColors } from '../types/orbit.types'

interface CenterCoreProps {
  colors: ThemeColors
}

/**
 * The identity core — a premium frosted-glass crystal with a soft blue-violet
 * tint, a thin faceted border, a gentle inner glow and a subtle "VM" monogram.
 * The full name lives only in the Hero content; never duplicated here. Reads
 * beautifully in both themes (transmission + theme-aware glow blending).
 */
export const CenterCore = ({ colors }: CenterCoreProps) => {
  const halo = useRef<Mesh>(null)
  const haloMat = useRef<MeshBasicMaterial>(null)
  const dark = colors.mode === 'dark'

  const crystalColor = dark ? colors.primary : '#8b9cff'
  const edgeColor = dark ? '#bcd0ff' : '#6366f1'

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const { glow } = computeOrbitState(scrollSignal.progress)
    if (halo.current && haloMat.current) {
      const s = 1.5 + Math.sin(t * 1.2) * 0.06
      halo.current.scale.setScalar(s)
      haloMat.current.opacity = (dark ? 0.1 : 0.16) * (0.7 + Math.sin(t * 1.2) * 0.2) * (0.6 + glow * 0.5)
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.18} floatIntensity={0.3}>
      {/* faceted glass crystal */}
      <mesh>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshPhysicalMaterial
          color={crystalColor}
          emissive={crystalColor}
          emissiveIntensity={dark ? 0.35 : 0.18}
          transmission={0.92}
          thickness={1.6}
          roughness={0.16}
          metalness={0.05}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.18}
          flatShading
        />
        {/* thin faceted border */}
        <Edges threshold={12} color={edgeColor} />
      </mesh>

      {/* soft inner glow */}
      <mesh scale={0.5}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color={colors.secondary} transparent opacity={dark ? 0.5 : 0.32} blending={blendFor(colors.mode)} />
      </mesh>

      {/* pulsing halo */}
      <mesh ref={halo}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial ref={haloMat} color={crystalColor} transparent opacity={0.1} depthWrite={false} blending={blendFor(colors.mode)} />
      </mesh>

      {/* "VM" monogram inside the core */}
      <Html center distanceFactor={6} style={{ pointerEvents: 'none' }} zIndexRange={[0, 0]}>
        <div
          style={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: '0.04em',
            color: dark ? '#ffffff' : '#1e1b4b',
            opacity: 0.92,
            textShadow: `0 0 16px ${dark ? colors.secondary : 'rgba(99,102,241,0.5)'}`,
            userSelect: 'none',
          }}
        >
          VM
        </div>
      </Html>
    </Float>
  )
}
