import { CircularProgress } from "@mui/joy";
import { memo } from "react";
import { FaQuestion } from "react-icons/fa6";
import * as NBAIcons from "react-nba-logos";

import { NBATeamsMap } from "../../../Utilities.ts";
import { useESPNTeam } from "../../../hooks/useESPNTeam.ts";
import { ESPNTooltip } from "../ESPNTooltip.tsx";

export const NBATeam = memo(function NBATeam(props: { team?: string }) {
  const { team } = props;

  const { data, isLoading } = useESPNTeam("nba", team ? NBATeamsMap.get(team) : undefined);

  if (isLoading) {
    return <CircularProgress size="xs" />;
  }
  if (team === "TBA") {
    return <ESPNTooltip startDecorator={<FaQuestion />} team={team} teamData={data} />;
  }
  if (team?.includes("Hawks")) {
    return <ESPNTooltip startDecorator={<NBAIcons.ATL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Nets")) {
    return <ESPNTooltip startDecorator={<NBAIcons.BKN size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Celtics")) {
    return <ESPNTooltip startDecorator={<NBAIcons.BOS size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Hornets")) {
    return <ESPNTooltip startDecorator={<NBAIcons.CHA size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Bulls")) {
    return <ESPNTooltip startDecorator={<NBAIcons.CHI size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Cavaliers")) {
    return <ESPNTooltip startDecorator={<NBAIcons.CLE size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Mavericks")) {
    return <ESPNTooltip startDecorator={<NBAIcons.DAL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Nuggets")) {
    return <ESPNTooltip startDecorator={<NBAIcons.DEN size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Pistons")) {
    return <ESPNTooltip startDecorator={<NBAIcons.DET size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Warriors")) {
    return <ESPNTooltip startDecorator={<NBAIcons.GSW size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Rockets")) {
    return <ESPNTooltip startDecorator={<NBAIcons.HOU size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Pacers")) {
    return <ESPNTooltip startDecorator={<NBAIcons.IND size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Clippers")) {
    return <ESPNTooltip startDecorator={<NBAIcons.LAC size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Lakers")) {
    return <ESPNTooltip startDecorator={<NBAIcons.LAL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Grizzlies")) {
    return <ESPNTooltip startDecorator={<NBAIcons.MEM size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Heat")) {
    return <ESPNTooltip startDecorator={<NBAIcons.MIA size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Bucks")) {
    return <ESPNTooltip startDecorator={<NBAIcons.MIL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Timberwolves")) {
    return <ESPNTooltip startDecorator={<NBAIcons.MIN size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Pelicans")) {
    return <ESPNTooltip startDecorator={<NBAIcons.NOP size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Knicks")) {
    return <ESPNTooltip startDecorator={<NBAIcons.NYK size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Thunder")) {
    return <ESPNTooltip startDecorator={<NBAIcons.OKC size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Magic")) {
    return <ESPNTooltip startDecorator={<NBAIcons.ORL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("76ers")) {
    return <ESPNTooltip startDecorator={<NBAIcons.PHI size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Suns")) {
    return <ESPNTooltip startDecorator={<NBAIcons.PHX size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Blazers")) {
    return <ESPNTooltip startDecorator={<NBAIcons.POR size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Kings")) {
    return <ESPNTooltip startDecorator={<NBAIcons.SAC size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Spurs")) {
    return <ESPNTooltip startDecorator={<NBAIcons.SAS size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Raptors")) {
    return <ESPNTooltip startDecorator={<NBAIcons.TOR size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Jazz")) {
    return <ESPNTooltip startDecorator={<NBAIcons.UTA size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Wizards")) {
    return <ESPNTooltip startDecorator={<NBAIcons.WAS size="2rem" />} team={team} teamData={data} />;
  }
});
