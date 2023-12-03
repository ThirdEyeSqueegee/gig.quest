import { Tooltip, Typography } from "@mui/joy";
import { format, formatDistanceToNow } from "date-fns";
import { m } from "framer-motion";
import { memo } from "react";

export const DateAndTime = memo(function DateAndTime(props: { datetime?: string; size?: string }) {
  const { datetime, size } = props;

  const date = new Date(datetime!);

  return (
    <Tooltip title={formatDistanceToNow(date)} {...styles.tooltip}>
      <Typography fontSize={size} sx={{ userSelect: "none" }}>
        {format(date, "E, MMM d, y @ p")}
      </Typography>
    </Tooltip>
  );
});

const styles = {
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    followCursor: true,
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "transparent", borderRadius: "15px" },
  },
};
