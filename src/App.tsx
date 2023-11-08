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
  useIsFirstRender,
  useOrientation,
} from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import TypeIt from "typeit-react";
import { Events, Location, SpotifyResult } from "./Interfaces";
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
  const [rowOptions, setRowOptions] = useState([10, 25, 50]);

  const [searchTerm, setSearchTerm] = useState("");
  const debSearchTerm = useDebounce(searchTerm, 500);

  const { type: orientation } = useOrientation();

  const [geo, setGeo] = useState<Location>({ lat: null, lon: null });

  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (events && debSearchTerm !== "" && events.length > 0) {
      setPage(1);
    }

    if (isFirstRender) {
      navigator.geolocation.getCurrentPosition(
        (p: GeolocationPosition) =>
          setGeo({ lat: p.coords.latitude, lon: p.coords.longitude }),
        null,
        {
          enableHighAccuracy: true,
        },
      );
    }

    (async () => {
      if (geo.lat === null) return;

      await getSpotifyToken();

      const newEvents = await getEvents(
        page,
        rowsPerPage,
        range,
        filter,
        {
          sortDate,
          sortPopularity,
        },
        geo.lat,
        geo.lon,
        debSearchTerm,
      );
      setEvents(newEvents);

      const artistMap = new Map<string, SpotifyResult>();
      for (const e of newEvents.events!) {
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
    geo,
    tableView,
    debSearchTerm,
  ]);

  const handleViewChange = () => {
    if (tableView) {
      setRowsPerPage(16);
      setRowOptions([16, 32, 48]);
    } else {
      setRowsPerPage(10);
      setRowOptions([10, 25, 50]);
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
        component={motion.div}
        animate={{ opacity: [0, 1], transition: { duration: 1 } }}
      >
        <Typography level="h1">
          <TypeIt>gig.quest</TypeIt>
        </Typography>
        <Box display="flex">
          <LocationOn fontSize="small" color="error" />
          <Typography level="body-sm">
            {geo.lat && meta && meta.geolocation ? (
              `${meta.geolocation.city}, ${meta.geolocation.state} (${range})`
            ) : (
              <Typography>...</Typography>
            )}
          </Typography>
        </Box>
        {isMobile && geo.lat && (
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
        {geo.lat === null ? (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <CircularProgress
              size="lg"
              component={motion.span}
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.25] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                repeatType: "reverse",
              }}
            >
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
              lat={geo.lat}
              lon={geo.lon}
            />
          ) : (
            <EventGrid
              events={events}
              artistMap={aMap}
              lat={geo.lat}
              lon={geo.lon}
            />
          )
        ) : (
          <EventStack
            events={events}
            artistMap={aMap}
            lat={geo.lat}
            lon={geo.lon}
          />
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
        {!isMobile && geo.lat && (
          <Box
            display="flex"
            sx={{
              position: "absolute",
              top: "3.5rem",
              right: "0.5rem",
            }}
            gap={3}
            component={motion.div}
            animate={{ opacity: [0, 1], transition: { duration: 0.5 } }}
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
            component={motion.button}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.25rem",
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
