import { LocalActivity } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Link,
  Table,
  Tooltip,
  Typography,
} from "@mui/joy";
import { useOrientation } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { Events, IEvent } from "./Interfaces";
import { parsePerformers } from "./ParsePerformers";
import { setIcon } from "./SetIcon";

export default function MainTable() {
  const [range, setRange] = useState("5mi");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [events, setEvents] = useState<IEvent[]>([]);
  const orientation = useOrientation();

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

  useEffect(() => {
    setEvents([]);
    getEvents();
  }, [page, rowsPerPage, range]);

  return orientation.type.includes("landscape") ? (
    <Table sx={{ height: "67vh" }} size="lg">
      <thead>
        <tr>
          <th style={{ width: "7.5%" }}>
            <Typography level="h4">Type</Typography>
          </th>
          <th style={{ width: "30%" }}>
            <Typography level="h4">Performers</Typography>
          </th>
          <th>
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
          <th style={{ width: "7.5%" }}>
            <Typography level="h4">Link</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {events.length > 0 ? (
          events.map((event) => (
            <tr key={event.id}>
              <td>{setIcon(event.type!)}</td>
              <td>{parsePerformers(event.performers, event.type)}</td>
              <td>
                <Link
                  href={`https://www.google.com/maps/search/${event.venue?.name?.replaceAll(
                    " ",
                    "+"
                  )}`}
                  target="_blank"
                  rel="noopener"
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
                <Tooltip
                  title={`Avg.: $${
                    event.stats?.average_price
                      ? event.stats?.average_price
                      : "N/A"
                  }`}
                  variant="soft"
                  size="lg"
                  color="success"
                  arrow
                  placement="left"
                >
                  <Typography>
                    {event.stats?.lowest_price
                      ? `$${event.stats.lowest_price} - $${event.stats.highest_price}`
                      : "N/A"}
                  </Typography>
                </Tooltip>
              </td>
              <td>
                <Tooltip
                  title={(event.score! * 100).toFixed(1)}
                  variant="soft"
                  size="lg"
                  arrow
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
                <Button
                  size="sm"
                  variant="outlined"
                  startDecorator={<LocalActivity />}
                >
                  <Link target="_blank" rel="noopener" href={event.url} overlay>
                    Tickets
                  </Link>
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td>
              <CircularProgress color="neutral" size="lg" />
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={7}>
            <Footer
              page={page}
              setPage={setPage}
              range={range}
              setRange={setRange}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              justify="flex-end"
            />
          </td>
        </tr>
      </tfoot>
    </Table>
  ) : (
    <Box width="100%">
      {events.map((event) => {
        return (
          <Card size="sm" sx={{ m: 1 }}>
            {parsePerformers(event.performers, event.type)}
            <Link
              fontSize="0.75rem"
              href={`https://www.google.com/maps/search/${event.venue?.name?.replaceAll(
                " ",
                "+"
              )}`}
              target="_blank"
              rel="noopener"
            >
              {event.venue?.name}
            </Link>
            <CardContent>
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
              <Box
                sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
              >
                {setIcon(event.type!)}
              </Box>
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
                sx={{
                  width: "20%",
                  position: "absolute",
                  top: "45%",
                  right: "0.5rem",
                }}
              />
              <Button
                size="sm"
                variant="outlined"
                sx={{
                  position: "absolute",
                  bottom: "0.875rem",
                  right: "0.5rem",
                }}
                startDecorator={<LocalActivity />}
              >
                <Link target="_blank" rel="noopener" href={event.url} overlay>
                  Tickets
                </Link>
              </Button>
              {event.stats?.lowest_price
                ? `$${event.stats.lowest_price} - $${event.stats.highest_price}`
                : "N/A"}
            </CardContent>
          </Card>
        );
      })}
      <Footer
        page={page}
        setPage={setPage}
        range={range}
        setRange={setRange}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        justify="center"
      />
    </Box>
  );
}
