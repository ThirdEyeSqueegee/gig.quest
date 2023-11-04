import {
  ArrowDownward,
  ArrowUpward,
  LocalActivity,
  MoreVert,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Link,
  Table,
  Tooltip,
  Typography,
} from "@mui/joy";
import { isMobile } from "react-device-detect";
import { TEvents, TSpotifyResult } from "../Types";
import { EventTypeIcon } from "./EventTypeIcon";
import { Performers } from "./Performers";
import { PopularityBar } from "./PopularityBar";

export const EventTable = (props: {
  events: TEvents | undefined;
  artistMap: Map<string, TSpotifyResult> | undefined;
  sortDate: boolean | undefined;
  setSortDate: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  sortPopularity: boolean | undefined;
  setSortPopularity: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleSortDate = () => {
    if (props.sortDate === undefined) {
      props.setSortDate(true);
    } else {
      props.setSortDate(!props.sortDate);
    }
    props.setSortPopularity(undefined);
    props.setPage(1);
  };

  const handleSortPopularity = () => {
    if (props.sortPopularity === undefined) {
      props.setSortPopularity(true);
    } else {
      props.setSortPopularity(!props.sortPopularity);
    }
    props.setSortDate(undefined);
    props.setPage(1);
  };

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
            <Box display="flex" justifyContent="space-between">
              <Typography level={isMobile ? "title-md" : "h4"}>Date</Typography>
              <IconButton variant="plain" onClick={handleSortDate}>
                {props.sortDate === undefined ? (
                  <MoreVert
                    sx={{ opacity: props.sortDate === undefined ? 0.25 : 1 }}
                  />
                ) : props.sortDate === true ? (
                  <ArrowUpward />
                ) : (
                  <ArrowDownward />
                )}
              </IconButton>
            </Box>
          </th>
          <th style={{ width: isMobile ? "12.5%" : "7.5%" }}>
            <Typography level={isMobile ? "title-md" : "h4"} mb="auto">
              Prices
            </Typography>
          </th>
          <th style={{ width: isMobile ? "12.5%" : "10%" }}>
            <Box display="flex" justifyContent="space-between">
              <Typography level={isMobile ? "title-md" : "h4"}>
                Popularity
              </Typography>
              <IconButton variant="plain" onClick={handleSortPopularity}>
                {props.sortPopularity === undefined ? (
                  <MoreVert
                    sx={{
                      opacity: props.sortPopularity === undefined ? 0.25 : 1,
                    }}
                  />
                ) : props.sortPopularity === true ? (
                  <ArrowUpward />
                ) : (
                  <ArrowDownward />
                )}
              </IconButton>
            </Box>
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
                  <Typography
                    sx={{
                      "&:hover": {
                        transform: "scale(1.1)",
                        transition: "all 0.15s ease-out",
                      },
                    }}
                  >
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
