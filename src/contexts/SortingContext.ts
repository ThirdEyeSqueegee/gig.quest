import { createContext } from "react";
import { SortingProps } from "../Interfaces";

export interface Sorting {
  props: SortingProps;
  setter: React.Dispatch<React.SetStateAction<SortingProps>>;
}

export const SortingContext = createContext<Sorting>({} as Sorting);
