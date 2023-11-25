import { isMobile } from "react-device-detect";
import { create } from "zustand";

import { Location, LocationState, PaginationState, SearchState, SortingState, ViewState } from "./Interfaces.ts";

export const usePagination = create<PaginationState>()(set => ({
  filter: [""],
  page: 1,
  range: "5mi",
  rowCountOptions: [24, 36, 48],
  rowsPerPage: 24,
  // eslint-disable-next-line perfectionist/sort-objects
  firstPage: () => set(() => ({ page: 1 })),
  nextPage: () => set(state => ({ page: state.page + 1 })),
  prevPage: () => set(state => ({ page: state.page - 1 })),
  setFilter: (filter: string[]) => set(() => ({ filter })),
  setPage: (page: number) => set(() => ({ page })),
  setRange: (range: string) => set(() => ({ range })),
  setRowCountOptions: (rowCountOptions: number[]) => set(() => ({ rowCountOptions })),
  setRowsPerPage: (rowsPerPage: number) => set(() => ({ rowsPerPage })),
}));

export const useSorting = create<SortingState>()(set => ({
  sortAvgPrice: undefined,
  sortDate: true,
  sortHighestPrice: undefined,
  sortLowestPrice: undefined,
  sortPopularity: undefined,
  toggleSortAvgPrice: () =>
    set(state => ({
      sortAvgPrice: !state.sortAvgPrice,
      sortDate: undefined,
      sortHighestPrice: undefined,
      sortLowestPrice: undefined,
      sortPopularity: undefined,
    })),
  toggleSortDate: () =>
    set(state => ({
      sortAvgPrice: undefined,
      sortDate: !state.sortDate,
      sortHighestPrice: undefined,
      sortLowestPrice: undefined,
      sortPopularity: undefined,
    })),
  toggleSortHighestPrice: () =>
    set(state => ({
      sortAvgPrice: undefined,
      sortDate: undefined,
      sortHighestPrice: !state.sortHighestPrice,
      sortLowestPrice: undefined,
      sortPopularity: undefined,
    })),
  toggleSortLowestPrice: () =>
    set(state => ({
      sortAvgPrice: undefined,
      sortDate: undefined,
      sortHighestPrice: undefined,
      sortLowestPrice: !state.sortLowestPrice,
      sortPopularity: undefined,
    })),
  toggleSortPopularity: () =>
    set(state => ({
      sortAvgPrice: undefined,
      sortDate: undefined,
      sortHighestPrice: undefined,
      sortLowestPrice: undefined,
      sortPopularity: !state.sortPopularity,
    })),
}));

export const useView = create<ViewState>()(set => ({
  tableView: !isMobile,
  toggleGridView: () => set(state => ({ tableView: !state.tableView })),
}));

export const useSearch = create<SearchState>()(set => ({
  searchTerm: "",
  setSearchTerm: (term: string) => set(() => ({ searchTerm: term })),
}));

export const useLocation = create<LocationState>()(set => ({
  location: undefined,
  setLocation: (location: Location) => set(() => ({ location })),
}));
