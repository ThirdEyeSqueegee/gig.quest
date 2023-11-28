import { ClickAwayListener } from "@mui/base";
import { Chip, Link, Tooltip, Typography } from "@mui/joy";
import { CircularProgress } from "@mui/material";
import { m } from "framer-motion";
import { memo, useState } from "react";
import { isMobile } from "react-device-detect";

import { ArtistItem } from "../../Interfaces.ts";
import SpotifyIcon from "../../assets/spotify_icon.svg";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const SpotifyTooltip = memo(function SpotifyTooltip(props: { artistItem?: ArtistItem; performerName?: string }) {
  const { artistItem, performerName } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
      <Tooltip
        open={tooltipOpen}
        title={
          !artistItem || artistItem.id === "-1" ?
            <Flexbox {...styles.tooltipBox}>¯\_(ツ)_/¯</Flexbox>
          : <Link color="success" href={artistItem?.external_urls?.spotify} underline="none" {...styles.tooltipLink}>
              <Flexbox {...styles.tooltipBox}>
                <Flexbox flexDirection="column" gap={1}>
                  <Typography level="body-sm" {...styles.artistFollowers}>
                    {artistItem.followers?.total?.toLocaleString()} followers
                  </Typography>
                  <Flexbox flexWrap="wrap" gap={1}>
                    {artistItem.genres?.map((genre, i) => {
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <Chip color="success" key={`${artistItem.id}${i}`} size="sm">
                          {genre}
                        </Chip>
                      );
                    })}
                  </Flexbox>
                </Flexbox>
              </Flexbox>
            </Link>
        }
        variant="outlined"
        {...styles.tooltip}
      >
        <Typography onClick={() => setTooltipOpen(!tooltipOpen)} {...styles.artistName}>
          {artistItem?.id === "notFound" ?
            performerName
          : artistItem?.id === "loading" ?
            <CircularProgress size="xs" />
          : <Link>{artistItem?.name}</Link>}
        </Typography>
      </Tooltip>
    </ClickAwayListener>
  );
});

const styles = {
  artistFollowers: {
    startDecorator: <img height="16px" src={SpotifyIcon} />,
  },
  artistName: {
    fontSize: isMobile ? "0.9rem" : "1rem",
  },
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { backdropFilter: "blur(8px)", backgroundColor: "transparent", borderRadius: "15px" },
  },
  tooltipBox: {
    gap: 1,
    maxWidth: "20rem",
  },
  tooltipLink: {
    fontSize: "0.8rem",
    overlay: true,
  },
};
