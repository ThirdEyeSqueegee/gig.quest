import { Box, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { isEqual } from "ohash";
import { Fragment, memo } from "react";
import { isMobile } from "react-device-detect";
import useSWR from "swr";

import { EventDetails, SpotifyToken } from "../Interfaces.ts";
import { getSpotifyToken, spotifySearchArtists } from "../api/API.ts";
import { NBATeam } from "./NBATeam.tsx";
import { NFLTeam } from "./NFLTeam.tsx";
import { SpotifyTooltipBox } from "./SpotifyTooltipBox.tsx";

const regex1 = /\(.*\)/gu;
const regex2 = /(?:with).*(?:&|and) (?:[Mm]ore)/gu;
const regex3 = / - [0-9] (?:[Dd]ay) (?:[Pp]ass)/gu;

export const Performers = memo(function Performers(props: { eventDetails?: EventDetails }) {
  const { eventDetails } = props;

  const { width } = useWindowSize();

  const {
    data: token,
    error,
    isLoading,
  } = useSWR<SpotifyToken, Error>("spotifyToken", getSpotifyToken, { compare: isEqual, keepPreviousData: true });

  const { data: artistItemsMap } = useSWR(
    !error && !isLoading && eventDetails?.event.type === "concert" ? ["artists", eventDetails?.performers] : null,
    ([, a]) => spotifySearchArtists(a, token!.token),
    { compare: isEqual, keepPreviousData: true },
  );

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
      <Box alignItems="center" display="flex" flexBasis={width && width < 420 ? 180 : "auto"} flexWrap="wrap">
        <NBATeam team={homeTeam} />
        <Typography level="body-sm" mx={1} my="auto">
          vs.
        </Typography>
        <NBATeam team={awayTeam} />
      </Box>
    );
  }

  if (eventDetails?.event.type === "nfl") {
    const [homeTeam, awayTeam] = eventDetails.performers;

    return (
      <Box alignItems="center" display="flex" flexBasis={width && width < 420 ? 180 : "auto"} flexWrap="wrap">
        <NFLTeam team={homeTeam} />
        <Typography level="body-sm" mx={1} my="auto">
          vs.
        </Typography>
        <NFLTeam team={awayTeam} />
      </Box>
    );
  }

  return (
    <Box display="flex" flexWrap="wrap">
      {eventDetails?.performers.map((p, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`${p}${i}`}>
            {eventDetails?.event.type === "concert" ?
              <SpotifyTooltipBox artistItem={artistItemsMap ? artistItemsMap.get(p) : { id: "-1" }} performerName={p} />
            : <Typography fontSize={isMobile ? "0.9rem" : "1rem"}>{p}</Typography>}
            {eventDetails && i !== eventDetails.performers.length - 1 ?
              <Typography level="body-sm" mx={1} my="auto">
                {eventDetails.is1v1 ? "vs." : "//"}
              </Typography>
            : null}
          </Fragment>
        );
      })}
    </Box>
  );
});
