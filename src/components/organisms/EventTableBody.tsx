import { CircularProgress } from "@mui/joy";
import { useMeasure, useWindowSize } from "@uidotdev/usehooks";
import { m } from "framer-motion";
import { memo, useEffect, useRef } from "react";
import { FaHourglassHalf } from "react-icons/fa6";

import { useSeatGeekEvents } from "../../hooks/useSeatGeekEvents.ts";
import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { DateAndTime } from "../molecules/DateAndTime.tsx";
import { EventTypeIcon } from "../molecules/EventTypeIcon.tsx";
import { PopularityBar } from "../molecules/PopularityBar.tsx";
import { Prices } from "../molecules/Prices.tsx";
import { TicketsButton } from "../molecules/TicketsButton.tsx";
import { Performers } from "./Performers.tsx";
import { Venue } from "./Venue.tsx";

export const EventTableBody = memo(function EventTableBody() {
  const rowsPerPage = usePaginationStore((state) => state.rowsPerPage);

  const [ref, { height, width }] = useMeasure();
  const tableBodyHeight = useRef(0);
  const tableBodyWidth = useRef(0);

  const { width: viewportWidth } = useWindowSize();

  const { details: sgEventsDetails, isLoading: sgLoading } = useSeatGeekEvents();

  useEffect(() => {
    if (height && height > 0) {
      tableBodyHeight.current = height;
    }
    if (width && width > 0) {
      tableBodyWidth.current = width;
    }
  }, [height, width]);

  useEffect(() => {
    tableBodyHeight.current = 0;
    tableBodyWidth.current = 0;
  }, [rowsPerPage]);

  if (sgLoading) {
    return (
      <m.tbody style={{ height: sgEventsDetails && sgEventsDetails.length >= rowsPerPage ? tableBodyHeight.current : "auto" }}>
        <m.tr>
          <m.td>
            <Flexbox
              alignItems="start"
              height={tableBodyHeight.current > 0 ? tableBodyHeight.current : "125vh"}
              width={tableBodyWidth.current > 0 ? tableBodyWidth.current : (viewportWidth ?? 1920) - 32}
            >
              <Flexbox height={0.5}>
                <CircularProgress size="lg">
                  <FaHourglassHalf fontSize="1.5rem" />
                </CircularProgress>
              </Flexbox>
            </Flexbox>
          </m.td>
        </m.tr>
      </m.tbody>
    );
  }

  return (
    <m.tbody layout ref={ref} style={{ height: sgEventsDetails && sgEventsDetails.length >= rowsPerPage ? tableBodyHeight.current : "auto" }}>
      {sgEventsDetails?.map((details) => {
        return (
          <m.tr key={details.event.id} layout {...styles.tr}>
            <m.td>
              <Flexbox>
                <EventTypeIcon eventType={details.event.type} />
              </Flexbox>
            </m.td>
            <m.td>
              <Performers eventDetails={details} />
            </m.td>
            <m.td>
              <Venue venue={details.event.venue} />
            </m.td>
            <m.td>
              <DateAndTime datetime={details.event.datetime_local} />
            </m.td>
            <m.td>
              <Prices stats={details.event.stats} type="lo" />
            </m.td>
            <m.td>
              <Prices stats={details.event.stats} type="hi" />
            </m.td>
            <m.td>
              <Prices stats={details.event.stats} type="avg" />
            </m.td>
            <m.td>
              <Flexbox width={0.9}>
                <PopularityBar score={details.event.score} />
              </Flexbox>
            </m.td>
            <m.td>
              <TicketsButton url={details.event.url} />
            </m.td>
          </m.tr>
        );
      })}
    </m.tbody>
  );
});

const styles = {
  tr: {
    animate: { opacity: [0, 1] },
    whileHover: { backgroundColor: "#000007", transition: { duration: 0.5 } },
  },
};
