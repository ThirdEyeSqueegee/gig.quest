import { isMobile } from "react-device-detect";
import { create } from "zustand";

import { Location } from "./Interfaces.ts";

export interface PaginationState {
  filter: string[];
  page: number;
  range: string;
  rowCountOptions: number[];
  rowsPerPage: number;
  // eslint-disable-next-line perfectionist/sort-interfaces
  firstPage: () => void;
  nextPage: () => void;
  prevPage: () => void;
  setFilter: (filter: string[]) => void;
  setPage: (page: number) => void;
  setRange: (range: string) => void;
  setRowCountOptions: (rowCountOptions: number[]) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
}

export interface SortingState {
  sortAvgPrice?: boolean;
  sortDate?: boolean;
  sortHighestPrice?: boolean;
  sortLowestPrice?: boolean;
  sortPopularity?: boolean;
  toggleSortAvgPrice: () => void;
  toggleSortDate: () => void;
  toggleSortHighestPrice: () => void;
  toggleSortLowestPrice: () => void;
  toggleSortPopularity: () => void;
}

export interface ViewState {
  tableView: boolean;
  toggleGridView: () => void;
}

export interface SearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export interface LocationState {
  location?: Location;
  setLocation: (location: Location) => void;
}

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
