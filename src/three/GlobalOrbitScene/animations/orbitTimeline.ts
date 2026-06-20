import type { OrbitState, Stage } from '../types/orbit.types'

/**
 * Pure scroll-progress → orbit-state mapping. The orbit translates from the far
 * right (Hero) to dead center (Contact) while scaling up then settling, and
 * nodes reveal section-by-section. All storytelling thresholds live here:
 *
 *  Hero       0.00  x=4.5 scale=0.8 — React / TypeScript / Node only
 *  About      0.16  x=3.5 scale=1.0 — + Material UI / Git, rings appear
 *  Skills     0.33  x=2.5 scale=1.2 — full system, rings glow
 *  Experience 0.50  x=1.5 scale=1.3 — particles + camera drift
 *  Projects   0.66  x=0.8 scale=1.5 — constellations link, glow peaks
 *  Contact    0.83  x=0.0 scale=1.0 — converge to center, only "VM" in core
 */

export const smoothstep = (e0: number, e1: number, x: number): number => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

/** Progress value at which each stage begins. */
const STAGE_AT = [0, 0.16, 0.33, 0.5, 0.66, 0.83]

interface Key {
  at: number
  v: number
}

/** Piecewise smooth interpolation across keyframes. */
const track = (p: number, keys: Key[]): number => {
  if (p <= keys[0].at) return keys[0].v
  const last = keys[keys.length - 1]
  if (p >= last.at) return last.v
  for (let i = 0; i < keys.length - 1; i++) {
    if (p >= keys[i].at && p <= keys[i + 1].at) {
      const t = smoothstep(keys[i].at, keys[i + 1].at, p)
      return keys[i].v + (keys[i + 1].v - keys[i].v) * t
    }
  }
  return last.v
}

const POSITION_X: Key[] = [
  { at: 0.0, v: 4.5 },
  { at: 0.16, v: 3.5 },
  { at: 0.33, v: 2.5 },
  { at: 0.5, v: 1.5 },
  { at: 0.66, v: 0.8 },
  { at: 0.83, v: 0 },
  { at: 1.0, v: 0 },
]

const SCALE: Key[] = [
  { at: 0.0, v: 0.8 },
  { at: 0.16, v: 1.0 },
  { at: 0.33, v: 1.2 },
  { at: 0.5, v: 1.3 },
  { at: 0.66, v: 1.5 },
  { at: 0.83, v: 1.0 },
  { at: 1.0, v: 1.0 },
]

/** Per-node reveal: fades in just after its stage begins. */
export const nodeVisibility = (p: number, appearAt: Stage): number => {
  if (appearAt === 0) return smoothstep(0, 0.05, p) + 0.0001 // visible from the start
  const a = STAGE_AT[appearAt]
  return smoothstep(a - 0.03, a + 0.06, p)
}

export const computeOrbitState = (p: number): OrbitState => {
  const full = smoothstep(0.3, 0.5, p)
  const convergence = smoothstep(0.83, 1, p)

  return {
    positionX: track(p, POSITION_X),
    scale: track(p, SCALE),
    speed: (0.7 + full * 0.4) * (1 - convergence * 0.7),
    convergence,
    glow: 0.45 + full * 0.4,
    ringOpacity: {
      inner: smoothstep(0.0, 0.06, p),
      middle: smoothstep(0.02, 0.1, p),
      outer: smoothstep(STAGE_AT[1] - 0.02, STAGE_AT[1] + 0.08, p),
    },
    particleOpacity: smoothstep(STAGE_AT[3] - 0.04, STAGE_AT[3] + 0.12, p),
    // constellations rise at Projects, fade before convergence
    linkOpacity: smoothstep(0.62, 0.72, p) * (1 - smoothstep(0.82, 0.9, p)),
  }
}
