import {
  ArrowDownward,
  ArrowUpward,
  LocalActivity,
  MoreVert,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Link,
  Sheet,
  Table,
  Tooltip,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { Event, Location, SpotifyResult } from "../Interfaces";
import { distance } from "../utilities/GreatCircleDistance";
import { EventTypeIcon } from "./EventTypeIcon";
import { Performers } from "./Performers";
import { PopularityBar } from "./PopularityBar";

const SortButton = (props: {
  handleSort(): void;
  children: React.ReactNode;
}) => {
  return (
    <Tooltip arrow title="Sort" variant="soft">
      <IconButton
        size="sm"
        variant="plain"
        onClick={props.handleSort}
        sx={{
          fontSize: isMobile ? "0.75rem" : "1rem",
          "--IconButton-size": "1.25rem",
          alignSelf: "center",
          paddingInline: 0,
          "&:active": {
            backgroundColor: "transparent",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        {props.children}
      </IconButton>
    </Tooltip>
  );
};

export const EventTable = (props: {
  events: Event[] | undefined;
  artistMap: Map<string, SpotifyResult> | undefined;
  sortDate: boolean | undefined;
  setSortDate: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  sortPopularity: boolean | undefined;
  setSortPopularity: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  lat: number | null;
  lon: number | null;
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
    <Sheet sx={{ height: "100%", overflow: "auto" }}>
      <Table
        size={isMobile ? "md" : "lg"}
        component={motion.table}
        layout
        transition={{ duration: 0.25 }}
      >
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
              <Typography level={isMobile ? "title-md" : "h4"}>
                Venue
              </Typography>
            </th>
            <th style={{ width: "15%" }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="end"
              >
                <Typography level={isMobile ? "title-md" : "h4"}>
                  Date
                </Typography>
                <SortButton handleSort={handleSortDate}>
                  {props.sortDate === undefined ? (
                    <MoreVert
                      fontSize="inherit"
                      sx={{ opacity: props.sortDate === undefined ? 0.25 : 1 }}
                    />
                  ) : props.sortDate === true ? (
                    <ArrowUpward fontSize="inherit" />
                  ) : (
                    <ArrowDownward fontSize="inherit" />
                  )}
                </SortButton>
              </Box>
            </th>
            <th style={{ width: isMobile ? "12.5%" : "7.5%" }}>
              <Typography level={isMobile ? "title-md" : "h4"} mb="auto">
                Prices
              </Typography>
            </th>
            <th style={{ width: isMobile ? "12.5%" : "10%" }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="end"
              >
                <Typography level={isMobile ? "title-md" : "h4"}>
                  Popularity
                </Typography>
                <SortButton handleSort={handleSortPopularity}>
                  {props.sortPopularity === undefined ? (
                    <MoreVert
                      fontSize="inherit"
                      sx={{
                        opacity: props.sortPopularity === undefined ? 0.25 : 1,
                      }}
                    />
                  ) : props.sortPopularity === true ? (
                    <ArrowUpward fontSize="inherit" />
                  ) : (
                    <ArrowDownward fontSize="inherit" />
                  )}
                </SortButton>
              </Box>
            </th>
            <th style={{ width: isMobile ? "15%" : "7.5%" }}>
              <Typography level={isMobile ? "title-md" : "h4"}>Link</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.events?.map((e, i) => {
            const venueLoc = e.venue?.location;
            const myLoc: Location = { lat: props.lat, lon: props.lon };

            return (
              <tr key={i}>
                <td>
                  <Box display="flex" alignItems="center">
                    <EventTypeIcon eventType={e.type} />
                  </Box>
                </td>
                <td>
                  <Performers
                    performers={e.performers}
                    eventType={e.type}
                    artistMap={props.artistMap}
                  />
                </td>
                <td>
                  <Box display="flex" gap={1} alignItems="end">
                    <Link
                      href={`https://www.google.com/maps/search/${e.venue?.name
                        ?.replaceAll(" - ", " ")
                        .replaceAll(" ", "+")}`}
                      rel="noopener"
                      target="_blank"
                    >
                      {e.venue?.name}
                    </Link>
                    <Chip size="sm">{`${distance(myLoc, venueLoc)} mi`}</Chip>
                  </Box>
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
                      component={motion.span}
                      whileHover={{ scale: 1.1 }}
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
                    component={motion.button}
                    whileTap={{ scale: 0.9 }}
                    size="sm"
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
      </Table>
    </Sheet>
  );
};
