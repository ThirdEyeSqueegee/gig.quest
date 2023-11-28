import { GitHub } from "@mui/icons-material";
import { Box, Card, Divider, IconButton, Link } from "@mui/joy";
import { useDebounce } from "@uidotdev/usehooks";
import { LazyMotion, domMax, m } from "framer-motion";
import { memo, useEffect } from "react";
import { isMobile } from "react-device-detect";

import { LocationLoading } from "./components/atoms/LocationLoading.tsx";
import { Footer } from "./components/molecules/Footer.tsx";
import { Header } from "./components/molecules/Header.tsx";
import { useLocationStore } from "./stores/useLocationStore.ts";
import { usePaginationStore } from "./stores/usePaginationStore.ts";
import { useSearchStore } from "./stores/useSearchStore.ts";
import { useViewStore } from "./stores/useViewStore.ts";
import { EventGrid } from "./views/EventGrid.tsx";
import { EventTable } from "./views/EventTable.tsx";

export const App = memo(function App() {
  const firstPage = usePaginationStore((state) => state.firstPage);
  const tableView = useViewStore((state) => state.tableView);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setDebSearchTerm = useSearchStore((state) => state.setDebSearchTerm);
  const location = useLocationStore((state) => state);

  const debSearchTerm = useDebounce(searchTerm, 750);

  if (!location.location) {
    navigator.geolocation.getCurrentPosition(
      (p: GeolocationPosition) => {
        location.setLocation({ lat: p.coords.latitude, lon: p.coords.longitude });
      },
      null,
      {
        enableHighAccuracy: true,
      },
    );
  }

  useEffect(() => {
    firstPage();
    setDebSearchTerm(debSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debSearchTerm]);

  return (
    <LazyMotion features={domMax} strict>
      <Box p={isMobile ? 1 : 2}>
        <Card {...styles.mainCard}>
          <Box {...(!isMobile && { position: "sticky", sx: { backdropFilter: "blur(8px)", zIndex: 5 }, top: 0, width: 1 })}>
            <Header />
            <IconButton sx={{ "&:hover": { backgroundColor: "transparent" }, position: "absolute", right: "0.2rem", top: "0.25rem" }}>
              <GitHub />
              <Link href="https://github.com/ThirdEyeSqueegee/gig.quest" overlay />
            </IconButton>
          </Box>
          {location.location ?
            tableView ?
              <EventTable />
            : <EventGrid />
          : <LocationLoading />}
          <Divider />
          <Footer />
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
