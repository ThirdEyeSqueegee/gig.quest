import { Link, Typography } from "@mui/joy";
import { memo } from "react";

import { EventDetails } from "../../Interfaces.ts";
import { useView } from "../../State.ts";
import { DistanceChip } from "../atoms/DistanceChip.tsx";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const Venue = memo(function Venue(props: { eventDetails?: EventDetails; name?: string }) {
  const { eventDetails, name } = props;

  const tableView = useView((state) => state.tableView);

  return (
    <Flexbox gap={1} justifyContent="start">
      <Link href={`https://www.google.com/maps/search/${name?.replaceAll(" ", "+")}`}>
        <Typography fontSize={tableView ? "0.95rem" : "0.75rem"}>{name}</Typography>
      </Link>
      <DistanceChip eventDetails={eventDetails} />
    </Flexbox>
  );
});
