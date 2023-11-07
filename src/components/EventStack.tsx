import { LocalActivity } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { Box } from "@mui/system";
import { Event, Location, SpotifyResult } from "../Interfaces";
import { distance } from "../utilities/GreatCircleDistance";
import { EventTypeIcon } from "./EventTypeIcon";
import { Performers } from "./Performers";
import { PopularityBar } from "./PopularityBar";

export const EventStack = (props: {
  events: Event[] | undefined;
  artistMap: Map<string, SpotifyResult> | undefined;
  lat: number | null;
  lon: number | null;
}) => {
  return (
    <Stack width="100%" spacing={1}>
      {props.events?.map((e, i) => {
        const venueLoc = e.venue?.location;
        const myLoc: Location = { lat: props.lat, lon: props.lon };

        return (
          <Card key={i} sx={{ p: 1 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="start"
              gap={1}
            >
              <Performers
                performers={e.performers}
                eventType={e.type}
                artistMap={props.artistMap}
              />
              <Box display="flex" gap={1}>
                <Chip size="sm" sx={{ maxHeight: "24px" }}>
                  {e.type?.replaceAll("_", " ")}
                </Chip>
                <EventTypeIcon eventType={e.type} />
              </Box>
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
                      href={`https://www.google.com/maps/search/${e.venue?.name
                        ?.replaceAll(" - ", " ")
                        .replaceAll(" ", "+")}`}
                      rel="noopener"
                      target="_blank"
                    >
                      {e.venue?.name}
                    </Link>
                  </Typography>
                  <Chip size="sm">{`${distance(myLoc, venueLoc)} mi`}</Chip>
                </Box>
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
              </Box>
              <Box>
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
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};
