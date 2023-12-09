import axios from "axios";

import type { Location, SGEventDetails, SGEvents, SGEventsDetailsAndMeta } from "./interfaces/SeatGeek.ts";

import { tokenizeConcertPerformers, tokenizeMLBGame, tokenizeNBAGame, tokenizeNFLGame, tokenizeNHLGame } from "../Utilities.ts";
import { SG1v1SportsEventTypes, SGMusicEventTypes, SGSportsEventTypes, SGTheaterEventTypes, isSGMusicEventType } from "./interfaces/SeatGeek.ts";

const majorLeagues = ["nba", "nfl", "nhl", "mlb"];

export const seatGeekFetcher = async (
  page: number,
  rowsPerPage: number,
  range: string,
  location?: Location,
  filter?: string[],
  sortAvgPrice?: boolean,
  sortDate?: boolean,
  sortHighestPrice?: boolean,
  sortLowestPrice?: boolean,
  sortPopularity?: boolean,
  searchQuery?: string,
) => {
  let filterString = "";

  if (filter) {
    for (const f of filter) {
      if (f.includes("concert")) {
        for (const m of SGMusicEventTypes) {
          filterString += `&type.eq=${m}`;
        }
      }
      if (f.includes("sports")) {
        for (const s of [...SGSportsEventTypes, ...SG1v1SportsEventTypes]) {
          if (!majorLeagues.includes(s)) {
            filterString += `&type.eq=${s}`;
          }
        }
      }
      if (f.includes("theater")) {
        for (const t of SGTheaterEventTypes) {
          if (t !== "comedy" && !t.includes("classical")) {
            filterString += `&type.eq=${t}`;
          }
        }
      }
      if (!f.includes("concert") && !f.includes("sports") && !f.includes("theater")) {
        filterString += `&type.eq=${f}`;
      }
    }
  }

  const response = await axios.get<SGEvents>(
    `https://api.seatgeek.com/2/events/?per_page=${rowsPerPage}&page=${page}&client_id=${import.meta.env.VITE_SEATGEEK_CLIENT_ID}&client_secret=${
      import.meta.env.VITE_SEATGEEK_CLIENT_SECRET
    }${
      range !== "51mi" ?
        location ? `&lat=${location.lat}&lon=${location.lon}&range=${range}`
        : `&geoip=true&range=${range}`
      : ""
    }${filterString}${
      sortDate !== undefined ?
        sortDate ? "&sort=datetime_utc.asc"
        : "&sort=datetime_utc.desc"
      : ""
    }${
      sortPopularity !== undefined ?
        sortPopularity ? "&sort=score.asc"
        : "&sort=score.desc"
      : ""
    }${
      sortLowestPrice !== undefined ?
        sortLowestPrice ? "&sort=lowest_price.asc&lowest_price.gt=1"
        : "&sort=lowest_price.desc&lowest_price.gt=1"
      : ""
    }${
      sortHighestPrice !== undefined ?
        sortHighestPrice ? "&sort=highest_price.asc&highest_price.gt=1"
        : "&sort=highest_price.desc&highest_price.gt=1"
      : ""
    }${
      sortAvgPrice !== undefined ?
        sortAvgPrice ? "&sort=average_price.asc&average_price.gt=1"
        : "&sort=average_price.desc&average_price.gt=1"
      : ""
    }&datetime_utc.gt=${new Date().toISOString().replace("Z", "")}${searchQuery ? `&q=${searchQuery}` : ""} `,
  );

  const eventsDetails: SGEventDetails[] = [];

  if (response.data.events) {
    for (const e of response.data.events) {
      if (e.performers && e.type && isSGMusicEventType(e.type) && e.type !== "music_festival") {
        const tokens = tokenizeConcertPerformers(e.performers);
        eventsDetails.push({ event: e, performers: tokens });
        continue;
      }
      if (e.title && e.type === "nba") {
        const { teams } = tokenizeNBAGame(e.title);
        eventsDetails.push({ event: e, performers: teams });
        continue;
      }
      if (e.title && e.type === "nfl") {
        const teams = tokenizeNFLGame(e.title);
        eventsDetails.push({ event: e, performers: teams });
        continue;
      }
      if (e.title && e.type === "nhl") {
        const teams = tokenizeNHLGame(e.title);
        eventsDetails.push({ event: e, performers: teams });
        continue;
      }
      if (e.title && e.type === "mlb") {
        const teams = tokenizeMLBGame(e.title);
        eventsDetails.push({ event: e, performers: teams });
        continue;
      }
      eventsDetails.push({ event: e });
    }
  }

  return {
    details: eventsDetails,
    meta: response.data.meta,
  } as SGEventsDetailsAndMeta;
};
