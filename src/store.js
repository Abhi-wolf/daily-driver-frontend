import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "daily-driver",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useMusicStore = create((set) => ({
  queue: [],
  currentTrackIndex: -1,
  isPlaying: false,

  addTracksToQueue: (tracks) =>
    set(() => {
      // Replace the queue with the new list from the backend
      const finalQueue = tracks;

      // Reset currentTrackIndex to 0 if there are songs, otherwise -1
      const newIndex = finalQueue.length > 0 ? 0 : -1;

      return { queue: finalQueue, currentTrackIndex: newIndex };
    }),

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setCurrentTrack: (index) =>
    set({ currentTrackIndex: index, isPlaying: true }),

  playNext: () =>
    set((state) => {
      if (state.queue.length === 0) {
        return state;
      }

      const nextIndex =
        state.currentTrackIndex < state.queue.length - 1
          ? state.currentTrackIndex + 1
          : 0;

      return {
        currentTrackIndex: nextIndex,
        isPlaying: true,
      };
    }),

  playPrev: () =>
    set((state) => {
      if (state.queue.length === 0) {
        return state;
      }

      const prevIndex =
        state.currentTrackIndex > 0
          ? state.currentTrackIndex - 1
          : state.queue.length - 1;

      return {
        currentTrackIndex: prevIndex,
        isPlaying: true,
      };
    }),
}));

export const useFileExplorerStore = create((set) => ({
  fileExplore: null,
  fileToOpen: null,

  setFileToOpen: (id) => set({ fileToOpen: id }),
  setFileExplorer: (data) => set({ fileExplore: data }),
}));

export const useProjectStore = create((set) => ({
  user: null,
  projectToOpen: null,
  setprojectToOpen: (id) => set({ projectToOpen: id }),
}));
