import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UIState } from '../types';

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      darkMode: false, // Start with false to avoid hydration issues
      searchQuery: '',
      toggleDarkMode: () => {
        const newDarkMode = !get().darkMode;
        console.log('Toggling dark mode:', newDarkMode); // Debug log
        set({ darkMode: newDarkMode });
        
        // Apply dark mode immediately
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      setSearchQuery: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: 'ui-storage',
      onRehydrateStorage: () => (state) => {
        // Apply dark mode on rehydration
        if (state?.darkMode) {
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('dark');
        }
      },
    }
  )
);