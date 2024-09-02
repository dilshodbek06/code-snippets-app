import { create } from "zustand";

// Define the store's state and actions
interface StoreState {
  selectedTagId: string | "all";
  setSelectedTagId: (id: string | "all") => void;
  clearSelectedTagId: () => void;
}

const useTagStore = create<StoreState>((set) => ({
  selectedTagId: "all", // initial state
  setSelectedTagId: (selectedTagId) => set({ selectedTagId }),
  clearSelectedTagId: () => set({ selectedTagId: "all" }),
}));

export default useTagStore;
