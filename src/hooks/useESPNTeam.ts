import useSWR from "swr";

import { espnFetcher } from "../api/espnFetcher.ts";

export const useESPNTeam = (league: string, id?: number) => {
  let endpoint = "https://site.api.espn.com/apis/site/v2/sports";

  switch (league) {
    case "nba":
      endpoint += "/basketball/nba";
      break;
    case "nfl":
      endpoint += "/football/nfl";
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

  const { data, isLoading } = useSWR(id ? endpoint : null, espnFetcher);

  return { data, isLoading };
};
