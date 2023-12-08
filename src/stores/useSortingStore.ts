import { create } from "zustand";

import type { SortingState } from "./interfaces/State.ts";

export const useSortingStore = create<SortingState>()((set) => ({
  sortAvgPrice: undefined,
  sortDate: true,
  sortHighestPrice: undefined,
  sortLowestPrice: undefined,
  sortPopularity: undefined,

  toggleSortAvgPrice: () =>
    set((state) => ({
      sortAvgPrice: !state.sortAvgPrice,
      sortDate: undefined,
      sortHighestPrice: undefined,
      sortLowestPrice: undefined,
      sortPopularity: undefined,
    })),
  toggleSortDate: () =>
    set((state) => ({
      sortAvgPrice: undefined,
      sortDate: !state.sortDate,
      sortHighestPrice: undefined,
      sortLowestPrice: undefined,
      sortPopularity: undefined,
    })),
  toggleSortHighestPrice: () =>
    set((state) => ({
      sortAvgPrice: undefined,
      sortDate: undefined,
      sortHighestPrice: !state.sortHighestPrice,
      sortLowestPrice: undefined,
      sortPopularity: undefined,
    })),
  toggleSortLowestPrice: () =>
    set((state) => ({
      sortAvgPrice: undefined,
      sortDate: undefined,
      sortHighestPrice: undefined,
      sortLowestPrice: !state.sortLowestPrice,
      sortPopularity: undefined,
    })),
  toggleSortPopularity: () =>
    set((state) => ({
      sortAvgPrice: undefined,
      sortDate: undefined,
      sortHighestPrice: undefined,
      sortLowestPrice: undefined,
      sortPopularity: !state.sortPopularity,
    })),
}));
