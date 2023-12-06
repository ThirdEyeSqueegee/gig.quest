import { Card, Divider, IconButton, Link } from "@mui/joy";
import { useDebounce } from "@uidotdev/usehooks";
import { LazyMotion, domMax, m } from "framer-motion";
import { memo, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { FiGithub } from "react-icons/fi";

import { Flexbox } from "./components/atoms/Flexbox.tsx";
import { HelpButton } from "./components/molecules/HelpButton.tsx";
import { Footer } from "./components/organisms/Footer.tsx";
import { Header } from "./components/organisms/Header.tsx";
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
  const location = useLocationStore((state) => state.location);

  const debSearchTerm = useDebounce(searchTerm, 750);

  useEffect(() => {
    firstPage();
    setDebSearchTerm(debSearchTerm);
  }, [debSearchTerm, firstPage, setDebSearchTerm]);

  useEffect(() => firstPage(), [firstPage, location]);

  return (
    <LazyMotion features={domMax} strict>
      <Flexbox p={isMobile ? 1 : 2}>
        <Card {...styles.mainCard}>
          <Flexbox {...styles.headerBox}>
            <Header />
            <IconButton sx={styles.githubButton}>
              <FiGithub fontSize="1.5rem" />
              <Link href="https://github.com/ThirdEyeSqueegee/gig.quest" overlay />
            </IconButton>
            <HelpButton />
          </Flexbox>
          {tableView ?
            <EventTable />
          : <EventGrid />}
          <Divider />
          <Footer />
        </Card>
      </Flexbox>
    </LazyMotion>
  );
});

const styles = {
  githubButton: {
    "&:hover, &:active": { backgroundColor: "transparent" },
    position: "absolute",
    right: "0.2rem",
    top: "0.25rem",
  },
  headerBox: {
    position: "sticky",
    ...(!isMobile && {
      sx: { backdropFilter: "blur(0.5rem)", zIndex: 5 },
      top: 0,
    }),
    width: 1,
  },
  mainCard: {
    animate: { opacity: [0, 1], transition: { duration: 1 } },
    component: m.div,
    layout: true,
    sx: {
      alignItems: "center",
      gap: isMobile ? 1 : 0,
      overflowAnchor: "none",
      p: 0,
      width: 1,
    },
  },
} as const;
