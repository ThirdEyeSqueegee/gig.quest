import axios from "axios";
import {
  SpotifyArtistResult,
  SpotifyToken,
  SpotifyTokenResponse,
} from "../Interfaces";

export const getSpotifyToken = async () => {
  const response = await axios.post<SpotifyTokenResponse>(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "client_credentials",
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  localStorage.setItem(
    "spotifyToken",
    JSON.stringify({
      token: response.data.access_token,
      expires_at: new Date(Date.now() + response.data.expires_in * 1000),
    }),
  );
};

const searchArtistRequest = async (artist: string) => {
  if (localStorage.getItem("spotifyToken") === null) {
    await getSpotifyToken();
  }
  const token: SpotifyToken = JSON.parse(localStorage.getItem("spotifyToken")!);
  if (token.expires_at > new Date()) {
    await getSpotifyToken();
  }
  return await axios.get<SpotifyArtistResult>(
    "https://api.spotify.com/v1/search",
    {
      params: {
        q: artist,
        type: "artist",
      },
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    },
  );
};

export const searchArtist = async (artist: string) => {
  const response = await searchArtistRequest(artist);
  return response.data.artists.items![0];
};
