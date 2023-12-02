import { Artist, SpotifyApi } from "@spotify/web-api-ts-sdk";
import stringComparison from "string-comparison";

const sdk = SpotifyApi.withClientCredentials(import.meta.env.VITE_SPOTIFY_CLIENT_ID as string, import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string);

const spotifySearchArtist = async (artist: string) => {
  const response = await sdk.search(artist, ["artist"]);

  if (response.artists.items) {
    const [item] = response.artists.items;
    const dice = stringComparison.diceCoefficient.similarity(artist, item.name);

    if (item.name.length > 5) {
      return dice > 0.8 ? item : ({ id: "notFound" } as Artist);
    }
    return dice > 0.9 ? item : ({ id: "notFound" } as Artist);
  }

  return { id: "notFound" } as Artist;
};

export const spotifyArtistsFetcher = async (artists: string[]) => {
  const artistItemsMap = new Map<string, Artist>();

  for (const artist of artists) {
    const artistItem = await spotifySearchArtist(artist);
    artistItemsMap.set(artist, artistItem);
  }

  return artistItemsMap;
};
