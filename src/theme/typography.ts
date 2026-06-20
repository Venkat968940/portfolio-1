import type { TypographyVariantsOptions } from '@mui/material'

const display = '"Sora", "Inter", system-ui, -apple-system, sans-serif'
const body = '"Inter", system-ui, -apple-system, sans-serif'

export const typography: TypographyVariantsOptions = {
  fontFamily: body,
  h1: {
    fontFamily: display,
    fontWeight: 800,
    fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
    lineHeight: 1.02,
    letterSpacing: '-0.03em',
  },
  h2: {
    fontFamily: display,
    fontWeight: 700,
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    lineHeight: 1.08,
    letterSpacing: '-0.025em',
  },
  h3: {
    fontFamily: display,
    fontWeight: 700,
    fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
  },
  h4: {
    fontFamily: display,
    fontWeight: 600,
    fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
    lineHeight: 1.25,
    letterSpacing: '-0.015em',
  },
  h5: {
    fontFamily: display,
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.3,
  },
  h6: {
    fontFamily: display,
    fontWeight: 600,
    fontSize: '1.05rem',
    lineHeight: 1.4,
    letterSpacing: '0.01em',
  },
  subtitle1: { fontWeight: 500, fontSize: '1.125rem', lineHeight: 1.6 },
  subtitle2: {
    fontWeight: 600,
    fontSize: '0.8rem',
    lineHeight: 1.5,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  },
  body1: { fontSize: '1.0625rem', lineHeight: 1.7, fontWeight: 400 },
  body2: { fontSize: '0.95rem', lineHeight: 1.65, fontWeight: 400 },
  button: {
    fontFamily: display,
    fontWeight: 600,
    fontSize: '0.95rem',
    letterSpacing: '0.01em',
    textTransform: 'none',
  },
  caption: { fontSize: '0.8rem', lineHeight: 1.5, letterSpacing: '0.02em' },
  overline: {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
  },
}
