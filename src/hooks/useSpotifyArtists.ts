import { isEqual } from "ohash";
import useSWR from "swr";

import { EventDetails, SpotifyToken } from "../Interfaces.ts";
import { spotifyArtistsFetcher, spotifyTokenFetcher } from "../api/API.ts";

const useSpotifyToken = () => {
  const {
    data: token,
    error,
    isLoading,
  } = useSWR<SpotifyToken, Error>("spotifyToken", spotifyTokenFetcher, { compare: isEqual, keepPreviousData: true });

  return {
    error,
    isLoading,
    token,
  };
};

export const useSpotifyArtists = (eventDetails?: EventDetails) => {
  const { error, isLoading, token } = useSpotifyToken();

  const { data: artistItemsMap } = useSWR(
    !error && !isLoading && eventDetails?.event.type === "concert" ? ["artists", eventDetails?.performers] : null,
    ([, a]) => spotifyArtistsFetcher(a, token!.token),
    { compare: isEqual, keepPreviousData: true },
  );

  return artistItemsMap;
};
