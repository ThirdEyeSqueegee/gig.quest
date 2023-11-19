import { LocalActivity } from "@mui/icons-material";
import { Button, Link } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";

export const TicketsButton = memo(function TicketsButton(props: { url?: string }) {
  return (
    <Button size="sm" variant="outlined" {...styles.ticketButton}>
      <Link fontSize={isMobile ? "0.8rem" : "0.9rem"} href={props.url} overlay underline="none">
        Tickets
      </Link>
    </Button>
  );
});

const styles = {
  ticketButton: {
    component: m.button,
    startDecorator: <LocalActivity />,
    sx: {
      fontWeight: "normal",
    },
    whileTap: { scale: 0.9 },
  },
};
