import { create } from "zustand";

// Define the store's state and actions
interface StoreState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearchTerm: () => void;
}

const useSnippetStore = create<StoreState>((set) => ({
  searchTerm: "",
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  clearSearchTerm: () => set({ searchTerm: "" }),
}));

export default useSnippetStore;
