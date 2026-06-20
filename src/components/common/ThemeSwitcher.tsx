import { IconButton, Tooltip } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'
import { useThemeStore } from '@/store/useThemeStore'
import { useUIStore } from '@/store/useUIStore'

/** Animated dark/light toggle with an icon cross-fade + rotate. */
export const ThemeSwitcher = () => {
  const mode = useThemeStore((s) => s.mode)
  const toggle = useThemeStore((s) => s.toggle)
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)
  const isDark = mode === 'dark'

  return (
    <Tooltip title={isDark ? 'Switch to light' : 'Switch to dark'}>
      <IconButton
        onClick={toggle}
        aria-label="Toggle color theme"
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
        sx={{
          width: 44,
          height: 44,
          color: 'text.primary',
          border: (t) => t.custom.glass.border,
          background: (t) => t.custom.glass.background,
          backdropFilter: 'blur(12px)',
          overflow: 'hidden',
          '&:hover': { color: 'primary.main' },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode}
            initial={{ y: -20, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: 20, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'inline-flex', fontSize: 20 }}
          >
            {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
          </motion.span>
        </AnimatePresence>
      </IconButton>
    </Tooltip>
  )
}
