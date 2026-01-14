import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ComparisonStore {
  selectedCareers: string[]
  addCareer: (careerId: string) => void
  removeCareer: (careerId: string) => void
  clearComparison: () => void
  isInComparison: (careerId: string) => boolean
}

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      selectedCareers: [],
      addCareer: (careerId) => {
        const current = get().selectedCareers
        if (current.includes(careerId)) return
        if (current.length >= 3) {
          // Optional: Could throw error or handle max limit in UI
          return
        }
        set({ selectedCareers: [...current, careerId] })
      },
      removeCareer: (careerId) => {
        set({
          selectedCareers: get().selectedCareers.filter((id) => id !== careerId),
        })
      },
      clearComparison: () => set({ selectedCareers: [] }),
      isInComparison: (careerId) => get().selectedCareers.includes(careerId),
    }),
    {
      name: 'career-comparison-storage',
    }
  )
)
