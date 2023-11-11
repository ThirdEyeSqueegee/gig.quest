import { Box, Link } from "@mui/joy";
import { EventDetails, Location } from "../Interfaces";
import { DistanceChip } from "./DistanceChip";

export const Venue = (props: {
  name?: string;
  eventDetails?: EventDetails;
  geo?: Location;
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Link
        href={`https://www.google.com/maps/search/${props.name?.replaceAll(
          " ",
          "+",
        )}`}
      >
        {props.name}
      </Link>
      <DistanceChip eventDetails={props.eventDetails} geo={props.geo} />
    </Box>
  );
};
