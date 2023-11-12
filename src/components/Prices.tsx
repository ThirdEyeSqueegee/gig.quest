import { Tooltip, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { useContext } from "react";
import { SGEvent } from "../Interfaces";
import { PaginationContext } from "../contexts/PaginationContext";

export const Prices = (props: { event: SGEvent }) => {
  const { props: pagination } = useContext(PaginationContext);

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
      <Typography fontSize={pagination.tableView ? "0.9rem" : "0.725rem"}>
        {props.event.stats?.lowest_price
          ? `$${props.event.stats?.lowest_price} - $${props.event.stats?.highest_price}`
          : "¯\\_(ツ)_/¯"}
      </Typography>
    </Tooltip>
  );
};
