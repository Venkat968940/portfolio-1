import { motion, useScroll, useSpring } from 'framer-motion'
import { Box } from '@mui/material'

/** A thin gradient progress bar pinned to the top of the viewport. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <Box
      component={motion.div}
      style={{ scaleX }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        transformOrigin: '0%',
        zIndex: (t) => t.zIndex.appBar + 2,
        background: (t) => t.custom.gradient.brand,
        boxShadow: (t) => t.custom.glow,
      }}
    />
  )
}
