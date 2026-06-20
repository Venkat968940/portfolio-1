import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi'
import { NAV_ITEMS, PROFILE, SOCIALS } from '@/utils/data'
import { scrollToSection } from '@/utils'
import { useUIStore } from '@/store/useUIStore'

const TEXT_MUTED = 'rgba(226, 232, 240, 0.62)'

/**
 * Calm closing section. A dark glass overlay (in both themes) makes the footer
 * the visual focus and masks the now-faded orbit behind it — a clean,
 * Vercel/Stripe/Linear-style sign-off.
 */
export const Footer = () => {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)

  return (
    <Box component="footer" sx={{ position: 'relative', pt: 16, pb: 5, overflow: 'hidden' }}>
      {/* dark glass overlay with a gradient transition from the Contact section */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background:
            'linear-gradient(to bottom, rgba(3,7,18,0) 0%, rgba(3,7,18,0.75) 16%, rgba(3,7,18,0.9) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      />
      {/* subtle top border */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          zIndex: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(34,211,238,0.5), transparent)',
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
          }}
        >
          <Box>
            <Typography
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              sx={{
                fontFamily: '"Sora", sans-serif',
                fontWeight: 800,
                fontSize: '1.6rem',
                display: 'inline-block',
                background: (t) => t.custom.gradient.brand,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {PROFILE.name}
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_MUTED, maxWidth: 320, mt: 1 }}>
              {PROFILE.role} — building immersive web experiences from {PROFILE.location}.
            </Typography>
          </Box>

          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.id}
                component="button"
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                sx={{
                  border: 0,
                  background: 'none',
                  cursor: 'pointer',
                  font: 'inherit',
                  color: TEXT_MUTED,
                  transition: 'color 0.3s',
                  '&:hover': { color: 'secondary.main' },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Stack>

          <Stack direction="row" spacing={1}>
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <IconButton
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                sx={{
                  color: TEXT_MUTED,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  transition: 'all 0.3s',
                  '&:hover': { color: 'secondary.main', transform: 'translateY(-3px)' },
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
            © {new Date().getFullYear()} {PROFILE.name}. Crafted with React, Three.js & motion.
          </Typography>
          <IconButton
            aria-label="Scroll to top"
            onClick={() => scrollToSection('home')}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            sx={{
              color: '#fff',
              background: (t) => t.custom.gradient.brand,
              boxShadow: (t) => t.custom.glow,
              '&:hover': { transform: 'translateY(-3px)' },
              transition: 'transform 0.3s',
            }}
          >
            <HiArrowUp />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  )
}
