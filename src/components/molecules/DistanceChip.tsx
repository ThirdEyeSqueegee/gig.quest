import { Chip, Typography } from "@mui/joy";
import { convertDistance, getPreciseDistance } from "geolib";
import { memo } from "react";
import { isMobile } from "react-device-detect";

import { EventDetails } from "../../Interfaces.ts";
import { useLocationStore } from "../../stores/useLocationStore.ts";

export const DistanceChip = memo(function DistanceChip(props: { eventDetails?: EventDetails }) {
  const { eventDetails } = props;

  const eventLocation = eventDetails?.event.venue ? eventDetails.event.venue.location : { lat: null, lon: null };

  const location = useLocationStore((state) => state.location);

  return (
    <Chip size="sm" sx={styles.distanceChip}>
      <Typography {...styles.distance}>
        {eventLocation && location ?
          convertDistance(
            getPreciseDistance(
              {
                latitude: eventLocation.lat!,
                longitude: eventLocation.lon!,
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

const styles = {
  distance: {
    fontSize: isMobile ? "0.65rem" : "0.7rem",
  },
  distanceChip: {
    height: "1rem",
  },
};
