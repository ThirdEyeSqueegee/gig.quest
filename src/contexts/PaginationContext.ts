import { createContext } from "react";
import { PaginationProps } from "../Interfaces";

export interface Pagination {
  props: PaginationProps;
  setter: React.Dispatch<React.SetStateAction<PaginationProps>>;
}

export const PaginationContext = createContext<Pagination>({} as Pagination);
