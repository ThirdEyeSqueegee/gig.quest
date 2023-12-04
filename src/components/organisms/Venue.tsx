import { Link, Typography } from "@mui/joy";
import { memo } from "react";

import { SGVenue } from "../../api/interfaces/SeatGeek.ts";
import { useViewStore } from "../../stores/useViewStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { DistanceChip } from "../molecules/DistanceChip.tsx";

export const Venue = memo(function Venue(props: { venue?: SGVenue }) {
  const { venue } = props;

  const tableView = useViewStore((state) => state.tableView);

  return (
    <Flexbox {...styles.flexbox}>
      <Link href={`https://www.google.com/maps/search/${venue?.name?.replaceAll(" ", "+")}`}>
        <Typography fontSize={tableView ? "0.95rem" : "0.75rem"}>{venue?.name}</Typography>
      </Link>
      <DistanceChip venue={venue} />
    </Flexbox>
  );
});

const styles = {
  flexbox: {
    gap: 0.5,
    justifyContent: "start",
  },
};
