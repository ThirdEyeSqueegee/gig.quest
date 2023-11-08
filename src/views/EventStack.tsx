import { Card, CardContent, Chip, Link, Stack, Typography } from "@mui/joy";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { EventDetails, Location } from "../Interfaces";
import { EventTypeIcon } from "../components/EventTypeIcon";
import { Performers } from "../components/Performers";
import { PopularityBar } from "../components/PopularityBar";
import { Prices } from "../components/Prices";
import { TicketsButton } from "../components/TicketsButton";
import { distance } from "../utilities/GreatCircleDistance";

export const EventStack = (props: {
  eventsDetails: EventDetails[];
  lat: number | null;
  lon: number | null;
}) => {
  return (
    <Stack
      width="100%"
      spacing={1}
      component={motion.div}
      layout
      transition={{ duration: 0.25 }}
    >
      {props.eventsDetails?.map((e, i) => {
        const venueLoc = e.event.venue?.location;
        const myLoc: Location = { lat: props.lat, lon: props.lon };

        return (
          <Card key={i} sx={{ p: 1 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="start"
              gap={1}
            >
              <Performers eventDetails={e} />
              <EventTypeIcon eventType={e.event.type} />
            </Box>
            <CardContent
              sx={{
                justifyContent: "space-between",
                alignItems: "end",
                flexDirection: "row",
              }}
            >
              <Box>
                <Box display="flex" gap={1} alignItems="start">
                  <Typography fontSize="0.85rem">
                    <Link
                      href={`https://www.google.com/maps/search/${e.event.venue?.name
                        ?.replaceAll(" - ", " ")
                        .replaceAll(" ", "+")}`}
                      rel="noopener"
                      target="_blank"
                    >
                      {e.event.venue?.name}
                    </Link>
                  </Typography>
                  <Chip size="sm">{`${distance(myLoc, venueLoc)} mi`}</Chip>
                </Box>
                <Typography fontSize="0.85rem">
                  {e.event.datetime_local
                    ? new Date(e.event.datetime_local).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })
                    : ""}
                </Typography>
                <Typography level="body-sm">
                  <Prices eventDetails={e} />
                </Typography>
              </Box>
              <Box>
                <PopularityBar e={e.event} />
                <TicketsButton url={e.event.url} />
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};
