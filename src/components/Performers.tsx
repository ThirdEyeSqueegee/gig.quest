import { Box, Tooltip, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { EventDetails } from "../Interfaces";
import { SpotifyTooltip } from "./SpotifyTooltip";

export const Performers = (props: { eventDetails?: EventDetails }) => {
  return (
    <Box display="flex" flexWrap="wrap">
      {props.eventDetails?.performers.map((p, i) => {
        return (
          <Fragment key={i}>
            {props.eventDetails?.event.type === "concert" ? (
              <Tooltip
                arrow
                title={<SpotifyTooltip artist={p} />}
                variant="plain"
                sx={{ borderRadius: "15px" }}
                component={motion.div}
                animate={{ opacity: [0, 1] }}
              >
                <Typography>{p}</Typography>
              </Tooltip>
            ) : (
              <Typography>{p}</Typography>
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
  );
};
