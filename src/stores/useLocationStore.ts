import { create } from "zustand";

import { Location } from "../api/interfaces/SeatGeek.ts";
import { LocationState } from "./interfaces/State.ts";

export const useLocationStore = create<LocationState>()((set) => ({
  city: undefined,
  location: undefined,
  setCity: (city: string) => set(() => ({ city })),
  setLocation: (location: Location) => set(() => ({ location })),
}));
