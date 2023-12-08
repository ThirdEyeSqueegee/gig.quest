import loadable from "@loadable/component";
import { CircularProgress, Grid } from "@mui/joy";
import { useMeasure } from "@uidotdev/usehooks";
import { memo, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { FaHourglassHalf } from "react-icons/fa6";

import { Flexbox } from "../components/atoms/Flexbox.tsx";
import { useSeatGeekEvents } from "../hooks/useSeatGeekEvents.ts";
import { usePaginationStore } from "../stores/usePaginationStore.ts";

const EventGridCard = loadable(() => import("../components/organisms/EventGridCard.tsx"), {
  resolveComponent: (component) => component.EventGridCard,
  ssr: false,
});

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
      <Flexbox alignItems="start" height={tableBodyHeight.current > 0 ? tableBodyHeight.current : "125vh"} width={1}>
        <Flexbox height={0.5}>
          <CircularProgress size="lg">
            <FaHourglassHalf fontSize="1.5rem" />
          </CircularProgress>
        </Flexbox>
      </Flexbox>
    );
  }

  return (
    <Grid ref={ref} {...styles.gridContainer}>
      {sgEventsDetails?.map((details) => <EventGridCard details={details} key={details.event.id} />)}
    </Grid>
  );
});

const styles = {
  gridContainer: {
    container: true,
    mt: isMobile ? 0 : 1,
    spacing: 1,
    width: 1,
  },
} as const;
