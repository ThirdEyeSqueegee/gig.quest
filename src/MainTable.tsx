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
import { Events, IEvent } from "./Interfaces";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
} from "@mui/icons-material";
import { setIcon } from "./SetIcon";
import { parsePerformers } from "./ParsePerformers";

export default function MainTable() {
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

  return (
    <Table sx={{ height: "75vh" }} size="lg">
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
          <th style={{ width: "7.5%" }}>
            <Typography level="h4">Prices</Typography>
          </th>
          <th style={{ width: "10%" }}>
            <Typography level="h4">Popularity</Typography>
          </th>
          <th style={{ width: "5%" }}>
            <Typography level="h4">Link</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>{setIcon(event.type!)}</td>
            <td>{parsePerformers(event.performers, event.type)}</td>
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
              <Tooltip
                title={`Avg.: $${event.stats?.average_price}`}
                variant="soft"
                size="lg"
                color="success"
              >
                <Typography>
                  ${event.stats?.lowest_price} - ${event.stats?.highest_price}
                </Typography>
              </Tooltip>
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
                <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
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
  );
}
