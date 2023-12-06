import axios from "axios";

import { ESPNTeam } from "./interfaces/ESPN.ts";

export const espnFetcher = async (league: string, id?: number) => {
  if (!id) {
    return;
  }

  let endpoint = "https://site.api.espn.com/apis/site/v2/sports";

  switch (league) {
    case "nba":
      endpoint += "/basketball/nba";
      break;
    case "nfl":
      endpoint += "/football/nhl";
      break;
    case "nhl":
      endpoint += "/hockey/nhl";
      break;
    case "mlb":
      endpoint += "/baseball/mlb";
      break;
    case "mls":
      endpoint += "/soccer/usa.1";
      break;
  }

  endpoint += `/teams/${id}`;

  const response = await axios.get<ESPNTeam>(endpoint);
};
