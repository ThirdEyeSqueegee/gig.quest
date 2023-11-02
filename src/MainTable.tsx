import { LocalActivity } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Link,
  Stack,
  Table,
  Tooltip,
  Typography,
} from "@mui/joy";
import { useOrientation } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Footer from "./Footer";
import { Events, IEvent } from "./Interfaces";
import { parsePerformers } from "./ParsePerformers";
import { setIcon } from "./SetIcon";

export default function MainTable() {
  const [range, setRange] = useState("5mi");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [eventCount, setEventCount] = useState(0);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [notFound, setNotFound] = useState(false);

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
        if (response.data.events) {
          if (response.data.events.length > 0) {
            setEvents(response.data.events);
            setNotFound(false);
            setEventCount(response.data.meta!.total!);
          } else {
            setNotFound(true);
            setEventCount(0);
          }
        } else {
          setNotFound(true);
          setEventCount(0);
        }
      });
  };

  useEffect(() => {
    setEvents([]);
    getEvents();
  }, [page, rowsPerPage, range]);

  return orientation.type.includes("landscape") ? (
    <Table sx={{ height: "67vh" }} size="lg">
      <thead>
        <tr>
          <th style={{ width: isMobile ? "7.5%" : "5%", textAlign: "center" }}>
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
          <th style={{ width: isMobile ? "15%" : "" }}>
            <Typography level="h4">Popularity</Typography>
          </th>
          <th style={{ width: isMobile ? "15%" : "7.5%" }}>
            <Typography level="h4">Link</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {events.length > 0 ? (
          events.map((event) => (
            <tr key={event.id}>
              <td style={{ textAlign: "center" }}>{setIcon(event.type!)}</td>
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
                  <Link
                    target="_blank"
                    rel="noopener"
                    href={event.url}
                    underline="none"
                    overlay
                  >
                    Tickets
                  </Link>
                </Button>
              </td>
            </tr>
          ))
        ) : notFound ? (
          <tr style={{ height: "85%" }}>
            <td colSpan={7} align="center">
              <Typography>
                No events found. Try increasing the search radius.
              </Typography>
            </td>
          </tr>
        ) : (
          <tr style={{ height: "85%" }}>
            <td colSpan={7} align="center">
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
              eventCount={eventCount}
            />
          </td>
        </tr>
      </tfoot>
    </Table>
  ) : (
    <Stack width="100%">
      {events.length > 0 ? (
        events.map((event) => {
          return (
            <Card size="sm" sx={{ mx: 1, mb: 1 }}>
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
                <Box position="absolute" top="0.75rem" right="0.75rem">
                  {setIcon(event.type!)}
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  position="absolute"
                  bottom="0.75rem"
                  right="0.75rem"
                  alignItems="center"
                >
                  <LinearProgress
                    determinate
                    variant="solid"
                    color={
                      event.score! > 0.66
                        ? "success"
                        : event.score! > 0.5
                        ? "primary"
                        : event.score! > 0.25
                        ? "warning"
                        : "danger"
                    }
                    value={event.score! * 100}
                    sx={{ mb: 1, width: "80%" }}
                  />
                  <Button
                    size="sm"
                    variant="outlined"
                    startDecorator={<LocalActivity />}
                  >
                    <Link
                      target="_blank"
                      rel="noopener"
                      href={event.url}
                      underline="none"
                      overlay
                    >
                      Tickets
                    </Link>
                  </Button>
                </Box>
                <Typography level="body-sm">
                  {event.stats?.lowest_price
                    ? `$${event.stats.lowest_price} - $${event.stats.highest_price}`
                    : "N/A"}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      ) : notFound ? (
        <Typography alignSelf="center">
          No events found. Try increasing the search radius.
        </Typography>
      ) : (
        <CircularProgress
          color="neutral"
          size="lg"
          sx={{ alignSelf: "center" }}
        />
      )}
      <Footer
        page={page}
        setPage={setPage}
        range={range}
        setRange={setRange}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        justify="center"
        eventCount={eventCount}
      />
    </Stack>
  );
}
