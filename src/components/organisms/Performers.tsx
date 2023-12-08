import type { Artist } from "@spotify/web-api-ts-sdk";

import { Typography } from "@mui/joy";
import { Fragment, memo } from "react";

// eslint-disable-next-line perfectionist/sort-named-imports
import { isSGMusicEventType, type SGEventDetails } from "../../api/interfaces/SeatGeek.ts";
import { useSpotifyArtists } from "../../hooks/useSpotifyArtists.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { MLBTeam } from "../molecules/MLBTeam.tsx";
import { NBATeam } from "../molecules/NBATeam.tsx";
import { NFLTeam } from "../molecules/NFLTeam.tsx";
import { SpotifyTooltip } from "../molecules/SpotifyTooltip.tsx";

export const Performers = memo(function Performers(props: { eventDetails?: SGEventDetails }) {
  const { eventDetails } = props;

  const artistItemsMap = useSpotifyArtists(eventDetails);

  if (eventDetails?.event.type === "music_festival") {
    return (
      <Flexbox flexWrap="wrap" justifyContent="start">
        <Typography sx={{ userSelect: "none" }}>
          {eventDetails.event.short_title?.replaceAll("Music Festival", "").replaceAll("Festival", "")}
        </Typography>
      </Flexbox>
    );
  }

  if (eventDetails?.event.type === "nba") {
    const [homeTeam, awayTeam] = eventDetails.performers;

    if (homeTeam.includes("In-Season")) {
      return (
        <Flexbox flexWrap="wrap" justifyContent="start">
          <Typography level="body-sm" mr={0.5} sx={{ userSelect: "none" }}>
            In-Season:
          </Typography>
          <NBATeam team={awayTeam} />
          <Typography level="body-sm" mx={1} my="auto" sx={{ userSelect: "none" }}>
            vs.
          </Typography>
          {eventDetails.performers[2] ?
            <NBATeam team={eventDetails.performers[2]} />
          : <NBATeam team="TBA" />}
        </Flexbox>
      );
    }

    return (
      <Flexbox flexWrap="wrap" justifyContent="start">
        <NBATeam team={homeTeam} />
        <Typography level="body-sm" mx={1} my="auto" sx={{ userSelect: "none" }}>
          vs.
        </Typography>
        <NBATeam team={awayTeam} />
      </Flexbox>
    );
  }

  if (eventDetails?.event.type === "nfl") {
    const [homeTeam, awayTeam] = eventDetails.performers;

    if (homeTeam.includes("Bowl")) {
      return (
        <Flexbox flexWrap="wrap" justifyContent="start">
          <Typography level="body-sm" mr={0.5} sx={{ userSelect: "none" }}>
            {homeTeam}:
          </Typography>
          <NFLTeam team={awayTeam} />
          <Typography level="body-sm" mx={1} my="auto" sx={{ userSelect: "none" }}>
            vs.
          </Typography>
          {eventDetails.performers[2] ?
            <NFLTeam team={eventDetails.performers[2]} />
          : <NFLTeam team="TBA" />}
        </Flexbox>
      );
    }

    return (
      <Flexbox flexWrap="wrap" justifyContent="start">
        <NFLTeam team={homeTeam} />
        <Typography level="body-sm" mx={1} my="auto" sx={{ userSelect: "none" }}>
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
            {eventDetails.event.type && isSGMusicEventType(eventDetails.event.type) ?
              <SpotifyTooltip artist={artistItemsMap ? artistItemsMap.get(p) : ({ id: "loading" } as Artist)} performerName={p} />
            : <Typography>{p}</Typography>}
            {i !== eventDetails.performers.length - 1 ?
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
