import type { BoxProps } from "@mui/joy";
import type { MotionProps } from "framer-motion";

import { Box, styled } from "@mui/joy";

export const Flexbox = styled(Box)<BoxProps & MotionProps>(({ ...props }) => ({
  alignItems: props.alignItems ? (props.alignItems as string) : "center",
  display: props.display ? (props.display as string) : "flex",
  justifyContent: props.justifyContent ? (props.justifyContent as string) : "center",
}));
