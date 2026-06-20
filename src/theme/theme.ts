import { createTheme } from '@mui/material'
import type { PaletteMode, Theme } from '@mui/material'
import { brand, getPalette } from './palette'
import { typography } from './typography'
import buildShadows, { fx } from './shadows'

export const createAppTheme = (mode: PaletteMode): Theme => {
  const t = brand[mode]
  const f = fx[mode]

  const custom = {
    glass: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      blur: 'blur(24px) saturate(180%)',
      shadow: f.glass,
      shadowHover: f.glassHover,
    },
    gradient: {
      brand: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`,
      aurora:
        mode === 'dark'
          ? 'radial-gradient(at 20% 20%, rgba(124,58,237,0.45) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(34,211,238,0.35) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(79,70,229,0.4) 0px, transparent 50%)'
          : 'radial-gradient(at 20% 20%, rgba(79,70,229,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(6,182,212,0.22) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(124,58,237,0.18) 0px, transparent 50%)',
      text: `linear-gradient(120deg, ${t.text} 0%, ${t.primary} 55%, ${t.secondary} 100%)`,
      mesh: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
    },
    glow: f.glow,
  }

  return createTheme({
    palette: getPalette(mode),
    typography,
    shadows: buildShadows(mode),
    shape: { borderRadius: 18 },
    custom,
    breakpoints: {
      values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            colorScheme: mode,
          },
          body: {
            backgroundColor: t.background,
            color: t.text,
            transition: 'background-color 0.6s ease, color 0.6s ease',
            overflowX: 'hidden',
          },
          '::selection': {
            background: t.primary,
            color: '#fff',
          },
          '@media (prefers-reduced-motion: reduce)': {
            '*': {
              animationDuration: '0.001ms !important',
              transitionDuration: '0.001ms !important',
              scrollBehavior: 'auto !important',
            },
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 24, paddingBlock: 10 },
        },
      },
      MuiContainer: {
        defaultProps: { maxWidth: 'lg' },
      },
    },
  })
}
