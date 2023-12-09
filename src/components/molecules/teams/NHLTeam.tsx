import { CircularProgress } from "@mui/joy";
import { memo } from "react";
import { FaQuestion } from "react-icons/fa6";

import { NHLTeamsMap } from "../../../Utilities.ts";
import { useESPNTeam } from "../../../hooks/useESPNTeam.ts";
import { ESPNTooltip } from "../ESPNTooltip.tsx";

export const NHLTeam = memo(function NHLTeam(props: { team?: string }) {
  const { team } = props;

  const { data, isLoading } = useESPNTeam("nhl", team ? NHLTeamsMap.get(team) : undefined);

  if (isLoading) {
    return <CircularProgress size="xs" />;
  }
  if (team === "TBA") {
    return <ESPNTooltip startDecorator={<FaQuestion />} team={team} teamData={data} />;
  }
  return <ESPNTooltip team={team} teamData={data} />;
});
