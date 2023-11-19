import { Chip, Typography } from "@mui/joy";
import { convertDistance, getPreciseDistance } from "geolib";
import { memo } from "react";
import { isMobile } from "react-device-detect";

import { EventDetails, Location } from "../Interfaces.ts";

export const DistanceChip = memo(function DistanceChip(props: { eventDetails?: EventDetails; geo?: Location }) {
  return (
    <Chip size="sm" sx={{ height: "1rem" }}>
      <Typography fontSize={isMobile ? "0.65rem" : "0.7rem"}>
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
          : "..."}
        {" mi"}
      </Typography>
    </Chip>
  );
});
