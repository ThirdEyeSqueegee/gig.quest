import { Box, Card, Grid, Typography } from "@mui/joy";
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

export const EventGrid = (props: { geo?: Location }) => {
  const pagination = useContext(PaginationContext);

  const { data: eventsDetailsAndMeta } = useSWRImmutable(
    props.geo ? ["eventsDetails", pagination.props, props.geo] : null,
    ([, p, g]) => getEvents(p, g),
  );

  return (
    <Grid
      container
      spacing={2}
      height="100%"
      {...(!isMobile && { overflow: "auto" })}
    >
      {eventsDetailsAndMeta?.details.map((details, i) => {
        return (
          <Grid key={i} lg={3} md={6} xs={12}>
            <Card>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Performers eventDetails={details} />
                <EventTypeIcon eventType={details.event.type} />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="end"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="end"
                  gap={0}
                >
                  <Typography level="body-sm">
                    <Venue name={details.event.venue?.name} />
                  </Typography>
                  <Typography fontSize="0.75rem" color="neutral">
                    <DateAndTime datetime={details.event.datetime_local} />
                  </Typography>
                  <Typography fontSize="0.725rem">
                    <Prices event={details.event} />
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="end"
                  gap={1}
                >
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
