import { ClickAwayListener } from "@mui/base";
import { Chip, CircularProgress, Link, Tooltip, Typography } from "@mui/joy";
import { Artist } from "@spotify/web-api-ts-sdk";
import { m } from "framer-motion";
import { memo, useState } from "react";

import SpotifyIcon from "../../assets/spotify_icon.svg";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const SpotifyTooltip = memo(function SpotifyTooltip(props: { artist?: Artist; performerName?: string }) {
  const { artist, performerName } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
      <Tooltip
        open={tooltipOpen}
        title={
          !artist || artist.id === "notFound" ?
            <Flexbox {...styles.tooltipBox}>¯\_(ツ)_/¯</Flexbox>
          : <Link href={artist.external_urls?.spotify} overlay underline="none">
              <Flexbox {...styles.tooltipBox}>
                <Typography {...styles.typography}>{artist.followers?.total.toLocaleString()} followers</Typography>
                <Flexbox flexWrap="wrap" gap={1}>
                  {artist.genres?.map((genre) => {
                    return (
                      <Chip color="success" key={artist.id + genre} size="sm">
                        {genre}
                      </Chip>
                    );
                  })}
                </Flexbox>
              </Flexbox>
            </Link>
        }
        {...styles.tooltip}
      >
        <Typography onClick={() => setTooltipOpen(!tooltipOpen)}>
          {artist?.id === "notFound" ?
            performerName
          : artist?.id === "loading" ?
            <CircularProgress size="xs" />
          : <Link>{artist?.name}</Link>}
        </Typography>
      </Tooltip>
    </ClickAwayListener>
  );
});

const styles = {
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "transparent", borderRadius: "1rem" },
    variant: "outlined",
  },
  tooltipBox: {
    flexDirection: "column",
    maxWidth: "20rem",
    p: 0.5,
  },
  typography: {
    level: "body-sm",
    startDecorator: <img height={16} src={SpotifyIcon} />,
  },
} as const;
