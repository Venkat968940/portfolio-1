import { useMemo, type ReactNode } from 'react'
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material'
import { createAppTheme } from './theme'

/**
 * Builds the (dark-only) MUI theme and injects the global background /
 * smooth-transition styles.
 */
export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useMemo(() => createAppTheme('dark'), [])

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
