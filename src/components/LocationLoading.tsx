import { LocationOn } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";

export const LocationLoading = memo(function LocationLoading() {
  return (
    <Box alignItems="center" display="flex" flexDirection="column" gap={2} height="85vh" justifyContent="center">
      <CircularProgress size="lg" {...styles.loading}>
        <LocationOn htmlColor="red" />
      </CircularProgress>
      <Typography level="body-sm">Waiting for location...</Typography>
    </Box>
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
