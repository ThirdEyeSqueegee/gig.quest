import { create } from "zustand";

import type { SearchState } from "./interfaces/State.ts";

export const useSearchStore = create<SearchState>()((set) => ({
  debSearchTerm: "",
  filter: [],
  searchTerm: "",
  setDebSearchTerm: (debSearchTerm: string) => set(() => ({ debSearchTerm })),
  setFilter: (filter: string[]) => set(() => ({ filter })),
  setSearchTerm: (searchTerm: string) => set(() => ({ searchTerm })),
}));
