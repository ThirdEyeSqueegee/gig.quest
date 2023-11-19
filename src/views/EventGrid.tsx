import { HourglassTop } from "@mui/icons-material";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useContext } from "react";
import { isMobile } from "react-device-detect";
import useSWRImmutable from "swr/immutable";
import { Location } from "../Interfaces.ts";
import { getEvents } from "../api/API.ts";
import { DateAndTime } from "../components/DateAndTime.tsx";
import { EventTypeIcon } from "../components/EventTypeIcon.tsx";
import { Performers } from "../components/Performers.tsx";
import { PopularityBar } from "../components/PopularityBar.tsx";
import { Prices } from "../components/Prices.tsx";
import { TicketsButton } from "../components/TicketsButton.tsx";
import { Venue } from "../components/Venue.tsx";
import { PaginationContext } from "../contexts/PaginationContext.ts";
import { SortingContext } from "../contexts/SortingContext.ts";

export const EventGrid = memo(function EventGrid(props: { geo?: Location; searchTerm?: string }) {
  const { props: pagination } = useContext(PaginationContext);
  const { props: sorting } = useContext(SortingContext);

  const { data: eventsDetailsAndMeta, isLoading } = useSWRImmutable(
    props.geo ? ["eventsDetails", pagination, sorting, props.geo, pagination.page, props.searchTerm] : null,
    ([, pag, sor, geo, page, term]) => (props.searchTerm ? getEvents(pag, sor, geo, page, term) : getEvents(pag, sor, geo, page)),
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="start" width={1} height={1200}>
        <Box display="flex" justifyContent="center" alignItems="center" width={1} height="75vh">
          <CircularProgress size="lg">
            <HourglassTop />
          </CircularProgress>
        </Box>
      </Box>
    );
  }

  return (
    <Grid container spacing={1} width={1}>
      {eventsDetailsAndMeta?.details.map((details, i) => {
        return (
          <Grid key={i} lg={3} md={6} xs={12} px={0.5} display="flex" flexDirection="column">
            <Card key={i} {...styles.gridCard}>
              <Box display="flex" justifyContent="space-between" alignItems="start">
                <Performers eventDetails={details} />
                <EventTypeIcon eventType={details.event.type} />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="end">
                <Box display="flex" flexDirection="column" justifyContent="end" gap={0}>
                  <Venue name={details.event.venue?.name} eventDetails={details} geo={props.geo} />
                  <DateAndTime datetime={details.event.datetime_local} size="0.75rem" />
                  <Box display="flex" gap={1} alignItems="center">
                    <Box display="flex" gap={0.5} alignItems="center">
                      <Typography fontSize="0.725rem" color="neutral">
                        $ (lo):
                      </Typography>
                      <Prices event={details.event} type="lo" />
                    </Box>
                    <Box display="flex" gap={0.5} alignItems="center">
                      <Typography fontSize="0.725rem" color="neutral">
                        $ (hi):
                      </Typography>
                      <Prices event={details.event} type="hi" />
                    </Box>
                    <Box display="flex" gap={0.5} alignItems="center">
                      <Typography fontSize="0.725rem" color="neutral">
                        $ (avg):
                      </Typography>
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
});

const styles = {
  gridCard: {
    sx: {
      p: 1,
      justifyContent: "space-between",
      flex: 1,
    },
    component: m.div,
    animate: {
      opacity: [0, 1],
      transition: { duration: 0.25 },
    },
    whileHover: isMobile ? null : { boxShadow: "#555577 0 0 7px", transition: { duration: 0.1 } },
  },
};
