/* eslint-disable react/jsx-pascal-case */
import { Typography } from "@mui/joy";
import { memo } from "react";
import { isMobile } from "react-device-detect";
import * as NBAIcons from "react-nba-logos";

export const NBATeam = memo(function NBATeam(props: { team: string }) {
  const { team } = props;

  if (team.includes("Hawks")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.ATL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Nets")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.BKN size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Celtics")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.BOS size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Hornets")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.CHA size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Bulls")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.CHI size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Cavaliers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.CLE size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Mavericks")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.DAL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Nuggets")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.DEN size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Pistons")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.DET size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Warriors")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.GSW size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Rockets")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.HOU size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Pacers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.IND size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Clippers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.LAC size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Lakers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.LAL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Grizzlies")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.MEM size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Heat")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.MIA size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Bucks")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.MIL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Timberwolves")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.MIN size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Pelicans")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.NOP size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Knicks")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.NYK size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Thunder")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.OKC size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Magic")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.ORL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("76ers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.PHI size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Suns")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.PHX size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Blazers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.POR size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Kings")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.SAC size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Spurs")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.SAS size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Raptors")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.TOR size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Jazz")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.UTA size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team.includes("Wizards")) {
    return (
      <Typography {...styles.typography} startDecorator={<NBAIcons.WAS size="2rem" />}>
        {team}
      </Typography>
    );
  }
});

const styles = {
  typography: {
    fontSize: isMobile ? "0.9rem" : "1rem",
    slotProps: {
      startDecorator: {
        sx: {
          mr: 0.5,
        },
      },
    },
  },
};
