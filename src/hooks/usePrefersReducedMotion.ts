import { useEffect, useState } from 'react'

const query = '(prefers-reduced-motion: reduce)'

export const usePrefersReducedMotion = () => {
  // Lazy initialiser reads the current value once, without a setState-in-effect.
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
