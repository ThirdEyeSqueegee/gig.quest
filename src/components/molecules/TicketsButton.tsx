import { Button, Link } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { MdLocalActivity } from "react-icons/md";

import { useViewStore } from "../../stores/useViewStore.ts";

export const TicketsButton = memo(function TicketsButton(props: { url?: string }) {
  const { url } = props;

  const tableView = useViewStore((state) => state.tableView);

  return (
    <Button sx={{ fontWeight: "md", paddingInline: tableView ? "0.75rem" : "0.5rem" }} {...styles.ticketButton}>
      <Link href={url} {...styles.link}>
        Tickets
      </Link>
    </Button>
  );
});

const styles = {
  link: {
    fontSize: "sm",
    overlay: true,
    underline: "none",
  },
  ticketButton: {
    component: m.button,
    size: "sm",
    startDecorator: <MdLocalActivity />,
    variant: "outlined",
    whileTap: { scale: 0.9 },
  },
} as const;
