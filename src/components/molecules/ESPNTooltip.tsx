import type { ReactNode } from "react";

import { ClickAwayListener } from "@mui/base";
import { Link, Tooltip, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useState } from "react";

import type { ESPNTeamTeam } from "../../api/interfaces/ESPN.ts";

import { Flexbox } from "../atoms/Flexbox.tsx";

export const ESPNTooltip = memo(function ESPNTooltip(props: { startDecorator?: ReactNode; team?: string; teamData?: ESPNTeamTeam }) {
  const { startDecorator, team, teamData } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  let [wins, losses] = [-1, -1];
  let winPct = -1;
  let playoffSeed = -1;
  let ptsConceded = -1;
  let ptsScored = -1;

  if (teamData?.record?.items?.[0].stats) {
    const split = teamData.record.items[0].summary?.split("-");
    wins = split ? +split[0] : -1;
    losses = split ? +split[1] : -1;

    winPct = teamData.record.items[0].stats[17].value ?? -1;
    winPct *= 100;

    playoffSeed = teamData.record.items[0].stats[10].value ?? -1;

    ptsConceded = teamData.record.items[0].stats[2].value ?? -1;
    ptsScored = teamData.record.items[0].stats[3].value ?? -1;
  }

  return (
    <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
      <Tooltip
        open={tooltipOpen}
        title={
          <Link aria-label="ESPN tooltip" href={teamData?.links ? teamData.links[0].href : undefined} {...styles.link}>
            <Flexbox {...styles.tooltipBox}>
              <Typography level="body-sm">
                Playoff seed: <Typography level="title-sm">{playoffSeed !== -1 ? `#${playoffSeed}` : "?"}</Typography>
              </Typography>
              <Flexbox gap={1}>
                <Typography level="body-sm">Record:</Typography>
                <Typography level="body-sm">
                  <Typography color="success">W: </Typography>
                  <Typography level="title-sm">{wins === -1 ? "?" : wins}</Typography>
                </Typography>
                <Typography level="body-sm">
                  <Typography color="danger">L: </Typography>
                  <Typography level="title-sm">{losses === -1 ? "?" : losses}</Typography>
                </Typography>
              </Flexbox>
              <Flexbox gap={1}>
                <Typography level="body-sm">
                  Win %:{" "}
                  <Typography
                    color={
                      winPct === -1 ? "neutral"
                      : winPct > 50 ?
                        "success"
                      : "warning"
                    }
                    level="title-sm"
                  >
                    {winPct !== -1 ? winPct.toFixed(1) : "?"}%
                  </Typography>
                </Typography>
              </Flexbox>
              <Typography level="body-sm">
                Avg pts. conceded: <Typography level="title-sm">{ptsConceded !== -1 ? ptsConceded.toFixed(1) : "?"}</Typography>
              </Typography>
              <Typography level="body-sm">
                Avg pts. scored: <Typography level="title-sm">{ptsScored !== -1 ? ptsScored.toFixed(1) : "?"}</Typography>
              </Typography>
            </Flexbox>
          </Link>
        }
        {...styles.tooltip}
      >
        <Link aria-label="Sports team link" onClick={() => setTooltipOpen(!tooltipOpen)} startDecorator={startDecorator} {...styles.typography}>
          {team}
        </Link>
      </Tooltip>
    </ClickAwayListener>
  );
});

const styles = {
  link: {
    overlay: true,
    underline: "none",
  },
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "transparent", borderRadius: "1rem" },
  },
  tooltipBox: {
    flexDirection: "column",
    maxWidth: "20rem",
    p: 0.5,
  },
  typography: {
    slotProps: { startDecorator: { sx: { mr: 0.5 } } },
  },
} as const;
