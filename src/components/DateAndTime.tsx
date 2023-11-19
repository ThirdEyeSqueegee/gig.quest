import { Typography } from "@mui/joy";
import { memo } from "react";

export const DateAndTime = memo(function DateAndTime(props: { datetime?: string; size?: string }) {
  return (
    <Typography fontSize={props.size}>
      {new Date(props.datetime!).toLocaleString("en", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </Typography>
  );
});
