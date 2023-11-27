import { HourglassTop } from "@mui/icons-material";
import { Card, CircularProgress, Grid, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";

import { EventDetails } from "../Interfaces.ts";
import { DateAndTime } from "../components/atoms/DateAndTime.tsx";
import { EventTypeIcon } from "../components/atoms/EventTypeIcon.tsx";
import { Flexbox } from "../components/atoms/Flexbox.tsx";
import { PopularityBar } from "../components/atoms/PopularityBar.tsx";
import { Prices } from "../components/atoms/Prices.tsx";
import { TicketsButton } from "../components/atoms/TicketsButton.tsx";
import { Performers } from "../components/molecules/Performers.tsx";
import { Venue } from "../components/molecules/Venue.tsx";

export const EventGrid = memo(function EventGrid(props: { eventsDetails?: EventDetails[]; isLoading: boolean }) {
  const { eventsDetails, isLoading } = props;

  if (isLoading) {
    return (
      <Flexbox alignItems="start" height="150vh" width={1}>
        <Flexbox height="75vh" width={1}>
          <CircularProgress size="lg">
            <HourglassTop />
          </CircularProgress>
        </Flexbox>
      </Flexbox>
    );
  }

  return (
    <Grid container mt={isMobile ? 0 : 1} spacing={1} width={1}>
      {eventsDetails?.map((details, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Grid display="flex" flexDirection="column" key={`${details.event.id}${i}`} lg={3} md={6} px={0.5} xs={12}>
            <Card {...styles.gridCard}>
              <Flexbox alignItems="start" justifyContent="space-between">
                <Performers eventDetails={details} />
                <EventTypeIcon eventType={details.event.type} />
              </Flexbox>
              <Flexbox alignItems="end" justifyContent="space-between">
                <Flexbox alignItems="start" flexDirection="column" gap={0.5} justifyContent="end">
                  <Venue eventDetails={details} name={details.event.venue?.name} />
                  <DateAndTime datetime={details.event.datetime_local} size="0.75rem" />
                  <Flexbox gap={1}>
                    <Flexbox gap={0.5}>
                      <Typography color="neutral" fontSize="0.725rem">
                        lo:
                      </Typography>
                      <Prices event={details.event} type="lo" />
                    </Flexbox>
                    <Flexbox gap={0.5}>
                      <Typography color="neutral" fontSize="0.725rem">
                        hi:
                      </Typography>
                      <Prices event={details.event} type="hi" />
                    </Flexbox>
                    <Flexbox gap={0.5}>
                      <Typography color="neutral" fontSize="0.725rem">
                        avg:
                      </Typography>
                      <Prices event={details.event} type="avg" />
                    </Flexbox>
                  </Flexbox>
                </Flexbox>
                <Flexbox flexDirection="column" gap={1} justifyContent="end">
                  <Flexbox width={1}>
                    <PopularityBar score={details.event.score} />
                  </Flexbox>
                  <TicketsButton url={details.event.url} />
                </Flexbox>
              </Flexbox>
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
    whileHover: isMobile ? null : { boxShadow: "#555555 0 0 5px", transition: { duration: 0.05 } },
  },
};
