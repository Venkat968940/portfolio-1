import { useMemo, useState } from 'react'
import {
  Box,
  Chip,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { HiArrowUpRight, HiXMark } from 'react-icons/hi2'
import { FaGithub } from 'react-icons/fa6'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedHeading } from '@/components/common/AnimatedHeading'
import { GlassCard } from '@/components/common/GlassCard'
import { TiltCard } from '@/components/common/TiltCard'
import { GlassButton } from '@/components/common/GlassButton'
import { PROJECTS, PROJECT_FILTERS } from '@/utils/data'
import { useUIStore } from '@/store/useUIStore'
import type { Project } from '@/types'

type Filter = (typeof PROJECT_FILTERS)[number]

const ProjectCard = ({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (p: Project) => void
}) => {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)
  return (
    <Box
      component={motion.div}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      <TiltCard max={8} sx={{ height: '100%', borderRadius: 3.5 }}>
        <GlassCard
          glow={project.featured}
          interactive
          onClick={() => onOpen(project)}
          sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {/* image */}
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '16 / 10',
              '&:hover img': { transform: 'scale(1.08)' },
            }}
          >
            <Box
              component="img"
              src={project.image}
              alt={project.title}
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55))',
              }}
            />
            {project.featured && (
              <Chip
                label="Featured"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  color: '#fff',
                  fontWeight: 600,
                  background: (t) => t.custom.gradient.brand,
                }}
              />
            )}
            <IconButton
              aria-label={`Open ${project.title}`}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                color: '#fff',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                '&:hover': { background: 'rgba(255,255,255,0.3)' },
              }}
            >
              <HiArrowUpRight />
            </IconButton>
          </Box>

          {/* body */}
          <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {project.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
              {project.description}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {project.tags.slice(0, 4).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: 'divider', color: 'text.secondary' }}
                />
              ))}
            </Stack>
          </Box>
        </GlassCard>
      </TiltCard>
    </Box>
  )
}

const ProjectDrawer = ({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) => (
  <Drawer
    anchor="right"
    open={Boolean(project)}
    onClose={onClose}
    slotProps={{
      paper: {
        sx: {
          width: 'min(520px, 100vw)',
          background: (t) => t.custom.glass.background,
          backdropFilter: 'blur(28px)',
          borderLeft: (t) => t.custom.glass.border,
        },
      },
    }}
  >
    {project && (
      <Box>
        <Box sx={{ position: 'relative', aspectRatio: '16 / 9' }}>
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <IconButton
            aria-label="Close project details"
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              color: '#fff',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <HiXMark />
          </IconButton>
        </Box>
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            {project.title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {project.categories.map((c) => (
              <Chip key={c} label={c} size="small" color="primary" variant="outlined" />
            ))}
          </Stack>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {project.longDescription}
          </Typography>
          {project.highlights && (
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 3 }}>
              {project.highlights.map((point) => (
                <Stack
                  key={point}
                  component="li"
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: 'flex-start', mb: 1.5 }}
                >
                  <Box
                    aria-hidden
                    sx={{
                      mt: '0.55em',
                      flexShrink: 0,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: (t) => t.custom.gradient.brand,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {point}
                  </Typography>
                </Stack>
              ))}
            </Box>
          )}
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
            Built with
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 4 }}>
            {project.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
            {project.demo && (
              <GlassButton
                component="a"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<HiArrowUpRight />}
              >
                Live demo
              </GlassButton>
            )}
            {project.github && (
              <GlassButton
                glassVariant="ghost"
                component="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<FaGithub />}
              >
                Source
              </GlassButton>
            )}
          </Stack>
        </Box>
      </Box>
    )}
  </Drawer>
)

export const Projects = () => {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.categories.includes(filter as Project['categories'][number])),
    [filter],
  )

  return (
    <SectionWrapper id="projects">
      <AnimatedHeading
        overline="Selected work"
        title="Projects I’m proud of"
        highlight="proud"
        center
      />

      <Stack
        direction="row"
        spacing={1.5}
        sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1.5, mb: 6 }}
      >
        {PROJECT_FILTERS.map((f) => (
          <Chip
            key={f}
            label={f}
            onClick={() => setFilter(f)}
            sx={{
              px: 1,
              py: 2.4,
              borderRadius: 999,
              fontWeight: 600,
              cursor: 'pointer',
              color: filter === f ? '#fff' : 'text.primary',
              background: (t) => (filter === f ? t.custom.gradient.brand : t.custom.glass.background),
              border: (t) => t.custom.glass.border,
              backdropFilter: 'blur(12px)',
              '&:hover': { borderColor: 'primary.main' },
            }}
          />
        ))}
      </Stack>

      <Box
        component={motion.div}
        layout
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </AnimatePresence>
      </Box>

      <ProjectDrawer project={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  )
}
