import { LinearProgress, Tooltip } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";
import { useCountUp } from "use-count-up";

export const PopularityBar = memo(function PopularityBar(props: { score?: number }) {
  const { score } = props;

  const { value } = useCountUp({
    duration: 0.5,
    end: score ? score * 100 : 0,
    isCounting: true,
    start: 0,
  });

  const color =
    score ?
      score > 0.75 ? "success"
      : score > 0.5 ? "primary"
      : score > 0.25 ? "warning"
      : "danger"
    : "neutral";

  return (
    <Tooltip title={score ? `Popularity: ${(score * 100).toFixed(1)}` : "¯\\_(ツ)_/¯"} {...styles.tooltip}>
      <LinearProgress color={color} value={+value!} {...styles.progressBar} />
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
    size: "lg",
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    followCursor: true,
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "transparent" },
  },
} as const;
