import { LocationOn } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/joy";
import { m } from "framer-motion";

export const LocationLoading = () => {
  return (
    <Box display="flex" flexDirection="column" height="100%" justifyContent="center" alignItems="center" gap={2}>
      <CircularProgress size="lg" {...styles.loading}>
        <LocationOn htmlColor="red" />
      </CircularProgress>
      <Typography level="body-sm">Waiting for location...</Typography>
    </Box>
  );
};

const styles = {
  loading: {
    component: m.span,
    animate: { scale: 1.25 },
    transition: {
      repeat: Infinity,
      duration: 1,
      repeatType: "mirror",
    },
  },
};
