import { Typography } from "@mui/joy";
import { memo } from "react";

export const DateAndTime = memo(function DateAndTime(props: { datetime?: string; size?: string }) {
  const { size } = props;

  return (
    <Typography fontSize={size}>
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
