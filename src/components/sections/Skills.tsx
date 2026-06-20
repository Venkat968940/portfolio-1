import { useState } from 'react'
import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedHeading } from '@/components/common/AnimatedHeading'
import { GlassCard } from '@/components/common/GlassCard'
import { TiltCard } from '@/components/common/TiltCard'
import { SKILL_GROUPS } from '@/utils/data'
import type { Skill, SkillCategory } from '@/types'

const CATEGORIES = SKILL_GROUPS.map((g) => g.category)

const SkillTile = ({ skill }: { skill: Skill }) => {
  const Icon = skill.icon
  return (
    <TiltCard max={10} sx={{ height: '100%', borderRadius: 3 }}>
      <GlassCard interactive sx={{ height: '100%', borderRadius: 3 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              fontSize: 26,
              color: skill.color,
              background: (t) => (t.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
            }}
          >
            <Icon />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{skill.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {skill.level}% proficiency
            </Typography>
          </Box>
        </Stack>
        <Box
          component={motion.div}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          sx={{ transformOrigin: 'left' }}
        >
          <LinearProgress
            variant="determinate"
            value={skill.level}
            sx={{
              height: 8,
              borderRadius: 999,
              bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'),
              '& .MuiLinearProgress-bar': {
                borderRadius: 999,
                background: (t) => t.custom.gradient.brand,
              },
            }}
          />
        </Box>
      </GlassCard>
    </TiltCard>
  )
}

export const Skills = () => {
  const [active, setActive] = useState<SkillCategory>(CATEGORIES[0])
  const group = SKILL_GROUPS.find((g) => g.category === active)!

  return (
    <SectionWrapper id="skills">
      <AnimatedHeading
        overline="Capabilities"
        title="A toolkit refined over years"
        highlight="refined"
        center
      />

      <Stack
        direction="row"
        spacing={1.5}
        sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1.5, mb: 6 }}
      >
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => setActive(cat)}
            sx={{
              px: 1,
              py: 2.4,
              borderRadius: 999,
              fontWeight: 600,
              cursor: 'pointer',
              color: active === cat ? '#fff' : 'text.primary',
              background: (t) => (active === cat ? t.custom.gradient.brand : t.custom.glass.background),
              border: (t) => t.custom.glass.border,
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s',
              '&:hover': { borderColor: 'primary.main' },
            }}
          />
        ))}
      </Stack>

      <AnimatePresence mode="wait">
        <Box
          key={active}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {group.skills.map((skill) => (
            <SkillTile key={skill.name} skill={skill} />
          ))}
        </Box>
      </AnimatePresence>
    </SectionWrapper>
  )
}
