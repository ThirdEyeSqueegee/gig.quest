import { Chip } from "@mui/joy";
import { convertDistance, getPreciseDistance } from "geolib";
import { EventDetails, Location } from "../Interfaces";

export const DistanceChip = (props: {
  eventDetails?: EventDetails;
  geo?: Location;
}) => {
  return (
    <Chip size="sm" sx={{ height: "1rem" }}>
      {props.eventDetails?.event.venue?.location && props.geo
        ? convertDistance(
            getPreciseDistance(
              {
                latitude: props.eventDetails.event.venue.location.lat!,
                longitude: props.eventDetails.event.venue.location.lon!,
              },
              { latitude: props.geo.lat!, longitude: props.geo.lon! },
            ),
            "mi",
          ).toFixed(2)
        : "..."}{" "}
      mi
    </Chip>
  );
};
