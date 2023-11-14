import { ArrowDownward, ArrowUpward, MoreVert } from "@mui/icons-material";
import { Box, IconButton, Sheet, Table, Typography } from "@mui/joy";
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

export const EventTable = (props: { geo?: Location; searchTerm?: string; page: number }) => {
  const { props: pagination, setter: setPagination } = useContext(PaginationContext);

  const { data: eventsDetailsAndMeta } = useSWRImmutable(
    props.geo && props.page ? ["eventsDetails", pagination, props.geo, props.page, props.searchTerm] : null,
    ([, p, g, pg, s]) => (props.searchTerm ? getEvents(p, g, pg, s) : getEvents(p, g, pg)),
  );

  return (
    <Sheet sx={{ overflow: "auto", height: "100%" }}>
      <Table size="lg" id="eventTable">
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
                    setPagination({
                      ...pagination,
                      sortDate: !pagination.sortDate,
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
                  {pagination.sortDate !== undefined ? (
                    pagination.sortDate ? (
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
                    setPagination({
                      ...pagination,
                      sortDate: undefined,
                      sortPopularity: undefined,
                      sortLowestPrice: !pagination.sortLowestPrice,
                      sortHighestPrice: undefined,
                      sortAvgPrice: undefined,
                    })
                  }
                  sx={{
                    "--IconButton-size": "24px",
                  }}
                >
                  {pagination.sortLowestPrice !== undefined ? (
                    pagination.sortLowestPrice ? (
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
                    setPagination({
                      ...pagination,
                      sortDate: undefined,
                      sortPopularity: undefined,
                      sortLowestPrice: undefined,
                      sortHighestPrice: !pagination.sortHighestPrice,
                      sortAvgPrice: undefined,
                    })
                  }
                  sx={{
                    "--IconButton-size": "24px",
                  }}
                >
                  {pagination.sortHighestPrice !== undefined ? (
                    pagination.sortHighestPrice ? (
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
                    setPagination({
                      ...pagination,
                      sortDate: undefined,
                      sortPopularity: undefined,
                      sortLowestPrice: undefined,
                      sortHighestPrice: undefined,
                      sortAvgPrice: !pagination.sortAvgPrice,
                    })
                  }
                  sx={{
                    "--IconButton-size": "24px",
                  }}
                >
                  {pagination.sortAvgPrice !== undefined ? (
                    pagination.sortAvgPrice ? (
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
                    setPagination({
                      ...pagination,
                      sortPopularity: !pagination.sortPopularity,
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
                  {pagination.sortPopularity !== undefined ? (
                    pagination.sortPopularity ? (
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
              <m.tr key={i} animate={{ opacity: [0, 1] }}>
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
    </Sheet>
  );
};
