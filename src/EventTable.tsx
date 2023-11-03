import { LocalActivity } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  LinearProgress,
  Link,
  Table,
  Tooltip,
  Typography,
} from "@mui/joy";
import React from "react";
import { isMobile } from "react-device-detect";
import { ArtistDetails, IEvent } from "./Interfaces";
import { Performers } from "./Performers";
import { setIcon } from "./SetIcon";

export default function EventTable(props: {
  events: IEvent[];
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
  notFound: boolean;
  getArtistDetails: (artistName: string) => Promise<ArtistDetails>;
}) {
  return (
    <Table size="lg">
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
          <th style={{ width: "12.5%" }}>
            <Typography level="h4">Date</Typography>
          </th>
          <th style={{ width: isMobile ? "10%" : "7.5%" }}>
            <Typography level="h4">Prices</Typography>
          </th>
          <th style={{ width: isMobile ? "12.5%" : "10%" }}>
            <Typography level="h4">Popularity</Typography>
          </th>
          <th style={{ width: isMobile ? "15%" : "7.5%", textAlign: "center" }}>
            <Typography level="h4">Link</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.events.length > 0 ? (
          props.events.map((event) => (
            <tr key={event.id}>
              <td style={{ textAlign: "center" }}>{setIcon(event.type!)}</td>
              <td>
                <Performers
                  performers={event.performers!}
                  eventType={event.type!}
                  getArtistDetails={props.getArtistDetails}
                />
              </td>
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
                  followCursor
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
                  followCursor
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
                  />
                </Tooltip>
              </td>
              <td style={{ textAlign: "center" }}>
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
        ) : props.notFound ? (
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
    </Table>
  );
}
