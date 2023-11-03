import axios from "axios";
import { ArtistDetails, Events } from "./Interfaces";

export const getEvents = async (
  page: number,
  rowsPerPage: number,
  range: string
) => {
  const response = await axios.get<Events>(
    "https://api.seatgeek.com/2/events/",
    {
      params: {
        geoip: true,
        range: range,
        per_page: rowsPerPage,
        page: page,
        client_id: import.meta.env.VITE_SEATGEEK_CLIENT_ID,
        client_secret: import.meta.env.VITE_SEATGEEK_CLIENT_SECRET,
      },
    }
  );
  if (response.data.events && response.data.meta && response.data.meta.total) {
    return {
      events: response.data.events,
      notFound: false,
      eventCount: response.data.meta.total,
    };
  }
  return {
    events: [],
    notFound: true,
    eventCount: 0,
  };
};

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
  if (response.data) {
    localStorage.setItem("spotifyToken", response.data.access_token as string);
    return;
  }
  localStorage.removeItem("spotifyToken");
};

export const getArtistDetails = async (artistName: string) => {
  let response = await axios.get("https://api.spotify.com/v1/search", {
    params: {
      q: `${artistName}`,
      type: "artist",
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
    },
  });
  if (response.status === 401) {
    await getSpotifyToken();
    response = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: `${artistName}`,
        type: "artist",
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
      },
    });
  }
  return {
    genres: response.data.artists.items[0].genres as string[],
    url: response.data.artists.items[0].external_urls.spotify as string,
    followers: response.data.artists.items[0].followers.total as number,
    popularity: response.data.artists.items[0].popularity as number,
  } as ArtistDetails;
};
