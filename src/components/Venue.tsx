import { Box, Link, Typography } from "@mui/joy";
import { memo, useContext } from "react";

import { EventDetails, Location } from "../Interfaces.ts";
import { ViewContext } from "../contexts/ViewContext.ts";
import { DistanceChip } from "./DistanceChip.tsx";

export const Venue = memo(function Venue(props: { eventDetails?: EventDetails; geo?: Location; name?: string }) {
  const { state: tableView } = useContext(ViewContext);

  return (
    <Box alignItems="center" display="flex" gap={1}>
      <Link href={`https://www.google.com/maps/search/${props.name?.replaceAll(" ", "+")}`}>
        <Typography fontSize={tableView ? "0.95rem" : "0.75rem"}>{props.name}</Typography>
      </Link>
      <DistanceChip eventDetails={props.eventDetails} geo={props.geo} />
    </Box>
  );
});
