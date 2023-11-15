import { Box, Tooltip, Typography } from "@mui/joy";
import { Fragment } from "react";
import { isMobile } from "react-device-detect";
import { EventDetails } from "../Interfaces";
import { SpotifyTooltipBox } from "./SpotifyTooltipBox";

export const Performers = (props: { eventDetails?: EventDetails }) => {
  return (
    <Box display="flex">
      <Box display="flex" flexWrap="wrap">
        {props.eventDetails?.performers.map((p, i) => {
          return (
            <Fragment key={i}>
              {props.eventDetails?.event.type === "concert" ? (
                <Tooltip arrow title={<SpotifyTooltipBox artist={p} />} variant="plain" sx={{ borderRadius: "15px" }} keepMounted>
                  <Typography fontSize={isMobile ? "0.9rem" : "1rem"}>{p}</Typography>
                </Tooltip>
              ) : (
                <Typography fontSize={isMobile ? "0.9rem" : "1rem"}>{p}</Typography>
              )}
              {props.eventDetails && i !== props.eventDetails.performers.length - 1 ? (
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
