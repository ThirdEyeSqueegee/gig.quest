import { GitHub, LocationOn } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/joy";
import { useOrientation } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import TypeIt from "typeit-react";
import { TEvents, TSpotifyResult } from "./Types";
import { getEvents } from "./api/SeatGeek";
import { getSpotifyToken, searchArtist } from "./api/Spotify";
import { EventStack } from "./components/EventStack";
import { EventTable } from "./components/EventTable";
import Footer from "./components/Footer";

export default function App() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [range, setRange] = useState("5mi");
  const [filter, setFilter] = useState([""]);

  const [events, setEvents] = useState<TEvents>();
  const [aMap, setAMap] = useState<Map<string, TSpotifyResult>>();

  const orientation = useOrientation();

  useEffect(() => {
    (async () => {
      await getSpotifyToken();
      const events = await getEvents(page, rowsPerPage, range, filter);
      setEvents(events);

      const artistMap = new Map<string, TSpotifyResult>();
      for (const e of events.events!) {
        if (e.type === "concert") {
          await Promise.all(
            e.performers!.map(async (p) => {
              const details = await searchArtist(p.name!);
              artistMap.set(p.name!, details);
            })
          );
        }
      }

      setAMap(artistMap);
    })();
  }, [page, range, rowsPerPage, filter]);

  return (
    <Box p={isMobile ? 1 : 2}>
      <Card sx={{ alignItems: "center", p: 1 }}>
        <Typography
          level="h1"
          mb={orientation.type.includes("portrait") ? 1 : 0}
        >
          <TypeIt>gig.quest</TypeIt>
        </Typography>
        <Box display="flex">
          <LocationOn fontSize="small" color="error" />
          <Typography level="body-sm">
            {events?.meta?.geolocation ? (
              `${events?.meta?.geolocation?.city}, ${events?.meta?.geolocation?.state} (${range})`
            ) : (
              <CircularProgress size="sm" color="danger" />
            )}
          </Typography>
        </Box>
        <CardContent sx={{ width: "100%", alignItems: "center" }}>
          {orientation.type.includes("landscape") ? (
            aMap ? (
              <EventTable events={events} artistMap={aMap} />
            ) : (
              <CircularProgress size="lg" />
            )
          ) : aMap ? (
            <EventStack events={events} artistMap={aMap} />
          ) : (
            <CircularProgress size="lg" />
          )}
          <Divider />
          <Footer
            page={page}
            rowsPerPage={rowsPerPage}
            range={range}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            setRange={setRange}
            eventCount={events?.meta?.total}
            filter={filter}
            setFilter={setFilter}
          />
        </CardContent>
        <Tooltip arrow title="Source" variant="soft">
          <IconButton
            sx={{ position: "absolute", top: "0.5rem", right: "0.25rem" }}
          >
            <Link
              color="neutral"
              href="https://github.com/ThirdEyeSqueegee/gig.quest"
              overlay
              target="_blank"
              rel="noopener"
            >
              <GitHub
                fontSize={
                  orientation.type.includes("portrait") ? "medium" : "large"
                }
              />
            </Link>
          </IconButton>
        </Tooltip>
      </Card>
    </Box>
  );
}
