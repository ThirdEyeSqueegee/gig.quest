import { ArrowDownward, ArrowUpward, HourglassTop, MoreVert } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Table, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";

import { EventDetails } from "../Interfaces.ts";
import { usePagination, useSorting } from "../State.ts";
import { DateAndTime } from "../components/DateAndTime.tsx";
import { EventTypeIcon } from "../components/EventTypeIcon.tsx";
import { Performers } from "../components/Performers.tsx";
import { PopularityBar } from "../components/PopularityBar.tsx";
import { Prices } from "../components/Prices.tsx";
import { TicketsButton } from "../components/TicketsButton.tsx";
import { Venue } from "../components/Venue.tsx";

export const EventTable = memo(function EventTable(props: { eventsDetails?: EventDetails[]; isLoading?: boolean }) {
  const { eventsDetails, isLoading } = props;

  const pagination = usePagination(state => state);
  const sorting = useSorting(state => state);

  if (isLoading) {
    return (
      <Box alignItems="start" display="flex" height={1200} justifyContent="center" width={1}>
        <Box alignItems="center" display="flex" height="75vh" justifyContent="center" width={1}>
          <CircularProgress size="lg">
            <HourglassTop />
          </CircularProgress>
        </Box>
      </Box>
    );
  }

  return (
    <Table size="lg" sx={{ minHeight: eventsDetails && eventsDetails.length < pagination.rowsPerPage ? "auto" : "125vh" }}>
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
            <Box alignItems="center" display="flex" justifyContent="space-between">
              <Typography level="body-lg">Date</Typography>
              <IconButton
                onClick={() => sorting.toggleSortDate()}
                size="sm"
                sx={{
                  "--IconButton-size": "24px",
                }}
              >
                {sorting.sortDate !== undefined ? (
                  sorting.sortDate ? (
                    <ArrowUpward fontSize="small" />
                  ) : (
                    <ArrowDownward fontSize="small" />
                  )
                ) : (
                  <MoreVert fontSize="small" />
                )}
              </IconButton>
            </Box>
          </th>
          <th style={{ width: "3.5%" }}>
            <Box alignItems="center" display="flex" justifyContent="space-between">
              <Typography level="body-md">$ (lo)</Typography>
              <IconButton
                onClick={() => sorting.toggleSortLowestPrice()}
                size="sm"
                sx={{
                  "--IconButton-size": "24px",
                }}
              >
                {sorting.sortLowestPrice !== undefined ? (
                  sorting.sortLowestPrice ? (
                    <ArrowUpward fontSize="small" />
                  ) : (
                    <ArrowDownward fontSize="small" />
                  )
                ) : (
                  <MoreVert fontSize="small" />
                )}
              </IconButton>
            </Box>
          </th>
          <th style={{ width: "3.5%" }}>
            <Box alignItems="center" display="flex" justifyContent="space-between">
              <Typography level="body-md">$ (hi)</Typography>
              <IconButton
                onClick={() => sorting.toggleSortHighestPrice()}
                size="sm"
                sx={{
                  "--IconButton-size": "24px",
                }}
              >
                {sorting.sortHighestPrice !== undefined ? (
                  sorting.sortHighestPrice ? (
                    <ArrowUpward fontSize="small" />
                  ) : (
                    <ArrowDownward fontSize="small" />
                  )
                ) : (
                  <MoreVert fontSize="small" />
                )}
              </IconButton>
            </Box>
          </th>
          <th style={{ width: "3.5%" }}>
            <Box alignItems="center" display="flex" justifyContent="space-between">
              <Typography level="body-md">$ (avg)</Typography>
              <IconButton
                onClick={() => sorting.toggleSortAvgPrice()}
                size="sm"
                sx={{
                  "--IconButton-size": "24px",
                }}
              >
                {sorting.sortAvgPrice !== undefined ? (
                  sorting.sortAvgPrice ? (
                    <ArrowUpward fontSize="small" />
                  ) : (
                    <ArrowDownward fontSize="small" />
                  )
                ) : (
                  <MoreVert fontSize="small" />
                )}
              </IconButton>
            </Box>
          </th>
          <th style={{ width: "7.5%" }}>
            <Box alignItems="center" display="flex" justifyContent="space-between">
              <Typography level="body-lg">Popularity</Typography>
              <IconButton
                onClick={() => sorting.toggleSortPopularity()}
                size="sm"
                sx={{
                  "--IconButton-size": "24px",
                }}
              >
                {sorting.sortPopularity !== undefined ? (
                  sorting.sortPopularity ? (
                    <ArrowUpward fontSize="small" />
                  ) : (
                    <ArrowDownward fontSize="small" />
                  )
                ) : (
                  <MoreVert fontSize="small" />
                )}
              </IconButton>
            </Box>
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
                <Box alignItems="center" display="flex">
                  <EventTypeIcon eventType={details.event.type} />
                </Box>
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
                <Box width="85%">
                  <PopularityBar score={details.event.score} />
                </Box>
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
