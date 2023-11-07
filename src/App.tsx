import { Adsense } from "@ctrl/react-adsense";
import { GitHub, GridView, LocationOn, TableRows } from "@mui/icons-material";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  Link,
  Switch,
  Tooltip,
  Typography,
} from "@mui/joy";
import {
  useDebounce,
  useGeolocation,
  useOrientation,
} from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import TypeIt from "typeit-react";
import { Events, SpotifyResult } from "./Interfaces";
import { getEvents } from "./api/SeatGeek";
import { getSpotifyToken, searchArtist } from "./api/Spotify";
import { EventGrid } from "./components/EventGrid";
import { EventStack } from "./components/EventStack";
import { EventTable } from "./components/EventTable";
import Footer from "./components/Footer";
import { SearchInput } from "./components/SearchInput";
import { tokenizePerformers } from "./utilities/TokenizePerformers";

export default function App() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [range, setRange] = useState("5mi");
  const [filter, setFilter] = useState([""]);

  const [sortDate, setSortDate] = useState<boolean | undefined>(true);
  const [sortPopularity, setSortPopularity] = useState<boolean>();

  const [{ events, meta }, setEvents] = useState<Events>({});
  const [aMap, setAMap] = useState<Map<string, SpotifyResult>>();

  const [tableView, setTableView] = useState(true);
  const [rowOptions, setRowOptions] = useState([10, 20, 30]);

  const [searchTerm, setSearchTerm] = useState("");
  const debSearchTerm = useDebounce(searchTerm, 500);

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
        debSearchTerm,
      );
      setEvents(events);

      setLocation({
        city: events.meta?.geolocation?.city,
        state: events.meta?.geolocation?.state,
      });

      const artistMap = new Map<string, SpotifyResult>();
      for (const e of events.events!) {
        if (e.type === "concert") {
          const { tokens } = tokenizePerformers(e.performers, e.type);
          await Promise.all(
            tokens.map(async (t: string) => {
              const details = await searchArtist(t);
              artistMap.set(t, details);
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
    loading,
    tableView,
    debSearchTerm,
  ]);

  const handleViewChange = () => {
    if (tableView) {
      setRowsPerPage(16);
      setRowOptions([16, 32, 48]);
    } else {
      setRowsPerPage(10);
      setRowOptions([10, 20, 30]);
    }
    setTableView(!tableView);
    setPage(1);
  };

  return (
    <Box p={isMobile ? 1 : 2}>
      <Card
        sx={{
          alignItems: "center",
          p: 1,
          height: orientation.includes("portrait") ? "auto" : "87.5vh",
          minHeight: orientation.includes("portrait") ? "100vh" : "87.5vh",
        }}
      >
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
        {isMobile && !loading && (
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
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
          tableView ? (
            <EventTable
              events={events}
              artistMap={aMap}
              sortDate={sortDate}
              setSortDate={setSortDate}
              sortPopularity={sortPopularity}
              setSortPopularity={setSortPopularity}
              setPage={setPage}
              lat={lat}
              lon={lon}
            />
          ) : (
            <EventGrid events={events} artistMap={aMap} lat={lat} lon={lon} />
          )
        ) : (
          <EventStack events={events} artistMap={aMap} lat={lat} lon={lon} />
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
          rowOptions={rowOptions}
        />
        {!isMobile && !loading && (
          <Box
            display="flex"
            sx={{
              position: "absolute",
              top: "4rem",
              right: "0.5rem",
            }}
            gap={3}
          >
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Tooltip
              title={`Switch to ${tableView ? "grid" : "table"} view`}
              variant="soft"
            >
              <Switch
                color="primary"
                variant="soft"
                size="lg"
                onChange={handleViewChange}
                startDecorator={<TableRows fontSize="small" />}
                endDecorator={<GridView fontSize="small" />}
              />
            </Tooltip>
          </Box>
        )}
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
      <Adsense
        client="ca-pub-8710006741230025"
        slot="6426321909"
        format="fluid"
      />
    </Box>
  );
}
