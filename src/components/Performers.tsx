import { Box, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { Fragment, memo } from "react";
import { isMobile } from "react-device-detect";

import { EventDetails } from "../Interfaces.ts";
import { NBATeam } from "./NBATeam.tsx";
import { SpotifyTooltipBox } from "./SpotifyTooltipBox.tsx";

const regex1 = /\(.*\)/gu;
const regex2 = /(?:with).*(?:&|and) (?:[Mm]ore)/gu;
const regex3 = / - [0-9] (?:[Dd]ay) (?:[Pp]ass)/gu;

export const Performers = memo(function Performers(props: { eventDetails?: EventDetails }) {
  const { eventDetails } = props;

  const { width } = useWindowSize();

  if (eventDetails?.event.type === "music_festival") {
    return (
      <Box display="flex" flexWrap="wrap">
        <Typography fontSize={isMobile ? "0.9rem" : "1rem"}>
          {eventDetails.event.short_title
            ?.replaceAll("Music Festival", "")
            .replaceAll("Festival", "")
            .replaceAll(regex1, "")
            .replaceAll(regex2, "")
            .replaceAll(regex3, "")}
        </Typography>
      </Box>
    );
  }

  if (eventDetails?.event.type === "nba") {
    const [homeTeam, awayTeam] = eventDetails.performers;

    return (
      <Box alignItems="center" display="flex" flexBasis={width && width < 420 ? 175 : "auto"} flexWrap="wrap">
        <NBATeam team={homeTeam} />
        <Typography level="body-sm" mx={1} my="auto">
          vs.
        </Typography>
        <NBATeam team={awayTeam} />
      </Box>
    );
  }

  return (
    <Box display="flex" flexWrap="wrap">
      {eventDetails?.performers.map((p, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`${p}${i}`}>
            {eventDetails?.event.type === "concert" ? (
              <SpotifyTooltipBox artist={p} />
            ) : (
              <Typography fontSize={isMobile ? "0.9rem" : "1rem"}>{p}</Typography>
            )}
            {eventDetails && i !== eventDetails.performers.length - 1 ? (
              <Typography level="body-sm" mx={1} my="auto">
                {eventDetails.is1v1 ? "vs." : "//"}
              </Typography>
            ) : null}
          </Fragment>
        );
      })}
    </Box>
  );
});
