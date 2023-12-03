import { create } from "zustand";

import { Location } from "../api/interfaces/SeatGeek.ts";
import { LocationState } from "./interfaces/State.ts";

export const useLocationStore = create<LocationState>()((set) => ({
  location: undefined,
  setLocation: (location: Location) => set(() => ({ location })),
}));
