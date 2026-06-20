import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Shared scroll signal written by GSAP ScrollTrigger and read every frame in
 * the render loop — kept outside React state so scrolling never re-renders.
 */
export const scrollSignal = {
  progress: 0,
  velocity: 0,
}

/** Wires a single document-spanning ScrollTrigger (works alongside Lenis). */
export const useScrollProgress = () => {
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollSignal.progress = self.progress
        scrollSignal.velocity = gsap.utils.clamp(-1, 1, self.getVelocity() / 3000)
      },
    })
    ScrollTrigger.refresh()
    return () => trigger.kill()
  }, [])
}
