import { create } from "zustand";

import type { PaginationState } from "./interfaces/State.ts";

export const usePaginationStore = create<PaginationState>()((set) => ({
  page: 1,
  range: "15mi",
  rowCountOptions: [24, 36, 48],
  rowsPerPage: 24,

  firstPage: () => {
    set(() => ({ page: 1 }));
    window.scrollTo({ behavior: "smooth", top: 0 });
  },
  nextPage: () => {
    set((state) => ({ page: state.page + 1 }));
    window.scrollTo({ behavior: "smooth", top: 0 });
  },
  prevPage: () => {
    set((state) => ({ page: state.page - 1 }));
    window.scrollTo({ behavior: "smooth", top: 0 });
  },
  setPage: (page: number) => {
    set(() => ({ page }));
    window.scrollTo({ behavior: "smooth", top: 0 });
  },
  setRange: (range: string) => set(() => ({ range })),
  setRowCountOptions: (rowCountOptions: number[]) => set(() => ({ rowCountOptions })),
  setRowsPerPage: (rowsPerPage: number) => set(() => ({ rowsPerPage })),
}));
