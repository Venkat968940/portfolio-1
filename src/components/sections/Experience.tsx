import { useRef } from 'react'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { motion, useScroll, useSpring } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedHeading } from '@/components/common/AnimatedHeading'
import { GlassCard } from '@/components/common/GlassCard'
import { fadeLeft, viewportOnce } from '@/components/animations/variants'
import { EXPERIENCE } from '@/utils/data'
import type { ExperienceItem } from '@/types'

const TimelineNode = ({ item, last }: { item: ExperienceItem; last: boolean }) => (
  <Box sx={{ position: 'relative', pl: { xs: 5, md: 7 }, pb: last ? 0 : { xs: 5, md: 7 } }}>
    {/* dot */}
    <Box
      component={motion.div}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={viewportOnce}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      sx={{
        position: 'absolute',
        left: { xs: 4, md: 12 },
        top: 6,
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: (t) => t.custom.gradient.brand,
        boxShadow: (t) => t.custom.glow,
        zIndex: 2,
      }}
    />

    <Box
      component={motion.div}
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <GlassCard glow interactive sx={{ p: { xs: 3, md: 3.5 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, mb: 1.5 }}
        >
          <Typography variant="h5">{item.role}</Typography>
          <Chip
            label={item.period}
            size="small"
            sx={{
              fontWeight: 600,
              color: 'secondary.main',
              background: (t) => (t.palette.mode === 'dark' ? 'rgba(34,211,238,0.12)' : 'rgba(6,182,212,0.12)'),
            }}
          />
        </Stack>
        <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }}>
          {item.company} · {item.location}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
          {item.description}
        </Typography>
        <Stack spacing={1}>
          {item.achievements.map((a) => (
            <Stack key={a} direction="row" spacing={1.2} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ color: 'secondary.main', mt: '3px', flexShrink: 0 }}>
                <HiCheckCircle />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {a}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </GlassCard>
    </Box>
  </Box>
)

export const Experience = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 60%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

  return (
    <SectionWrapper id="experience">
      <AnimatedHeading
        overline="Career"
        title="A track record of shipping"
        highlight="shipping"
        center
      />

      <Box ref={ref} sx={{ position: 'relative', maxWidth: 860, mx: 'auto' }}>
        {/* track */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 12, md: 20 },
            top: 6,
            bottom: 6,
            width: 2,
            bgcolor: (t) => t.palette.divider,
          }}
        />
        {/* animated glow fill */}
        <Box
          component={motion.div}
          style={{ scaleY }}
          sx={{
            position: 'absolute',
            left: { xs: 12, md: 20 },
            top: 6,
            bottom: 6,
            width: 2,
            transformOrigin: 'top',
            background: (t) => t.custom.gradient.brand,
            boxShadow: (t) => t.custom.glow,
          }}
        />

        {EXPERIENCE.map((item, i) => (
          <TimelineNode key={item.company} item={item} last={i === EXPERIENCE.length - 1} />
        ))}
      </Box>
    </SectionWrapper>
  )
}
