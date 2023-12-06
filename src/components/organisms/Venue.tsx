import { Link } from "@mui/joy";
import { memo } from "react";

import { SGVenue } from "../../api/interfaces/SeatGeek.ts";
import { useViewStore } from "../../stores/useViewStore.ts";
import { DistanceChip } from "../molecules/DistanceChip.tsx";

export const Venue = memo(function Venue(props: { venue?: SGVenue }) {
  const { venue } = props;

  const tableView = useViewStore((state) => state.tableView);

  return (
    <Link
      endDecorator={<DistanceChip venue={venue} />}
      fontSize={tableView ? "md" : "xs"}
      href={`https://www.google.com/maps/search/${venue?.name?.replaceAll(" ", "+")}`}
      underline="none"
    >
      {venue?.name}
    </Link>
  );
});
