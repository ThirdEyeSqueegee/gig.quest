import axios from "axios";

import { tokenizePerformers } from "../Utilities.ts";
import { Location, SGEventDetails, SGEvents, SGEventsDetailsAndMeta } from "./interfaces/SeatGeek.ts";

export const seatGeekFetcher = async (
  filter: string[],
  location: Location,
  page: number,
  rowsPerPage: number,
  range: string,
  sortAvgPrice?: boolean,
  sortDate?: boolean,
  sortHighestPrice?: boolean,
  sortLowestPrice?: boolean,
  sortPopularity?: boolean,
  searchQuery?: string,
) => {
  let festivalSearch = false;
  const filterString = filter
    ?.map((e) => {
      switch (e) {
        case "nba": {
          return "&type.eq=nba";
        }
        case "nfl": {
          return "&type.eq=nfl";
        }
        case "sports": {
          return "&type.eq=ncaa_basketball&type.eq=ncaa_womens_basketball&type.eq=ncaa_soccer&type.eq=mls&type.eq=ncaa_football&type.eq=nhl&type.eq=hockey&type.eq=minor_league_hockey&type.eq=auto_racing&type.eq=womens_college_volleyball&type.eq=wrestling";
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

  const response = await axios.get<SGEvents>(`https://api.seatgeek.com/2/events/?per_page=${rowsPerPage}&page=${page}&client_id=${
    import.meta.env.VITE_SEATGEEK_CLIENT_ID
  }&client_secret=${import.meta.env.VITE_SEATGEEK_CLIENT_SECRET}${!festivalSearch ? `&lat=${location.lat}` : ""}${
    !festivalSearch ? `&lon=${location.lon}` : ""
  }${!festivalSearch ? `&range=${range}` : ""}${filter && filter.length > 0 ? filterString : ""}${
    sortDate !== undefined ?
      sortDate === true ?
        "&sort=datetime_utc.asc"
      : "&sort=datetime_utc.desc"
    : ""
  }${
    sortPopularity !== undefined ?
      sortPopularity === true ?
        "&sort=score.asc"
      : "&sort=score.desc"
    : ""
  }${
    sortLowestPrice !== undefined ?
      sortLowestPrice === true ?
        "&sort=lowest_price.asc&lowest_price.gt=1"
      : "&sort=lowest_price.desc&lowest_price.gt=1"
    : ""
  }${
    sortHighestPrice !== undefined ?
      sortHighestPrice === true ?
        "&sort=highest_price.asc&highest_price.gt=1"
      : "&sort=highest_price.desc&highest_price.gt=1"
    : ""
  }${
    sortAvgPrice !== undefined ?
      sortAvgPrice === true ?
        "&sort=average_price.asc&average_price.gt=1"
      : "&sort=average_price.desc&average_price.gt=1"
    : ""
  }&datetime_utc.gt=${new Date().toISOString().replace("Z", "")}${searchQuery ? `&q=${searchQuery}` : ""}
    `);

  const eventsDetails: SGEventDetails[] = [];
  for (const e of response.data.events!) {
    const { is1v1, tokens } = tokenizePerformers(e.performers, e.type);
    eventsDetails.push({ event: e, is1v1, performers: tokens });
  }

  return {
    details: eventsDetails,
    meta: response.data.meta,
  } as SGEventsDetailsAndMeta;
};
