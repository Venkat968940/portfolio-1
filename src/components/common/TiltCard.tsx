import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { prefersReducedMotion } from '@/utils'

interface TiltCardProps {
  children: ReactNode
  /** Max tilt in degrees. */
  max?: number
  glare?: boolean
  sx?: SxProps<Theme>
}

/** 3D perspective tilt that follows the cursor, with an optional glare sweep. */
export const TiltCard = ({ children, max = 12, glare = true, sx }: TiltCardProps) => {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 18,
  })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 18,
  })
  const glareX = useTransform(px, [0, 1], ['0%', '100%'])
  const glareY = useTransform(py, [0, 1], ['0%', '100%'])
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.25), transparent 55%)`,
  )

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <Box
      component={motion.div}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      sx={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...sx,
      }}
    >
      <Box sx={{ transform: 'translateZ(40px)', height: '100%' }}>{children}</Box>
      {glare && (
        <Box
          component={motion.div}
          aria-hidden
          style={{ background: glareBackground }}
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </Box>
  )
}
