import { LinearProgress, Tooltip } from "@mui/joy";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCountUp } from "use-count-up";
import { Event } from "../Interfaces";

export const PopularityBar = (props: { e: Event }) => {
  const { value, reset } = useCountUp({
    isCounting: true,
    duration: 0.5,
    start: 0,
    end: props.e.score ? props.e.score * 100 : 0,
  });

  useEffect(() => {
    reset();
  }, [props.e]);

  return (
    <Tooltip
      arrow
      followCursor
      title={props.e.score && (props.e.score * 100).toFixed(1)}
      variant="soft"
    >
      <LinearProgress
        component={motion.div}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        drag
        dragSnapToOrigin
        color={
          props.e.score! > 0.75
            ? "success"
            : props.e.score! > 0.5
            ? "primary"
            : props.e.score! > 0.25
            ? "warning"
            : "danger"
        }
        determinate
        thickness={7}
        value={Number(value!)}
        variant="solid"
      />
    </Tooltip>
  );
};
