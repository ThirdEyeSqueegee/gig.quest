import { createContext } from "react";

export interface View {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
}

export const ViewContext = createContext<View>({} as View);
