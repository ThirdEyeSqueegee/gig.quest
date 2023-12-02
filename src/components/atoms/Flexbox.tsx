import { Box, styled } from "@mui/joy";

export const Flexbox = styled(Box)(({ ...props }) => ({
  alignItems: (props.alignItems as string) ?? "center",
  display: "flex",
  justifyContent: (props.justifyContent as string) ?? "center",
}));
