import { Typography } from "@mui/joy";
import { memo } from "react";

import type { SGEventDetails } from "../../api/interfaces/SeatGeek.ts";

import { Flexbox } from "../atoms/Flexbox.tsx";
import { MLBTeam } from "./teams/MLBTeam.tsx";
import { NBATeam } from "./teams/NBATeam.tsx";
import { NFLTeam } from "./teams/NFLTeam.tsx";
import { NHLTeam } from "./teams/NHLTeam.tsx";

export const BigFourGame = memo(function BigFourGame(props: { details: SGEventDetails }) {
  const { details } = props;

  if (details.event.type === "nba") {
    if (details.performers && details.performers.length > 1) {
      return (
        <Flexbox justifyContent="start">
          <NBATeam team={details.performers[0]} />
          <Typography level="body-sm" mx={1}>
            vs.
          </Typography>
          <NBATeam team={details.performers[1]} />
        </Flexbox>
      );
    }
    return <Typography>{details.event.short_title}</Typography>;
  }
  if (details.event.type === "nfl") {
    if (details.performers && details.performers.length > 1) {
      return (
        <Flexbox justifyContent="start">
          <NFLTeam team={details.performers[0]} />
          <Typography level="body-sm" mx={1}>
            vs.
          </Typography>
          <NFLTeam team={details.performers[1]} />
        </Flexbox>
      );
    }
    return <Typography>{details.event.short_title}</Typography>;
  }
  if (details.event.type === "nhl") {
    if (details.performers && details.performers.length > 1) {
      return (
        <Flexbox justifyContent="start">
          <NHLTeam team={details.performers[0]} />
          <Typography level="body-sm" mx={1}>
            vs.
          </Typography>
          <NHLTeam team={details.performers[1]} />
        </Flexbox>
      );
    }
    return <Typography>{details.event.short_title}</Typography>;
  }
  if (details.event.type === "mlb") {
    if (details.performers && details.performers.length > 1) {
      return (
        <Flexbox justifyContent="start">
          <MLBTeam team={details.performers[0]} />
          <Typography level="body-sm" mx={1}>
            vs.
          </Typography>
          <MLBTeam team={details.performers[1]} />
        </Flexbox>
      );
    }
    return <Typography>{details.event.title}</Typography>;
  }
});
