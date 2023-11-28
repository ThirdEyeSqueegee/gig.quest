import { ArrowDownward, ArrowUpward, HourglassTop, MoreVert } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Table, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";

import { DateAndTime } from "../components/atoms/DateAndTime.tsx";
import { EventTypeIcon } from "../components/atoms/EventTypeIcon.tsx";
import { Flexbox } from "../components/atoms/Flexbox.tsx";
import { PopularityBar } from "../components/atoms/PopularityBar.tsx";
import { Prices } from "../components/atoms/Prices.tsx";
import { TicketsButton } from "../components/atoms/TicketsButton.tsx";
import { Performers } from "../components/molecules/Performers.tsx";
import { Venue } from "../components/molecules/Venue.tsx";
import { useEvents } from "../hooks/useEvents.ts";
import { usePaginationStore } from "../stores/usePaginationStore.ts";
import { useSortingStore } from "../stores/useSortingStore.ts";

export const EventTable = memo(function EventTable() {
  const sorting = useSortingStore((state) => state);
  const rowsPerPage = usePaginationStore((state) => state.rowsPerPage);

  const { details: eventsDetails, isLoading } = useEvents();

  if (isLoading) {
    return (
      <Box alignItems="start" display="flex" height="150vh" justifyContent="center" width={1}>
        <Box alignItems="center" display="flex" height="75vh" justifyContent="center" width={1}>
          <CircularProgress size="lg">
            <HourglassTop />
          </CircularProgress>
        </Box>
      </Box>
    );
  }

  return (
    <Table size="lg" sx={{ minHeight: eventsDetails && eventsDetails.length < rowsPerPage ? "auto" : "125vh" }}>
      <thead>
        <tr>
          <th style={{ width: "2.5%" }}>
            <Typography level="body-lg">Type</Typography>
          </th>
          <th style={{ width: "20%" }}>
            <Typography level="body-lg">Performers</Typography>
          </th>
          <th style={{ width: "15%" }}>
            <Typography level="body-lg">Venue</Typography>
          </th>
          <th style={{ width: "8.5%" }}>
            <Flexbox justifyContent="space-between">
              <Typography level="body-lg">Date</Typography>
              <IconButton onClick={sorting.toggleSortDate} size="sm" {...styles.sortButton}>
                {sorting.sortDate !== undefined ?
                  sorting.sortDate ?
                    <ArrowUpward fontSize="small" />
                  : <ArrowDownward fontSize="small" />
                : <MoreVert fontSize="small" />}
              </IconButton>
            </Flexbox>
          </th>
          <th style={{ width: "3.5%" }}>
            <Flexbox justifyContent="space-between">
              <Typography level="body-md">$ (lo)</Typography>
              <IconButton onClick={sorting.toggleSortLowestPrice} size="sm" {...styles.sortButton}>
                {sorting.sortLowestPrice !== undefined ?
                  sorting.sortLowestPrice ?
                    <ArrowUpward fontSize="small" />
                  : <ArrowDownward fontSize="small" />
                : <MoreVert fontSize="small" />}
              </IconButton>
            </Flexbox>
          </th>
          <th style={{ width: "3.5%" }}>
            <Flexbox justifyContent="space-between">
              <Typography level="body-md">$ (hi)</Typography>
              <IconButton onClick={sorting.toggleSortHighestPrice} size="sm" {...styles.sortButton}>
                {sorting.sortHighestPrice !== undefined ?
                  sorting.sortHighestPrice ?
                    <ArrowUpward fontSize="small" />
                  : <ArrowDownward fontSize="small" />
                : <MoreVert fontSize="small" />}
              </IconButton>
            </Flexbox>
          </th>
          <th style={{ width: "3.5%" }}>
            <Flexbox justifyContent="space-between">
              <Typography level="body-md">$ (avg)</Typography>
              <IconButton onClick={sorting.toggleSortAvgPrice} size="sm" {...styles.sortButton}>
                {sorting.sortAvgPrice !== undefined ?
                  sorting.sortAvgPrice ?
                    <ArrowUpward fontSize="small" />
                  : <ArrowDownward fontSize="small" />
                : <MoreVert fontSize="small" />}
              </IconButton>
            </Flexbox>
          </th>
          <th style={{ width: "7.5%" }}>
            <Flexbox justifyContent="space-between">
              <Typography level="body-lg">Popularity</Typography>
              <IconButton onClick={sorting.toggleSortPopularity} size="sm" {...styles.sortButton}>
                {sorting.sortPopularity !== undefined ?
                  sorting.sortPopularity ?
                    <ArrowUpward fontSize="small" />
                  : <ArrowDownward fontSize="small" />
                : <MoreVert fontSize="small" />}
              </IconButton>
            </Flexbox>
          </th>
          <th style={{ width: "5%" }}>
            <Typography level="body-lg">Tickets</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {eventsDetails?.map((details, i) => {
          return (
            <m.tr
              animate={{ opacity: [0, 1] }}
              // eslint-disable-next-line react/no-array-index-key
              key={`${details.event.id}${i}`}
              whileHover={{ backgroundColor: "#000007", transition: { duration: 0.5 } }}
            >
              <td>
                <Flexbox>
                  <EventTypeIcon eventType={details.event.type} />
                </Flexbox>
              </td>
              <td>
                <Performers eventDetails={details} />
              </td>
              <td>
                <Venue eventDetails={details} name={details.event.venue?.name} />
              </td>
              <td>
                <DateAndTime datetime={details.event.datetime_local} size="0.9rem" />
              </td>
              <td>
                <Prices event={details.event} type="lo" />
              </td>
              <td>
                <Prices event={details.event} type="hi" />
              </td>
              <td>
                <Prices event={details.event} type="avg" />
              </td>
              <td>
                <Flexbox width="85%">
                  <PopularityBar score={details.event.score} />
                </Flexbox>
              </td>
              <td>
                <TicketsButton url={details.event.url} />
              </td>
            </m.tr>
          );
        })}
      </tbody>
    </Table>
  );
});

const styles = {
  sortButton: {
    sx: {
      "--IconButton-size": "24px",
    },
  },
};
