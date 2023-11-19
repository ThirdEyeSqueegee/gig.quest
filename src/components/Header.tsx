import { GridView, LocationOn, TableRows } from "@mui/icons-material";
import { Box, Switch, Tooltip, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { memo, useContext, useState } from "react";
import { isMobile } from "react-device-detect";
import TypeIt from "typeit-react";

import { EventsDetailsAndMeta } from "../Interfaces.ts";
import { lerp } from "../Utilities.ts";
import { PaginationContext } from "../contexts/PaginationContext.ts";
import { ViewContext } from "../contexts/ViewContext.ts";
import { SearchInput } from "./SearchInput.tsx";

export const Header = memo(function Header(props: {
  eventsDetailsAndMeta?: EventsDetailsAndMeta;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { props: pagination, setter: setPagination } = useContext(PaginationContext);
  const { setter: setTableView, state: tableView } = useContext(ViewContext);

  const { height, width } = useWindowSize();
  const isWidescreen = width! / height! > 4 / 3;

  const { scrollYProgress } = useScroll();
  const [scroll, setScroll] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", v => {
    setScroll(v);
  });

  return (
    <Box alignItems="center" display="flex" flexDirection="column" width={1} {...(!isMobile && { height: lerp(100, 60, scroll) })}>
      <Box alignItems="center" display="flex" flexDirection="column" gap={1}>
        <Typography {...styles.headerText} fontSize={isMobile ? "2.5rem" : `${lerp(2.5, 1.5, scroll)}rem`}>
          <TypeIt>gig.quest</TypeIt>
        </Typography>
        <Box alignItems="center" display="flex" justifyContent="center" sx={{ opacity: lerp(1, 0, 3 * scroll) }}>
          <LocationOn {...styles.locationIcon} />
          <Typography fontFamily="Fira Code Variable" level="body-sm">
            {!pagination.filter.includes("music_festival")
              ? `${props.eventsDetailsAndMeta?.meta.geolocation ? props.eventsDetailsAndMeta.meta.geolocation.display_name : "..."} (${
                  pagination.range
                })`
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
        mt={isMobile ? 1 : 0}
        {...(!isMobile && {
          mr: lerp(2.5, 7, scroll),
          position: "absolute",
          top: lerp(55, 16, scroll),
        })}
      >
        <SearchInput searchTerm={props.searchTerm} setSearchTerm={props.setSearchTerm} />
        {!isMobile && (
          <Tooltip animate={{ opacity: [0, 1] }} component={m.div} title={`Switch to ${tableView ? "grid" : "table"} view`} variant="soft">
            <Switch
              checked={!tableView}
              endDecorator={<GridView fontSize="small" />}
              onChange={() => {
                setTableView(!tableView);
                setPagination({
                  ...pagination,
                  page: 1,
                  rowsPerPage: tableView ? 36 : 24,
                });
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
    whileHover: { rotate: [0, -3, 3, -3, 3, 0], transition: { duration: 0.5 } },
  },
  locationIcon: {
    component: m.svg,
    drag: !isMobile,
    dragSnapToOrigin: !isMobile,
    dragTransition: { bounceDamping: 10, bounceStiffness: 500 },
    htmlColor: "red",
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
};
