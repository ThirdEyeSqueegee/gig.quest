import { Typography } from "@mui/joy";
import { Artist } from "@spotify/web-api-ts-sdk";
import { Fragment, memo } from "react";
import { isMobile } from "react-device-detect";

import { SGEventDetails } from "../../api/interfaces/SeatGeek.ts";
import { useSpotifyArtists } from "../../hooks/useSpotifyArtists.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { NBATeam } from "../molecules/NBATeam.tsx";
import { NFLTeam } from "../molecules/NFLTeam.tsx";
import { SpotifyTooltip } from "../molecules/SpotifyTooltip.tsx";

const regex1 = /\(.*\)/gu;
const regex2 = /(?:with).*(?:&|and) (?:[Mm]ore)/gu;
const regex3 = / - [0-9] (?:[Dd]ay) (?:[Pp]ass)/gu;

export const Performers = memo(function Performers(props: { eventDetails?: SGEventDetails }) {
  const { eventDetails } = props;

  const artistItemsMap = useSpotifyArtists(eventDetails);

  if (eventDetails?.event.type === "music_festival") {
    return (
      <Flexbox flexWrap="wrap" justifyContent="start">
        <Typography {...styles.typography}>
          {eventDetails.event.short_title
            ?.replaceAll("Music Festival", "")
            .replaceAll("Festival", "")
            .replaceAll(regex1, "")
            .replaceAll(regex2, "")
            .replaceAll(regex3, "")}
        </Typography>
      </Flexbox>
    );
  }

  if (eventDetails?.event.type === "nba") {
    const [homeTeam, awayTeam] = eventDetails.performers;

    return (
      <Flexbox flexWrap="wrap" justifyContent="start">
        <NBATeam team={homeTeam} />
        <Typography level="body-sm" mx={1} my="auto">
          vs.
        </Typography>
        <NBATeam team={awayTeam} />
      </Flexbox>
    );
  }

  if (eventDetails?.event.type === "nfl") {
    const [homeTeam, awayTeam] = eventDetails.performers;

    return (
      <Flexbox flexWrap="wrap" justifyContent="start">
        <NFLTeam team={homeTeam} />
        <Typography level="body-sm" mx={1} my="auto">
          vs.
        </Typography>
        <NFLTeam team={awayTeam} />
      </Flexbox>
    );
  }

  return (
    <Flexbox flexWrap="wrap" justifyContent="start">
      {eventDetails?.performers.map((p, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`${p}${i}`}>
            {eventDetails?.event.type === "concert" ?
              <SpotifyTooltip artist={artistItemsMap ? artistItemsMap.get(p) : ({ id: "loading" } as Artist)} performerName={p} />
            : <Typography {...styles.typography}>{p}</Typography>}
            {eventDetails && i !== eventDetails.performers.length - 1 ?
              <Typography level="body-sm" mx={1} my="auto">
                {eventDetails.is1v1 ? "vs." : "//"}
              </Typography>
            : null}
          </Fragment>
        );
      })}
    </Flexbox>
  );
});

const styles = {
  typography: {
    fontSize: isMobile ? "0.9rem" : "1rem",
  },
};
