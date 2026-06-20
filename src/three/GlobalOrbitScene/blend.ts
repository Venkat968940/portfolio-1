import { AdditiveBlending, NormalBlending } from 'three'
import type { Blending } from 'three'

/**
 * Additive blending creates beautiful glow on dark backgrounds but is
 * effectively invisible on light ones (adding to near-white = no change).
 * In light mode we fall back to normal blending so rings, particles, halos and
 * pulses stay visible with proper contrast.
 */
export const blendFor = (mode: 'light' | 'dark'): Blending =>
  mode === 'dark' ? AdditiveBlending : NormalBlending
