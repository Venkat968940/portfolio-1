import type { PaletteMode, PaletteOptions } from '@mui/material'

/**
 * Brand color tokens shared across both modes. These are the raw values the
 * rest of the design system (gradients, glows, glass surfaces) is derived from.
 */
export const brand = {
  light: {
    primary: '#4F46E5',
    secondary: '#06B6D4',
    background: '#F8FAFC',
    surface: 'rgba(255, 255, 255, 0.65)',
    surfaceSolid: '#FFFFFF',
    text: '#0B1120',
    textMuted: '#475569',
    border: 'rgba(15, 23, 42, 0.08)',
    glow: 'rgba(79, 70, 229, 0.35)',
  },
  dark: {
    primary: '#7C3AED',
    secondary: '#22D3EE',
    background: '#030712',
    surface: 'rgba(17, 24, 39, 0.6)',
    surfaceSolid: '#0B1220',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    border: 'rgba(148, 163, 184, 0.14)',
    glow: 'rgba(124, 58, 237, 0.45)',
  },
} as const

export const getPalette = (mode: PaletteMode): PaletteOptions => {
  const t = brand[mode]
  return {
    mode,
    primary: {
      main: t.primary,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: t.secondary,
      contrastText: mode === 'light' ? '#0B1120' : '#020617',
    },
    background: {
      default: t.background,
      paper: t.surfaceSolid,
    },
    text: {
      primary: t.text,
      secondary: t.textMuted,
    },
    divider: t.border,
    success: { main: '#22C55E' },
    error: { main: '#EF4444' },
    warning: { main: '#F59E0B' },
    info: { main: t.secondary },
  }
}
