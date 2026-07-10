import { lazy, Suspense } from 'react'
import { Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { ColorModeProvider } from '@/theme/ColorModeProvider'
import { AuroraBackground } from '@/components/layout'
import { CustomCursor } from '@/components/common/CustomCursor'
import { ScrollProgress } from '@/components/common/ScrollProgress'
import { Navbar } from '@/components/layout/Navbar'
import { AppRoutes } from '@/routes'
import { useLenis } from '@/hooks'

// Persistent WebGL "Floating Tech Orbit" experience — lazy so three stays out
// of the initial bundle and hydrates after first paint.
const GlobalOrbitScene = lazy(() => import('@/three/GlobalOrbitScene'))

const App = () => {
  // Smooth scrolling + GSAP ScrollTrigger sync (no-op under reduced motion).
  useLenis()

  return (
    <ColorModeProvider>
      {/* layered background: aurora (z -1) → 3D scene (z 0) → scrim (z 0) → content (z 1) */}
      <AuroraBackground />
      <Suspense fallback={null}>
        <GlobalOrbitScene />
      </Suspense>

      {/* Readability scrim: a center-biased vignette in the page background color
          that sits above the orbit so the reading column stays calm while the
          orbit survives as ambient texture at the edges. In light mode the
          center carries a slight tint to flatten the halo the orbit's bright
          core would otherwise cast through a fully-transparent center. */}
      <Box
        aria-hidden
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: (t) => {
            const bg = t.palette.background.default
            const center = t.palette.mode === 'light' ? alpha(bg, 0.25) : 'transparent'
            return `radial-gradient(120% 90% at 50% 40%, ${center} 0%, ${alpha(
              bg,
              0.55,
            )} 60%, ${alpha(bg, 0.8)} 100%)`
          },
        }}
      />

      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <AppRoutes />
      </Box>
    </ColorModeProvider>
  )
}

export default App
