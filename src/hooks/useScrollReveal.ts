import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/utils'

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  y?: number
  opacity?: number
  duration?: number
  stagger?: number
  /** CSS selector for children to stagger; reveals the element itself if omitted. */
  childSelector?: string
  start?: string
}

/**
 * GSAP + ScrollTrigger reveal. Returns a ref to attach to the container.
 * Honors prefers-reduced-motion by rendering everything immediately.
 */
export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
) => {
  const ref = useRef<T | null>(null)
  const {
    y = 48,
    opacity = 0,
    duration = 0.9,
    stagger = 0.12,
    childSelector,
    start = 'top 82%',
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const targets = childSelector
      ? Array.from(el.querySelectorAll(childSelector))
      : [el]
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start },
      })
    }, el)

    return () => ctx.revert()
  }, [y, opacity, duration, stagger, childSelector, start])

  return ref
}
