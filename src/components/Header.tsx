import { GridView, LocationOn, TableRows } from "@mui/icons-material";
import { Box, Switch, Tooltip, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { m } from "framer-motion";
import { memo, useContext } from "react";
import { isMobile } from "react-device-detect";
import TypeIt from "typeit-react";
import { EventsDetailsAndMeta } from "../Interfaces";
import { PaginationContext } from "../contexts/PaginationContext";
import { ViewContext } from "../contexts/ViewContext";
import { SearchInput } from "./SearchInput";

export const Header = memo(function Header(props: {
  eventsDetailsAndMeta?: EventsDetailsAndMeta;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { props: pagination, setter: setPagination } = useContext(PaginationContext);
  const { state: tableView, setter: setTableView } = useContext(ViewContext);

  const { width, height } = useWindowSize();
  const isWidescreen = width! / height! > 4 / 3;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Typography {...styles.headerText}>
        <TypeIt>gig.quest</TypeIt>
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="98%"
        {...(!isWidescreen && {
          flexDirection: "column",
        })}
      >
        {isWidescreen && <Box display="flex" flex={1} />}
        <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
          <LocationOn {...styles.locationIcon} />
          <Typography level="body-sm" fontFamily="Fira Code Variable">
            {!pagination.filter.includes("music_festival")
              ? `${props.eventsDetailsAndMeta?.meta.geolocation ? props.eventsDetailsAndMeta.meta.geolocation.display_name : "..."} (${
                  pagination.range
                })`
              : "Everywhere"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent={isWidescreen ? "end" : "center"} alignItems="center" gap={2} flex={1} mb={1}>
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
    </Box>
  );
});

const styles = {
  headerText: {
    component: m.span,
    whileHover: { rotate: [0, -3, 3, -3, 3, 0] },
    transition: { duration: 0.5 },
    fontFamily: "Fira Code Variable",
    fontSize: "3rem",
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
