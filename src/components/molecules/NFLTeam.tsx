import loadable from "@loadable/component";
import { CircularProgress } from "@mui/joy";
import { memo } from "react";
import { FaQuestion } from "react-icons/fa6";
import * as NFLIcons from "react-nfl-logos";

import { NFLTeamsMap } from "../../Utilities.ts";
import { useESPNTeam } from "../../hooks/useESPNTeam.ts";

const ESPNTooltip = loadable(() => import("./ESPNTooltip.tsx"), {
  resolveComponent: (components) => components.ESPNTooltip,
  ssr: false,
});

export const NFLTeam = memo(function NFLTeam(props: { team?: string }) {
  const { team } = props;

  const { data, isLoading } = useESPNTeam("nfl", team ? NFLTeamsMap.get(team) : undefined);

  if (isLoading) {
    return <CircularProgress size="xs" />;
  }
  if (team === "TBA") {
    return <ESPNTooltip startDecorator={<FaQuestion />} team={team} teamData={data} />;
  }
  if (team?.includes("Cardinals")) {
    return <ESPNTooltip startDecorator={<NFLIcons.ARI size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Falcons")) {
    return <ESPNTooltip startDecorator={<NFLIcons.ATL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Ravens")) {
    return <ESPNTooltip startDecorator={<NFLIcons.BAL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Bills")) {
    return <ESPNTooltip startDecorator={<NFLIcons.BUF size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Panthers")) {
    return <ESPNTooltip startDecorator={<NFLIcons.CAR size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Bears")) {
    return <ESPNTooltip startDecorator={<NFLIcons.CHI size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Bengals")) {
    return <ESPNTooltip startDecorator={<NFLIcons.CIN size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Browns")) {
    return <ESPNTooltip startDecorator={<NFLIcons.CLE size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Cowboys")) {
    return <ESPNTooltip startDecorator={<NFLIcons.DAL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Broncos")) {
    return <ESPNTooltip startDecorator={<NFLIcons.DEN size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Lions")) {
    return <ESPNTooltip startDecorator={<NFLIcons.DET size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Packers")) {
    return <ESPNTooltip startDecorator={<NFLIcons.GB size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Texans")) {
    return <ESPNTooltip startDecorator={<NFLIcons.HOU size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Colts")) {
    return <ESPNTooltip startDecorator={<NFLIcons.IND size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Jaguars")) {
    return <ESPNTooltip startDecorator={<NFLIcons.JAX size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Chiefs")) {
    return <ESPNTooltip startDecorator={<NFLIcons.KC size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Raiders")) {
    return <ESPNTooltip startDecorator={<NFLIcons.LV size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Chargers")) {
    return <ESPNTooltip startDecorator={<NFLIcons.LAC size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Rams")) {
    return <ESPNTooltip startDecorator={<NFLIcons.LAR size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Dolphins")) {
    return <ESPNTooltip startDecorator={<NFLIcons.MIA size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Vikings")) {
    return <ESPNTooltip startDecorator={<NFLIcons.MIN size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Patriots")) {
    return <ESPNTooltip startDecorator={<NFLIcons.NE size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Saints")) {
    return <ESPNTooltip startDecorator={<NFLIcons.NO size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Giants")) {
    return <ESPNTooltip startDecorator={<NFLIcons.NYG size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Jets")) {
    return <ESPNTooltip startDecorator={<NFLIcons.NYJ size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Eagles")) {
    return <ESPNTooltip startDecorator={<NFLIcons.PHI size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Steelers")) {
    return <ESPNTooltip startDecorator={<NFLIcons.PIT size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("49ers")) {
    return <ESPNTooltip startDecorator={<NFLIcons.SF size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Seahawks")) {
    return <ESPNTooltip startDecorator={<NFLIcons.SEA size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Buccaneers")) {
    return <ESPNTooltip startDecorator={<NFLIcons.TB size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Titans")) {
    return <ESPNTooltip team={team} teamData={data} />;
  }
  if (team?.includes("Commanders")) {
    return <ESPNTooltip startDecorator={<NFLIcons.WAS size="2rem" />} team={team} teamData={data} />;
  }
});
