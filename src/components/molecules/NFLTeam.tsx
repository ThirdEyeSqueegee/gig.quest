/* eslint-disable react/jsx-pascal-case */
import { Typography } from "@mui/joy";
import { memo } from "react";
import { FaQuestion } from "react-icons/fa6";
import * as NFLIcons from "react-nfl-logos";

export const NFLTeam = memo(function NFLTeam(props: { team?: string }) {
  const { team } = props;

  if (team === "TBA") {
    return (
      <Typography {...styles.typography} startDecorator={<FaQuestion />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Cardinals")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.ARI size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Falcons")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.ATL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Ravens")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.BAL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Bills")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.BUF size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Panthers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.CAR size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Bears")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.CHI size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Bengals")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.CIN size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Browns")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.CLE size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Cowboys")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.DAL size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Broncos")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.DEN size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Lions")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.DET size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Packers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.GB size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Texans")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.HOU size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Colts")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.IND size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Jaguars")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.JAX size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Chiefs")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.KC size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Raiders")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.LV size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Chargers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.LAC size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Rams")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.LAR size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Dolphins")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.MIA size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Vikings")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.MIN size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Patriots")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.NE size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Saints")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.NO size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Giants")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.NYG size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Jets")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.NYJ size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Eagles")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.PHI size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Steelers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.PIT size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("49ers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.SF size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Seahawks")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.SEA size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Buccaneers")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.TB size="2rem" />}>
        {team}
      </Typography>
    );
  }
  if (team?.includes("Titans")) {
    return <Typography {...styles.typography}>{team}</Typography>;
  }
  if (team?.includes("Commanders")) {
    return (
      <Typography {...styles.typography} startDecorator={<NFLIcons.WAS size="2rem" />}>
        {team}
      </Typography>
    );
  }
});

const styles = {
  typography: {
    slotProps: { startDecorator: { sx: { mr: 0.5 } } },
  },
};
