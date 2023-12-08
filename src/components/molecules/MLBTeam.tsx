/* eslint-disable react/jsx-pascal-case */
import loadable from "@loadable/component";
import { CircularProgress } from "@mui/joy";
import { memo } from "react";
import { FaQuestion } from "react-icons/fa6";
import * as MLBIcons from "react-mlb-logos";

import { MLBTeamsMap } from "../../Utilities.ts";
import { useESPNTeam } from "../../hooks/useESPNTeam.ts";

const ESPNTooltip = loadable(() => import("./ESPNTooltip.tsx"), {
  resolveComponent: (components) => components.ESPNTooltip,
  ssr: false,
});

export const MLBTeam = memo(function MLBTeam(props: { team?: string }) {
  const { team } = props;

  const { data, isLoading } = useESPNTeam("mlb", MLBTeamsMap.get(team ?? ""));

  if (isLoading) {
    return <CircularProgress size="xs" />;
  }
  if (team === "TBA") {
    return <ESPNTooltip startDecorator={<FaQuestion />} team={team} teamData={data} />;
  }
  if (team?.includes("Diamondbacks")) {
    return <ESPNTooltip startDecorator={<MLBIcons.ARI size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Braves")) {
    return <ESPNTooltip startDecorator={<MLBIcons.ATL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Orioles")) {
    return <ESPNTooltip startDecorator={<MLBIcons.BAL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Red Sox")) {
    return <ESPNTooltip startDecorator={<MLBIcons.BOS size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Cubs")) {
    return <ESPNTooltip startDecorator={<MLBIcons.CHC size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("White Sox")) {
    return <ESPNTooltip startDecorator={<MLBIcons.CHW size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Reds")) {
    return <ESPNTooltip startDecorator={<MLBIcons.CIN size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Guardians")) {
    return <ESPNTooltip startDecorator={<MLBIcons.CLE size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Rockies")) {
    return <ESPNTooltip startDecorator={<MLBIcons.COL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Tigers")) {
    return <ESPNTooltip startDecorator={<MLBIcons.DET size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Astros")) {
    return <ESPNTooltip startDecorator={<MLBIcons.HOU size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Royals")) {
    return <ESPNTooltip startDecorator={<MLBIcons.KAN size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Angels")) {
    return <ESPNTooltip startDecorator={<MLBIcons.LAA size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Dodgers")) {
    return <ESPNTooltip startDecorator={<MLBIcons.LAD size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Marlins")) {
    return <ESPNTooltip startDecorator={<MLBIcons.MIA size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Brewers")) {
    return <ESPNTooltip startDecorator={<MLBIcons.MIL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Twins")) {
    return <ESPNTooltip startDecorator={<MLBIcons.MIN size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Mets")) {
    return <ESPNTooltip startDecorator={<MLBIcons.NYM size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Yankees")) {
    return <ESPNTooltip startDecorator={<MLBIcons.NYY size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Athletics")) {
    return <ESPNTooltip startDecorator={<MLBIcons.OAK size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Phillies")) {
    return <ESPNTooltip startDecorator={<MLBIcons.PHI size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Pirates")) {
    return <ESPNTooltip startDecorator={<MLBIcons.PIT size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Padres")) {
    return <ESPNTooltip startDecorator={<MLBIcons.SD size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Giants")) {
    return <ESPNTooltip startDecorator={<MLBIcons.SF size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Mariners")) {
    return <ESPNTooltip startDecorator={<MLBIcons.SEA size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Cardinals")) {
    return <ESPNTooltip startDecorator={<MLBIcons.STL size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Rays")) {
    return <ESPNTooltip startDecorator={<MLBIcons.TB size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Rangers")) {
    return <ESPNTooltip startDecorator={<MLBIcons.TEX size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Blue Jays")) {
    return <ESPNTooltip startDecorator={<MLBIcons.TOR size="2rem" />} team={team} teamData={data} />;
  }
  if (team?.includes("Nationals")) {
    return <ESPNTooltip startDecorator={<MLBIcons.WAS size="2rem" />} team={team} teamData={data} />;
  }
});
