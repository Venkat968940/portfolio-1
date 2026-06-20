import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '@/utils'

/**
 * Magnetic hover effect: returns spring-backed x/y motion values plus mouse
 * handlers. Attach the handlers to the element and bind {x, y} to its style.
 */
export const useMagnetic = (strength = 0.35) => {
  const ref = useRef<HTMLElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion()) return
      const el = ref.current ?? (e.currentTarget as HTMLElement)
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - rect.left - rect.width / 2
      const relY = e.clientY - rect.top - rect.height / 2
      x.set(relX * strength)
      y.set(relY * strength)
    },
    [strength, x, y],
  )

  const onMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { ref, x: springX, y: springY, onMouseMove, onMouseLeave }
}
