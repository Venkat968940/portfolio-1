import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedHeading } from '@/components/common/AnimatedHeading'
import { GradientText } from '@/components/common/GradientText'
import { fadeRight, viewportOnce } from '@/components/animations/variants'
import { PROFILE } from '@/utils/data'

export const About = () => (
  <SectionWrapper id="about">
    <AnimatedHeading overline="About me" title="Designing with intent, building with craft" highlight="craft" />

    <Box
      component={motion.div}
      variants={fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      sx={{ maxWidth: 720 }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 500, lineHeight: 1.5 }}>
        I’m {PROFILE.firstName} — a <GradientText variant="h5">{PROFILE.role.toLowerCase()}</GradientText>{' '}
        obsessed with the details that make interfaces feel alive.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
        For nearly a decade I’ve partnered with startups and studios to ship
        products that are as fast as they are beautiful. My sweet spot is the
        intersection of design systems, motion, and performance engineering —
        turning ambitious ideas into experiences that ship and scale.
      </Typography>
      <Typography variant="body1" color="text.secondary">
        When I’m not refining a spring curve or shaving milliseconds off a
        render, you’ll find me exploring generative art and WebGL.
      </Typography>
    </Box>
  </SectionWrapper>
)
