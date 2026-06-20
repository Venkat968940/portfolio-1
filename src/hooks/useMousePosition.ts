import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

/** Tracks the pointer position as normalised (-1..1) and raw pixel values. */
export const useMousePosition = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      nx.set((e.clientX / window.innerWidth) * 2 - 1)
      ny.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [x, y, nx, ny])

  return { x, y, nx, ny }
}
