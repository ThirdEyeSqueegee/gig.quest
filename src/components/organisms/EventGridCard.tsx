import { Card, Grid, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";

// eslint-disable-next-line perfectionist/sort-named-imports
import { isSGMusicEventType, type SGEventDetails } from "../../api/interfaces/SeatGeek.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { DateAndTime } from "../molecules/DateAndTime.tsx";
import { EventTypeIcon } from "../molecules/EventTypeIcon.tsx";
import { PopularityBar } from "../molecules/PopularityBar.tsx";
import { Prices } from "../molecules/Prices.tsx";
import { TicketsButton } from "../molecules/TicketsButton.tsx";
import { ConcertPerformers } from "./ConcertPerformers.tsx";
import { Venue } from "./Venue.tsx";

export const EventGridCard = memo(function EventGridCard(props: { details?: SGEventDetails }) {
  const { details } = props;

  return (
    <Grid {...styles.grid}>
      <Card {...styles.gridCard}>
        <Flexbox alignItems="start" gap={1} justifyContent="space-between">
          {details?.event.type && isSGMusicEventType(details.event.type) ?
            <ConcertPerformers eventDetails={details} />
          : <Typography>{details?.event.short_title}</Typography>}
          <EventTypeIcon eventType={details?.event.type} />
        </Flexbox>
        <Flexbox alignItems="end" gap={1} justifyContent="space-between">
          <Flexbox alignItems="start" flexDirection="column" gap={0.5} justifyContent="end">
            <Venue venue={details?.event.venue} />
            <DateAndTime datetime={details?.event.datetime_local} />
            <Flexbox gap={1}>
              <Flexbox gap={0.5}>
                <Typography color="neutral" fontSize="xs">
                  lo:
                </Typography>
                <Prices stats={details?.event.stats} type="lo" />
              </Flexbox>
              <Flexbox gap={0.5}>
                <Typography color="neutral" fontSize="xs">
                  hi:
                </Typography>
                <Prices stats={details?.event.stats} type="hi" />
              </Flexbox>
              <Flexbox gap={0.5}>
                <Typography color="neutral" fontSize="xs">
                  avg:
                </Typography>
                <Prices stats={details?.event.stats} type="avg" />
              </Flexbox>
            </Flexbox>
          </Flexbox>
          <Flexbox flexDirection="column" gap={1} justifyContent="end">
            <Flexbox width={1}>
              <PopularityBar score={details?.event.score} />
            </Flexbox>
            <TicketsButton url={details?.event.url} />
          </Flexbox>
        </Flexbox>
      </Card>
    </Grid>
  );
});

const styles = {
  grid: {
    component: m.div,
    display: "flex",
    flexDirection: "column",
    layout: true,
    lg: 3,
    md: 6,
    px: 0.5,
    xs: 12,
  },
  gridCard: {
    animate: { opacity: [0, 1] },
    component: m.div,
    layout: true,
    minWidth: "100%",
    sx: { flex: 1, justifyContent: "space-between", p: 1 },
    whileHover: isMobile ? null : { boxShadow: "#555555 0 0 5px", transition: { duration: 0.05 } },
  },
} as const;
