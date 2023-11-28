import { LocalActivity } from "@mui/icons-material";
import { Button, Link } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";

export const TicketsButton = memo(function TicketsButton(props: { url?: string }) {
  const { url } = props;

  return (
    <Button size="sm" variant="outlined" {...styles.ticketButton}>
      <Link href={url} underline="none" {...styles.ticketLink}>
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
  ticketLink: {
    fontSize: isMobile ? "0.8rem" : "0.9rem",
    overlay: true,
  },
};
