import { HourglassTop } from "@mui/icons-material";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { m } from "framer-motion";
import { useContext } from "react";
import { isMobile } from "react-device-detect";
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

export const EventGrid = (props: { geo?: Location; searchTerm?: string }) => {
  const { props: pagination } = useContext(PaginationContext);
  const { props: sorting } = useContext(SortingContext);

  const { width, height } = useWindowSize();

  const { data: eventsDetailsAndMeta, isLoading } = useSWRImmutable(
    props.geo ? ["eventsDetails", pagination, sorting, props.geo, pagination.page, props.searchTerm] : null,
    ([, pag, sor, geo, page, term]) => (props.searchTerm ? getEvents(pag, sor, geo, page, term) : getEvents(pag, sor, geo, page)),
  );

  if (isLoading) {
    return (
      <Grid container spacing={1} height="100%" {...(width! > height! && { overflow: "auto" })} alignItems="center">
        <CircularProgress size="lg">
          <HourglassTop />
        </CircularProgress>
      </Grid>
    );
  }

  return (
    <Grid container spacing={1} height="100%" {...(width! > height! && { overflow: "auto" })}>
      {eventsDetailsAndMeta?.details.map((details, i) => {
        return (
          <Grid key={i} lg={3} md={6} xs={12} px={0.5} display="flex" flexDirection="column" minWidth={isMobile ? "auto" : "29rem"}>
            <Card key={i} {...styles.gridCard}>
              <Box display="flex" justifyContent="space-between" alignItems="start">
                <Performers eventDetails={details} />
                <EventTypeIcon eventType={details.event.type} />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="end">
                <Box display="flex" flexDirection="column" justifyContent="end" gap={0}>
                  <Venue name={details.event.venue?.name} eventDetails={details} geo={props.geo} />
                  <Typography fontSize="0.75rem">
                    <DateAndTime datetime={details.event.datetime_local} />
                  </Typography>
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
};

const styles = {
  gridCard: {
    sx: {
      p: 1,
      justifyContent: "space-between",
      flexGrow: 1,
      maxHeight: "8rem",
    },
    component: m.div,
    animate: {
      opacity: [0, 1],
      transition: { duration: 0.25 },
    },
    whileHover: isMobile ? { boxShadow: "#555577 0 0 7px", transition: { duration: 0.1 } } : null,
  },
};
