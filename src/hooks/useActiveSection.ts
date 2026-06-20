import { useEffect } from 'react'
import { useUIStore } from '@/store/useUIStore'

/**
 * Tracks which section is currently in view via IntersectionObserver and
 * mirrors it into the UI store so the navbar can highlight the active link.
 */
export const useActiveSection = (ids: string[]) => {
  const setActiveSection = useUIStore((s) => s.setActiveSection)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ids, setActiveSection])
}
