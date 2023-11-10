import { GridView, LocationOn, TableRows } from "@mui/icons-material";
import { Box, Card, Divider, Switch, Tooltip, Typography } from "@mui/joy";
import {
  useDebounce,
  useIsFirstRender,
  useWindowSize,
} from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import useSWRImmutable from "swr/immutable";
import TypeIt from "typeit-react";
import { Location, PaginationProps } from "./Interfaces";
import { getEvents } from "./api/API";
import { Footer } from "./components/Footer";
import { LocationLoading } from "./components/LocationLoading";
import { SearchInput } from "./components/SearchInput";
import { PaginationContext } from "./contexts/PaginationContext";
import { EventGrid } from "./views/EventGrid";
import { EventTable } from "./views/EventTable";

export default function App() {
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    rowsPerPage: isMobile ? 16 : 10,
    range: "5mi",
    filter: [],
    sortDate: true,
    sortPopularity: undefined,
    rowCountOptions: isMobile ? [16, 36, 48] : [10, 25, 50],
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

  const { width, height } = useWindowSize();

  const [tableView, setTableView] = useState(isMobile ? false : true);

  const [searchTerm, setSearchTerm] = useState("");
  const debSearchTerm = useDebounce(searchTerm, 500);

  const handleChangeView = () => {
    setTableView(!tableView);
    setPagination({
      ...pagination,
      page: 1,
      rowsPerPage: tableView ? 16 : 10,
      rowCountOptions: tableView ? [16, 36, 48] : [10, 25, 50],
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
      <Box p={2}>
        <Card
          sx={{ alignItems: "center", height: isMobile ? "auto" : "90vh" }}
          component={motion.div}
          animate={{ scaleY: [0, 1] }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Typography level="h1">
            <TypeIt>gig.quest</TypeIt>
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            width="100%"
            gap={2}
          >
            {width! > height! && <Box display="flex" flex={1} />}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flex={1}
            >
              <LocationOn
                htmlColor="red"
                component={motion.svg}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              <Typography level="body-sm">
                {eventsDetailsAndMeta?.meta?.geolocation?.display_name}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent={width! > height! ? "end" : "center"}
              alignItems="center"
              gap={2}
              flex={1}
            >
              <SearchInput setSearchTerm={setSearchTerm} />
              <Tooltip
                title={`Switch to ${tableView ? "grid" : "table"} view`}
                variant="soft"
                component={motion.div}
                animate={{ opacity: [0, 1] }}
              >
                <Switch
                  size="lg"
                  startDecorator={<TableRows fontSize="small" />}
                  endDecorator={<GridView fontSize="small" />}
                  checked={!tableView}
                  onChange={handleChangeView}
                  slotProps={{
                    thumb: {
                      style: {
                        transition: "0.25s",
                      },
                    },
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
          <Divider />
          {geo ? (
            tableView ? (
              <EventTable
                key={pagination.page}
                geo={geo}
                searchTerm={debSearchTerm}
              />
            ) : (
              <EventGrid key={pagination.page} geo={geo} />
            )
          ) : (
            <LocationLoading />
          )}
          <Divider />
          <Footer />
        </Card>
      </Box>
    </PaginationContext.Provider>
  );
}
