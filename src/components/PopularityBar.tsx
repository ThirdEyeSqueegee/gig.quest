import { LinearProgress, Tooltip } from "@mui/joy";
import { m } from "framer-motion";
import { isMobile } from "react-device-detect";
import { useCountUp } from "use-count-up";
import { SGEvent } from "../Interfaces";

export const PopularityBar = (props: { event: SGEvent }) => {
  const { value } = useCountUp({
    isCounting: true,
    duration: 0.5,
    start: 0,
    end: props.event.score ? props.event.score * 100 : 0,
  });

  return (
    <Tooltip followCursor title={props.event.score && (props.event.score * 100).toFixed(1)} {...styles.tooltip}>
      <LinearProgress
        color={props.event.score! > 0.75 ? "success" : props.event.score! > 0.5 ? "primary" : props.event.score! > 0.25 ? "warning" : "danger"}
        value={Number(value)}
        variant="solid"
        {...styles.progressBar}
      />
    </Tooltip>
  );
};

const styles = {
  tooltip: {
    component: m.div,
    animate: { opacity: [0, 1] },
  },
  progressBar: {
    determinate: true,
    thickness: 8,
    component: m.div,
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    drag: !isMobile,
    dragSnapToOrigin: !isMobile,
    dragTransition: { bounceStiffness: 500, bounceDamping: 10 },
  },
};
