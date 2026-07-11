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
        who builds secure, production-grade web platforms where complex logic
        feels effortless.
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Working in React and TypeScript, I build multi-tenant dashboards and
        compliance tooling across fintech, healthcare and retail — backed by
        scalable Redux state, strict typing, and CI/CD that keeps production
        clean.
      </Typography>
    </Box>
  </SectionWrapper>
)
