import type { Vector3 } from 'three'
import { smoothstep } from './orbitTimeline'

/**
 * Per-section camera choreography. Returns the interpolated target position for
 * a scroll progress; the scene damps toward it for extremely smooth moves.
 *
 *  Hero close-up · About zoom-out · Skills orbit · Experience higher ·
 *  Projects wide cinematic · Contact slow focus toward center.
 */
interface CamKey {
  at: number
  pos: [number, number, number]
}

// X stays ~0 (look straight ahead) — the orbit's own translateX does the
// horizontal storytelling; the camera handles dolly + a higher perspective.
const KEYS: CamKey[] = [
  { at: 0.0, pos: [0, 0.2, 7] },
  { at: 0.16, pos: [0, 0.4, 8.5] },
  { at: 0.33, pos: [0, 0.7, 9.5] },
  { at: 0.5, pos: [0, 2.6, 10.5] },
  { at: 0.66, pos: [0, 1, 13] },
  { at: 0.83, pos: [0, 0.4, 9] },
  { at: 1.0, pos: [0, 0, 8] },
]

export const cameraTargetAt = (p: number, out: Vector3): Vector3 => {
  let a = KEYS[0]
  let b = KEYS[KEYS.length - 1]
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (p >= KEYS[i].at && p <= KEYS[i + 1].at) {
      a = KEYS[i]
      b = KEYS[i + 1]
      break
    }
  }
  const t = smoothstep(a.at, b.at, p)
  out.set(
    a.pos[0] + (b.pos[0] - a.pos[0]) * t,
    a.pos[1] + (b.pos[1] - a.pos[1]) * t,
    a.pos[2] + (b.pos[2] - a.pos[2]) * t,
  )
  return out
}
