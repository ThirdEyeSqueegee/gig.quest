import { isMobile } from "react-device-detect";
import { create } from "zustand";

import type { ViewState } from "./interfaces/State.ts";

export const useViewStore = create<ViewState>()((set) => ({
  tableView: !isMobile,

  toggleGridView: () => set((state) => ({ tableView: !state.tableView })),
}));
