import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Select,
  Table,
  Option,
  Link,
  LinearProgress,
  Typography,
  Tooltip,
} from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { Events, IEvent, Performer } from "./Interfaces";
import {
  DirectionsCar,
  Diversity3,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  LocalActivity,
  Mood,
  MusicNote,
  PlayCircle,
  SportsBasketball,
  SportsEsports,
  SportsFootball,
  SportsHockey,
  SportsSoccer,
  SportsVolleyball,
  TheaterComedy,
} from "@mui/icons-material";

export default function ShowsTable() {
  const [range, setRange] = useState("5mi");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [events, setEvents] = useState<IEvent[]>([]);

  const getEvents = () => {
    axios
      .get<Events>("https://api.seatgeek.com/2/events/", {
        params: {
          geoip: true,
          range: range,
          per_page: rowsPerPage,
          page: page,
          client_id: import.meta.env.VITE_SEATGEEK_CLIENT_ID,
          client_secret: import.meta.env.VITE_SEATGEEK_CLIENT_SECRET,
        },
      })
      .then((response) => {
        setEvents(response.data.events!);
      });
  };

  const setEventTypeIcon = (eventType: string) => {
    switch (eventType) {
      case "nba":
        return (
          <Tooltip title="NBA" variant="soft" size="lg">
            <SportsBasketball />
          </Tooltip>
        );
      case "ncaa_basketball":
      case "ncaa_womens_basketball":
        return (
          <Tooltip title="NCAA Basketball" variant="soft" size="lg">
            <SportsBasketball />
          </Tooltip>
        );
      case "ncaa_soccer":
        return (
          <Tooltip title="NCAA Soccer" variant="soft" size="lg">
            <SportsSoccer />
          </Tooltip>
        );
      case "mls":
        return (
          <Tooltip title="MLS" variant="soft" size="lg">
            <SportsSoccer />
          </Tooltip>
        );
      case "ncaa_football":
        return (
          <Tooltip title="NCAA Football" variant="soft" size="lg">
            <SportsFootball />
          </Tooltip>
        );
      case "concert":
        return (
          <Tooltip title="Concert" variant="soft" size="lg">
            <PlayCircle />
          </Tooltip>
        );
      case "music_festival":
        return (
          <Tooltip title="Music Festival" variant="soft" size="lg">
            <PlayCircle />
          </Tooltip>
        );
      case "classical":
        return (
          <Tooltip title="Classical" variant="soft" size="lg">
            <MusicNote />
          </Tooltip>
        );
      case "classical_opera":
        return (
          <Tooltip title="Opera" variant="soft" size="lg">
            <MusicNote />
          </Tooltip>
        );
      case "classical_orchestral_instrumental":
        return (
          <Tooltip title="Orchestra" variant="soft" size="lg">
            <MusicNote />
          </Tooltip>
        );
      case "broadway_tickets_national":
      case "theater":
        return (
          <Tooltip title="Theater" variant="soft" size="lg">
            <TheaterComedy />
          </Tooltip>
        );
      case "esports":
        return (
          <Tooltip title="Esports" variant="soft" size="lg">
            <SportsEsports />
          </Tooltip>
        );
      case "nhl":
        return (
          <Tooltip title="NHL" variant="soft" size="lg">
            <SportsHockey />
          </Tooltip>
        );
      case "minor_league_hockey":
        return (
          <Tooltip title="Minor League Hockey" variant="soft" size="lg">
            <SportsHockey />
          </Tooltip>
        );
      case "family":
        return (
          <Tooltip title="Family" variant="soft" size="lg">
            <Diversity3 />
          </Tooltip>
        );
      case "comedy":
        return (
          <Tooltip title="Comedy" variant="soft" size="lg">
            <Mood />
          </Tooltip>
        );
      case "auto_racing":
        return (
          <Tooltip title="Racing" variant="soft" size="lg">
            <DirectionsCar />
          </Tooltip>
        );
      case "womens_college_volleyball":
        return (
          <Tooltip title="Women's College Volleyball" variant="soft" size="lg">
            <SportsVolleyball />
          </Tooltip>
        );
      default:
        return <LocalActivity />;
    }
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.SyntheticEvent | null,
    newValue: number | null
  ) => {
    setRowsPerPage(newValue!);
    setPage(1);
  };

  const handleChangeRange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setRange(newValue!);
  };

  const makePerformersString = (
    performers: Performer[] | undefined,
    eventType: string | undefined
  ) => {
    if (performers?.length === 1) {
      return performers[0].name;
    }

    if (
      eventType === "nba" ||
      eventType === "womens_college_volleyball" ||
      eventType === "nhl" ||
      eventType === "mls" ||
      eventType?.includes("ncaa")
    ) {
      return `${performers![0].name} vs. ${performers![1].name}`;
    }

    let str = "";
    performers?.forEach((p, i) => {
      if (p.primary) {
        str += p.name + " // ";
      } else {
        if (i === performers.length - 1) {
          str += p.name;
        } else {
          str += p.name + " // ";
        }
      }
    });

    return str;
  };

  useEffect(() => {
    setEvents([]);
    getEvents();
  }, [page, rowsPerPage, range]);

  return (
    <>
      <Table sx={{ height: "75vh" }}>
        <thead>
          <tr>
            <th style={{ width: "3%" }}>
              <Typography level="h4">Type</Typography>
            </th>
            <th style={{ width: "30%" }}>
              <Typography level="h4">Performers</Typography>
            </th>
            <th style={{ width: "20%" }}>
              <Typography level="h4">Venue</Typography>
            </th>
            <th>
              <Typography level="h4">Date</Typography>
            </th>
            <th>
              <Typography level="h4">Prices</Typography>
            </th>
            <th>
              <Typography level="h4">Popularity</Typography>
            </th>
            <th>
              <Typography level="h4">Link</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{setEventTypeIcon(event.type!)}</td>
              <td>{makePerformersString(event.performers, event.type)}</td>
              <td>
                <Link
                  href={`https://www.google.com/maps/search/${event.venue?.name?.replaceAll(
                    " ",
                    "+"
                  )}`}
                >
                  {event.venue?.name}
                </Link>
              </td>
              <td>
                {new Date(`${event.datetime_utc!}+00:00`).toLocaleString(
                  "en-US",
                  {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </td>
              <td>
                ${event.stats?.lowest_price} - ${event.stats?.highest_price}
              </td>
              <td>
                <Tooltip
                  title={(event.score! * 100).toFixed(1)}
                  variant="soft"
                  size="lg"
                >
                  <LinearProgress
                    determinate
                    variant="solid"
                    color={
                      event.score! > 0.66
                        ? "success"
                        : event.score! > 0.5
                        ? "primary"
                        : "danger"
                    }
                    value={event.score! * 100}
                    size="lg"
                    sx={{ width: "80%" }}
                  />
                </Tooltip>
              </td>
              <td>
                <Link href={event.url}>Tickets</Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "flex-end",
                }}
              >
                <FormControl orientation="horizontal" size="sm">
                  <FormLabel>Range:</FormLabel>
                  <Select onChange={handleChangeRange} value={range}>
                    <Option value={"5mi"}>5 mi</Option>
                    <Option value={"10mi"}>10 mi</Option>
                    <Option value={"25mi"}>25 mi</Option>
                    <Option value={"50mi"}>50 mi</Option>
                  </Select>
                </FormControl>
                <FormControl orientation="horizontal" size="sm">
                  <FormLabel>Rows per page:</FormLabel>
                  <Select
                    onChange={handleChangeRowsPerPage}
                    value={rowsPerPage}
                  >
                    <Option value={10}>10</Option>
                    <Option value={20}>20</Option>
                    <Option value={30}>30</Option>
                  </Select>
                </FormControl>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    variant="outlined"
                    disabled={page === 1}
                    onClick={() => handleChangePage(1)}
                    sx={{ mr: 2 }}
                  >
                    <KeyboardDoubleArrowLeft />
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    disabled={page === 1}
                    onClick={() => handleChangePage(page - 1)}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    onClick={() => handleChangePage(page + 1)}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </Box>
              </Box>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}
