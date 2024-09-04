import { create } from "zustand";

// Define the store's state and actions
interface StoreState {
  selectedTagId: string | "all";
  isEdit: boolean;
  editingId: string;
  tagName: string;
  setTagName: (name: string) => void;
  setEditingId: (id: string) => void;
  setIsEdit: (edit: boolean) => void;
  setSelectedTagId: (id: string | "all") => void;
  clearSelectedTagId: () => void;
}

const useTagStore = create<StoreState>((set) => ({
  selectedTagId: "all", // initial state
  isEdit: false, // initial state
  editingId: "", // initial state
  tagName: "", // initial state
  setSelectedTagId: (selectedTagId) => set({ selectedTagId }),
  clearSelectedTagId: () => set({ selectedTagId: "all" }),
  setIsEdit: (edit) => set({ isEdit: edit }),
  setEditingId: (id) => set({ editingId: id }),
  setTagName: (name) => set({ tagName: name }),
}));

export default useTagStore;
