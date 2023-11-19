import { GitHub } from "@mui/icons-material";
import { Box, Card, Divider, IconButton, Link } from "@mui/joy";
import { useDebounce, useIsFirstRender } from "@uidotdev/usehooks";
import { LazyMotion, domMax, m } from "framer-motion";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import useSWRImmutable from "swr/immutable";
import { Location, PaginationProps, SortingProps } from "./Interfaces";
import { getEvents } from "./api/API";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LocationLoading } from "./components/LocationLoading";
import { PaginationContext } from "./contexts/PaginationContext";
import { SortingContext } from "./contexts/SortingContext";
import { ViewContext } from "./contexts/ViewContext";
import { EventGrid } from "./views/EventGrid";
import { EventTable } from "./views/EventTable";

export default function App() {
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    rowsPerPage: 24,
    range: "5mi",
    filter: [],
    rowCountOptions: [24, 36, 48],
  });

  const [sorting, setSorting] = useState<SortingProps>({
    sortDate: true,
    sortPopularity: undefined,
    sortLowestPrice: undefined,
    sortHighestPrice: undefined,
    sortAvgPrice: undefined,
  });

  const [tableView, setTableView] = useState(!isMobile);

  const [geo, setGeo] = useState<Location>();

  const [searchTerm, setSearchTerm] = useState("");
  const debSearchTerm = useDebounce(searchTerm, 500);

  if (useIsFirstRender()) {
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

  const { data: eventsDetailsAndMeta } = useSWRImmutable(
    geo ? ["eventsDetails", pagination, sorting, geo, pagination.page] : null,
    ([, pag, sor, g, page]) => getEvents(pag, sor, g, page),
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    setPagination({ ...pagination, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debSearchTerm]);

  return (
    <PaginationContext.Provider value={{ props: pagination, setter: setPagination }}>
      <SortingContext.Provider value={{ props: sorting, setter: setSorting }}>
        <ViewContext.Provider value={{ state: tableView, setter: setTableView }}>
          <LazyMotion strict features={domMax}>
            <Box p={isMobile ? 1 : 2}>
              <Card {...styles.mainCard}>
                <Box {...(!isMobile && { position: "sticky", top: 0, width: "100%", sx: { backdropFilter: "blur(15px)", zIndex: 5 } })}>
                  <Header eventsDetailsAndMeta={eventsDetailsAndMeta} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <IconButton sx={{ position: "absolute", top: "0.5rem", right: "0.5rem", "&:hover": { backgroundColor: "transparent" } }}>
                    <GitHub />
                    <Link href="https://github.com/ThirdEyeSqueegee/gig.quest" overlay />
                  </IconButton>
                </Box>
                {geo ? (
                  tableView ? (
                    <EventTable key={pagination.page} geo={geo} searchTerm={debSearchTerm} />
                  ) : (
                    <EventGrid key={pagination.page} geo={geo} searchTerm={debSearchTerm} />
                  )
                ) : (
                  <LocationLoading />
                )}
                <Divider />
                <Footer eventCount={eventsDetailsAndMeta?.meta.total} />
              </Card>
            </Box>
          </LazyMotion>
        </ViewContext.Provider>
      </SortingContext.Provider>
    </PaginationContext.Provider>
  );
}

const styles = {
  mainCard: {
    sx: {
      alignItems: "center",
      p: 0,
    },
    component: m.div,
    animate: { scaleY: [0, 1] },
    transition: { type: "spring", duration: 0.5 },
  },
};
