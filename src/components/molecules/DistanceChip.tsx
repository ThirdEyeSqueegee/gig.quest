import { Chip, Typography } from "@mui/joy";
import { convertDistance, getPreciseDistance } from "geolib";
import { memo } from "react";

import type { SGVenue } from "../../api/interfaces/SeatGeek.ts";

import { useLocationStore } from "../../stores/useLocationStore.ts";

export const DistanceChip = memo(function DistanceChip(props: { venue?: SGVenue }) {
  const { venue } = props;

  const eventLocation = venue?.location ?? { lat: undefined, lon: undefined };

  const location = useLocationStore((state) => state.location);

  return (
    <Chip {...styles.chip}>
      <Typography {...styles.distance}>
        {eventLocation.lat && eventLocation.lon && location?.lat && location.lon ?
          convertDistance(
            getPreciseDistance(
              {
                latitude: eventLocation.lat,
                longitude: eventLocation.lon,
              },
              { latitude: location.lat, longitude: location.lon },
            ),
            "mi",
          ).toFixed(2)
        : "?"}
        {" mi"}
      </Typography>
    </Chip>
  );
});

const styles = {
  chip: {
    size: "sm",
    variant: "outlined",
  },
  distance: {
    fontSize: "xs",
    sx: { userSelect: "none" },
  },
} as const;
