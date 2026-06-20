import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PaletteMode } from '@mui/material'

type ThemePreference = PaletteMode | 'system'

interface ThemeState {
  /** What the user explicitly chose (or 'system' to follow the OS). */
  preference: ThemePreference
  /** The resolved mode actually applied to the UI. */
  mode: PaletteMode
  setPreference: (preference: ThemePreference) => void
  setResolvedMode: (mode: PaletteMode) => void
  toggle: () => void
}

const systemMode = (): PaletteMode =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      preference: 'system',
      mode: systemMode(),
      setPreference: (preference) =>
        set({
          preference,
          mode: preference === 'system' ? systemMode() : preference,
        }),
      setResolvedMode: (mode) => set({ mode }),
      toggle: () => {
        const next: PaletteMode = get().mode === 'dark' ? 'light' : 'dark'
        set({ preference: next, mode: next })
      },
    }),
    {
      name: 'portfolio-theme',
      partialize: (s) => ({ preference: s.preference }),
    },
  ),
)
