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
import useSWR from "swr";
import TypeIt from "typeit-react";
import { EventDetails, Location, Meta } from "./Interfaces";
import { getEvents } from "./api/SeatGeek";
import { searchArtist } from "./api/Spotify";
import Footer from "./components/Footer";
import { SearchInput } from "./components/SearchInput";
import { PagingContext, PagingProps } from "./contexts/PagingContext";
import { tokenizePerformers } from "./utilities/TokenizePerformers";
import { EventGrid } from "./views/EventGrid";
import { EventStack } from "./views/EventStack";
import { EventTable } from "./views/EventTable";

export default function App() {
  const [tableView, setTableView] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const debSearchTerm = useDebounce(searchTerm, 500);

  const [geo, setGeo] = useState<Location>();

  const isFirstRender = useIsFirstRender();
  const { type: orientation } = useOrientation();

  const [paging, setPaging] = useState<PagingProps>({
    page: 1,
    rowsPerPage: 10,
    range: "5mi",
    filter: [""],
    sortDate: true,
    sortPopularity: undefined,
    rowOptions: [10, 25, 50],
  });

  const [eventsDetails, setEventsDetails] = useState<EventDetails[]>([]);
  const [meta, setMeta] = useState<Meta>();

  if (isFirstRender) {
    navigator.geolocation.getCurrentPosition(
      (p: GeolocationPosition) =>
        setGeo({ lat: p.coords.latitude, lon: p.coords.longitude }),
      null,
      {
        enableHighAccuracy: true,
      },
    );
    if (localStorage.getItem("spotifyToken")) {
      localStorage.removeItem("spotifyToken");
    }
  }

  const {
    data: newEvents,
    error,
    isLoading,
  } = useSWR(
    geo ? ["events", paging, geo.lat, geo.lon, debSearchTerm] : null,
    ([url, p, lat, lon, query]) => getEvents(p, lat, lon, query),
  );

  useEffect(() => {
    if (eventsDetails && eventsDetails.length > 0 && debSearchTerm !== "") {
      setPaging({ ...paging, page: 1 });
    }

    (async () => {
      if (geo === undefined) return;

      if (isLoading) return;

      setMeta(newEvents!.meta);

      const eventsDetailsBuffer: EventDetails[] = [];

      for (const e of newEvents!.events!) {
        const { is1v1, tokens } = tokenizePerformers(e.performers, e.type);
        const details: EventDetails = {
          event: e,
          is1v1: false,
          artistDetails: [],
        };
        details.is1v1 = is1v1;
        await Promise.all(
          tokens.map(async (t: string) => {
            if (e.type === "concert") {
              const searchResult = await searchArtist(t);
              details.artistDetails.push({
                name: t,
                result: searchResult,
              });
            } else {
              details.artistDetails.push({
                name: t,
                result: {},
              });
            }
          }),
        );
        eventsDetailsBuffer.push(details);
      }
      setEventsDetails(eventsDetailsBuffer);
    })();
  }, [paging, geo, tableView, debSearchTerm, isLoading]);

  const handleViewChange = () => {
    if (tableView) {
      setPaging({
        ...paging,
        rowsPerPage: 16,
        rowOptions: [16, 32, 48],
        page: 1,
      });
    } else {
      setPaging({
        ...paging,
        rowsPerPage: 10,
        rowOptions: [10, 25, 50],
        page: 1,
      });
    }
    setTableView(!tableView);
  };

  return (
    <PagingContext.Provider value={{ props: paging, setter: setPaging }}>
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
          <Typography
            level="h1"
            component={motion.span}
            whileHover={{
              scale: 1.1,
              rotateZ: [0, -3, 3, -3, 3, 0],
              transition: { duration: 0.5 },
            }}
          >
            <TypeIt>gig.quest</TypeIt>
          </Typography>
          <Box display="flex">
            <LocationOn
              fontSize="small"
              color="error"
              component={motion.svg}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
            />
            <Typography level="body-sm">
              {meta && meta.geolocation ? (
                `${meta.geolocation.city}, ${meta.geolocation.state} (${paging.range})`
              ) : (
                <Typography>...</Typography>
              )}
            </Typography>
          </Box>
          {isMobile && geo && (
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
          {geo === undefined ? (
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
              <EventTable eventsDetails={eventsDetails} location={geo} />
            ) : (
              <EventGrid eventsDetails={eventsDetails} location={geo} />
            )
          ) : (
            <EventStack eventsDetails={eventsDetails} location={geo} />
          )}
          <Divider />
          <Footer eventCount={meta?.total} />
          {!isMobile && geo && (
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
    </PagingContext.Provider>
  );
}
