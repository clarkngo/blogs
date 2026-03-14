import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme store
export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light', // 'light', 'dark', 'system'
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      toggleTheme: () => {
        const current = get().theme;
        const next = current === 'light' ? 'dark' : 'light';
        get().setTheme(next);
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

// Search store
export const useSearchStore = create((set, get) => ({
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  searchIndex: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSearchIndex: (index) => set({ searchIndex: index }),

  performSearch: (query, posts) => {
    const { searchIndex } = get();

    if (!query.trim()) {
      set({ searchResults: [], isSearching: false });
      return;
    }

    set({ isSearching: true });

    if (searchIndex) {
      const results = searchIndex.search(query, { limit: 10 });
      const searchResults = results.map(result => result.item);
      set({ searchResults, isSearching: false });
    } else {
      // Fallback simple search if Fuse.js index is not ready
      const searchResults = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        (post.tags && post.tags.some(tag =>
          tag.toLowerCase().includes(query.toLowerCase())
        ))
      );
      set({ searchResults, isSearching: false });
    }
  },

  clearSearch: () => set({
    searchQuery: '',
    searchResults: [],
    isSearching: false
  }),
}));

// Reading progress store
export const useReadingStore = create(
  persist(
    (set, get) => ({
      readingProgress: {}, // { postId: { progress: 0.5, lastRead: timestamp } }
      bookmarks: [], // Array of post IDs

      setReadingProgress: (postId, progress) => {
        const current = get().readingProgress;
        set({
          readingProgress: {
            ...current,
            [postId]: {
              progress,
              lastRead: Date.now()
            }
          }
        });
      },

      getReadingProgress: (postId) => {
        const progress = get().readingProgress[postId];
        return progress ? progress.progress : 0;
      },

      toggleBookmark: (postId) => {
        const bookmarks = get().bookmarks;
        const isBookmarked = bookmarks.includes(postId);

        if (isBookmarked) {
          set({ bookmarks: bookmarks.filter(id => id !== postId) });
        } else {
          set({ bookmarks: [...bookmarks, postId] });
        }
      },

      isBookmarked: (postId) => {
        return get().bookmarks.includes(postId);
      }
    }),
    {
      name: 'reading-storage'
    }
  )
);

// Apply theme to document
function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.setAttribute('data-theme', systemTheme);
  } else {
    root.setAttribute('data-theme', theme);
  }
}

// Initialize theme on load
if (typeof window !== 'undefined') {
  // Handle system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const currentTheme = useThemeStore.getState().theme;
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  });
}