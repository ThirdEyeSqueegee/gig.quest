import { create } from "zustand";

import { SearchState } from "../Interfaces.ts";

export const useSearchStore = create<SearchState>()((set) => ({
  debSearchTerm: "",
  searchTerm: "",
  setDebSearchTerm: (debSearchTerm: string) => set(() => ({ debSearchTerm })),
  setSearchTerm: (searchTerm: string) => set(() => ({ searchTerm })),
}));
