import { Box, Link, Typography } from "@mui/joy";
import { useContext } from "react";
import { EventDetails, Location } from "../Interfaces";
import { ViewContext } from "../contexts/ViewContext";
import { DistanceChip } from "./DistanceChip";

export const Venue = (props: { name?: string; eventDetails?: EventDetails; geo?: Location }) => {
  const { state: tableView } = useContext(ViewContext);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Link href={`https://www.google.com/maps/search/${props.name?.replaceAll(" ", "+")}`}>
        <Typography fontSize={tableView ? "0.95rem" : "0.75rem"}>{props.name}</Typography>
      </Link>
      <DistanceChip eventDetails={props.eventDetails} geo={props.geo} />
    </Box>
  );
};
