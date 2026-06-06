import { create } from "zustand";

interface AppState {
  sidebarOpen: boolean;
  searchQuery: string;
  followedTopics: string[];
  followedAuthors: string[];
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  followTopic: (topicId: string) => void;
  unfollowTopic: (topicId: string) => void;
  followAuthor: (authorId: string) => void;
  unfollowAuthor: (authorId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  searchQuery: "",
  followedTopics: ["1", "9", "6"],
  followedAuthors: ["1", "4"],
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  followTopic: (topicId) =>
    set((state) => ({
      followedTopics: [...state.followedTopics, topicId],
    })),
  unfollowTopic: (topicId) =>
    set((state) => ({
      followedTopics: state.followedTopics.filter((id) => id !== topicId),
    })),
  followAuthor: (authorId) =>
    set((state) => ({
      followedAuthors: [...state.followedAuthors, authorId],
    })),
  unfollowAuthor: (authorId) =>
    set((state) => ({
      followedAuthors: state.followedAuthors.filter((id) => id !== authorId),
    })),
}));
