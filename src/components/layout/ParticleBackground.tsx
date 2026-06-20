import { useMemo } from 'react'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'

interface ParticleBackgroundProps {
  count?: number
}

/**
 * Lightweight DOM particle layer — a handful of softly glowing dots drifting
 * upward. Cheap alternative / complement to the WebGL field for non-hero
 * sections. Positions are deterministic so they stay stable across renders.
 */
export const ParticleBackground = ({ count = 26 }: ParticleBackgroundProps) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 37.5) % 100,
        size: 2 + ((i * 7) % 5),
        delay: (i % 10) * 0.7,
        duration: 9 + ((i * 3) % 8),
        drift: ((i % 5) - 2) * 18,
      })),
    [count],
  )

  return (
    <Box
      aria-hidden
      sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      {particles.map((p) => (
        <Box
          key={p.id}
          component={motion.span}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '-10%', x: [0, p.drift, 0], opacity: [0, 0.7, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: 0,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: (t) => t.custom.gradient.brand,
            boxShadow: (t) => t.custom.glow,
          }}
        />
      ))}
    </Box>
  )
}
