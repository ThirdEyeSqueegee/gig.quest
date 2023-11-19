import { Box, Typography } from "@mui/joy";
import { Fragment } from "react";
import { isMobile } from "react-device-detect";
import { EventDetails } from "../Interfaces";
import { SpotifyTooltipBox } from "./SpotifyTooltipBox";

const regex1 = /\(.*\)/g;
const regex2 = /(with).*(&|and) ([Mm]ore)/g;
const regex3 = / - [0-9] ([Dd]ay) ([Pp]ass)/g;

export const Performers = (props: { eventDetails?: EventDetails }) => {
  return (
    <Box display="flex" flexWrap="wrap">
      {props.eventDetails?.event.type !== "music_festival" ? (
        props.eventDetails?.performers.map((p, i) => {
          return (
            <Fragment key={i}>
              {props.eventDetails?.event.type === "concert" ? (
                <SpotifyTooltipBox artist={p} />
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
        })
      ) : (
        <Typography fontSize={isMobile ? "0.9rem" : "1rem"}>
          {props.eventDetails.event.short_title
            ?.replaceAll("Music Festival", "")
            .replaceAll("Festival", "")
            .replaceAll(regex1, "")
            .replaceAll(regex2, "")
            .replaceAll(regex3, "")}
        </Typography>
      )}
    </Box>
  );
};
