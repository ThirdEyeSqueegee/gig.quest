import { Tooltip, Typography } from "@mui/joy";
import { format, formatDistanceToNow } from "date-fns";
import { m } from "framer-motion";
import { memo } from "react";

import { useViewStore } from "../../stores/useViewStore.ts";

export const DateAndTime = memo(function DateAndTime(props: { datetime?: string }) {
  const { datetime } = props;

  const tableView = useViewStore((state) => state.tableView);

  const date = datetime ? new Date(datetime) : undefined;

  return (
    <Tooltip title={date ? formatDistanceToNow(date) : "¯\\_(ツ)_/¯"} {...styles.tooltip}>
      <Typography fontSize={tableView ? "sm" : "xs"} sx={{ userSelect: "none" }}>
        {date ? format(date, "E, MMM d, y @ p") : "¯\\_(ツ)_/¯"}
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
