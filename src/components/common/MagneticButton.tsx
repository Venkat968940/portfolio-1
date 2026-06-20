import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useUIStore } from '@/store/useUIStore'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  sx?: SxProps<Theme>
  className?: string
}

/**
 * Wraps any content in a magnetic hover field. The inner element subtly tracks
 * the cursor and springs back on leave. Also flips the custom cursor variant.
 */
export const MagneticButton = ({
  children,
  strength = 0.4,
  sx,
  className,
}: MagneticButtonProps) => {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength)
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)

  return (
    <Box
      component={motion.div}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        onMouseLeave()
        setCursorVariant('default')
      }}
      onMouseEnter={() => setCursorVariant('hover')}
      style={{ x, y }}
      sx={{ display: 'inline-flex', willChange: 'transform', ...sx }}
      className={className}
    >
      {children}
    </Box>
  )
}
