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
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
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
          per_page: rowsPerPage * 2,
          page: page,
          client_id: import.meta.env.VITE_SEATGEEK_CLIENT_ID,
          client_secret: import.meta.env.VITE_SEATGEEK_CLIENT_SECRET,
        },
      })
      .then((response) => {
        setEvents(
          response.data
            .events!.filter(
              (event) => event.type === "concert" || event.type === "classical"
            )
            .slice(0, rowsPerPage)
        );
      });
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

  const makePerformersString = (performers: Performer[] | undefined) => {
    if (performers?.length === 1) {
      return performers[0].name;
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
              <td>{makePerformersString(event.performers)}</td>
              <td>
                <Link
                  href={`https://www.google.com/maps/search/${event.venue?.name?.replace(
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
            <td colSpan={6}>
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
                    <Option value={"15mi"}>15 mi</Option>
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
