import { create } from 'zustand'

// Phases : 'bios' | 'splash' | 'login' | 'desktop'
export const useOsStore = create((set, get) => ({
  phase: 'bios',
  setPhase: (phase) => set({ phase }),

  // Windows management
  windows: {},      // { [id]: { minimized, zIndex } }
  zTop: 100,

  openWindow: (id) => {
    const { windows, zTop } = get()
    if (windows[id]) {
      // already open → focus it
      set({
        zTop: zTop + 1,
        windows: { ...windows, [id]: { ...windows[id], minimized: false, zIndex: zTop + 1 } }
      })
      return
    }
    set({
      zTop: zTop + 1,
      windows: { ...windows, [id]: { minimized: false, zIndex: zTop + 1 } }
    })
  },

  closeWindow: (id) => {
    const { windows } = get()
    const next = { ...windows }
    delete next[id]
    set({ windows: next })
  },

  toggleMinimize: (id) => {
    const { windows } = get()
    if (!windows[id]) return
    set({
      windows: { ...windows, [id]: { ...windows[id], minimized: !windows[id].minimized } }
    })
  },

  focusWindow: (id) => {
    const { windows, zTop } = get()
    if (!windows[id]) return
    set({
      zTop: zTop + 1,
      windows: { ...windows, [id]: { ...windows[id], zIndex: zTop + 1 } }
    })
  },
}))
