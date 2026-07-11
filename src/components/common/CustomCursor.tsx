import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { prefersReducedMotion } from '@/utils'
import { motion, useSpring } from 'framer-motion'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useUIStore } from '@/store/useUIStore'

/**
 * A two-part custom cursor (precise dot + lagging glow ring) for fine-pointer
 * devices. The ring expands on interactive hover. Disabled on touch screens
 * and when reduced motion is requested.
 */
export const CustomCursor = () => {
  const theme = useTheme()
  const { x, y } = useMousePosition()
  const variant = useUIStore((s) => s.cursorVariant)
  // Resolve once: only fine-pointer devices without reduced-motion get the cursor.
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !prefersReducedMotion(),
  )

  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 })
  const dotX = useSpring(x, { stiffness: 600, damping: 35 })
  const dotY = useSpring(y, { stiffness: 600, damping: 35 })

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('custom-cursor-active')
    return () => document.body.classList.remove('custom-cursor-active')
  }, [enabled])

  if (!enabled) return null
  const hovering = variant === 'hover'

  // Portalled to <body> so it escapes #root's `isolation: isolate` stacking
  // context and paints above portalled overlays (Drawer, Modal) too. zIndex is
  // set above MUI's tooltip layer (1500) so nothing in the app covers it.
  return createPortal(
    <>
      <Box
        component={motion.div}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.4 : 0.7 }}
        sx={{
          position: 'fixed',
          top: -18,
          left: -18,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: `1.5px solid ${theme.palette.primary.main}`,
          pointerEvents: 'none',
          zIndex: 100000,
          mixBlendMode: theme.palette.mode === 'dark' ? 'screen' : 'multiply',
        }}
      />
      <Box
        component={motion.div}
        style={{ x: dotX, y: dotY }}
        sx={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: theme.custom.gradient.brand,
          boxShadow: theme.custom.glow,
          pointerEvents: 'none',
          zIndex: 100000,
        }}
      />
    </>,
    document.body,
  )
}
