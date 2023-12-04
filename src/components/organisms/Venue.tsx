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
      <Typography
        component="span"
        fontSize={tableView ? "0.95rem" : "0.75rem"}
        sx={{ alignItems: "center", display: "inline-flex", flexBasis: tableView ? "95%" : "auto", gap: 0.75 }}
      >
        <Link href={`https://www.google.com/maps/search/${venue?.name?.replaceAll(" ", "+")}`}>{venue?.name}</Link>
        <DistanceChip venue={venue} />
      </Typography>
    </Flexbox>
  );
});

const styles = {
  flexbox: {
    gap: 0.5,
    justifyContent: "start",
  },
};
