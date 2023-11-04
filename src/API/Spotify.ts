import axios from "axios";

export const getSpotifyToken = async () => {
  const response = await axios.post(
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
    }
  );
  const token = response.data.access_token as string;
  localStorage.setItem("spotifyToken", token);
  return token;
};

const searchArtistRequest = async (artist: string) => {
  return await axios.get("https://api.spotify.com/v1/search", {
    params: {
      q: artist,
      type: "artist",
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
    },
  });
};

export const searchArtist = async (artist: string) => {
  if (!localStorage.getItem("spotifyToken")) {
    await getSpotifyToken();
  }
  const response = await searchArtistRequest(artist);
  return response.data.artists.items[0];
};
