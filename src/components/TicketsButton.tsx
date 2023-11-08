import { LocalActivity } from "@mui/icons-material";
import { Button, Link } from "@mui/joy";
import { motion } from "framer-motion";

export const TicketsButton = (props: { url?: string; mt?: number }) => {
  return (
    <Button
      component={motion.button}
      whileTap={{ scale: 0.9 }}
      size="sm"
      startDecorator={<LocalActivity />}
      variant="outlined"
      sx={props.mt ? { mt: props.mt } : {}}
    >
      <Link
        href={props.url}
        overlay
        rel="noopener"
        target="_blank"
        underline="none"
      >
        Tickets
      </Link>
    </Button>
  );
};
