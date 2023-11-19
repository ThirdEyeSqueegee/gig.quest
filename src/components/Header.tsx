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
  const { state: tableView, setter: setTableView } = useContext(ViewContext);

  const { width, height } = useWindowSize();
  const isWidescreen = width! / height! > 4 / 3;

  const { scrollYProgress } = useScroll();
  const [scroll, setScroll] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", v => {
    setScroll(v);
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width={1} height={lerp(100, 60, scroll)}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Typography {...styles.headerText} fontSize={`${lerp(2.5, 1.5, scroll)}rem`}>
          <TypeIt>gig.quest</TypeIt>
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ opacity: lerp(1, 0, 3 * scroll) }}>
          <LocationOn {...styles.locationIcon} />
          <Typography level="body-sm" fontFamily="Fira Code Variable">
            {!pagination.filter.includes("music_festival")
              ? `${props.eventsDetailsAndMeta?.meta.geolocation ? props.eventsDetailsAndMeta.meta.geolocation.display_name : "..."} (${
                  pagination.range
                })`
              : "Everywhere"}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent={isWidescreen ? "end" : "center"}
        alignItems="center"
        alignSelf="end"
        gap={2}
        mr={lerp(2.5, 7, scroll)}
        position="absolute"
        top={lerp(55, 16, scroll)}
      >
        <SearchInput searchTerm={props.searchTerm} setSearchTerm={props.setSearchTerm} />
        {!isMobile && (
          <Tooltip title={`Switch to ${tableView ? "grid" : "table"} view`} variant="soft" component={m.div} animate={{ opacity: [0, 1] }}>
            <Switch
              size="lg"
              startDecorator={<TableRows fontSize="small" />}
              endDecorator={<GridView fontSize="small" />}
              checked={!tableView}
              variant="outlined"
              onChange={() => {
                setTableView(!tableView);
                setPagination({
                  ...pagination,
                  rowsPerPage: tableView ? 36 : 24,
                  page: 1,
                });
              }}
              slotProps={{
                thumb: {
                  style: {
                    transition: "0.25s",
                  },
                },
              }}
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
    whileHover: { rotate: [0, -3, 3, -3, 3, 0], transition: { duration: 0.5 } },
    fontFamily: "Fira Code Variable",
  },
  locationIcon: {
    htmlColor: "red",
    component: m.svg,
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    drag: !isMobile,
    dragSnapToOrigin: !isMobile,
    dragTransition: { bounceStiffness: 500, bounceDamping: 10 },
  },
};
