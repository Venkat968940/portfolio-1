import type { PaletteMode, Shadows } from '@mui/material'

/**
 * MUI requires a tuple of exactly 25 shadow strings. We generate a soft,
 * layered elevation ramp that reads well on both dark and light surfaces.
 */
const buildShadows = (mode: PaletteMode): Shadows => {
  const base = mode === 'dark' ? '0, 0, 0' : '15, 23, 42'
  const ramp = Array.from({ length: 25 }, (_, i) => {
    if (i === 0) return 'none'
    const y = Math.round(i * 1.4)
    const blur = Math.round(i * 2.6 + 6)
    const a1 = (mode === 'dark' ? 0.5 : 0.12).toFixed(2)
    const a2 = (mode === 'dark' ? 0.28 : 0.06).toFixed(2)
    return `0px ${y}px ${blur}px rgba(${base}, ${a1}), 0px ${Math.round(
      y / 2,
    )}px ${Math.round(blur / 2)}px rgba(${base}, ${a2})`
  })
  return ramp as unknown as Shadows
}

/** Semantic, non-MUI shadows used by glass + glow components. */
export const fx = {
  light: {
    glass: '0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
    glassHover: '0 20px 48px rgba(15, 23, 42, 0.18), inset 0 1px 0 rgba(255,255,255,0.7)',
    glow: '0 0 40px rgba(79, 70, 229, 0.35)',
  },
  dark: {
    glass: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
    glassHover: '0 24px 56px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
    glow: '0 0 48px rgba(124, 58, 237, 0.5)',
  },
} as const

export default buildShadows
