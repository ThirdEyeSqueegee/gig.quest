import { Typography } from "@mui/joy";
import { memo } from "react";

export const DateAndTime = memo(function DateAndTime(props: { datetime?: string; size?: string }) {
  return (
    <Typography fontSize={props.size}>
      {new Date(props.datetime!).toLocaleString("en", {
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        month: "short",
        weekday: "short",
        year: "numeric",
      })}
    </Typography>
  );
});
