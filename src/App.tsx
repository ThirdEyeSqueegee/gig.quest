import { GitHub } from "@mui/icons-material";
import { Box, Card, Divider, IconButton, Link } from "@mui/joy";
import {
  useDebounce,
  useIsFirstRender,
  useWindowSize,
} from "@uidotdev/usehooks";
import { LazyMotion, domMax, m } from "framer-motion";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import useSWRImmutable from "swr/immutable";
import { Location, PaginationProps } from "./Interfaces";
import { getEvents } from "./api/API";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LocationLoading } from "./components/LocationLoading";
import { PaginationContext } from "./contexts/PaginationContext";
import { EventGrid } from "./views/EventGrid";
import { EventTable } from "./views/EventTable";

export default function App() {
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    rowsPerPage: 12,
    range: "5mi",
    filter: [],
    sortDate: true,
    sortPopularity: undefined,
    sortLowestPrice: undefined,
    sortHighestPrice: undefined,
    sortAvgPrice: undefined,
    rowCountOptions: [12, 24, 36, 48],
    tableView: !isMobile,
  });

  const isFirstRender = useIsFirstRender();

  const [geo, setGeo] = useState<Location>();

  if (isFirstRender) {
    navigator.geolocation.getCurrentPosition(
      (p: GeolocationPosition) => {
        setGeo({ lat: p.coords.latitude, lon: p.coords.longitude });
      },
      null,
      {
        enableHighAccuracy: true,
      },
    );
  }

  const [searchTerm, setSearchTerm] = useState("");
  const debSearchTerm = useDebounce(searchTerm, 500);

  const { width, height } = useWindowSize();

  const { data: eventsDetailsAndMeta } = useSWRImmutable(
    geo ? ["eventsDetails", pagination, geo] : null,
    ([, p, g]) => getEvents(p, g),
    { keepPreviousData: true },
  );

  return (
    <PaginationContext.Provider
      value={{ props: pagination, setter: setPagination }}
    >
      <LazyMotion strict features={domMax}>
        <Box p={isMobile ? 1 : 2}>
          <Card
            sx={{
              alignItems: "center",
              height: isMobile ? "auto" : "95vh",
              minHeight: "95vh",
              px: isMobile ? 1.5 : 2,
              pt: 0.5,
            }}
            component={m.div}
            animate={{ scaleY: [0, 1] }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Header
              width={width}
              height={height}
              eventsDetailsAndMeta={eventsDetailsAndMeta}
              setSearchTerm={setSearchTerm}
            />
            <IconButton
              sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
            >
              <GitHub />
              <Link
                href="https://github.com/ThirdEyeSqueegee/gig.quest"
                overlay
              />
            </IconButton>
            {geo ? (
              pagination.tableView ? (
                <EventTable
                  key={pagination.page}
                  geo={geo}
                  searchTerm={debSearchTerm}
                />
              ) : (
                <EventGrid
                  key={pagination.page}
                  geo={geo}
                  searchTerm={debSearchTerm}
                />
              )
            ) : (
              <LocationLoading />
            )}
            <Divider />
            <Footer eventCount={eventsDetailsAndMeta?.meta.total} />
          </Card>
        </Box>
      </LazyMotion>
    </PaginationContext.Provider>
  );
}
