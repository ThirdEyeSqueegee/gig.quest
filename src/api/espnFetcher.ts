import axios from "axios";

import { ESPNTeam } from "./interfaces/ESPN.ts";

export const espnFetcher = async (endpoint: string) => {
  const response = await axios.get<ESPNTeam>(endpoint);

  return response.data.team;
};
