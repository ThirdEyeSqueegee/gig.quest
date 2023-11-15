import { Box, Card, Grid, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
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

export const EventGrid = (props: { geo?: Location; searchTerm?: string; page: number }) => {
  const { width, height } = useWindowSize();

  const pagination = useContext(PaginationContext);

  const { data: eventsDetailsAndMeta } = useSWRImmutable(
    props.geo ? ["eventsDetails", pagination.props, props.geo, props.page, props.searchTerm] : null,
    ([, p, g, pg, s]) => (props.searchTerm ? getEvents(p, g, pg, s) : getEvents(p, g, pg)),
  );

  return (
    <Grid container spacing={1} height="100%" {...(width! > height! && { overflow: "auto" })}>
      {eventsDetailsAndMeta?.details.map((details, i) => {
        return (
          <Grid key={i} lg={3} md={6} xs={12} px={0.5}>
            <Card
              sx={{ p: 1, height: "100%", justifyContent: "space-between" }}
              component={m.div}
              whileHover={{ boxShadow: "gray 0 0 5px" }}
              transition={{ duration: 0.1 }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="start">
                <Performers eventDetails={details} />
                <EventTypeIcon eventType={details.event.type} />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="end">
                <Box display="flex" flexDirection="column" justifyContent="end" gap={0}>
                  <Venue name={details.event.venue?.name} eventDetails={details} geo={props.geo} />
                  <Typography fontSize="0.75rem" color="neutral">
                    <DateAndTime datetime={details.event.datetime_local} />
                  </Typography>
                  <Box display="flex" gap={1} alignItems="center">
                    <Box display="flex" gap={0.5} alignItems="center">
                      <Typography fontSize="0.725rem">$ (lo):</Typography>
                      <Prices event={details.event} type="lo" />
                    </Box>
                    <Box display="flex" gap={0.5} alignItems="center">
                      <Typography fontSize="0.725rem">$ (hi):</Typography>
                      <Prices event={details.event} type="hi" />
                    </Box>
                    <Box display="flex" gap={0.5} alignItems="center">
                      <Typography fontSize="0.725rem">$ (avg):</Typography>
                      <Prices event={details.event} type="avg" />
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="end" gap={1}>
                  <PopularityBar event={details.event} />
                  <TicketsButton url={details.event.url} />
                </Box>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
