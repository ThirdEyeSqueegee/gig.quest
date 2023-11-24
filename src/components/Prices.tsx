import { Typography } from "@mui/joy";
import { memo } from "react";
import { isMobile } from "react-device-detect";

import { SGEvent } from "../Interfaces.ts";
import { useView } from "../State.ts";

export const Prices = memo(function Prices(props: { event: SGEvent; type: "avg" | "hi" | "lo" }) {
  const tableView = useView(state => state.tableView);

  let price: number | undefined;
  switch (props.type) {
    case "lo":
      price = props.event.stats?.lowest_price;
      break;
    case "hi":
      price = props.event.stats?.highest_price;
      break;
    case "avg":
      price = props.event.stats?.average_price;
      break;
  }

  return <Typography fontSize={tableView ? "0.9rem" : "0.725rem"}>{price ? `$${price}` : isMobile ? "?" : "¯\\_(ツ)_/¯"}</Typography>;
});
