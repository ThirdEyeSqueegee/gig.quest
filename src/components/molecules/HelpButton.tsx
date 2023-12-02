import { ClickAwayListener } from "@mui/base";
import { QuestionMark } from "@mui/icons-material";
import { IconButton, List, ListItem, Tooltip, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useState } from "react";

import { Flexbox } from "../atoms/Flexbox.tsx";

const HelpBox = memo(function HelpBox() {
  return (
    <Flexbox flexDirection="column">
      <List
        marker="disc"
        sx={{
          "--ListItem-minHeight": "1rem",
          "--ListItem-paddingY": 0,
        }}
      >
        <ListItem>
          <Typography level="body-sm">Hover/tap event icon to see event type</Typography>
        </ListItem>
        <ListItem>
          <Typography level="body-sm">Click/tap artist&apos;s name to see genres</Typography>
        </ListItem>
        <ListItem>
          <Typography level="body-sm">Click/tap Spotify tooltip to go the artist&apos;s Spotify</Typography>
        </ListItem>
      </List>
    </Flexbox>
  );
});

export const HelpButton = memo(function HelpButton() {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
      <Tooltip open={tooltipOpen} placement="right-end" {...styles.tooltip}>
        <IconButton onClick={() => setTooltipOpen(!tooltipOpen)} sx={styles.helpButton}>
          <QuestionMark />
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
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "rgba(0, 0, 0, 0.5)" },
    title: <HelpBox />,
  },
};
