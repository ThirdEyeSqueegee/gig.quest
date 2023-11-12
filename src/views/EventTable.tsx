import { ArrowDownward, ArrowUpward, MoreVert } from "@mui/icons-material";
import { Box, IconButton, Sheet, Table, Typography } from "@mui/joy";
import { motion } from "framer-motion";
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

export const EventTable = (props: { geo?: Location; searchTerm?: string }) => {
  const { props: pagination, setter: setPagination } =
    useContext(PaginationContext);

  const { data: eventsDetailsAndMeta } = useSWRImmutable(
    props.geo
      ? ["eventsDetails", pagination, props.geo, props.searchTerm]
      : null,
    ([, p, g, s]) => (props.searchTerm ? getEvents(p, g, s) : getEvents(p, g)),
  );

  return (
    <Sheet sx={{ overflow: "auto", height: "100%" }}>
      <Table size="lg">
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
            <th style={{ width: "8%" }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography level="body-lg">Date</Typography>
                <IconButton
                  size="sm"
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      sortDate: !pagination.sortDate,
                      sortPopularity: undefined,
                    })
                  }
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
            <th style={{ width: "5%" }}>
              <Typography level="body-lg">Prices</Typography>
            </th>
            <th style={{ width: "7.5%" }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography level="body-lg">Popularity</Typography>
                <IconButton
                  size="sm"
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      sortPopularity: !pagination.sortPopularity,
                      sortDate: undefined,
                    })
                  }
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
              <motion.tr key={i} animate={{ opacity: [0, 1] }}>
                <td>
                  <Box display="flex" alignItems="center">
                    <EventTypeIcon eventType={details.event.type} />
                  </Box>
                </td>
                <td>
                  <Performers eventDetails={details} />
                </td>
                <td>
                  <Venue
                    name={details.event.venue?.name}
                    eventDetails={details}
                    geo={props.geo}
                  />
                </td>
                <td>
                  <Typography fontSize="0.9rem">
                    <DateAndTime datetime={details.event.datetime_local} />
                  </Typography>
                </td>
                <td>
                  <Prices event={details.event} />
                </td>
                <td>
                  <Box width="85%">
                    <PopularityBar event={details.event} />
                  </Box>
                </td>
                <td>
                  <TicketsButton url={details.event.url} />
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </Table>
    </Sheet>
  );
};
