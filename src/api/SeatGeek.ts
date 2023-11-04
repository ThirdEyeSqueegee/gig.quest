import axios from "axios";
import { TEvents } from "../Types";

export const getEvents = async (
  page: number,
  rowsPerPage: number,
  range: string,
  eventTypes: string[] | undefined
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
    const response = await axios.get<TEvents>(
      `https://api.seatgeek.com/2/events/?geoip=true&range=${range}&per_page=${rowsPerPage}&page=${page}&client_id=${
        import.meta.env.VITE_SEATGEEK_CLIENT_ID
      }&client_secret=${
        import.meta.env.VITE_SEATGEEK_CLIENT_SECRET
      }${filterString}`
    );
    return response.data;
  }
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
