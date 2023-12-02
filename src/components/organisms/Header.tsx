import { GridView, LocationOn, TableRows } from "@mui/icons-material";
import { Switch, Tooltip, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { memo, useState } from "react";
import { isMobile } from "react-device-detect";
import TypeIt from "typeit-react";

import { lerp } from "../../Utilities.ts";
import { useSeatGeekEvents } from "../../hooks/useSeatGeekEvents.ts";
import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { useViewStore } from "../../stores/useViewStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { SearchInput } from "../molecules/SearchInput.tsx";

export const Header = memo(function Header() {
  const filter = usePaginationStore((state) => state.filter);
  const range = usePaginationStore((state) => state.range);
  const firstPage = usePaginationStore((state) => state.firstPage);
  const setRowsPerPage = usePaginationStore((state) => state.setRowsPerPage);
  const view = useViewStore((state) => state);

  const { meta } = useSeatGeekEvents();
  const geolocation = meta?.geolocation;

  const { height, width } = useWindowSize();
  const isWidescreen = width! / height! > 4 / 3;

  const { scrollYProgress } = useScroll();
  const [lerps, setLerps] = useState({
    headerGap: 1,
    headerHeight: 95,
    locationBoxHeight: 25,
    locationIconHeight: 24,
    locationTitleHeight: 0.875,
    searchMarginRight: 2,
    searchMarginTop: -4.5,
    titleSize: 2.5,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setLerps({
      headerGap: lerp(1, 0, v),
      headerHeight: lerp(95, 50, v),
      locationBoxHeight: lerp(25, 10, v),
      locationIconHeight: lerp(24, 12, v),
      locationTitleHeight: lerp(0.875, 0.6, v),
      searchMarginRight: lerp(2, 6, v),
      searchMarginTop: lerp(-4.5, -5, v),
      titleSize: lerp(2.5, 1.5, v),
    });
  });

  return (
    <Flexbox flexDirection="column" width={1}>
      <Flexbox flexDirection="column" gap={isMobile ? 1 : lerps.headerGap}>
        <Typography {...styles.headerText} fontSize={`${lerps.titleSize}rem`}>
          <TypeIt options={{ cursor: false }}>gig.quest</TypeIt>
        </Typography>
        <Flexbox height={lerps.locationBoxHeight}>
          <LocationOn {...styles.locationIcon} sx={{ color: "red", fontSize: lerps.locationIconHeight }} />
          <Typography fontFamily="Fira Code Variable" fontSize={`${lerps.locationTitleHeight}rem`} level="body-sm">
            {!filter.includes("music_festival") ? `${geolocation ? geolocation.display_name : "..."} (${range})` : "Everywhere"}
          </Typography>
        </Flexbox>
      </Flexbox>
      <Flexbox
        justifyContent={isWidescreen ? "end" : "center"}
        mr={isMobile ? 0 : lerps.searchMarginRight}
        mt={isMobile ? 1 : lerps.searchMarginTop}
        {...styles.searchFlex}
      >
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
              size="lg"
              variant="outlined"
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
    whileHover: { rotate: [0, 3, -3, 3, -3, 0], transition: { duration: 0.75 } },
  },
  locationIcon: {
    component: m.svg,
    drag: !isMobile,
    dragSnapToOrigin: !isMobile,
    dragTransition: { bounceDamping: 10, bounceStiffness: 500 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
  searchFlex: {
    alignSelf: isMobile ? "center" : "end",
    gap: 2,
  },
  switchTooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { backdropFilter: "blur(8px)", backgroundColor: "transparent" },
  },
  viewSwitch: {
    endDecorator: <GridView fontSize="small" />,
    slotProps: {
      thumb: {
        style: {
          transition: "0.25s",
        },
      },
    },
    startDecorator: <TableRows fontSize="small" />,
  },
};
