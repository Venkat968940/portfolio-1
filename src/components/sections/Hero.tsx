import { Box, Container, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi'
import { SiReact, SiTypescript, SiThreedotjs, SiNextdotjs } from 'react-icons/si'
import { GradientText } from '@/components/common/GradientText'
import { GlassButton } from '@/components/common/GlassButton'
import { MagneticButton } from '@/components/common/MagneticButton'
import { RevealText } from '@/components/common/RevealText'
import { FloatingIcon } from '@/components/common/FloatingIcon'
import { fadeUp, staggerContainer } from '@/components/animations/variants'
import { PROFILE } from '@/utils/data'
import { scrollToSection } from '@/utils'

/**
 * Hero copy. The 3D visual now lives in the persistent full-viewport orbit
 * scene (see GlobalOrbitScene), so this section is text-only and sits above it.
 */
export const Hero = () => (
  <Box
    component="section"
    id="home"
    sx={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}
  >
    <Container>
      <Box
        component={motion.div}
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        sx={{ maxWidth: 760 }}
      >
        <Box component={motion.div} variants={fadeUp}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'success.main',
                boxShadow: '0 0 12px currentColor',
              }}
            />
            <Typography variant="subtitle2" color="text.secondary">
              Available for new projects
            </Typography>
          </Stack>
        </Box>

        <Typography variant="h1" sx={{ mb: 2 }}>
          <RevealText text="Hi, I’m" by="word" />
          <Box component="span" sx={{ display: 'block' }}>
            <GradientText variant="h1" animate>
              {PROFILE.name}
            </GradientText>
          </Box>
        </Typography>

        <Box component={motion.div} variants={fadeUp}>
          <Typography variant="h4" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
            {PROFILE.role} <Box component="span" sx={{ opacity: 0.5 }}>·</Box> {PROFILE.tagline}
          </Typography>
        </Box>

        <Box component={motion.div} variants={fadeUp}>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 540, mb: 4 }}>
            {PROFILE.intro}
          </Typography>
        </Box>

        <Box component={motion.div} variants={fadeUp}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'flex-start' }}>
            <MagneticButton>
              <GlassButton onClick={() => scrollToSection('projects')}>View my work</GlassButton>
            </MagneticButton>
            <MagneticButton>
              <GlassButton glassVariant="ghost" onClick={() => scrollToSection('contact')}>
                Get in touch
              </GlassButton>
            </MagneticButton>
          </Stack>
        </Box>

        <Box component={motion.div} variants={fadeUp} sx={{ mt: 5 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <FloatingIcon icon={SiReact} size={46} color="#61DAFB" delay={0} />
            <FloatingIcon icon={SiTypescript} size={46} color="#3178C6" delay={0.4} />
            <FloatingIcon icon={SiThreedotjs} size={46} delay={0.8} />
            <FloatingIcon icon={SiNextdotjs} size={46} delay={1.2} />
          </Stack>
        </Box>
      </Box>
    </Container>

    {/* scroll cue */}
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 10, 0] }}
      transition={{ delay: 1.4, duration: 2, repeat: Infinity }}
      sx={{
        position: 'absolute',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'text.secondary',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant="caption" sx={{ letterSpacing: '0.2em' }}>
        SCROLL
      </Typography>
      <HiArrowDown />
    </Box>
  </Box>
)
