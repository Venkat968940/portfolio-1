import type { ElementType } from 'react'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material'

interface GlassButtonProps extends ButtonProps {
  glassVariant?: 'solid' | 'ghost'
  /** Polymorphic rendering (e.g. component="a" for external links). */
  component?: ElementType
  href?: string
  target?: string
  rel?: string
}

/**
 * A glass-morphism button. `solid` renders the brand gradient with a glow;
 * `ghost` is a translucent outlined pill.
 */
export const GlassButton = styled(Button, {
  shouldForwardProp: (p) => p !== 'glassVariant',
})<GlassButtonProps>(({ theme, glassVariant = 'solid' }) => ({
  position: 'relative',
  borderRadius: 999,
  paddingInline: 28,
  paddingBlock: 12,
  overflow: 'hidden',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',

  ...(glassVariant === 'solid'
    ? {
        color: '#fff',
        background: theme.custom.gradient.brand,
        boxShadow: theme.custom.glow,
        '&:hover': {
          boxShadow: `0 0 60px ${theme.palette.primary.main}`,
          transform: 'translateY(-2px)',
        },
      }
    : {
        color: theme.palette.text.primary,
        background: theme.custom.glass.background,
        border: theme.custom.glass.border,
        '&:hover': {
          borderColor: theme.palette.primary.main,
          background: theme.custom.glass.background,
          transform: 'translateY(-2px)',
        },
      }),

  // subtle sheen
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-60%',
    width: '40%',
    height: '100%',
    background:
      'linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)',
    transform: 'skewX(-20deg)',
    transition: 'left 0.6s ease',
  },
  '&:hover::after': { left: '120%' },
}))
