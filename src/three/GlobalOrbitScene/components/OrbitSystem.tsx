import { useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import type { BufferGeometry, Group, LineBasicMaterial, Object3D } from 'three'
import { blendFor } from '../blend'
import { CenterCore } from './CenterCore'
import { OrbitRing } from './OrbitRing'
import { TechNode } from './TechNode'
import { EnergyPulse } from './EnergyPulse'
import { OrbitParticles } from './OrbitParticles'
import { CONSTELLATIONS, ORBIT_LAYERS, layoutNodes } from '../data'
import { computeOrbitState } from '../animations/orbitTimeline'
import { scrollSignal } from '../hooks/useScrollProgress'
import { orbitPointer } from '../hooks/useOrbitControls'
import type { TechNodeDatum, ThemeColors } from '../types/orbit.types'

// Max mouse tilt ≈ 5°.
const MAX_TILT = 0.087
// Module-scope scratch — reused each frame (single OrbitSystem instance).
const _a = new Vector3()
const _b = new Vector3()

interface NodeLinksProps {
  nodeRefs: React.RefObject<Record<string, Object3D | null>>
  color: string
  mode: 'light' | 'dark'
}

/** Temporary constellations linking specific tech pairs during the Projects stage. */
const NodeLinks = ({ nodeRefs, color, mode }: NodeLinksProps) => {
  const geom = useRef<BufferGeometry>(null)
  const material = useRef<LineBasicMaterial>(null)
  const positions = useMemo(() => new Float32Array(CONSTELLATIONS.length * 2 * 3), [])

  useFrame(() => {
    const g = geom.current
    if (!g) return
    const arr = g.attributes.position.array as Float32Array
    let n = 0
    CONSTELLATIONS.forEach(([from, to]) => {
      const a = nodeRefs.current[from]
      const b = nodeRefs.current[to]
      if (!a || !b) return
      a.getWorldPosition(_a)
      b.getWorldPosition(_b)
      arr.set([_a.x, _a.y, _a.z, _b.x, _b.y, _b.z], n * 6)
      n++
    })
    g.attributes.position.needsUpdate = true
    g.setDrawRange(0, n * 2)
    if (material.current) {
      const target = computeOrbitState(scrollSignal.progress).linkOpacity * (mode === 'dark' ? 0.35 : 0.45)
      material.current.opacity += (target - material.current.opacity) * 0.1
    }
  })

  return (
    <lineSegments frustumCulled={false}>
      <bufferGeometry ref={geom}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial ref={material} color={color} transparent opacity={0} depthWrite={false} blending={blendFor(mode)} />
    </lineSegments>
  )
}

interface OrbitSystemProps {
  nodes: TechNodeDatum[]
  colors: ThemeColors
  particleCount: number
}

export const OrbitSystem = ({ nodes, colors, particleCount }: OrbitSystemProps) => {
  const system = useRef<Group>(null)
  const spins = useRef<(Group | null)[]>([])
  const nodeRefs = useRef<Record<string, Object3D | null>>({})
  const [hovered, setHovered] = useState<string | null>(null)
  const { camera } = useThree()

  const byLayer = useMemo(() => layoutNodes(nodes), [nodes])
  const ids = useMemo(() => nodes.map((n) => n.id), [nodes])

  // Light mode uses blue-tinted paths/pulses for visible-but-subtle contrast.
  const ringColor = colors.mode === 'dark' ? colors.secondary : '#3b82f6'
  const pulseColor = colors.mode === 'dark' ? colors.primary : '#6366f1'

  useFrame((_, delta) => {
    const s = computeOrbitState(scrollSignal.progress)

    // spin each ring at its own speed, scaled by the stage
    ORBIT_LAYERS.forEach((cfg, i) => {
      const g = spins.current[i]
      if (g) g.rotation.z += cfg.direction * cfg.speed * s.speed * delta
    })

    if (system.current) {
      // scroll-driven translate (right → center) + scale (0.8 → 1.5 → 1.0)
      system.current.position.x += (s.positionX - system.current.position.x) * 0.07
      const ripple = 1 + orbitPointer.ripple * 0.015
      const targetScale = s.scale * ripple
      const cur = system.current.scale.x
      system.current.scale.setScalar(cur + (targetScale - cur) * 0.08)
      // restrained mouse tilt (≤ 5°)
      const tx = orbitPointer.y * MAX_TILT
      const ty = orbitPointer.x * MAX_TILT
      system.current.rotation.x += (tx - system.current.rotation.x) * 0.05
      system.current.rotation.y += (ty - system.current.rotation.y) * 0.05
    }
    orbitPointer.ripple *= 0.94

    // proximity "hover": nearest node to the cursor in screen space
    let best: string | null = null
    let bestDist = 0.12
    for (const id of ids) {
      const o = nodeRefs.current[id]
      if (!o) continue
      o.getWorldPosition(_a).project(camera)
      if (_a.z > 1) continue
      const d = Math.hypot(_a.x - orbitPointer.x, _a.y - orbitPointer.y)
      if (d < bestDist) {
        bestDist = d
        best = id
      }
    }
    if (best !== hovered) setHovered(best)
  })

  return (
    <group>
      <OrbitParticles count={particleCount} color={colors.mode === 'dark' ? colors.secondary : '#64748b'} mode={colors.mode} />
      <NodeLinks nodeRefs={nodeRefs} color={pulseColor} mode={colors.mode} />

      <group ref={system}>
        <CenterCore colors={colors} />

        {ORBIT_LAYERS.map((cfg, i) => {
          const layerNodes = byLayer[cfg.layer]
          return (
            <group key={cfg.layer} rotation={[cfg.tilt[0], 0, cfg.tilt[1]]}>
              <OrbitRing radius={cfg.radius} color={ringColor} layer={cfg.layer} mode={colors.mode} />
              <EnergyPulse radius={cfg.radius} color={pulseColor} layer={cfg.layer} mode={colors.mode} direction={cfg.direction} />
              <group ref={(g) => { spins.current[i] = g }}>
                {layerNodes.map((node, j) => {
                  const a = (j / Math.max(1, layerNodes.length)) * Math.PI * 2
                  const pos: [number, number, number] = [
                    Math.cos(a) * cfg.radius,
                    Math.sin(a) * cfg.radius,
                    0,
                  ]
                  return (
                    <TechNode
                      key={node.id}
                      node={node}
                      position={pos}
                      hovered={hovered === node.id}
                      mode={colors.mode}
                      onRef={(o) => { nodeRefs.current[node.id] = o }}
                    />
                  )
                })}
              </group>
            </group>
          )
        })}
      </group>
    </group>
  )
}
