import { LinearProgress, Tooltip } from "@mui/joy";
import { useEffect } from "react";
import { useCountUp } from "use-count-up";
import { TEvent } from "../Types";

export const PopularityBar = (props: { e: TEvent }) => {
  const { value, reset } = useCountUp({
    isCounting: true,
    duration: 1,
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
        sx={{
          "&:hover": {
            transform: "scale(1.1)",
            transition: "all 0.15s ease-out",
          },
        }}
      />
    </Tooltip>
  );
};
