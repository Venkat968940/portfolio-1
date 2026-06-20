import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Typography } from '@mui/material'
import type { TypographyProps } from '@mui/material'

interface CounterProps extends Omit<TypographyProps, 'children'> {
  value: number
  suffix?: string
  duration?: number
}

/** Animated count-up that fires once the element scrolls into view. */
export const Counter = ({
  value,
  suffix = '',
  duration = 1.8,
  ...rest
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    let start = 0
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <Typography ref={ref} component="span" {...rest}>
      {display}
      {suffix}
    </Typography>
  )
}
