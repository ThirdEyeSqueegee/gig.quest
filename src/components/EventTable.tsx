import { LocalActivity } from "@mui/icons-material";
import { Button, Link, Table, Tooltip, Typography } from "@mui/joy";
import { isMobile } from "react-device-detect";
import { TEvents, TSpotifyResult } from "../Types";
import { EventTypeIcon } from "./EventTypeIcon";
import { Performers } from "./Performers";
import { PopularityBar } from "./PopularityBar";

export const EventTable = (props: {
  events: TEvents | undefined;
  artistMap: Map<string, TSpotifyResult> | undefined;
}) => {
  return (
    <Table size={isMobile ? "md" : "lg"}>
      <thead>
        <tr>
          <th style={{ width: "5%" }}>
            <Typography level={isMobile ? "title-md" : "h4"}>Type</Typography>
          </th>
          <th style={{ width: isMobile ? "25%" : "30%" }}>
            <Typography level={isMobile ? "title-md" : "h4"}>
              Performers
            </Typography>
          </th>
          <th style={{ width: isMobile ? "20%" : "30%" }}>
            <Typography level={isMobile ? "title-md" : "h4"}>Venue</Typography>
          </th>
          <th style={{ width: "15%" }}>
            <Typography level={isMobile ? "title-md" : "h4"}>Date</Typography>
          </th>
          <th style={{ width: isMobile ? "12.5%" : "7.5%" }}>
            <Typography level={isMobile ? "title-md" : "h4"}>Prices</Typography>
          </th>
          <th style={{ width: isMobile ? "12.5%" : "10%" }}>
            <Typography level={isMobile ? "title-md" : "h4"}>
              Popularity
            </Typography>
          </th>
          <th style={{ width: isMobile ? "15%" : "7.5%" }}>
            <Typography level={isMobile ? "title-md" : "h4"}>Link</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.events?.events?.map((e, i) => {
          return (
            <tr key={i}>
              <td>
                <EventTypeIcon eventType={e.type} />
              </td>
              <td>
                <Performers
                  performers={e.performers}
                  eventType={e.type}
                  artistMap={props.artistMap}
                />
              </td>
              <td>
                <Link
                  href={`https://www.google.com/maps/search/${e.venue?.name
                    ?.replaceAll(" - ", " ")
                    .replaceAll(" ", "+")}`}
                  rel="noopener"
                  target="_blank"
                >
                  {e.venue?.name}
                </Link>
              </td>
              <td>
                {e.datetime_local
                  ? new Date(e.datetime_local).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })
                  : ""}
              </td>
              <td>
                <Tooltip
                  arrow
                  color="success"
                  followCursor
                  size="lg"
                  title={
                    e.stats?.average_price
                      ? `Avg.: $${e.stats?.average_price}`
                      : "¯\\_(ツ)_/¯"
                  }
                  variant="soft"
                >
                  <Typography>
                    {e.stats?.lowest_price
                      ? `$${e.stats?.lowest_price} - $${e.stats?.highest_price}`
                      : "¯\\_(ツ)_/¯"}
                  </Typography>
                </Tooltip>
              </td>
              <td>
                <PopularityBar e={e} />
              </td>
              <td>
                <Button
                  size={isMobile ? "sm" : "md"}
                  startDecorator={<LocalActivity />}
                  variant="outlined"
                >
                  <Link
                    href={e.url}
                    overlay
                    rel="noopener"
                    target="_blank"
                    underline="none"
                  >
                    Tickets
                  </Link>
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </Table>
  );
};
