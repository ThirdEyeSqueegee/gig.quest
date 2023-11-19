import { Typography } from "@mui/joy";
import { memo, useContext } from "react";
import { isMobile } from "react-device-detect";
import { SGEvent } from "../Interfaces.ts";
import { ViewContext } from "../contexts/ViewContext.ts";

export const Prices = memo(function Prices(props: { event: SGEvent; type: "lo" | "hi" | "avg" }) {
  const { state: tableView } = useContext(ViewContext);

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
