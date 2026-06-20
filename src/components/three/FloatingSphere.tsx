import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import type { Mesh } from 'three'

interface FloatingSphereProps {
  color: string
  emissive: string
  scale?: number
}

/**
 * A morphing glass orb. It slowly distorts, breathes, and eases its rotation
 * toward the pointer for a tactile, interactive feel.
 */
export const FloatingSphere = ({ color, emissive, scale = 1.6 }: FloatingSphereProps) => {
  const mesh = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!mesh.current) return
    const { x, y } = state.pointer
    mesh.current.rotation.y += delta * 0.15
    mesh.current.rotation.x += (y * 0.4 - mesh.current.rotation.x) * 0.05
    mesh.current.rotation.z += (-x * 0.2 - mesh.current.rotation.z) * 0.05
  })

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} scale={scale} castShadow>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.45}
          roughness={0.08}
          metalness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.1}
          distort={0.38}
          speed={1.6}
        />
      </mesh>
    </Float>
  )
}
