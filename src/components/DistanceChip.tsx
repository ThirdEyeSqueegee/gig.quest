import { Chip, Typography } from "@mui/joy";
import { convertDistance, getPreciseDistance } from "geolib";
import { memo } from "react";
import { isMobile } from "react-device-detect";

import { EventDetails } from "../Interfaces.ts";
import { useLocation } from "../State.ts";

export const DistanceChip = memo(function DistanceChip(props: { eventDetails?: EventDetails }) {
  const location = useLocation(state => state.location);
  return (
    <Chip size="sm" sx={{ height: "1rem" }}>
      <Typography fontSize={isMobile ? "0.65rem" : "0.7rem"}>
        {props.eventDetails?.event.venue?.location && location
          ? convertDistance(
              getPreciseDistance(
                {
                  latitude: props.eventDetails.event.venue.location.lat!,
                  longitude: props.eventDetails.event.venue.location.lon!,
                },
                { latitude: location.lat!, longitude: location.lon! },
              ),
              "mi",
            ).toFixed(2)
          : "..."}
        {" mi"}
      </Typography>
    </Chip>
  );
});
