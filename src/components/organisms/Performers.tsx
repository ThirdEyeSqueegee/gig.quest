import { Typography } from "@mui/joy";
import { Artist } from "@spotify/web-api-ts-sdk";
import { Fragment, memo } from "react";

import { SGEventDetails } from "../../api/interfaces/SeatGeek.ts";
import { useSpotifyArtists } from "../../hooks/useSpotifyArtists.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { MLBTeam } from "../molecules/MLBTeam.tsx";
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
        <Typography>
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

  if (eventDetails?.event.type === "mlb") {
    const [homeTeam, awayTeam] = eventDetails.performers;

    return (
      <Flexbox flexWrap="wrap" justifyContent="start">
        <MLBTeam team={homeTeam} />
        <Typography level="body-sm" mx={1} my="auto">
          vs.
        </Typography>
        <MLBTeam team={awayTeam} />
      </Flexbox>
    );
  }

  return (
    <Flexbox flexWrap="wrap" justifyContent="start">
      {eventDetails?.performers.map((p, i) => {
        return (
          <Fragment key={p}>
            {eventDetails?.event.type === "concert" ?
              <SpotifyTooltip artist={artistItemsMap ? artistItemsMap.get(p) : ({ id: "loading" } as Artist)} performerName={p} />
            : <Typography>{p}</Typography>}
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
