import { createContext } from "react";

export interface PagingProps {
  page: number;
  rowsPerPage: number;
  range: string;
  filter: string[];
  sortDate?: boolean;
  sortPopularity?: boolean;
  rowOptions: number[];
}

export const PagingContext = createContext<
  | {
      props: PagingProps;
      setter: React.Dispatch<React.SetStateAction<PagingProps>>;
    }
  | undefined
>(undefined);
