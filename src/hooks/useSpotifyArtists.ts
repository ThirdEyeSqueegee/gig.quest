import { isEqual } from "ohash";
import useSWR from "swr";

import type { SGEventDetails } from "../api/interfaces/SeatGeek.ts";

import { spotifyArtistsFetcher } from "../api/spotifyFetcher.ts";

export const useSpotifyArtists = (eventDetails?: SGEventDetails) => {
  const { data: artistItemsMap } = useSWR(
    eventDetails && eventDetails.event.type === "concert" ? ["artists", eventDetails.performers] : null,
    ([, a]) => spotifyArtistsFetcher(a),
    { compare: isEqual, keepPreviousData: true },
  );

  return artistItemsMap;
};
