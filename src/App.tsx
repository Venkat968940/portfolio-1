import { lazy, Suspense } from 'react'
import { Box } from '@mui/material'
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
      {/* layered background: aurora (z -1) → 3D scene (z 0) → content (z 1) */}
      <AuroraBackground />
      <Suspense fallback={null}>
        <GlobalOrbitScene />
      </Suspense>

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
