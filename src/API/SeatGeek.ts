import axios from "axios";
import { TEvents } from "../Types";

export const getEvents = async (
  page: number,
  rowsPerPage: number,
  range: string
) => {
  const response = await axios.get<TEvents>(
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
  return response.data;
};
