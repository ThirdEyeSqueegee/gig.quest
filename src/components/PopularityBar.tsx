import { LinearProgress, Tooltip } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";
import { useCountUp } from "use-count-up";

export const PopularityBar = memo(function PopularityBar(props: { score?: number }) {
  const { value } = useCountUp({
    duration: 0.5,
    end: props.score ? props.score * 100 : 0,
    isCounting: true,
    start: 0,
  });

  return (
    <Tooltip followCursor placement="top" title={props.score ? (props.score * 100).toFixed(1) : "¯\\_(ツ)_/¯"} {...styles.tooltip}>
      <LinearProgress
        color={props.score ? (props.score > 0.75 ? "success" : props.score > 0.5 ? "primary" : props.score > 0.25 ? "warning" : "danger") : "neutral"}
        value={Number(value)}
        variant="soft"
        {...styles.progressBar}
      />
    </Tooltip>
  );
});

const styles = {
  progressBar: {
    component: m.div,
    determinate: true,
    drag: !isMobile,
    dragSnapToOrigin: !isMobile,
    dragTransition: { bounceDamping: 10, bounceStiffness: 500 },
    thickness: 8,
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
  },
};
