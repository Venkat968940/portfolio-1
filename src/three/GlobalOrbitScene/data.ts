import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiReactquery,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import { STAGE } from './types/orbit.types'
import type { OrbitLayer, OrbitLayerConfig, TechNodeDatum } from './types/orbit.types'

/** Orbital layers: radius, speed, tilt and reveal stage. */
export const ORBIT_LAYERS: OrbitLayerConfig[] = [
  { layer: 'inner', radius: 2.0, speed: 0.3, tilt: [0.3, 0.1], appearAt: STAGE.hero, direction: 1 },
  { layer: 'middle', radius: 3.3, speed: 0.2, tilt: [-0.36, 0.18], appearAt: STAGE.hero, direction: -1 },
  { layer: 'outer', radius: 4.7, speed: 0.14, tilt: [0.44, -0.16], appearAt: STAGE.about, direction: 1 },
]

// Reveal order (per spec): Hero → React/TS/Node · About → +MUI/Git · Skills → all.
// `priority` mirrors reveal order so device culling keeps the earliest nodes.
export const TECH_NODES: TechNodeDatum[] = [
  // inner
  { id: 'react', label: 'React', tagline: 'UI library at the core', icon: SiReact, color: '#61DAFB', layer: 'inner', appearAt: STAGE.hero, priority: 0 },
  { id: 'typescript', label: 'TypeScript', tagline: 'Strongly typed development', icon: SiTypescript, color: '#3178C6', layer: 'inner', appearAt: STAGE.hero, priority: 1 },
  { id: 'javascript', label: 'JavaScript', tagline: 'The language of the web', icon: SiJavascript, color: '#F7DF1E', layer: 'inner', appearAt: STAGE.skills, priority: 5 },
  // middle
  { id: 'node', label: 'Node.js', tagline: 'Scalable server runtime', icon: SiNodedotjs, color: '#5FA04E', layer: 'middle', appearAt: STAGE.hero, priority: 2 },
  { id: 'mui', label: 'Material UI', tagline: 'Design system & components', icon: SiMui, color: '#007FFF', layer: 'middle', appearAt: STAGE.about, priority: 3 },
  { id: 'nextjs', label: 'Next.js', tagline: 'Production React framework', icon: SiNextdotjs, color: '#E2E8F0', layer: 'middle', appearAt: STAGE.skills, priority: 6 },
  { id: 'react-query', label: 'React Query', tagline: 'Server state, solved', icon: SiReactquery, color: '#FF4154', layer: 'middle', appearAt: STAGE.skills, priority: 7 },
  // outer
  { id: 'git', label: 'Git', tagline: 'Version control', icon: SiGit, color: '#F05032', layer: 'outer', appearAt: STAGE.about, priority: 4 },
  { id: 'postgres', label: 'PostgreSQL', tagline: 'Reliable relational data', icon: SiPostgresql, color: '#4FA3DB', layer: 'outer', appearAt: STAGE.skills, priority: 8 },
  { id: 'docker', label: 'Docker', tagline: 'Containerized delivery', icon: SiDocker, color: '#2496ED', layer: 'outer', appearAt: STAGE.skills, priority: 9 },
  { id: 'express', label: 'Express', tagline: 'Minimal web framework', icon: SiExpress, color: '#CBD5E1', layer: 'outer', appearAt: STAGE.skills, priority: 10 },
  { id: 'rest', label: 'REST APIs', tagline: 'Clean service contracts', icon: TbApi, color: '#22D3EE', layer: 'outer', appearAt: STAGE.skills, priority: 11 },
]

/** Temporary constellations that link at the Projects stage. */
export const CONSTELLATIONS: Array<[string, string]> = [
  ['react', 'mui'],
  ['node', 'postgres'],
  ['react-query', 'rest'],
]

/** Device-based node budget (desktop / tablet / mobile). */
export const resolveNodeCount = (width: number): number => {
  if (width < 600) return 6
  if (width < 1024) return 9
  return TECH_NODES.length
}

export const resolveParticleCount = (width: number): number => {
  if (width < 600) return 240
  if (width < 1024) return 600
  return 1100
}

/**
 * Selects which nodes are visible for a given budget, keeping the orbit
 * balanced by always preferring lower-priority (inner-first) nodes.
 */
export const selectNodes = (budget: number): TechNodeDatum[] =>
  [...TECH_NODES].sort((a, b) => a.priority - b.priority).slice(0, budget)

/** Groups nodes by layer and assigns each an angular slot for even spacing. */
export const layoutNodes = (nodes: TechNodeDatum[]) => {
  const byLayer: Record<OrbitLayer, TechNodeDatum[]> = { inner: [], middle: [], outer: [] }
  nodes.forEach((n) => byLayer[n.layer].push(n))
  return byLayer
}
