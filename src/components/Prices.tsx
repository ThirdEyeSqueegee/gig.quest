import { Tooltip, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { EventDetails } from "../Interfaces";

export const Prices = (props: { eventDetails: EventDetails }) => {
  return (
    <Tooltip
      arrow
      color="success"
      followCursor
      size="lg"
      title={
        props.eventDetails.event.stats?.average_price
          ? `Avg.: $${props.eventDetails.event.stats?.average_price}`
          : "¯\\_(ツ)_/¯"
      }
      variant="soft"
      component={motion.div}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      drag
      dragSnapToOrigin
    >
      <Typography>
        {props.eventDetails.event.stats?.lowest_price
          ? `$${props.eventDetails.event.stats?.lowest_price} - $${props.eventDetails.event.stats?.highest_price}`
          : "¯\\_(ツ)_/¯"}
      </Typography>
    </Tooltip>
  );
};
