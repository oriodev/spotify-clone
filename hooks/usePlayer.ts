import { create } from 'zustand'

interface PlayerStore {
  ids: string[]
  activeId?: string
  setId: (id: string) => void
  setIds: (id: string[]) => void
  reset: () => void
}

// so this uses the zustand package to create a store
// that holds song ids and the current song being played
// and can set them/reset them
const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined })
}))

export default usePlayer