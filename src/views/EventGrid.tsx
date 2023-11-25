import { HourglassTop } from "@mui/icons-material";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";

import { EventDetails } from "../Interfaces.ts";
import { DateAndTime } from "../components/DateAndTime.tsx";
import { EventTypeIcon } from "../components/EventTypeIcon.tsx";
import { Performers } from "../components/Performers.tsx";
import { PopularityBar } from "../components/PopularityBar.tsx";
import { Prices } from "../components/Prices.tsx";
import { TicketsButton } from "../components/TicketsButton.tsx";
import { Venue } from "../components/Venue.tsx";

export const EventGrid = memo(function EventGrid(props: { eventsDetails?: EventDetails[]; isLoading?: boolean }) {
  const { eventsDetails, isLoading } = props;

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
    <Grid container spacing={1} width={1}>
      {eventsDetails?.map((details, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Grid display="flex" flexDirection="column" key={`${details.event.id}${i}`} lg={3} md={6} px={0.5} xs={12}>
            <Card {...styles.gridCard}>
              <Box alignItems="start" display="flex" justifyContent="space-between">
                <Performers eventDetails={details} />
                <EventTypeIcon eventType={details.event.type} />
              </Box>
              <Box alignItems="end" display="flex" justifyContent="space-between">
                <Box display="flex" flexDirection="column" gap={0} justifyContent="end">
                  <Venue eventDetails={details} name={details.event.venue?.name} />
                  <DateAndTime datetime={details.event.datetime_local} size="0.75rem" />
                  <Box alignItems="center" display="flex" gap={1}>
                    <Box alignItems="center" display="flex" gap={0.5}>
                      <Typography color="neutral" fontSize="0.725rem">
                        $ (lo):
                      </Typography>
                      <Prices event={details.event} type="lo" />
                    </Box>
                    <Box alignItems="center" display="flex" gap={0.5}>
                      <Typography color="neutral" fontSize="0.725rem">
                        $ (hi):
                      </Typography>
                      <Prices event={details.event} type="hi" />
                    </Box>
                    <Box alignItems="center" display="flex" gap={0.5}>
                      <Typography color="neutral" fontSize="0.725rem">
                        $ (avg):
                      </Typography>
                      <Prices event={details.event} type="avg" />
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="column" gap={1} justifyContent="end">
                  <PopularityBar score={details.event.score} />
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
    animate: {
      opacity: [0, 1],
      transition: { duration: 0.25 },
    },
    component: m.div,
    sx: {
      flex: 1,
      justifyContent: "space-between",
      p: 1,
    },
    whileHover: isMobile ? null : { boxShadow: "#555577 0 0 7px", transition: { duration: 0.1 } },
  },
};
