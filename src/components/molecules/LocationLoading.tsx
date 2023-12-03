import { CircularProgress, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { MdLocationOn } from "react-icons/md";

import { Flexbox } from "../atoms/Flexbox.tsx";

export const LocationLoading = memo(function LocationLoading() {
  return (
    <Flexbox flexDirection="column" {...styles.flex}>
      <CircularProgress size="lg" {...styles.loading}>
        <MdLocationOn color="red" />
      </CircularProgress>
      <Typography level="body-sm">Waiting for location...</Typography>
    </Flexbox>
  );
});

const styles = {
  flex: {
    gap: 2,
    height: "85vh",
  },
  loading: {
    animate: { scale: 1.25 },
    component: m.span,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};
