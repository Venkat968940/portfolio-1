import { motion } from 'framer-motion'
import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { staggerContainer, wordReveal, viewportOnce } from '../animations/variants'

interface RevealTextProps {
  text: string
  /** Split granularity. */
  by?: 'word' | 'char'
  delay?: number
  stagger?: number
  sx?: SxProps<Theme>
  className?: string
}

/**
 * Masked, staggered reveal of text by word or character. Each token rises from
 * behind a clipping box for a premium "type-up" feel. Triggers once in view.
 */
export const RevealText = ({
  text,
  by = 'word',
  delay = 0,
  stagger = 0.045,
  sx,
  className,
}: RevealTextProps) => {
  const tokens = by === 'word' ? text.split(' ') : Array.from(text)

  return (
    <Box
      component={motion.span}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      sx={{ display: 'inline-flex', flexWrap: 'wrap', ...sx }}
      className={className}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <Box
          key={`${token}-${i}`}
          aria-hidden
          sx={{
            display: 'inline-flex',
            overflow: 'hidden',
            paddingBottom: '0.12em',
            marginRight: by === 'word' ? '0.28em' : 0,
          }}
        >
          <Box component={motion.span} variants={wordReveal} sx={{ display: 'inline-block' }}>
            {token === ' ' ? ' ' : token}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
