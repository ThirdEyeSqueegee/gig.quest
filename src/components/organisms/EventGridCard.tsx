import loadable from "@loadable/component";
import { Card, Grid, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";

import type { SGEventDetails } from "../../api/interfaces/SeatGeek.ts";

import { Flexbox } from "../atoms/Flexbox.tsx";

const DateAndTime = loadable(() => import("../molecules/DateAndTime.tsx"), {
  resolveComponent: (component) => component.DateAndTime,
  ssr: false,
});
const EventTypeIcon = loadable(() => import("../molecules/EventTypeIcon.tsx"), {
  resolveComponent: (component) => component.EventTypeIcon,
  ssr: false,
});
const Prices = loadable(() => import("../molecules/Prices.tsx"), {
  resolveComponent: (component) => component.Prices,
  ssr: false,
});
const TicketsButton = loadable(() => import("../molecules/TicketsButton.tsx"), {
  resolveComponent: (component) => component.TicketsButton,
  ssr: false,
});
const Performers = loadable(() => import("../organisms/Performers.tsx"), {
  resolveComponent: (component) => component.Performers,
  ssr: false,
});
const PopularityBar = loadable(() => import("../molecules/PopularityBar.tsx"), {
  resolveComponent: (component) => component.PopularityBar,
  ssr: false,
});
const Venue = loadable(() => import("../organisms/Venue.tsx"), {
  resolveComponent: (component) => component.Venue,
  ssr: false,
});

export const EventGridCard = memo(function EventGridCard(props: { details?: SGEventDetails }) {
  const { details } = props;

  return (
    <Grid display="flex" flexDirection="column" lg={3} md={6} px={0.5} xs={12}>
      <Card {...styles.gridCard}>
        <Flexbox alignItems="start" gap={1} justifyContent="space-between">
          <Performers eventDetails={details} />
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
  gridCard: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { flex: 1, justifyContent: "space-between", p: 1 },
    whileHover: isMobile ? null : { boxShadow: "#555555 0 0 5px", transition: { duration: 0.05 } },
  },
} as const;
