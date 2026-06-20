import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { HiCheck, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedHeading } from '@/components/common/AnimatedHeading'
import { GlassCard } from '@/components/common/GlassCard'
import { GlassButton } from '@/components/common/GlassButton'
import { fadeRight, fadeLeft, viewportOnce } from '@/components/animations/variants'
import { PROFILE, SOCIALS } from '@/utils/data'
import { useUIStore } from '@/store/useUIStore'

interface FormState {
  name: string
  email: string
  message: string
}
type Errors = Partial<Record<keyof FormState, string>>
type Status = 'idle' | 'submitting' | 'success'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (form: FormState): Errors => {
  const errors: Errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name'
  if (!form.email.trim()) errors.email = 'Please enter your email'
  else if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email address'
  if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters'
  return errors
}

export const Contact = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    if (Object.keys(found).length) {
      setErrors(found)
      return
    }
    setStatus('submitting')
    // Email integration hook: replace with EmailJS / Resend / API call.
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 3500)
  }

  return (
    <SectionWrapper id="contact">
      <AnimatedHeading
        overline="Get in touch"
        title="Let’s build something remarkable"
        highlight="remarkable"
        center
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
          gap: { xs: 4, md: 5 },
          alignItems: 'stretch',
        }}
      >
        {/* ---- Left: details + map placeholder ---- */}
        <Box
          component={motion.div}
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Stack spacing={3} sx={{ height: '100%' }}>
            <Typography variant="body1" color="text.secondary">
              Have a project in mind or just want to say hello? My inbox is always
              open — I’ll get back to you within a day.
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box sx={{ color: 'primary.main', fontSize: 22 }}>
                  <HiOutlineMail />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{PROFILE.email}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box sx={{ color: 'primary.main', fontSize: 22 }}>
                  <HiOutlineLocationMarker />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1">{PROFILE.location}</Typography>
                </Box>
              </Stack>
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
                    color: 'text.secondary',
                    border: (t) => t.custom.glass.border,
                    background: (t) => t.custom.glass.background,
                    '&:hover': { color: 'primary.main', transform: 'translateY(-3px)' },
                    transition: 'all 0.3s',
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>

            {/* interactive map placeholder */}
            <GlassCard
              sx={{
                flex: 1,
                minHeight: 180,
                p: 0,
                overflow: 'hidden',
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.5,
                  backgroundImage:
                    'linear-gradient(rgba(124,58,237,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              <Stack sx={{ alignItems: 'center', zIndex: 1 }} spacing={1}>
                <Box
                  component={motion.div}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  sx={{ color: 'primary.main', fontSize: 34 }}
                >
                  <HiOutlineLocationMarker />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {PROFILE.location}
                </Typography>
              </Stack>
            </GlassCard>
          </Stack>
        </Box>

        {/* ---- Right: form ---- */}
        <Box
          component={motion.div}
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <GlassCard glow sx={{ p: { xs: 3, md: 4 } }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                <TextField
                  label="Your name"
                  value={form.name}
                  onChange={update('name')}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  fullWidth
                />
                <TextField
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  fullWidth
                />
                <TextField
                  label="Tell me about your project"
                  value={form.message}
                  onChange={update('message')}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                  multiline
                  minRows={4}
                  fullWidth
                />

                <GlassButton
                  type="submit"
                  disabled={status !== 'idle'}
                  sx={{ alignSelf: 'flex-start', minWidth: 180 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === 'idle' && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Send message
                      </motion.span>
                    )}
                    {status === 'submitting' && (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                      >
                        <CircularProgress size={18} sx={{ color: '#fff' }} /> Sending…
                      </motion.span>
                    )}
                    {status === 'success' && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                      >
                        <HiCheck /> Sent!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </GlassButton>

                <AnimatePresence>
                  {status === 'success' && (
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Typography variant="body2" color="success.main">
                        Thanks for reaching out — I’ll be in touch shortly.
                      </Typography>
                    </Box>
                  )}
                </AnimatePresence>
              </Stack>
            </Box>
          </GlassCard>
        </Box>
      </Box>
    </SectionWrapper>
  )
}
