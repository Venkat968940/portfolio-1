import { useEffect, useMemo, type ReactNode } from 'react'
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material'
import { createAppTheme } from './theme'
import { useThemeStore } from '@/store/useThemeStore'

/**
 * Owns theme resolution: builds the MUI theme from the persisted preference,
 * keeps it in sync with the OS when preference === 'system', and injects the
 * global background / smooth-transition styles.
 */
export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const mode = useThemeStore((s) => s.mode)
  const preference = useThemeStore((s) => s.preference)
  const setResolvedMode = useThemeStore((s) => s.setResolvedMode)

  // Follow the system theme while the user hasn't picked an explicit mode.
  useEffect(() => {
    if (preference !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => setResolvedMode(mq.matches ? 'dark' : 'light')
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [preference, setResolvedMode])

  const theme = useMemo(() => createAppTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '#root': { isolation: 'isolate' },
          a: { color: 'inherit', textDecoration: 'none' },
          '::-webkit-scrollbar': { width: 10 },
          '::-webkit-scrollbar-track': { background: 'transparent' },
          '::-webkit-scrollbar-thumb': {
            background: theme.custom.gradient.brand,
            borderRadius: 999,
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
          },
          '.lenis.lenis-smooth': { scrollBehavior: 'auto !important' },
        }}
      />
      {children}
    </ThemeProvider>
  )
}
