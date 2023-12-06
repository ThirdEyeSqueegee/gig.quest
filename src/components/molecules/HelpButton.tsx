import { ClickAwayListener } from "@mui/base";
import { IconButton, List, ListItem, Tooltip, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useState } from "react";
import { GoQuestion } from "react-icons/go";

const HelpBox = memo(function HelpBox() {
  return (
    <List marker="disc" sx={{ "--ListItem-minHeight": "1rem" }}>
      <ListItem>
        <Typography fontSize="sm">Hover/tap event icon to see event type</Typography>
      </ListItem>
      <ListItem>
        <Typography fontSize="sm">Click/tap artist&apos;s name to see genres</Typography>
      </ListItem>
      <ListItem>
        <Typography fontSize="sm">Click/tap Spotify tooltip to go artist&apos;s Spotify</Typography>
      </ListItem>
      <ListItem>
        <Typography fontSize="sm">Search keywords like &quot;concert&quot; or &quot;NBA&quot; to filter events</Typography>
      </ListItem>
      <ListItem>
        <Typography fontSize="sm">Drag range slider to 0 to see all events regardless of location</Typography>
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
          <GoQuestion fontSize="1.5rem" />
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
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "rgba(0, 0, 0, 0.25)" },
    title: <HelpBox />,
  },
};
