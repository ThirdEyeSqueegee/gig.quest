import { LocalActivity } from "@mui/icons-material";
import { Button, Link } from "@mui/joy";
import { m } from "framer-motion";
import { isMobile } from "react-device-detect";

export const TicketsButton = (props: { url?: string }) => {
  return (
    <Button size="sm" variant="outlined" {...styles.ticketButton}>
      <Link overlay href={props.url} fontSize={isMobile ? "0.8rem" : "0.9rem"} underline="none">
        Tickets
      </Link>
    </Button>
  );
};

const styles = {
  ticketButton: {
    component: m.button,
    whileTap: { scale: 0.9 },
    startDecorator: <LocalActivity />,
    sx: {
      fontWeight: "normal",
    },
  },
};
