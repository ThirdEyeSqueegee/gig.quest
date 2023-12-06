import { ClickAwayListener } from "@mui/base";
import { Link, Tooltip, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { ReactNode, memo, useState } from "react";

import { ESPNTeamTeam } from "../../api/interfaces/ESPN.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const ESPNTooltip = memo(function ESPNTooltip(props: { startDecorator?: ReactNode; team?: string; teamData?: ESPNTeamTeam }) {
  const { startDecorator, team, teamData } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  let [wins, losses] = [-1, -1];

  if (teamData?.record?.items) {
    const split = teamData.record.items[0].summary?.split("-");
    wins = split ? +split[0] : -1;
    losses = split ? +split[1] : -1;
  }

  return (
    <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
      <Tooltip
        open={tooltipOpen}
        title={
          <Link href={teamData?.links ? teamData.links[0].href : undefined} {...styles.link}>
            <Flexbox {...styles.tooltipBox}>
              <Flexbox gap={1}>
                <Typography>
                  <Typography color="success">W: </Typography>
                  {wins === -1 ? "?" : wins}
                </Typography>
                <Typography>
                  <Typography color="danger">L: </Typography>
                  {losses === -1 ? "?" : losses}
                </Typography>
              </Flexbox>
              <Typography>{teamData?.standingSummary}</Typography>
            </Flexbox>
          </Link>
        }
        {...styles.tooltip}
      >
        <Link onClick={() => setTooltipOpen(!tooltipOpen)} startDecorator={startDecorator} {...styles.typography}>
          {team}
        </Link>
      </Tooltip>
    </ClickAwayListener>
  );
});

const styles = {
  link: {
    color: "neutral",
    overlay: true,
    underline: "none",
  },
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "transparent", borderRadius: "1rem" },
    variant: "outlined",
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
