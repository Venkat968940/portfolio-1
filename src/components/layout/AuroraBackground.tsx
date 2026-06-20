import { Box } from '@mui/material'
import { keyframes } from '@mui/material/styles'

/**
 * Premium "Midnight Aurora" background. Five barely-there layers — deep navy
 * gradient, slow aurora ribbons (top-right / bottom-left), a perspective grid
 * that fades into the distance, a faint star field, drifting light beams, and a
 * soft noise grain. Everything is intentionally restrained (Linear / Stripe /
 * Apple keynote), never a neon demo-scene. Theme-aware.
 */

const ACCENT = {
  blue: '59, 130, 246', // #3b82f6
  violet: '139, 92, 246', // #8b5cf6
  cyan: '6, 182, 212', // #06b6d4
}

const ribbonA = keyframes`
  0%   { transform: translate3d(0, 0, 0) rotate(-8deg) scale(1); opacity: 0.10; }
  50%  { transform: translate3d(-4%, 3%, 0) rotate(-4deg) scale(1.1); opacity: 0.14; }
  100% { transform: translate3d(0, 0, 0) rotate(-8deg) scale(1); opacity: 0.10; }
`

const ribbonB = keyframes`
  0%   { transform: translate3d(0, 0, 0) rotate(10deg) scale(1); opacity: 0.08; }
  50%  { transform: translate3d(5%, -3%, 0) rotate(6deg) scale(1.12); opacity: 0.12; }
  100% { transform: translate3d(0, 0, 0) rotate(10deg) scale(1); opacity: 0.08; }
`

const beamSweep = keyframes`
  0%   { transform: translateX(-30%) rotate(18deg); opacity: 0; }
  50%  { opacity: 0.5; }
  100% { transform: translateX(130%) rotate(18deg); opacity: 0; }
`

export const AuroraBackground = () => (
  <Box
    aria-hidden
    sx={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none',
      // Layer 1 — deep navy base (dark) / soft premium blue-white (light)
      background: (t) =>
        t.palette.mode === 'dark'
          ? 'radial-gradient(120% 90% at 50% -10%, #0f172a 0%, #030712 55%)'
          : 'linear-gradient(180deg, #fafcff 0%, #f6f8fc 40%, #eef4ff 100%)',
    }}
  >
    {/* Layer 2 — aurora ribbons (top-right + bottom-left) */}
    <Box
      sx={{
        position: 'absolute',
        top: '-25%',
        right: '-15%',
        width: '70vw',
        height: '70vh',
        filter: 'blur(120px)',
        background: (t) =>
          t.palette.mode === 'dark'
            ? `linear-gradient(115deg, rgba(${ACCENT.blue},0.9), rgba(${ACCENT.violet},0.55) 60%, transparent 80%)`
            : `linear-gradient(115deg, rgba(${ACCENT.blue},0.85), rgba(${ACCENT.violet},0.5) 60%, transparent 80%)`,
        animation: `${ribbonA} 26s ease-in-out infinite`,
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        bottom: '-30%',
        left: '-15%',
        width: '65vw',
        height: '65vh',
        filter: 'blur(130px)',
        background: (t) =>
          t.palette.mode === 'dark'
            ? `linear-gradient(115deg, rgba(${ACCENT.violet},0.8), rgba(${ACCENT.cyan},0.4) 60%, transparent 80%)`
            : `linear-gradient(115deg, rgba(${ACCENT.violet},0.7), rgba(${ACCENT.cyan},0.45) 60%, transparent 80%)`,
        animation: `${ribbonB} 30s ease-in-out infinite`,
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    />

    {/* Layer 5 — drifting light beam */}
    <Box
      sx={{
        position: 'absolute',
        top: '-20%',
        left: 0,
        width: '40%',
        height: '140%',
        background: (t) =>
          `linear-gradient(90deg, transparent, rgba(255,255,255,${
            t.palette.mode === 'dark' ? 0.04 : 0.5
          }), transparent)`,
        filter: 'blur(40px)',
        animation: `${beamSweep} 22s ease-in-out infinite`,
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    />

    {/* Layer 4 — faint star field (dark only) */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        opacity: (t) => (t.palette.mode === 'dark' ? 0.5 : 0),
        backgroundImage:
          'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.7), transparent),' +
          'radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.5), transparent),' +
          'radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.45), transparent),' +
          'radial-gradient(1px 1px at 85% 60%, rgba(255,255,255,0.6), transparent),' +
          'radial-gradient(1px 1px at 55% 90%, rgba(255,255,255,0.4), transparent),' +
          'radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.5), transparent)',
        backgroundSize: '320px 320px',
      }}
    />

    {/* Layer 3b — perspective grid fading into the distance (Apple keynote stage) */}
    <Box
      sx={{
        position: 'absolute',
        left: '-25%',
        right: '-25%',
        bottom: 0,
        height: '55vh',
        transform: 'perspective(420px) rotateX(62deg)',
        transformOrigin: 'bottom center',
        opacity: (t) => (t.palette.mode === 'dark' ? 0.06 : 0.04),
        backgroundImage:
          'linear-gradient(to right, rgba(148,163,184,0.6) 1px, transparent 1px),' +
          'linear-gradient(to bottom, rgba(148,163,184,0.6) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'linear-gradient(to top, #000 0%, transparent 75%)',
        WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 75%)',
      }}
    />

    {/* Layer 3 — soft noise grain */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        opacity: (t) => (t.palette.mode === 'dark' ? 0.035 : 0.025),
        mixBlendMode: 'overlay',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  </Box>
)
