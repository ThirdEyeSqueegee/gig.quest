import { LocalActivity } from "@mui/icons-material";
import { Button, Link } from "@mui/joy";
import { motion } from "framer-motion";

export const TicketsButton = (props: { url?: string }) => {
  return (
    <Button
      size="sm"
      component={motion.button}
      whileTap={{ scale: 0.9 }}
      startDecorator={<LocalActivity />}
      variant="outlined"
    >
      <Link overlay href={props.url} target="_blank" rel="noopener">
        Tickets
      </Link>
    </Button>
  );
};
