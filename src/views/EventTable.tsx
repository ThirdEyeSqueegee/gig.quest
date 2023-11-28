import { ArrowDownward, ArrowUpward, HourglassTop, MoreVert } from "@mui/icons-material";
import { CircularProgress, IconButton, Table, Typography } from "@mui/joy";
import { useMeasure } from "@uidotdev/usehooks";
import { m } from "framer-motion";
import { memo, useEffect, useRef } from "react";

import { Flexbox } from "../components/atoms/Flexbox.tsx";
import { DateAndTime } from "../components/molecules/DateAndTime.tsx";
import { EventTypeIcon } from "../components/molecules/EventTypeIcon.tsx";
import { PopularityBar } from "../components/molecules/PopularityBar.tsx";
import { Prices } from "../components/molecules/Prices.tsx";
import { TicketsButton } from "../components/molecules/TicketsButton.tsx";
import { Performers } from "../components/organisms/Performers.tsx";
import { Venue } from "../components/organisms/Venue.tsx";
import { useEvents } from "../hooks/useEvents.ts";
import { usePaginationStore } from "../stores/usePaginationStore.ts";
import { useSortingStore } from "../stores/useSortingStore.ts";

export const EventTable = memo(function EventTable() {
  const sorting = useSortingStore((state) => state);
  const rowsPerPage = usePaginationStore((state) => state.rowsPerPage);

  const [ref, { height }] = useMeasure();
  const tableBodyHeight = useRef(0);

  const { details: eventsDetails, isLoading } = useEvents();

  useEffect(() => {
    if (height && height > 0) {
      tableBodyHeight.current = height;
    }
  }, [height]);

  useEffect(() => {
    tableBodyHeight.current = 0;
  }, [rowsPerPage]);

  if (isLoading) {
    return (
      <Flexbox alignItems="start" height={tableBodyHeight.current > 0 ? tableBodyHeight.current : "90vh"} width={1}>
        <Flexbox height={0.7} width={1}>
          <CircularProgress size="lg">
            <HourglassTop />
          </CircularProgress>
        </Flexbox>
      </Flexbox>
    );
  }

  return (
    <Table component={m.table} layout ref={ref} size="lg">
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
              // eslint-disable-next-line react/no-array-index-key
              key={`${details.event.id}${i}`}
              {...styles.tr}
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
      "&:hover": { backgroundColor: "transparent" },
      "--IconButton-size": "1.5rem",
    },
  },
  tr: {
    animate: { opacity: [0, 1] },
    layout: true,
    whileHover: { backgroundColor: "#000007", transition: { duration: 0.5 } },
  },
};
