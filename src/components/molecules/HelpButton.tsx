import { ClickAwayListener } from "@mui/base";
import { IconButton, List, ListItem, Tooltip, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

const HelpBox = memo(function HelpBox() {
  return (
    <List {...styles.list}>
      <ListItem>
        <Typography {...styles.typography}>Hover/tap event icon to see event type</Typography>
      </ListItem>
      <ListItem>
        <Typography {...styles.typography}>Click/tap artist name to see genres</Typography>
      </ListItem>
      <ListItem>
        <Typography {...styles.typography}>Click/tap Spotify tooltip to go artist&apos;s Spotify</Typography>
      </ListItem>
      <ListItem>
        <Typography {...styles.typography}>Click/tap team name to see stats</Typography>
      </ListItem>
      <ListItem>
        <Typography {...styles.typography}>Click/tap ESPN tooltip to go team ESPN page</Typography>
      </ListItem>
      <ListItem>
        <Typography {...styles.typography}>Drag range slider all the way to the right to see all events regardless of location</Typography>
      </ListItem>
    </List>
  );
});

export const HelpButton = memo(function HelpButton() {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
      <Tooltip open={tooltipOpen} {...styles.tooltip}>
        <IconButton onClick={() => setTooltipOpen(!tooltipOpen)} sx={styles.helpButton}>
          <FiHelpCircle fontSize="1.5rem" />
        </IconButton>
      </Tooltip>
    </ClickAwayListener>
  );
});

const styles = {
  helpButton: {
    "&:hover, &:active": { backgroundColor: "transparent" },
    left: "0.2rem",
    position: "absolute",
    top: "0.25rem",
  },
  list: {
    marker: "disc",
    sx: { "--ListItem-minHeight": "1rem", pr: 1 },
  },
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "rgba(0, 0, 0, 0.25)" },
    title: <HelpBox />,
    variant: "outlined",
  },
  typography: {
    fontSize: "sm",
    sx: { userSelect: "none" },
  },
} as const;
