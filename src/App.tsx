import loadable from "@loadable/component";
import { Card, Divider, IconButton, Link } from "@mui/joy";
import { useDebounce } from "@uidotdev/usehooks";
import { LazyMotion, domMax, m } from "framer-motion";
import { memo, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { FiGithub } from "react-icons/fi";

import { Flexbox } from "./components/atoms/Flexbox.tsx";
import { useLocationStore } from "./stores/useLocationStore.ts";
import { usePaginationStore } from "./stores/usePaginationStore.ts";
import { useSearchStore } from "./stores/useSearchStore.ts";
import { useViewStore } from "./stores/useViewStore.ts";

const HelpButton = loadable(() => import("./components/molecules/HelpButton.tsx"), {
  resolveComponent: (component) => component.HelpButton,
  ssr: false,
});
const Footer = loadable(() => import("./components/organisms/Footer.tsx"), {
  resolveComponent: (component) => component.Footer,
  ssr: false,
});
const Header = loadable(() => import("./components/organisms/Header.tsx"), {
  resolveComponent: (component) => component.Header,
  ssr: false,
});
const EventGrid = loadable(() => import("./views/EventGrid.tsx"), {
  resolveComponent: (component) => component.EventGrid,
  ssr: false,
});
const EventTable = loadable(() => import("./views/EventTable.tsx"), {
  resolveComponent: (component) => component.EventTable,
  ssr: false,
});

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
            <IconButton aria-label="GitHub repo button" sx={styles.githubButton}>
              <FiGithub fontSize="1.5rem" />
              <Link aria-label="GitHub repo link" href="https://github.com/ThirdEyeSqueegee/gig.quest" overlay />
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
