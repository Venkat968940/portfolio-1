import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Matrix4, Object3D } from 'three'
import type { Group, InstancedMesh, MeshBasicMaterial } from 'three'
import { computeOrbitState } from '../animations/orbitTimeline'
import { scrollSignal } from '../hooks/useScrollProgress'
import { blendFor } from '../blend'

interface OrbitParticlesProps {
  count: number
  color: string
  mode: 'light' | 'dark'
}

/** mulberry32 — deterministic PRNG so instance layout is stable + render-pure. */
const makeRand = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

/**
 * Floating star-dust as a single InstancedMesh — hundreds of tiny motes that
 * drift around the ecosystem. Fades in from the Experience section.
 */
export const OrbitParticles = ({ count, color, mode }: OrbitParticlesProps) => {
  const group = useRef<Group>(null)
  const mesh = useRef<InstancedMesh>(null)
  const material = useRef<MeshBasicMaterial>(null)

  const matrices = useMemo(() => {
    const rand = makeRand(0x5eed)
    const dummy = new Object3D()
    const out: Matrix4[] = []
    for (let i = 0; i < count; i++) {
      const r = 3 + rand() * 7
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
        r * Math.cos(phi),
      )
      const s = 0.01 + rand() * 0.025
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      out.push(dummy.matrix.clone())
    }
    return out
  }, [count])

  useLayoutEffect(() => {
    if (!mesh.current) return
    matrices.forEach((m, i) => mesh.current!.setMatrixAt(i, m))
    mesh.current.instanceMatrix.needsUpdate = true
  }, [matrices])

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.02
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.06
    }
    if (material.current) {
      const max = mode === 'dark' ? 0.8 : 0.35
      const target = computeOrbitState(scrollSignal.progress).particleOpacity * max
      material.current.opacity += (target - material.current.opacity) * 0.08
    }
  })

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial ref={material} color={color} transparent opacity={0} depthWrite={false} blending={blendFor(mode)} />
      </instancedMesh>
    </group>
  )
}
