import { LocalActivity } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { Box } from "@mui/system";
import { Event, SpotifyResult } from "../Interfaces";
import { EventTypeIcon } from "./EventTypeIcon";
import { Performers } from "./Performers";
import { PopularityBar } from "./PopularityBar";

export const EventStack = (props: {
  events: Event[] | undefined;
  artistMap: Map<string, SpotifyResult> | undefined;
}) => {
  return (
    <Stack spacing={1} width="100%">
      {props.events ? (
        props.events.map((e, i) => {
          return (
            <Card key={i} sx={{ width: "100%", p: 1 }}>
              <Box display="flex" justifyContent="space-between" gap={1}>
                <Performers
                  performers={e.performers}
                  eventType={e.type}
                  artistMap={props.artistMap}
                />
                <EventTypeIcon eventType={e.type} />
              </Box>
              <CardContent sx={{ width: "70%" }}>
                <Typography fontSize="0.85rem">
                  <Link
                    href={`https://www.google.com/maps/search/${e.venue?.name
                      ?.replaceAll(" - ", " ")
                      .replaceAll(" ", "+")}`}
                    rel="noopener"
                    target="_blank"
                  >
                    {e.venue?.name}
                  </Link>
                </Typography>
                <Typography fontSize="0.85rem">
                  {e.datetime_local
                    ? new Date(e.datetime_local).toLocaleString("en-US", {
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
                  {e.stats?.lowest_price
                    ? `$${e.stats?.lowest_price} - $${e.stats?.highest_price}`
                    : "¯\\_(ツ)_/¯"}
                </Typography>
              </CardContent>
              <Box position="absolute" bottom="0.6rem" right="0.5rem">
                <PopularityBar e={e} />
                <Button
                  size="sm"
                  startDecorator={<LocalActivity />}
                  variant="outlined"
                  sx={{ mt: 1 }}
                >
                  <Link
                    href={e.url}
                    overlay
                    rel="noopener"
                    target="_blank"
                    underline="none"
                  >
                    Tickets
                  </Link>
                </Button>
              </Box>
            </Card>
          );
        })
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <CircularProgress size="lg" />
        </Box>
      )}
    </Stack>
  );
};
