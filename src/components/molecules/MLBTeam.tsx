/* eslint-disable react/jsx-pascal-case */
import { Typography } from "@mui/joy";
import { memo } from "react";
import { isMobile } from "react-device-detect";
import * as MLBIcons from "react-mlb-logos";

export const MLBTeam = memo(function MLBTeam(props: { team?: string }) {
  const { team } = props;

  if (team?.includes("Diamondbacks")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.ARI size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Braves")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.ATL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Orioles")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.BAL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Red Sox")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.BOS size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Cubs")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.CHC size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("White Sox")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.CHW size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Reds")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.CIN size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Guardians")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.CLE size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Rockies")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.COL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Tigers")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.DET size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Astros")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.HOU size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Royals")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.KAN size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Angels")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.LAA size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Dodgers")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.LAD size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Marlins")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.MIA size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Brewers")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.MIL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Twins")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.MIN size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Mets")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.NYM size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Yankees")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.NYY size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Athletics")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.OAK size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Phillies")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.PHI size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Pirates")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.PIT size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Padres")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.SD size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Giants")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.SF size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Mariners")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.SEA size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Cardinals")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.STL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Rays")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.TB size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Rangers")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.TEX size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Blue Jays")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.TOR size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Nationals")) {
    return (
      <Typography {...styles.typography} startDecorator={<MLBIcons.WAS size="2rem" />}>
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
        sx: { mr: 0.5 },
      },
    },
  },
};
