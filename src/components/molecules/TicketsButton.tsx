import { Button, Link } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { MdLocalActivity } from "react-icons/md";

import { useViewStore } from "../../stores/useViewStore.ts";

export const TicketsButton = memo(function TicketsButton(props: { url?: string }) {
  const { url } = props;

  const tableView = useViewStore((state) => state.tableView);

  return (
    <Button size="sm" variant="outlined" {...styles.ticketButton} sx={{ fontWeight: "md", paddingInline: tableView ? "0.75rem" : "0.5rem" }}>
      <Link fontSize="sm" href={url} overlay underline="none">
        Tickets
      </Link>
    </Button>
  );
});

const styles = {
  ticketButton: {
    component: m.button,
    startDecorator: <MdLocalActivity />,
    whileTap: { scale: 0.9 },
  },
};
