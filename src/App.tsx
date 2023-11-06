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
import { useGeolocation, useOrientation } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import TypeIt from "typeit-react";
import { Events, Performer, SpotifyResult } from "./Interfaces";
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

  const [{ events, meta }, setEvents] = useState<Events>({});
  const [aMap, setAMap] = useState<Map<string, SpotifyResult>>();

  const [sortDate, setSortDate] = useState<boolean | undefined>(true);
  const [sortPopularity, setSortPopularity] = useState<boolean>();

  const [location, setLocation] = useState<{
    city: string | undefined;
    state: string | undefined;
  }>();

  const { type: orientation } = useOrientation();
  const {
    loading,
    latitude: lat,
    longitude: lon,
  } = useGeolocation({ enableHighAccuracy: true });

  useEffect(() => {
    (async () => {
      await getSpotifyToken();
    })();
  }, []);

  useEffect(() => {
    setEvents({});

    (async () => {
      if (loading) return;

      const events = await getEvents(
        page,
        rowsPerPage,
        range,
        filter,
        {
          sortDate,
          sortPopularity,
        },
        lat,
        lon,
      );
      setEvents(events);

      setLocation({
        city: events.meta?.geolocation?.city,
        state: events.meta?.geolocation?.state,
      });

      const artistMap = new Map<string, SpotifyResult>();
      for (const e of events.events!) {
        if (e.type === "concert") {
          await Promise.all(
            e.performers!.map(async (p: Performer) => {
              const details = await searchArtist(p.name!);
              artistMap.set(p.name!, details);
            }),
          );
        }
      }

      setAMap(artistMap);
    })();
  }, [
    page,
    range,
    rowsPerPage,
    filter,
    sortDate,
    sortPopularity,
    lat,
    lon,
    loading,
  ]);

  return (
    <Box p={isMobile ? 1 : 2}>
      <Card sx={{ alignItems: "center", p: 1 }}>
        <Typography level="h1">
          <TypeIt>gig.quest</TypeIt>
        </Typography>
        <Box display="flex">
          <LocationOn fontSize="small" color="error" />
          <Typography level="body-sm">
            {location ? (
              `${location.city}, ${location.state} (${range})`
            ) : (
              <Typography>...</Typography>
            )}
          </Typography>
        </Box>
        <CardContent sx={{ width: "100%", alignItems: "center" }}>
          {loading ? (
            <Box
              display="flex"
              flexDirection="column"
              height="67vh"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <CircularProgress size="lg">
                <LocationOn color="error" />
              </CircularProgress>
              <Typography level="body-sm">Waiting for location...</Typography>
            </Box>
          ) : orientation.includes("landscape") ? (
            <EventTable
              events={events}
              artistMap={aMap}
              sortDate={sortDate}
              setSortDate={setSortDate}
              sortPopularity={sortPopularity}
              setSortPopularity={setSortPopularity}
              setPage={setPage}
            />
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
            eventCount={meta?.total}
            filter={filter}
            setFilter={setFilter}
          />
        </CardContent>
        <Tooltip arrow title="Source" variant="soft">
          <IconButton
            size="sm"
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.25rem",
              "&:hover": {
                transform: "scale(1.25)",
                transition: "all 0.15s ease-out",
              },
            }}
          >
            <Link
              color="neutral"
              href="https://github.com/ThirdEyeSqueegee/gig.quest"
              overlay
              target="_blank"
              rel="noopener"
            >
              <GitHub />
            </Link>
          </IconButton>
        </Tooltip>
      </Card>
    </Box>
  );
}
