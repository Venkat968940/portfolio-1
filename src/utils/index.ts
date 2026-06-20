/** Smoothly scroll to a section id, accounting for the floating navbar. */
export const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = window.__lenis
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const cx = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(' ')
