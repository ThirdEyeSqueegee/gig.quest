import { ArrowDownward, ArrowUpward, HourglassTop, MoreVert } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Table, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { Location } from "../Interfaces";
import { getEvents } from "../api/API";
import { DateAndTime } from "../components/DateAndTime";
import { EventTypeIcon } from "../components/EventTypeIcon";
import { Performers } from "../components/Performers";
import { PopularityBar } from "../components/PopularityBar";
import { Prices } from "../components/Prices";
import { TicketsButton } from "../components/TicketsButton";
import { Venue } from "../components/Venue";
import { PaginationContext } from "../contexts/PaginationContext";
import { SortingContext } from "../contexts/SortingContext";

export const EventTable = (props: { geo?: Location; searchTerm?: string }) => {
  const { props: pagination } = useContext(PaginationContext);
  const { props: sorting, setter: setSorting } = useContext(SortingContext);

  const { data: eventsDetailsAndMeta, isLoading } = useSWRImmutable(
    props.geo ? ["eventsDetails", pagination, sorting, props.geo, pagination.page, props.searchTerm] : null,
    ([, pag, sor, geo, page, term]) => (props.searchTerm ? getEvents(pag, sor, geo, page, term) : getEvents(pag, sor, geo, page)),
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="72.5vh">
        <CircularProgress size="lg">
          <HourglassTop />
        </CircularProgress>
      </Box>
    );
  }

  return (
    <Table size="lg" sx={{ minHeight: "125vh" }}>
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
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography level="body-lg">Date</Typography>
              <IconButton
                size="sm"
                onClick={() =>
                  setSorting({
                    ...sorting,
                    sortDate: !sorting.sortDate,
                    sortPopularity: undefined,
                    sortLowestPrice: undefined,
                    sortHighestPrice: undefined,
                    sortAvgPrice: undefined,
                  })
                }
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
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography level="body-md">$ (lo)</Typography>
              <IconButton
                size="sm"
                onClick={() =>
                  setSorting({
                    ...sorting,
                    sortDate: undefined,
                    sortPopularity: undefined,
                    sortLowestPrice: !sorting.sortLowestPrice,
                    sortHighestPrice: undefined,
                    sortAvgPrice: undefined,
                  })
                }
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
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography level="body-md">$ (hi)</Typography>
              <IconButton
                size="sm"
                onClick={() =>
                  setSorting({
                    ...sorting,
                    sortDate: undefined,
                    sortPopularity: undefined,
                    sortLowestPrice: undefined,
                    sortHighestPrice: !sorting.sortHighestPrice,
                    sortAvgPrice: undefined,
                  })
                }
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
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography level="body-md">$ (avg)</Typography>
              <IconButton
                size="sm"
                onClick={() =>
                  setSorting({
                    ...sorting,
                    sortDate: undefined,
                    sortPopularity: undefined,
                    sortLowestPrice: undefined,
                    sortHighestPrice: undefined,
                    sortAvgPrice: !sorting.sortAvgPrice,
                  })
                }
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
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography level="body-lg">Popularity</Typography>
              <IconButton
                size="sm"
                onClick={() =>
                  setSorting({
                    ...sorting,
                    sortPopularity: !sorting.sortPopularity,
                    sortDate: undefined,
                    sortLowestPrice: undefined,
                    sortHighestPrice: undefined,
                    sortAvgPrice: undefined,
                  })
                }
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
        {eventsDetailsAndMeta?.details.map((details, i) => {
          return (
            <m.tr key={i} animate={{ opacity: [0, 1] }} whileHover={{ backgroundColor: "#000007", transition: { duration: 0.5 } }}>
              <td>
                <Box display="flex" alignItems="center">
                  <EventTypeIcon eventType={details.event.type} />
                </Box>
              </td>
              <td>
                <Performers eventDetails={details} />
              </td>
              <td>
                <Venue name={details.event.venue?.name} eventDetails={details} geo={props.geo} />
              </td>
              <td>
                <Typography fontSize="0.9rem">
                  <DateAndTime datetime={details.event.datetime_local} />
                </Typography>
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
                  <PopularityBar event={details.event} />
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
};
