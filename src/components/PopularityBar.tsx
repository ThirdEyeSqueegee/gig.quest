import { LinearProgress, Tooltip } from "@mui/joy";
import { TEvent } from "../Types";

export const PopularityBar = (props: { e: TEvent }) => {
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
        value={props.e.score && props.e.score * 100}
        variant="solid"
      />
    </Tooltip>
  );
};
