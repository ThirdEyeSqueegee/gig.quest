import { LocalActivity } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { ArtistDetails, IEvent } from "./Interfaces";
import { Performers } from "./Performers";
import { setIcon } from "./SetIcon";

export const EventStack = (props: {
  events: IEvent[];
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
  notFound: boolean;
  getArtistDetails: (artistName: string) => Promise<ArtistDetails>;
}) => {
  return (
    <Stack width="100%">
      {props.events.length > 0 ? (
        props.events.map((event) => {
          return (
            <Card size="sm" sx={{ mx: 1, mb: 1 }}>
              <Performers
                performers={event.performers!}
                eventType={event.type!}
                getArtistDetails={props.getArtistDetails}
              />
              <Link
                fontSize="0.75rem"
                href={`https://www.google.com/maps/search/${event.venue?.name?.replaceAll(
                  " ",
                  "+"
                )}`}
                target="_blank"
                rel="noopener"
              >
                {event.venue?.name}
              </Link>
              <CardContent>
                {new Date(`${event.datetime_utc!}+00:00`).toLocaleString(
                  "en-US",
                  {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
                <Box position="absolute" top="0.75rem" right="0.75rem">
                  {setIcon(event.type!)}
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  position="absolute"
                  bottom="0.75rem"
                  right="0.75rem"
                  alignItems="center"
                >
                  <LinearProgress
                    determinate
                    variant="solid"
                    color={
                      event.score! > 0.66
                        ? "success"
                        : event.score! > 0.5
                        ? "primary"
                        : event.score! > 0.25
                        ? "warning"
                        : "danger"
                    }
                    value={event.score! * 100}
                    sx={{ mb: 1, width: "80%" }}
                  />
                  <Button
                    size="sm"
                    variant="outlined"
                    startDecorator={<LocalActivity />}
                  >
                    <Link
                      target="_blank"
                      rel="noopener"
                      href={event.url}
                      underline="none"
                      overlay
                    >
                      Tickets
                    </Link>
                  </Button>
                </Box>
                <Typography level="body-sm">
                  {event.stats?.lowest_price
                    ? `$${event.stats.lowest_price} - $${event.stats.highest_price}`
                    : "N/A"}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      ) : props.notFound ? (
        <Typography alignSelf="center">
          No events found. Try increasing the search radius.
        </Typography>
      ) : (
        <CircularProgress
          color="neutral"
          size="lg"
          sx={{ alignSelf: "center" }}
        />
      )}
    </Stack>
  );
};
