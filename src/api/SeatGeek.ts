import axios from "axios";
import { Events } from "../Interfaces";

export const getEvents = async (
  page: number,
  rowsPerPage: number,
  range: string,
  eventTypes: string[] | undefined,
  sortProps: {
    sortDate: boolean | undefined;
    sortPopularity: boolean | undefined;
  },
  lat: number | null,
  lon: number | null,
  query: string | undefined,
) => {
  const filterString = eventTypes
    ?.map((e) => {
      if (e === "Sports") {
        return "&type.eq=nba&type.eq=ncaa_basketball&type.eq=ncaa_womens_basketball&type.eq=ncaa_soccer&type.eq=mls&type.eq=ncaa_football&type.eq=nhl&type.eq=hockey&type.eq=minor_league_hockey&type.eq=auto_racing&type.eq=womens_college_volleyball";
      }
      if (e === "Theater") {
        return "&type=theater&type=broadway_tickets_national";
      }
      if (e === "Concert") {
        return "&type=concert&type=classical&type=classical_opera&type=classical_orchestral_instrumental";
      }
      return `&type.eq=${e.toLowerCase()}`;
    })
    .toString()
    .replaceAll(",", "");
  if (eventTypes && eventTypes.length > 0 && !eventTypes.includes("All")) {
    const response = await axios.get<Events>(
      `https://api.seatgeek.com/2/events/?lat=${lat}&lon=${lon}&range=${range}&per_page=${rowsPerPage}&page=${page}&client_id=${
        import.meta.env.VITE_SEATGEEK_CLIENT_ID
      }&client_secret=${
        import.meta.env.VITE_SEATGEEK_CLIENT_SECRET
      }${filterString}${
        sortProps.sortDate !== undefined
          ? sortProps.sortDate === true
            ? "&sort=datetime_utc.asc"
            : "&sort=datetime_utc.desc"
          : ""
      }${
        sortProps.sortPopularity !== undefined
          ? sortProps.sortPopularity === true
            ? "&sort=score.asc"
            : "&sort=score.desc"
          : ""
      }&datetime_utc.gt=${new Date().toISOString().replace("Z", "")}${
        query && `&q=${query}`
      }`,
    );
    return response.data;
  }
  const response = await axios.get<Events>(
    `https://api.seatgeek.com/2/events/?lat=${lat}&lon=${lon}&range=${range}&per_page=${rowsPerPage}&page=${page}&client_id=${
      import.meta.env.VITE_SEATGEEK_CLIENT_ID
    }&client_secret=${import.meta.env.VITE_SEATGEEK_CLIENT_SECRET}${
      sortProps.sortDate !== undefined
        ? sortProps.sortDate === true
          ? "&sort=datetime_utc.asc"
          : "&sort=datetime_utc.desc"
        : ""
    }${
      sortProps.sortPopularity !== undefined
        ? sortProps.sortPopularity === true
          ? "&sort=score.asc"
          : "&sort=score.desc"
        : ""
    }&datetime_utc.gt=${new Date().toISOString().replace("Z", "")}${
      query && `&q=${query}`
    }`,
  );
  return response.data;
};
