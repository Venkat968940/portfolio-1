import { Avatar, Box, Stack, Typography } from '@mui/material'
import { ImQuotesLeft } from 'react-icons/im'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedHeading } from '@/components/common/AnimatedHeading'
import { GlassCard } from '@/components/common/GlassCard'
import { TESTIMONIALS } from '@/utils/data'
import type { Testimonial } from '@/types'

const Card = ({ t }: { t: Testimonial }) => (
  <GlassCard sx={{ width: { xs: 300, md: 420 }, flexShrink: 0, mx: 1.5 }}>
    <Box sx={{ color: 'primary.main', fontSize: 28, mb: 1.5, opacity: 0.7 }}>
      <ImQuotesLeft />
    </Box>
    <Typography variant="body1" sx={{ mb: 3, minHeight: { md: 110 } }}>
      “{t.quote}”
    </Typography>
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Avatar src={t.avatar} alt={t.name} sx={{ width: 48, height: 48 }} />
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
          {t.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {t.role}, {t.company}
        </Typography>
      </Box>
    </Stack>
  </GlassCard>
)

/** Infinite, hover-pausable marquee of testimonials (duplicated for seamless loop). */
export const Testimonials = () => {
  const row = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <SectionWrapper id="testimonials">
      <AnimatedHeading
        overline="Kind words"
        title="Trusted by teams & founders"
        highlight="Trusted"
        center
      />

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          // edge fade mask
          maskImage:
            'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          '&:hover .marquee-track': { animationPlayState: 'paused' },
        }}
      >
        <Box
          className="marquee-track"
          sx={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          {row.map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} />
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  )
}
