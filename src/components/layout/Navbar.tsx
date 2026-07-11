import { useState } from 'react'
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { NAV_ITEMS, PROFILE } from '@/utils/data'
import { scrollToSection } from '@/utils'
import { useUIStore } from '@/store/useUIStore'
import { GlassButton } from '@/components/common/GlassButton'
import { MagneticButton } from '@/components/common/MagneticButton'

const NavLink = ({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) => {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)
  return (
    <Box
      component="button"
      onClick={onClick}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      aria-current={active ? 'page' : undefined}
      sx={{
        position: 'relative',
        border: 0,
        background: 'none',
        cursor: 'pointer',
        px: 1.5,
        py: 0.5,
        font: 'inherit',
        fontWeight: 600,
        fontSize: '0.95rem',
        color: active ? 'text.primary' : 'text.secondary',
        transition: 'color 0.3s',
        '&:hover': { color: 'text.primary' },
      }}
    >
      {label}
      {active && (
        <Box
          component={motion.span}
          layoutId="nav-active"
          sx={{
            position: 'absolute',
            left: 8,
            right: 8,
            bottom: -2,
            height: 3,
            borderRadius: 999,
            background: (t) => t.custom.gradient.brand,
          }}
        />
      )}
    </Box>
  )
}

export const Navbar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useUIStore((s) => s.activeSection)
  const drawerOpen = useUIStore((s) => s.drawerOpen)
  const setDrawerOpen = useUIStore((s) => s.setDrawerOpen)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  const go = (id: string) => {
    scrollToSection(id)
    setDrawerOpen(false)
  }

  const Logo = (
    <Typography
      onClick={() => go('home')}
      sx={{
        fontFamily: '"Sora", sans-serif',
        fontWeight: 800,
        fontSize: '1.25rem',
        cursor: 'pointer',
        letterSpacing: '-0.02em',
        background: (t) => t.custom.gradient.brand,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {PROFILE.firstName}
      <Box component="span" sx={{ color: 'text.primary', WebkitTextFillColor: 'currentColor' }}>
        .dev
      </Box>
    </Typography>
  )

  return (
    <>
      <Box
        component={motion.header}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        sx={{
          position: 'fixed',
          top: { xs: 12, md: 18 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: (t) => t.zIndex.appBar,
          width: scrolled ? 'min(880px, 92vw)' : 'min(1120px, 94vw)',
          transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 2, md: 3 },
            py: scrolled ? 1 : 1.5,
            borderRadius: 999,
            background: (t) => t.custom.glass.background,
            border: (t) => t.custom.glass.border,
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            boxShadow: (t) => (scrolled ? t.custom.glass.shadowHover : t.custom.glass.shadow),
            transition: 'padding 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          {Logo}

          {!isMobile && (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  label={item.label}
                  active={activeSection === item.id}
                  onClick={() => go(item.id)}
                />
              ))}
            </Stack>
          )}

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            {!isMobile ? (
              <MagneticButton>
                <GlassButton size="small" onClick={() => go('contact')}>
                  Let’s talk
                </GlassButton>
              </MagneticButton>
            ) : (
              <IconButton
                aria-label="Open navigation menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ color: 'text.primary' }}
              >
                <HiMenuAlt4 size={22} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 'min(320px, 85vw)',
              background: (t) => t.custom.glass.background,
              backdropFilter: 'blur(28px)',
              borderLeft: (t) => t.custom.glass.border,
              p: 3,
            },
          },
        }}
      >
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          {Logo}
          <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)} sx={{ color: 'text.primary' }}>
            <HiX size={22} />
          </IconButton>
        </Stack>
        <AnimatePresence>
          <Stack spacing={1}>
            {NAV_ITEMS.map((item, i) => (
              <Box
                key={item.id}
                component={motion.button}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => go(item.id)}
                sx={{
                  textAlign: 'left',
                  border: 0,
                  background: 'none',
                  cursor: 'pointer',
                  py: 1.25,
                  font: 'inherit',
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  color: activeSection === item.id ? 'primary.main' : 'text.primary',
                }}
              >
                {item.label}
              </Box>
            ))}
          </Stack>
        </AnimatePresence>
      </Drawer>
    </>
  )
}
