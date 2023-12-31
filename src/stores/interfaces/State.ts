import type { Location } from "../../api/interfaces/SeatGeek.ts";

export interface PaginationState {
  page: number;
  range: string;
  rowCountOptions: number[];
  rowsPerPage: number;

  firstPage: () => void;
  nextPage: () => void;
  prevPage: () => void;
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
  debSearchTerm: string;
  filter: string[];
  searchTerm: string;

  setDebSearchTerm: (term: string) => void;
  setFilter: (filter: string[]) => void;
  setSearchTerm: (term: string) => void;
}

export interface LocationState {
  location?: Location;

  setLocation: (location: Location) => void;
}
