import { Button, Link } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";
import { MdLocalActivity } from "react-icons/md";

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
    startDecorator: <MdLocalActivity />,
    sx: { fontWeight: "normal" },
    whileTap: { scale: 0.9 },
  },
  ticketLink: {
    fontSize: isMobile ? "0.8rem" : "0.9rem",
    overlay: true,
  },
};
