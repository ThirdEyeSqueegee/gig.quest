import { isEqual } from "ohash";
import useSWR from "swr";

// eslint-disable-next-line perfectionist/sort-named-imports
import { isSGMusicEventType, type SGEventDetails } from "../api/interfaces/SeatGeek.ts";
import { spotifyArtistsFetcher } from "../api/spotifyFetcher.ts";

export const useSpotifyArtists = (eventDetails?: SGEventDetails) => {
  const { data: artistItemsMap } = useSWR(
    eventDetails?.event.type && isSGMusicEventType(eventDetails.event.type) ? ["artists", eventDetails.performers] : null,
    ([, a]) => spotifyArtistsFetcher(a),
    { compare: isEqual, keepPreviousData: true },
  );

  return artistItemsMap;
};
