import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { Vector3 } from 'three'
import { Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { OrbitSystem } from './components/OrbitSystem'
import { cameraTargetAt } from './animations/cameraTimeline'
import { smoothstep } from './animations/orbitTimeline'
import { resolveNodeCount, resolveParticleCount, selectNodes } from './data'
import { scrollSignal, useScrollProgress } from './hooks/useScrollProgress'
import { orbitPointer, useOrbitControls } from './hooks/useOrbitControls'
import type { ThemeColors } from './types/orbit.types'

// Module-scope scratch — reused each frame (single scene instance).
const _camTarget = new Vector3()

/** Damped, scroll-driven camera with restrained mouse parallax. */
const CameraRig = () => {
  useFrame((state) => {
    cameraTargetAt(scrollSignal.progress, _camTarget)
    _camTarget.x += orbitPointer.x * 0.6
    _camTarget.y += orbitPointer.y * 0.4
    state.camera.position.lerp(_camTarget, 0.045)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

const Scene = ({ colors, isMobile }: { colors: ThemeColors; isMobile: boolean }) => {
  const nodes = useMemo(
    () => selectNodes(resolveNodeCount(typeof window === 'undefined' ? 1280 : window.innerWidth)),
    [],
  )
  const particleCount = useMemo(
    () => resolveParticleCount(typeof window === 'undefined' ? 1280 : window.innerWidth),
    [],
  )

  const lowBloom = colors.mode === 'light'

  return (
    <>
      <fog attach="fog" args={[colors.fog, 10, 30]} />
      <ambientLight intensity={colors.mode === 'dark' ? 0.5 : 0.9} />
      <pointLight position={[6, 5, 6]} intensity={1.6} color={colors.primary} />
      <pointLight position={[-6, -4, -3]} intensity={1.3} color={colors.secondary} />
      <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />

      <Sparkles count={isMobile ? 30 : 80} scale={18} size={2.2} speed={0.2} color={colors.secondary} opacity={0.4} />

      <CameraRig />
      <OrbitSystem nodes={nodes} colors={colors} particleCount={particleCount} />

      {isMobile ? (
        <EffectComposer enableNormalPass={false}>
          <Bloom intensity={lowBloom ? 0.3 : 0.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      ) : (
        <EffectComposer enableNormalPass={false}>
          <Bloom intensity={lowBloom ? 0.35 : 0.6} luminanceThreshold={lowBloom ? 0.4 : 0.28} luminanceSmoothing={0.9} mipmapBlur />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.3} darkness={colors.mode === 'dark' ? 0.55 : 0.3} />
        </EffectComposer>
      )}
    </>
  )
}

/**
 * Persistent, full-viewport "Floating Tech Orbit" — fixed behind all content,
 * pointer-events-free, and evolving purely from scroll progress. Theme-aware
 * (colors + fog react to dark/light mode).
 */
const GlobalOrbitScene = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  useScrollProgress()
  useOrbitControls()

  const colors: ThemeColors = {
    mode: theme.palette.mode,
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    fog: theme.palette.mode === 'dark' ? '#030712' : '#dde6f7',
  }

  const wrapRef = useRef<HTMLDivElement>(null)

  // Keep the orbit at a restrained base opacity (50%) so it reads as ambient
  // texture rather than overshadowing the content, then fade it out further
  // (50% → 5%) between Contact and the Footer so the footer becomes the calm
  // visual focus.
  useEffect(() => {
    const BASE_OPACITY = 0.5
    let raf = 0
    const tick = () => {
      if (wrapRef.current) {
        wrapRef.current.style.opacity = String(
          BASE_OPACITY * (1 - smoothstep(0.9, 1, scrollSignal.progress) * 0.9),
        )
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <Box
      ref={wrapRef}
      aria-hidden
      sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', willChange: 'opacity' }}
    >
      <Canvas
        camera={{ position: [0, 0.2, 7], fov: 50 }}
        dpr={isMobile ? [1, 1.4] : [1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Scene colors={colors} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </Box>
  )
}

export default GlobalOrbitScene
