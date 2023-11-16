import axios from "axios";
import stringComparison from "string-comparison";
import {
  ArtistItem,
  EventDetails,
  EventsDetailsAndMeta,
  Location,
  PaginationProps,
  SGEvents,
  SortingProps,
  SpotifyArtistResult,
  SpotifyToken,
  SpotifyTokenResponse,
} from "../Interfaces";
import { tokenizePerformers } from "../utilities/TokenizePerformers";

export const getEvents = async (pagination: PaginationProps, sorting: SortingProps, location: Location, page: number, searchQuery?: string) => {
  let festivalSearch = false;
  const filterString = pagination.filter
    ?.map(e => {
      switch (e) {
        case "sports": {
          return "&type.eq=nba&type.eq=ncaa_basketball&type.eq=ncaa_womens_basketball&type.eq=ncaa_soccer&type.eq=mls&type.eq=ncaa_football&type.eq=nhl&type.eq=hockey&type.eq=minor_league_hockey&type.eq=auto_racing&type.eq=womens_college_volleyball";
        }
        case "theater": {
          return "&type=theater&type=broadway_tickets_national";
        }
        case "concert": {
          return "&type=concert&type=classical&type=classical_opera&type=classical_orchestral_instrumental";
        }
        case "music_festival": {
          festivalSearch = true;
          return `&type.eq=${e}`;
        }
        default:
          return `&type.eq=${e}`;
      }
    })
    .toString()
    .replaceAll(",", "");

  const response = await axios.get<SGEvents>(`https://api.seatgeek.com/2/events/?per_page=${pagination.rowsPerPage}&page=${page}&client_id=${
    import.meta.env.VITE_SEATGEEK_CLIENT_ID
  }&client_secret=${import.meta.env.VITE_SEATGEEK_CLIENT_SECRET}${!festivalSearch ? `&lat=${location.lat}` : ""}${
    !festivalSearch ? `&lon=${location.lon}` : ""
  }${!festivalSearch ? `&range=${pagination.range}` : ""}${pagination.filter && pagination.filter.length > 0 ? filterString : ""}${
    sorting.sortDate !== undefined ? (sorting.sortDate === true ? "&sort=datetime_utc.asc" : "&sort=datetime_utc.desc") : ""
  }${sorting.sortPopularity !== undefined ? (sorting.sortPopularity === true ? "&sort=score.asc" : "&sort=score.desc") : ""}${
    sorting.sortLowestPrice !== undefined
      ? sorting.sortLowestPrice === true
        ? "&sort=lowest_price.asc&lowest_price.gt=1"
        : "&sort=lowest_price.desc&lowest_price.gt=1"
      : ""
  }${
    sorting.sortHighestPrice !== undefined
      ? sorting.sortHighestPrice === true
        ? "&sort=highest_price.asc&highest_price.gt=1"
        : "&sort=highest_price.desc&highest_price.gt=1"
      : ""
  }${
    sorting.sortAvgPrice !== undefined
      ? sorting.sortAvgPrice === true
        ? "&sort=average_price.asc&average_price.gt=1"
        : "&sort=average_price.desc&average_price.gt=1"
      : ""
  }&datetime_utc.gt=${new Date().toISOString().replace("Z", "")}${searchQuery ? `&q=${searchQuery}` : ""}
    `);

  const eventsDetails: EventDetails[] = [];
  for (const e of response.data.events!) {
    const { is1v1, tokens } = tokenizePerformers(e.performers, e.type);
    eventsDetails.push({ event: e, performers: tokens, is1v1: is1v1 });
  }

  return {
    details: eventsDetails,
    meta: response.data.meta,
  } as EventsDetailsAndMeta;
};

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
  return {
    token: response.data.access_token,
    expires_at: new Date(Date.now() + response.data.expires_in * 1000),
  } as SpotifyToken;
};

export const spotifySearchArtist = async (artist: string, token: string) => {
  const response = await axios.get<SpotifyArtistResult>("https://api.spotify.com/v1/search", {
    params: {
      q: artist,
      type: "artist",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const item = response.data.artists.items![0];
  const dice = stringComparison.diceCoefficient.similarity(artist, item.name!);

  return dice > 0.9 ? item : ({} as ArtistItem);
};
