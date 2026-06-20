import { useEffect } from 'react'

/**
 * Shared, normalized pointer target (-1..1) plus a transient ripple impulse the
 * scene reads each frame. Drives subtle orbit tilt + a gentle energy ripple,
 * deliberately restrained for a premium, non-jittery feel.
 */
export const orbitPointer = { x: 0, y: 0, ripple: 0 }

export const useOrbitControls = () => {
  useEffect(() => {
    let lastX = 0
    let lastY = 0
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -((e.clientY / window.innerHeight) * 2 - 1)
      // accumulate a small ripple from pointer speed, clamped
      const speed = Math.hypot(nx - lastX, ny - lastY)
      orbitPointer.ripple = Math.min(1, orbitPointer.ripple + speed * 0.6)
      orbitPointer.x = nx
      orbitPointer.y = ny
      lastX = nx
      lastY = ny
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
}
