import { create } from "zustand";

import { Location, LocationState } from "../Interfaces.ts";

export const useLocationStore = create<LocationState>()((set) => ({
  location: undefined,
  setLocation: (location: Location) => set(() => ({ location })),
}));
