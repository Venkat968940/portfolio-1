import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import type { Mesh } from 'three'

interface CrystalObjectProps {
  color: string
  scale?: number
  position?: [number, number, number]
}

/** A low-poly faceted crystal with a glassy, refractive look. */
export const CrystalObject = ({
  color,
  scale = 1,
  position = [0, 0, 0],
}: CrystalObjectProps) => {
  const mesh = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.3
    mesh.current.rotation.x += delta * 0.1
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={mesh} scale={scale} position={position}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.9}
          thickness={1.2}
          roughness={0.05}
          metalness={0.1}
          ior={1.5}
          clearcoat={1}
          flatShading
        />
      </mesh>
    </Float>
  )
}
