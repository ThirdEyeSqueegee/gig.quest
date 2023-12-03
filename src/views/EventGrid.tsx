import { Card, CircularProgress, Grid, Typography } from "@mui/joy";
import { useMeasure } from "@uidotdev/usehooks";
import { m } from "framer-motion";
import { memo, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { FaHourglassHalf } from "react-icons/fa6";

import { Flexbox } from "../components/atoms/Flexbox.tsx";
import { DateAndTime } from "../components/molecules/DateAndTime.tsx";
import { EventTypeIcon } from "../components/molecules/EventTypeIcon.tsx";
import { PopularityBar } from "../components/molecules/PopularityBar.tsx";
import { Prices } from "../components/molecules/Prices.tsx";
import { TicketsButton } from "../components/molecules/TicketsButton.tsx";
import { Performers } from "../components/organisms/Performers.tsx";
import { Venue } from "../components/organisms/Venue.tsx";
import { useSeatGeekEvents } from "../hooks/useSeatGeekEvents.ts";
import { usePaginationStore } from "../stores/usePaginationStore.ts";

export const EventGrid = memo(function EventGrid() {
  const rowsPerPage = usePaginationStore((state) => state.rowsPerPage);

  const [ref, { height }] = useMeasure();
  const tableBodyHeight = useRef(0);

  const { details: sgEventsDetails, isLoading: sgLoading } = useSeatGeekEvents();

  useEffect(() => {
    if (height && height > 0) {
      tableBodyHeight.current = height;
    }
  }, [height]);

  useEffect(() => {
    tableBodyHeight.current = 0;
  }, [rowsPerPage]);

  if (sgLoading) {
    return (
      <Flexbox alignItems="start" height={tableBodyHeight.current > 0 ? tableBodyHeight.current : "90vh"} width={1}>
        <Flexbox height={0.7} width={1}>
          <CircularProgress size="lg">
            <FaHourglassHalf />
          </CircularProgress>
        </Flexbox>
      </Flexbox>
    );
  }

  return (
    <Grid ref={ref} {...styles.gridContainer}>
      {sgEventsDetails?.map((details) => {
        return (
          <Grid display="flex" flexDirection="column" key={details.event.id} lg={3} md={6} px={0.5} xs={12}>
            <Card {...styles.gridCard}>
              <Flexbox alignItems="start" justifyContent="space-between">
                <Performers eventDetails={details} />
                <EventTypeIcon eventType={details.event.type} />
              </Flexbox>
              <Flexbox alignItems="end" justifyContent="space-between">
                <Flexbox alignItems="start" flexDirection="column" gap={0.5} justifyContent="end">
                  <Venue venue={details.event.venue} />
                  <DateAndTime datetime={details.event.datetime_local} size="0.75rem" />
                  <Flexbox gap={1}>
                    <Flexbox gap={0.5}>
                      <Typography color="neutral" fontSize="0.725rem">
                        lo:
                      </Typography>
                      <Prices stats={details.event.stats} type="lo" />
                    </Flexbox>
                    <Flexbox gap={0.5}>
                      <Typography color="neutral" fontSize="0.725rem">
                        hi:
                      </Typography>
                      <Prices stats={details.event.stats} type="hi" />
                    </Flexbox>
                    <Flexbox gap={0.5}>
                      <Typography color="neutral" fontSize="0.725rem">
                        avg:
                      </Typography>
                      <Prices stats={details.event.stats} type="avg" />
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
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: {
      flex: 1,
      justifyContent: "space-between",
      p: 1,
    },
    whileHover: isMobile ? null : { boxShadow: "#555555 0 0 5px", transition: { duration: 0.05 } },
  },
  gridContainer: {
    container: true,
    mt: isMobile ? 0 : 1,
    spacing: 1,
    width: 1,
  },
};
