import { isMobile } from "react-device-detect";
import { create } from "zustand";

import { ViewState } from "../Interfaces.ts";

export const useViewStore = create<ViewState>()((set) => ({
  tableView: !isMobile,
  toggleGridView: () => set((state) => ({ tableView: !state.tableView })),
}));
