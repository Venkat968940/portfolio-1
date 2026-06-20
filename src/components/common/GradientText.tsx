import { styled } from '@mui/material/styles'
import type { TypographyProps } from '@mui/material'
import { Typography } from '@mui/material'

interface GradientTextProps extends TypographyProps {
  /** Set true for an animated shimmering gradient. */
  animate?: boolean
}

const Gradient = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'animate',
})<{ animate?: boolean }>(({ theme, animate }) => ({
  display: 'inline',
  backgroundImage: theme.custom.gradient.brand,
  backgroundSize: animate ? '200% auto' : '100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
  animation: animate ? 'shimmer 5s linear infinite' : 'none',
}))

export const GradientText = ({ animate, ...props }: GradientTextProps) => (
  <Gradient component="span" animate={animate} {...props} />
)
