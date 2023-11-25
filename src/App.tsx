import { GitHub } from "@mui/icons-material";
import { Box, Card, Divider, IconButton, Link } from "@mui/joy";
import { useDebounce, useIsFirstRender } from "@uidotdev/usehooks";
import { LazyMotion, domMax, m } from "framer-motion";
import { isEqual } from "ohash";
import { memo, useEffect } from "react";
import { isMobile } from "react-device-detect";
import useSWR from "swr";

import { useLocation, usePagination, useSearch, useSorting, useView } from "./State.ts";
import { getEvents } from "./api/API.ts";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
import { LocationLoading } from "./components/LocationLoading.tsx";
import { EventGrid } from "./views/EventGrid.tsx";
import { EventTable } from "./views/EventTable.tsx";

export const App = memo(function App() {
  const pagination = usePagination(state => state);
  const sorting = useSorting(state => state);
  const view = useView(state => state);
  const search = useSearch(state => state);
  const location = useLocation(state => state);

  const debSearchTerm = useDebounce(search.searchTerm, 500);

  if (useIsFirstRender()) {
    navigator.geolocation.getCurrentPosition(
      (p: GeolocationPosition) => {
        console.log("Position: ", p);
        location.setLocation({ lat: p.coords.latitude, lon: p.coords.longitude });
      },
      null,
      {
        enableHighAccuracy: true,
      },
    );
  }

  useEffect(() => {
    pagination.firstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debSearchTerm]);

  const { data: eventsDetailsAndMeta, isLoading } = useSWR(
    location.location
      ? [
          "eventsDetails",
          pagination.filter,
          location.location,
          pagination.page,
          pagination.rowsPerPage,
          pagination.range,
          sorting.sortAvgPrice,
          sorting.sortDate,
          sorting.sortHighestPrice,
          sorting.sortLowestPrice,
          sorting.sortPopularity,
          debSearchTerm,
        ]
      : null,
    ([, filter, loc, page, rowsPerPage, range, sortAvgPrice, sortDate, sortHighestPrice, sortLowestPrice, sortPopularity, term]) =>
      getEvents(filter, loc, page, rowsPerPage, range, sortAvgPrice, sortDate, sortHighestPrice, sortLowestPrice, sortPopularity, term),
    {
      compare: isEqual,
      keepPreviousData: true,
    },
  );

  const { details: eventsDetails, meta: meta } = eventsDetailsAndMeta ?? { details: undefined, meta: undefined };

  return (
    <LazyMotion features={domMax} strict>
      <Box p={isMobile ? 1 : 2}>
        <Card {...styles.mainCard}>
          <Box {...(!isMobile && { position: "sticky", sx: { backdropFilter: "blur(10px)", zIndex: 5 }, top: 0, width: 1 })}>
            <Header meta={meta} />
            <IconButton sx={{ "&:hover": { backgroundColor: "transparent" }, position: "absolute", right: "0.5rem", top: "0.5rem" }}>
              <GitHub />
              <Link href="https://github.com/ThirdEyeSqueegee/gig.quest" overlay />
            </IconButton>
          </Box>
          {location.location ? (
            view.tableView ? (
              <EventTable eventsDetails={eventsDetails} isLoading={isLoading} />
            ) : (
              <EventGrid eventsDetails={eventsDetails} isLoading={isLoading} />
            )
          ) : (
            <LocationLoading />
          )}
          <Divider />
          <Footer eventCount={meta?.total} />
        </Card>
      </Box>
    </LazyMotion>
  );
});

const styles = {
  mainCard: {
    animate: { scaleY: [0, 1] },
    component: m.div,
    sx: {
      alignItems: "center",
      gap: isMobile ? 1 : 0,
      overflowAnchor: "none",
      p: 0,
    },
    transition: { duration: 0.5, type: "spring" },
  },
};
