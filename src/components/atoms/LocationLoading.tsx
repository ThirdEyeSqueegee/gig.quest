import { LocationOn } from "@mui/icons-material";
import { CircularProgress, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";

import { Flexbox } from "./Flexbox.tsx";

export const LocationLoading = memo(function LocationLoading() {
  return (
    <Flexbox flexDirection="column" gap={2} height="85vh">
      <CircularProgress size="lg" {...styles.loading}>
        <LocationOn htmlColor="red" />
      </CircularProgress>
      <Typography level="body-sm">Waiting for location...</Typography>
    </Flexbox>
  );
});

const styles = {
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
