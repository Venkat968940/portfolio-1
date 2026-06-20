import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Preload, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useTheme } from '@mui/material/styles'
import { FloatingSphere } from './FloatingSphere'
import { ParticleField } from './ParticleField'
import { StarsField } from './StarsField'

/**
 * The hero's interactive 3D scene: a morphing glass orb wrapped in a particle
 * field and sparkles, lit with brand-colored lights and finished with a bloom
 * + vignette post pass. Renders on-demand and adapts DPR for performance.
 */
const HeroScene = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const primary = theme.palette.primary.main
  const secondary = theme.palette.secondary.main

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'none' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={isDark ? 0.4 : 0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} />
        <pointLight position={[-4, -2, -3]} intensity={3} color={secondary} />
        <pointLight position={[4, 3, 2]} intensity={2.5} color={primary} />

        <FloatingSphere color={primary} emissive={primary} scale={1.55} />
        <ParticleField count={1200} color={secondary} radius={5.5} />
        <Sparkles count={60} scale={8} size={3} speed={0.4} color={secondary} />
        {isDark && <StarsField />}

        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={isDark ? 1.1 : 0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={isDark ? 0.7 : 0.3} />
        </EffectComposer>

        <AdaptiveDpr pixelated />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default HeroScene
