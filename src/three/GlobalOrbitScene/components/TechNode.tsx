import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import type { Object3D, Mesh, MeshBasicMaterial } from 'three'
import { nodeVisibility } from '../animations/orbitTimeline'
import { scrollSignal } from '../hooks/useScrollProgress'
import { blendFor } from '../blend'
import type { TechNodeDatum, Vec3 } from '../types/orbit.types'

interface TechNodeProps {
  node: TechNodeDatum
  position: Vec3
  hovered: boolean
  mode: 'light' | 'dark'
  /** Registers this node's group so the system can hit-test it against the cursor. */
  onRef: (o: Object3D | null) => void
}

/**
 * A floating glass technology capsule — a premium pill (frosted surface, thin
 * border, icon + label) rendered as billboarded glass UI, with a soft 3D halo
 * behind it for depth/bloom. Visibility tracks its reveal stage; it lifts and
 * brightens on (proximity) hover. Theme-aware for crisp contrast in both modes.
 */
export const TechNode = ({ node, position, hovered, mode, onRef }: TechNodeProps) => {
  const halo = useRef<Mesh>(null)
  const haloMat = useRef<MeshBasicMaterial>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const dark = mode === 'dark'

  useFrame((state) => {
    const vis = nodeVisibility(scrollSignal.progress, node.appearAt)
    const t = state.clock.elapsedTime
    if (halo.current && haloMat.current) {
      const hs = (hovered ? 1.5 : 1.2) + Math.sin(t * 1.6 + position[1]) * 0.05
      halo.current.scale.setScalar(hs)
      haloMat.current.opacity = vis * (dark ? (hovered ? 0.5 : 0.28) : hovered ? 0.3 : 0.16)
    }
    if (wrap.current) {
      wrap.current.style.opacity = String(vis)
      wrap.current.style.transform = `scale(${hovered ? 1.1 : 1})`
    }
  })

  const capsuleBg = dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.78)'
  const capsuleBorder = hovered ? node.color : dark ? 'rgba(255,255,255,0.16)' : 'rgba(15,23,42,0.1)'
  const capsuleShadow = hovered
    ? `0 8px 28px ${node.color}55`
    : dark
      ? '0 6px 22px rgba(0,0,0,0.45)'
      : '0 8px 22px rgba(30,58,138,0.14)'

  return (
    <group ref={onRef} position={position}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.7}>
        {/* soft halo behind the capsule (depth + bloom) */}
        <mesh ref={halo} scale={1.2}>
          <circleGeometry args={[0.42, 32]} />
          <meshBasicMaterial ref={haloMat} color={node.color} transparent opacity={0} depthWrite={false} blending={blendFor(mode)} />
        </mesh>

        {/* glass capsule */}
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }} zIndexRange={[0, 0]}>
          <div
            ref={wrap}
            style={{
              opacity: 0,
              transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform, opacity',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 14px 7px 9px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                background: capsuleBg,
                border: `1px solid ${capsuleBorder}`,
                boxShadow: `${capsuleShadow}, inset 0 1px 0 ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.9)'}`,
                color: dark ? '#E2E8F0' : '#0B1120',
                fontFamily: '"Sora", sans-serif',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '-0.01em',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <span
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 24,
                  height: 24,
                  fontSize: 17,
                  color: node.color,
                  filter: `drop-shadow(0 0 6px ${node.color}66)`,
                }}
              >
                <node.icon />
              </span>
              {node.label}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  )
}
