import { GitHub } from "@mui/icons-material";
import { Box, Card, Divider, IconButton, Link } from "@mui/joy";
import { useDebounce, useIsFirstRender } from "@uidotdev/usehooks";
import { LazyMotion, domMax, m } from "framer-motion";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import useSWRImmutable from "swr/immutable";

import { Location, PaginationProps, SortingProps } from "./Interfaces.ts";
import { getEvents } from "./api/API.ts";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
import { LocationLoading } from "./components/LocationLoading.tsx";
import { PaginationContext } from "./contexts/PaginationContext.ts";
import { SortingContext } from "./contexts/SortingContext.ts";
import { ViewContext } from "./contexts/ViewContext.ts";
import { EventGrid } from "./views/EventGrid.tsx";
import { EventTable } from "./views/EventTable.tsx";

export default function App() {
  const [pagination, setPagination] = useState<PaginationProps>({
    filter: [],
    page: 1,
    range: "5mi",
    rowCountOptions: [24, 36, 48],
    rowsPerPage: 24,
  });

  const [sorting, setSorting] = useState<SortingProps>({
    sortAvgPrice: undefined,
    sortDate: true,
    sortHighestPrice: undefined,
    sortLowestPrice: undefined,
    sortPopularity: undefined,
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
        <ViewContext.Provider value={{ setter: setTableView, state: tableView }}>
          <LazyMotion features={domMax} strict>
            <Box p={isMobile ? 1 : 2}>
              <Card {...styles.mainCard}>
                <Box {...(!isMobile && { position: "sticky", sx: { backdropFilter: "blur(15px)", zIndex: 5 }, top: 0, width: 1 })}>
                  <Header eventsDetailsAndMeta={eventsDetailsAndMeta} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <IconButton sx={{ "&:hover": { backgroundColor: "transparent" }, position: "absolute", right: "0.5rem", top: "0.5rem" }}>
                    <GitHub />
                    <Link href="https://github.com/ThirdEyeSqueegee/gig.quest" overlay />
                  </IconButton>
                </Box>
                {geo ? (
                  tableView ? (
                    <EventTable geo={geo} key={pagination.page} searchTerm={debSearchTerm} />
                  ) : (
                    <EventGrid geo={geo} key={pagination.page} searchTerm={debSearchTerm} />
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
    animate: { scaleY: [0, 1] },
    component: m.div,
    sx: {
      alignItems: "center",
      gap: isMobile ? 1 : 0,
      p: 0,
    },
    transition: { duration: 0.5, type: "spring" },
  },
};
