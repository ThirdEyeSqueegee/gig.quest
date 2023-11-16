import { createContext } from "react";

export interface View {
  state: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ViewContext = createContext<View>({} as View);
