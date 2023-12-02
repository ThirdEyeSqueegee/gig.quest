import { Box, BoxProps, styled } from "@mui/joy";
import { MotionProps } from "framer-motion";

export const Flexbox = styled(Box)<BoxProps & MotionProps>(({ ...props }) => ({
  alignItems: (props.alignItems as string) ?? "center",
  display: (props.display as string) ?? "flex",
  justifyContent: (props.justifyContent as string) ?? "center",
}));
