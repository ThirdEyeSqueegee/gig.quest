import { Tooltip, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { SGEvent } from "../Interfaces";

export const Prices = (props: { event: SGEvent }) => {
  return (
    <Tooltip
      arrow
      color="success"
      followCursor
      title={
        props.event.stats?.average_price
          ? `Avg.: $${props.event.stats?.average_price}`
          : "¯\\_(ツ)_/¯"
      }
      variant="soft"
      component={motion.div}
      animate={{ opacity: [0, 1] }}
    >
      <Typography>
        {props.event.stats?.lowest_price
          ? `$${props.event.stats?.lowest_price} - $${props.event.stats?.highest_price}`
          : "¯\\_(ツ)_/¯"}
      </Typography>
    </Tooltip>
  );
};
