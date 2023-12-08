import loadable from "@loadable/component";
import { Link } from "@mui/joy";
import { memo } from "react";

import type { SGVenue } from "../../api/interfaces/SeatGeek.ts";

import { useViewStore } from "../../stores/useViewStore.ts";

const DistanceChip = loadable(() => import("../molecules/DistanceChip.tsx"), {
  resolveComponent: (component) => component.DistanceChip,
  ssr: false,
});

export const Venue = memo(function Venue(props: { venue?: SGVenue }) {
  const { venue } = props;

  const tableView = useViewStore((state) => state.tableView);

  return (
    <Link
      aria-label="Venue link"
      endDecorator={<DistanceChip venue={venue} />}
      fontSize={tableView ? "md" : "xs"}
      href={`https://www.google.com/maps/search/${venue?.name?.replaceAll(" ", "+")}`}
      sx={{ userSelect: "none" }}
      underline="none"
    >
      {venue?.name}
    </Link>
  );
});
