import { GridView, LocationOn, TableRows } from "@mui/icons-material";
import { Box, Switch, Tooltip, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { memo, useState } from "react";
import { isMobile } from "react-device-detect";
import TypeIt from "typeit-react";

import { Meta } from "../Interfaces.ts";
import { usePagination, useView } from "../State.ts";
import { lerp } from "../Utilities.ts";
import { SearchInput } from "./SearchInput.tsx";

export const Header = memo(function Header(props: { meta?: Meta }) {
  const { meta } = props;

  const pagination = usePagination(state => state);
  const view = useView(state => state);

  const { height, width } = useWindowSize();
  const isWidescreen = width! / height! > 4 / 3;

  const { scrollYProgress } = useScroll();
  const [lerps, setLerps] = useState({
    headerGap: 1,
    headerHeight: 100,
    locationBoxHeight: 25,
    locationIconHeight: 24,
    locationTitleHeight: 0.875,
    searchMarginRight: 2.5,
    searchMarginTop: -4.5,
    titleSize: 2.5,
  });

  useMotionValueEvent(scrollYProgress, "change", v => {
    setLerps({
      headerGap: lerp(1, 0, v),
      headerHeight: lerp(100, 50, v),
      locationBoxHeight: lerp(25, 10, v),
      locationIconHeight: lerp(24, 12, v),
      locationTitleHeight: lerp(0.875, 0.6, v),
      searchMarginRight: lerp(2.5, 6, v),
      searchMarginTop: lerp(-4.5, -5, v),
      titleSize: lerp(2.5, 1.5, v),
    });
  });

  return (
    <Box alignItems="center" display="flex" flexDirection="column" height={isMobile ? 1 : lerps.headerHeight} width={1}>
      <Box alignItems="center" display="flex" flexDirection="column" gap={isMobile ? 1 : lerps.headerGap}>
        <Typography {...styles.headerText} fontSize={`${lerps.titleSize}rem`}>
          <TypeIt options={{ cursor: false }}>gig.quest</TypeIt>
        </Typography>
        <Box alignItems="center" display="flex" height={lerps.locationBoxHeight} justifyContent="center">
          <LocationOn {...styles.locationIcon} sx={{ color: "red", fontSize: lerps.locationIconHeight }} />
          <Typography fontFamily="Fira Code Variable" fontSize={`${lerps.locationTitleHeight}rem`} level="body-sm">
            {!pagination.filter.includes("music_festival")
              ? `${meta?.geolocation ? meta.geolocation.display_name : "..."} (${pagination.range})`
              : "Everywhere"}
          </Typography>
        </Box>
      </Box>
      <Box
        alignItems="center"
        alignSelf="end"
        display="flex"
        gap={2}
        justifyContent={isWidescreen ? "end" : "center"}
        mr={isMobile ? 0 : lerps.searchMarginRight}
        mt={isMobile ? 1 : lerps.searchMarginTop}
      >
        <SearchInput />
        {!isMobile && (
          <Tooltip
            animate={{ opacity: [0, 1] }}
            component={m.div}
            sx={{ backdropFilter: "blur(10px)", backgroundColor: "transparent" }}
            title={`Switch to ${view.tableView ? "grid" : "table"} view`}
          >
            <Switch
              checked={!view.tableView}
              endDecorator={<GridView fontSize="small" />}
              onChange={() => {
                view.toggleGridView();
                pagination.firstPage();
                pagination.setRowsPerPage(view.tableView ? 36 : 24);
              }}
              size="lg"
              slotProps={{
                thumb: {
                  style: {
                    transition: "0.25s",
                  },
                },
              }}
              startDecorator={<TableRows fontSize="small" />}
              variant="outlined"
            />
          </Tooltip>
        )}
      </Box>
    </Box>
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
};
