import axios from "axios";

import { tokenizePerformers } from "../Utilities.ts";
import { Location, SGEventDetails, SGEvents, SGEventsDetailsAndMeta } from "./interfaces/SeatGeek.ts";

export const seatGeekFetcher = async (
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
  const response = await axios.get<SGEvents>(
    `https://api.seatgeek.com/2/events/?per_page=${rowsPerPage}&page=${page}&client_id=${import.meta.env.VITE_SEATGEEK_CLIENT_ID}&client_secret=${
      import.meta.env.VITE_SEATGEEK_CLIENT_SECRET
    }${range !== "0mi" ? `&lat=${location.lat}&lon=${location.lon}&range=${range}` : ""}${
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
    }&datetime_utc.gt=${new Date().toISOString().replace("Z", "")}${searchQuery ? `&q=${searchQuery}` : ""} `,
  );

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
