import { create } from "zustand";

import type { Location } from "../api/interfaces/SeatGeek.ts";
import type { LocationState } from "./interfaces/State.ts";

export const useLocationStore = create<LocationState>()((set) => ({
  location: undefined,
  setLocation: (location: Location) => set(() => ({ location })),
}));
