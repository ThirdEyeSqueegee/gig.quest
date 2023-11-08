import { ArrowDownward, ArrowUpward, MoreVert } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Link,
  Sheet,
  Table,
  Tooltip,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useContext } from "react";
import { isMobile } from "react-device-detect";
import { EventDetails, Location } from "../Interfaces";
import { EventTypeIcon } from "../components/EventTypeIcon";
import { Performers } from "../components/Performers";
import { PopularityBar } from "../components/PopularityBar";
import { Prices } from "../components/Prices";
import { TicketsButton } from "../components/TicketsButton";
import { PagingContext } from "../contexts/PagingContext";
import { distance } from "../utilities/GreatCircleDistance";

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
  eventsDetails: EventDetails[];
  location?: Location;
}) => {
  const { props: paging, setter: setPaging } = useContext(PagingContext)!;

  const handleSortDate = () => {
    if (paging.sortDate === undefined) {
      setPaging({
        ...paging,
        sortDate: true,
        sortPopularity: undefined,
        page: 1,
      });
    } else {
      setPaging({
        ...paging,
        sortDate: !paging.sortDate,
        sortPopularity: undefined,
        page: 1,
      });
    }
  };

  const handleSortPopularity = () => {
    if (paging.sortPopularity === undefined) {
      setPaging({
        ...paging,
        sortPopularity: true,
        sortDate: undefined,
        page: 1,
      });
    } else {
      setPaging({
        ...paging,
        sortPopularity: !paging.sortPopularity,
        sortDate: undefined,
        page: 1,
      });
    }
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
                  {paging.sortDate === undefined ? (
                    <MoreVert
                      fontSize="inherit"
                      sx={{ opacity: paging.sortDate === undefined ? 0.25 : 1 }}
                    />
                  ) : paging.sortDate === true ? (
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
                  {paging.sortPopularity === undefined ? (
                    <MoreVert
                      fontSize="inherit"
                      sx={{
                        opacity: paging.sortPopularity === undefined ? 0.25 : 1,
                      }}
                    />
                  ) : paging.sortPopularity === true ? (
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
          {props.eventsDetails?.map((e, i) => {
            const venueLoc = e.event.venue?.location;

            return (
              <tr key={i}>
                <td>
                  <Box display="flex" alignItems="center">
                    <EventTypeIcon eventType={e.event.type} />
                  </Box>
                </td>
                <td>
                  <Performers eventDetails={e} />
                </td>
                <td>
                  <Box display="flex" gap={1} alignItems="end">
                    <Link
                      href={`https://www.google.com/maps/search/${e.event.venue?.name
                        ?.replaceAll(" - ", " ")
                        .replaceAll(" ", "+")}`}
                      rel="noopener"
                      target="_blank"
                    >
                      {e.event.venue?.name}
                    </Link>
                    <Chip size="sm">{`${distance(
                      props.location,
                      venueLoc,
                    )} mi`}</Chip>
                  </Box>
                </td>
                <td>
                  {e.event.datetime_local
                    ? new Date(e.event.datetime_local).toLocaleString("en-US", {
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
                  <Prices eventDetails={e} />
                </td>
                <td>
                  <PopularityBar e={e.event} />
                </td>
                <td>
                  <TicketsButton url={e.event.url} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Sheet>
  );
};
