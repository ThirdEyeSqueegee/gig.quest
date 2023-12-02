import { Typography } from "@mui/joy";
import { memo } from "react";
import { isMobile } from "react-device-detect";

import { SGEventStats } from "../../api/interfaces/SeatGeek.ts";
import { useViewStore } from "../../stores/useViewStore.ts";

export const Prices = memo(function Prices(props: { stats?: SGEventStats; type: "avg" | "hi" | "lo" }) {
  const { stats, type } = props;

  const tableView = useViewStore((state) => state.tableView);

  let price: number | undefined;
  switch (type) {
    case "lo":
      price = stats?.lowest_price;
      break;
    case "hi":
      price = stats?.highest_price;
      break;
    case "avg":
      price = stats?.average_price;
      break;
  }

  return (
    <Typography fontSize={tableView ? "0.9rem" : "0.725rem"} sx={{ userSelect: "none" }}>
      {price ?
        `${price.toLocaleString("US", { currency: "USD", maximumFractionDigits: 0, style: "currency" })}`
      : isMobile ?
        "?"
      : "¯\\_(ツ)_/¯"}
    </Typography>
  );
});
