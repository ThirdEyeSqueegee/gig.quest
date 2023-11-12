import { GitHub } from "@mui/icons-material";
import { Box, Card, Divider, IconButton, Link } from "@mui/joy";
import {
  useDebounce,
  useIsFirstRender,
  useWindowSize,
} from "@uidotdev/usehooks";
import { motion } from "framer-motion";
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
  const [tableView, setTableView] = useState(!isMobile);

  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    rowsPerPage: !isMobile && !tableView ? 20 : 12,
    range: "5mi",
    filter: [],
    sortDate: true,
    sortPopularity: undefined,
    rowCountOptions: !isMobile && !tableView ? [20, 24, 48] : [12, 24, 48],
    tableView: tableView,
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

  const handleChangeView = () => {
    setTableView(!tableView);
    setPagination({
      ...pagination,
      page: 1,
      rowsPerPage: !isMobile && tableView ? 20 : 12,
      rowCountOptions: !isMobile && tableView ? [20, 24, 48] : [12, 24, 48],
    });
  };

  const { data: eventsDetailsAndMeta } = useSWRImmutable(
    geo ? ["eventsDetails", pagination, geo] : null,
    ([, p, g]) => getEvents(p, g),
    { keepPreviousData: true },
  );

  return (
    <PaginationContext.Provider
      value={{ props: pagination, setter: setPagination }}
    >
      <Box p={isMobile ? 1 : 2}>
        <Card
          sx={{
            alignItems: "center",
            height: isMobile ? "auto" : "95vh",
            minHeight: "95vh",
            px: isMobile ? 1.5 : 2,
            pt: 0.5,
          }}
          component={motion.div}
          animate={{ scaleY: [0, 1] }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Header
            width={width}
            height={height}
            eventsDetailsAndMeta={eventsDetailsAndMeta}
            setSearchTerm={setSearchTerm}
            tableView={tableView}
            handleChangeView={handleChangeView}
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
            tableView ? (
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
    </PaginationContext.Provider>
  );
}
