import loadable from "@loadable/component";
import { IconButton, Switch, Tooltip, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";
import { FiGrid } from "react-icons/fi";
import { MdLocationOn, MdTableRows } from "react-icons/md";
import TypeIt from "typeit-react";

import { useSeatGeekEvents } from "../../hooks/useSeatGeekEvents.ts";
import { useLocationStore } from "../../stores/useLocationStore.ts";
import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { useViewStore } from "../../stores/useViewStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";

const SearchInput = loadable(() => import("../molecules/SearchInput.tsx"), {
  resolveComponent: (component) => component.SearchInput,
  ssr: false,
});

export const Header = memo(function Header() {
  const range = usePaginationStore((state) => state.range);
  const firstPage = usePaginationStore((state) => state.firstPage);
  const setRowsPerPage = usePaginationStore((state) => state.setRowsPerPage);
  const view = useViewStore((state) => state);
  const location = useLocationStore((state) => state);

  const { meta } = useSeatGeekEvents();
  const geolocation = meta?.geolocation;

  const { height, width } = useWindowSize();
  const isWidescreen = width && height ? width / height > 4 / 3 : undefined;

  const handleSetLocation = () => {
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
  };

  return (
    <Flexbox borderBottom={1} borderColor="neutral.outlinedBorder" flexDirection="column" pb={isMobile ? 0 : 1} width={1}>
      <Flexbox flexDirection="column" gap={isMobile ? 1 : 0}>
        <Typography {...styles.headerText} fontSize="2.5rem">
          <TypeIt options={{ cursor: false }}>gig.quest</TypeIt>
        </Typography>
        <Flexbox>
          <IconButton
            aria-label="Location button"
            onClick={handleSetLocation}
            sx={{ "--IconButton-size": "1rem", "&:hover, &:active": { backgroundColor: "transparent" }, px: 0 }}
          >
            <Tooltip open={!location.location} {...styles.locationTooltip}>
              <Flexbox {...styles.locationIconBox}>
                <MdLocationOn color="red" fontSize="1.75rem" />
              </Flexbox>
            </Tooltip>
          </IconButton>
          <Typography level="body-sm" sx={{ userSelect: "none" }}>
            {`${
              geolocation ? geolocation.display_name
              : range === "51mi" ? "Everywhere"
              : "..."
            } (${range === "51mi" ? "\u221E mi" : range})`}
          </Typography>
        </Flexbox>
      </Flexbox>
      <Flexbox justifyContent={isWidescreen ? "end" : "center"} mr={2} mt={-4.5} {...styles.searchFlex}>
        <SearchInput />
        {!isMobile && (
          <Tooltip title={`Switch to ${view.tableView ? "grid" : "table"} view`} {...styles.switchTooltip}>
            <Switch
              checked={!view.tableView}
              onChange={() => {
                view.toggleGridView();
                firstPage();
                setRowsPerPage(view.tableView ? 36 : 24);
              }}
              {...styles.viewSwitch}
            />
          </Tooltip>
        )}
      </Flexbox>
    </Flexbox>
  );
});

const styles = {
  headerText: {
    component: m.span,
    fontFamily: "Fira Code Variable",
    sx: { userSelect: "none" },
    whileHover: { rotate: [0, 3, -3, 3, -3, 0], transition: { duration: 0.75 } },
  },
  locationIconBox: {
    component: m.div,
    drag: !isMobile,
    dragSnapToOrigin: !isMobile,
    dragTransition: { bounceDamping: 10, bounceStiffness: 500 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
  locationTooltip: {
    animate: { opacity: [0, 1], transition: { delay: 0.5 } },
    component: m.div,
    placement: "bottom",
    size: "lg",
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "transparent", userSelect: "none" },
    title: "Click/tap location icon to use precise location",
  },
  searchFlex: {
    alignSelf: isMobile ? "center" : "end",
    gap: 2,
  },
  switchTooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "transparent", userSelect: "none" },
  },
  viewSwitch: {
    endDecorator: <FiGrid fontSize="small" />,
    size: "lg",
    slotProps: { thumb: { style: { transition: "0.25s" } } },
    startDecorator: <MdTableRows fontSize="small" />,
    variant: "outlined",
  },
} as const;
