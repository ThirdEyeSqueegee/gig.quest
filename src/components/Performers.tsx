import { Box, Tooltip, Typography } from "@mui/joy";
import { AnimatePresence, m } from "framer-motion";
import { Fragment } from "react";
import { isMobile } from "react-device-detect";
import { EventDetails } from "../Interfaces";
import { SpotifyTooltip } from "./SpotifyTooltip";

export const Performers = (props: { eventDetails?: EventDetails }) => {
  return (
    <Box display="flex">
      <Box display="flex" flexWrap="wrap">
        {props.eventDetails?.performers.map((p, i) => {
          return (
            <Fragment key={i}>
              {props.eventDetails?.event.type === "concert" ? (
                <AnimatePresence>
                  <Tooltip
                    arrow
                    title={<SpotifyTooltip artist={p} />}
                    variant="plain"
                    sx={{ borderRadius: "15px" }}
                    component={m.div}
                    animate={{ opacity: [0, 1] }}
                    exit={{ opacity: [1, 0] }}
                  >
                    <Typography fontSize={isMobile ? "0.9rem" : "1rem"}>
                      {p}
                    </Typography>
                  </Tooltip>
                </AnimatePresence>
              ) : (
                <Typography fontSize={isMobile ? "0.9rem" : "1rem"}>
                  {p}
                </Typography>
              )}
              {props.eventDetails &&
              i !== props.eventDetails.performers.length - 1 ? (
                <Typography level="body-sm" mx={1} my="auto">
                  {props.eventDetails.is1v1 ? "vs." : "//"}
                </Typography>
              ) : null}
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
};
