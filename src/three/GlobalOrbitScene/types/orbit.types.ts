import type { IconType } from 'react-icons'

export type Vec3 = [number, number, number]

export type OrbitLayer = 'inner' | 'middle' | 'outer'

/** Scroll stages, mapped 1:1 to landing-page sections. */
export const STAGE = {
  hero: 0,
  about: 1,
  skills: 2,
  experience: 3,
  projects: 4,
  contact: 5,
} as const

export type Stage = (typeof STAGE)[keyof typeof STAGE]

export interface TechNodeDatum {
  id: string
  label: string
  /** Short tooltip tagline. */
  tagline: string
  icon: IconType
  color: string
  layer: OrbitLayer
  /** Scroll stage at which this node fades in. */
  appearAt: Stage
  /** Priority for device-based culling (lower = kept on smaller screens). */
  priority: number
}

export interface OrbitLayerConfig {
  layer: OrbitLayer
  radius: number
  /** Radians/second base angular speed. */
  speed: number
  /** Plane tilt as [x, z] radians. */
  tilt: [number, number]
  /** Stage at which this ring becomes visible. */
  appearAt: Stage
  direction: 1 | -1
}

export interface ThemeColors {
  mode: 'light' | 'dark'
  primary: string
  secondary: string
  fog: string
}

/** Per-frame visual state derived from scroll progress. */
export interface OrbitState {
  /** World-space X position of the whole orbit (right → center while scrolling). */
  positionX: number
  /** Overall orbit scale (0.8 → 1.5 → 1.0). */
  scale: number
  speed: number
  /** 0 = expanded, 1 = converging at the Contact section. */
  convergence: number
  glow: number
  ringOpacity: Record<OrbitLayer, number>
  particleOpacity: number
  linkOpacity: number
}
