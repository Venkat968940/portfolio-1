import type { IconType } from 'react-icons'
import { motion } from 'framer-motion'
import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

interface FloatingIconProps {
  icon: IconType
  size?: number
  color?: string
  delay?: number
  duration?: number
  sx?: SxProps<Theme>
}

/** A glass chip housing a tech icon with a gentle perpetual float. */
export const FloatingIcon = ({
  icon: Icon,
  size = 56,
  color,
  delay = 0,
  duration = 4,
  sx,
}: FloatingIconProps) => (
  <Box
    component={motion.div}
    animate={{ y: [0, -14, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    sx={{
      width: size,
      height: size,
      display: 'grid',
      placeItems: 'center',
      borderRadius: '30%',
      color: color ?? 'primary.main',
      fontSize: size * 0.5,
      background: (t) => t.custom.glass.background,
      border: (t) => t.custom.glass.border,
      backdropFilter: 'blur(16px)',
      boxShadow: (t) => t.custom.glass.shadow,
      ...sx,
    }}
  >
    <Icon />
  </Box>
)
