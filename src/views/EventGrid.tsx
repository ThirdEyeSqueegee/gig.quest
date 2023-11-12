import { Box, Card, Grid, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { useContext } from "react";
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

export const EventGrid = (props: { geo?: Location; searchTerm?: string }) => {
  const { width, height } = useWindowSize();

  const pagination = useContext(PaginationContext);

  const { data: eventsDetailsAndMeta } = useSWRImmutable(
    props.geo
      ? ["eventsDetails", pagination.props, props.geo, props.searchTerm]
      : null,
    ([, p, g, s]) => (props.searchTerm ? getEvents(p, g, s) : getEvents(p, g)),
  );

  return (
    <Grid
      container
      spacing={1}
      height="100%"
      {...(width! > height! && { overflow: "auto" })}
    >
      {eventsDetailsAndMeta?.details.map((details, i) => {
        return (
          <Grid key={i} lg={3} md={6} xs={12} px={0.5}>
            <Card
              sx={{ p: 1, height: "100%", justifyContent: "space-between" }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
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
                  <Venue
                    name={details.event.venue?.name}
                    eventDetails={details}
                    geo={props.geo}
                  />
                  <Typography fontSize="0.75rem" color="neutral">
                    <DateAndTime datetime={details.event.datetime_local} />
                  </Typography>
                  <Prices event={details.event} />
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
