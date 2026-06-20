import { Box, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedHeading } from '@/components/common/AnimatedHeading'
import { GlassCard } from '@/components/common/GlassCard'
import { Counter } from '@/components/common/Counter'
import { GradientText } from '@/components/common/GradientText'
import { fadeRight, fadeLeft, staggerContainer, scaleReveal, viewportOnce } from '@/components/animations/variants'
import { PROFILE, STATS } from '@/utils/data'

export const About = () => (
  <SectionWrapper id="about">
    <AnimatedHeading overline="About me" title="Designing with intent, building with craft" highlight="craft" />

    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
        gap: { xs: 4, md: 6 },
        alignItems: 'center',
      }}
    >
      <Box
        component={motion.div}
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
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

      <Box
        component={motion.div}
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <GlassCard glow sx={{ p: { xs: 3, md: 4 } }}>
          <Box
            component={motion.div}
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: { xs: 3, md: 4 },
            }}
          >
            {STATS.map((stat) => (
              <Box key={stat.label} component={motion.div} variants={scaleReveal}>
                <Stack spacing={0.5}>
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      backgroundImage: (t) => t.custom.gradient.brand,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        </GlassCard>
      </Box>
    </Box>
  </SectionWrapper>
)
