import { HourglassTop } from "@mui/icons-material";
import { Card, CircularProgress, Grid, Typography } from "@mui/joy";
import { useMeasure } from "@uidotdev/usehooks";
import { m } from "framer-motion";
import { memo, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";

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

export const EventGrid = memo(function EventGrid() {
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
    <Grid ref={ref} {...styles.gridContainer}>
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
    layout: true,
    sx: {
      flex: 1,
      justifyContent: "space-between",
      p: 1,
    },
    whileHover: isMobile ? null : { boxShadow: "#555555 0 0 5px", transition: { duration: 0.05 } },
  },
  gridContainer: {
    component: m.div,
    container: true,
    layout: true,
    mt: isMobile ? 0 : 1,
    spacing: 1,
    width: 1,
  },
};
