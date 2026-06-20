import { create } from 'zustand'

interface UIState {
  drawerOpen: boolean
  activeSection: string
  cursorVariant: 'default' | 'hover' | 'text'
  setDrawerOpen: (open: boolean) => void
  toggleDrawer: () => void
  setActiveSection: (id: string) => void
  setCursorVariant: (v: UIState['cursorVariant']) => void
}

export const useUIStore = create<UIState>((set, get) => ({
  drawerOpen: false,
  activeSection: 'home',
  cursorVariant: 'default',
  setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
  toggleDrawer: () => set({ drawerOpen: !get().drawerOpen }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setCursorVariant: (cursorVariant) => set({ cursorVariant }),
}))
