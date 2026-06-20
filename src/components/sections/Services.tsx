import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedHeading } from '@/components/common/AnimatedHeading'
import { GlassCard } from '@/components/common/GlassCard'
import { FloatingIcon } from '@/components/common/FloatingIcon'
import { fadeUp, staggerContainer, viewportOnce } from '@/components/animations/variants'
import { SERVICES } from '@/utils/data'

export const Services = () => (
  <SectionWrapper id="services">
    <AnimatedHeading
      overline="What I do"
      title="Services that move the needle"
      highlight="move the needle"
      center
    />

    <Box
      component={motion.div}
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
        gap: 3,
      }}
    >
      {SERVICES.map((service) => (
        <Box key={service.title} component={motion.div} variants={fadeUp}>
          <GlassCard
            glow
            interactive
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              '&:hover .svc-icon': { transform: 'translateY(-6px) rotate(-6deg)' },
            }}
          >
            <Box className="svc-icon" sx={{ transition: 'transform 0.4s ease' }}>
              <FloatingIcon icon={service.icon} size={58} />
            </Box>
            <Typography variant="h5">{service.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {service.description}
            </Typography>
          </GlassCard>
        </Box>
      ))}
    </Box>
  </SectionWrapper>
)
