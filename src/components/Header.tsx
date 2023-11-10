import { GridView, LocationOn, TableRows } from "@mui/icons-material";
import { Box, Switch, Tooltip, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import TypeIt from "typeit-react";
import { EventsDetailsAndMeta } from "../Interfaces";
import { SearchInput } from "./SearchInput";

export const Header = (props: {
  width: number | null;
  height: number | null;
  eventsDetailsAndMeta?: EventsDetailsAndMeta;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  tableView: boolean;
  handleChangeView(): void;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      width="100%"
    >
      <Typography level="h1">
        <TypeIt>gig.quest</TypeIt>
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="100%"
        {...(props.width! / props.height! < 4 / 3 && {
          flexDirection: "column",
        })}
      >
        {props.width! / props.height! > 4 / 3 && (
          <Box display="flex" flex={1} />
        )}
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
            {props.eventsDetailsAndMeta?.meta?.geolocation?.display_name}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent={props.width! > props.height! ? "end" : "center"}
          alignItems="center"
          gap={2}
          flex={1}
        >
          <SearchInput setSearchTerm={props.setSearchTerm} />
          {!isMobile && (
            <Tooltip
              title={`Switch to ${props.tableView ? "grid" : "table"} view`}
              variant="soft"
              component={motion.div}
              animate={{ opacity: [0, 1] }}
            >
              <Switch
                size="lg"
                startDecorator={<TableRows fontSize="small" />}
                endDecorator={<GridView fontSize="small" />}
                checked={!props.tableView}
                onChange={props.handleChangeView}
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
};
