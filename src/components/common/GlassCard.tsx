import { forwardRef } from 'react'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

interface GlassCardProps extends BoxProps {
  /** Adds an animated gradient border glow. */
  glow?: boolean
  /** Lift + intensify shadow on hover. */
  interactive?: boolean
  intensity?: number
}

const Root = styled(Box, {
  shouldForwardProp: (p) =>
    p !== 'glow' && p !== 'interactive' && p !== 'intensity',
})<GlassCardProps>(({ theme, glow, interactive, intensity = 1 }) => ({
  position: 'relative',
  borderRadius: 26,
  background: theme.custom.glass.background,
  border: theme.custom.glass.border,
  backdropFilter: theme.custom.glass.blur,
  WebkitBackdropFilter: theme.custom.glass.blur,
  boxShadow: theme.custom.glass.shadow,
  padding: theme.spacing(3),
  overflow: 'hidden',
  transition:
    'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, border-color 0.5s ease',
  isolation: 'isolate',

  ...(glow && {
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: -1,
      borderRadius: 'inherit',
      padding: 1,
      background: theme.custom.gradient.brand,
      opacity: 0.5 * intensity,
      WebkitMask:
        'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    },
  }),

  ...(interactive && {
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: theme.custom.glass.shadowHover,
      borderColor: theme.palette.primary.main,
    },
  }),
}))

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (props, ref) => <Root ref={ref} {...props} />,
)
GlassCard.displayName = 'GlassCard'
