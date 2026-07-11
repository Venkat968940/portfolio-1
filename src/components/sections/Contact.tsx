import { fadeLeft, fadeRight, viewportOnce } from '@/components/animations/variants'
import { AnimatedHeading } from '@/components/common/AnimatedHeading'
import { GlassButton } from '@/components/common/GlassButton'
import { GlassCard } from '@/components/common/GlassCard'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { useUIStore } from '@/store/useUIStore'
import { PROFILE, SOCIALS } from '@/utils/data'
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import type { FormEvent } from 'react'
import { useState } from 'react'
import {
  HiCheck,
  HiOutlineMail,
  HiOutlinePhone
} from 'react-icons/hi'

interface FormState {
  name: string
  email: string
  message: string
}
type Errors = Partial<Record<keyof FormState, string>>
type Status = 'idle' | 'submitting' | 'success'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Email + phone open the visitor's own client; socials open in a new tab. */
const CONTACT_LINKS = [
  { label: 'Email', href: `mailto:${PROFILE.email}`, icon: HiOutlineMail, external: false },
  {
    label: 'Phone',
    href: `tel:${PROFILE.phone.replace(/\s/g, '')}`,
    icon: HiOutlinePhone,
    external: false,
  },
  ...SOCIALS.map((s) => ({ ...s, external: true })),
]

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    if (Object.keys(found).length) {
      setErrors(found)
      return
    }
    setStatus('submitting')

    const subject = `Portfolio enquiry from ${form.name}`
    const body = `${form.message}\n\n—\n${form.name}\n${form.email}`
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

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

            <Stack direction="row" spacing={1}>
              {CONTACT_LINKS.map(({ label, href, external, icon: Icon }) => (
                <Tooltip key={label} title={label} arrow>
                  <IconButton
                    component="a"
                    href={href}
                    aria-label={label}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
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
                </Tooltip>
              ))}
            </Stack>
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
