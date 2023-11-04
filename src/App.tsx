import { GitHub, LocationOn } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/joy";
import { useOrientation } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import TypeIt from "typeit-react";
import { getEvents } from "./API/SeatGeek";
import { getSpotifyToken, searchArtist } from "./API/Spotify";
import { TEvents, TSpotifyResult } from "./Types";
import { EventStack } from "./components/EventStack";
import { EventTable } from "./components/EventTable";
import Footer from "./components/Footer";

export default function App() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [range, setRange] = useState("5mi");

  const [events, setEvents] = useState<TEvents>();

  const orientation = useOrientation();

  const [aMap, setAMap] = useState<Map<string, TSpotifyResult>>();

  useEffect(() => {
    (async () => {
      await getSpotifyToken();
      const events = await getEvents(page, rowsPerPage, range);
      setEvents(events);

      const artistMap = new Map<string, TSpotifyResult>();
      for (const e of events.events!) {
        await Promise.all(
          e.performers!.map(async (p) => {
            const details = await searchArtist(p.name!);
            artistMap.set(p.name!, details);
          })
        );
      }

      setAMap(artistMap);
    })();
  }, [page, range, rowsPerPage]);

  return (
    <Box p={isMobile ? 1 : 2}>
      <Card sx={{ alignItems: "center" }}>
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
        <CardContent sx={{ width: "100%" }}>
          {orientation.type.includes("landscape") ? (
            aMap && <EventTable events={events} artistMap={aMap} />
          ) : (
            <EventStack events={events} artistMap={aMap} />
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
          />
        </CardContent>
        <Tooltip arrow title="Source" variant="soft">
          <IconButton
            sx={{ position: "absolute", top: "0.5rem", right: "0.25rem" }}
          >
            <GitHub
              fontSize={
                orientation.type.includes("portrait") ? "medium" : "large"
              }
            />
          </IconButton>
        </Tooltip>
      </Card>
    </Box>
  );
}
