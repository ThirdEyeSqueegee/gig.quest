import { Box, BoxProps, styled } from "@mui/joy";
import { Transition } from "framer-motion";
import { ElementType } from "react";

export const Flexbox = styled(Box)<BoxProps & Transition & { component?: ElementType }>((props) => ({
  alignItems: (props.alignItems as string) ?? "center",
  display: "flex",
  justifyContent: (props.justifyContent as string) ?? "center",
}));
