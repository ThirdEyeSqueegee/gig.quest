import { ClickAwayListener } from "@mui/base";
import { Chip, CircularProgress, Link, Tooltip, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useState } from "react";
import { isMobile } from "react-device-detect";

import { ArtistItem } from "../../Interfaces.ts";
import SpotifyIcon from "../../assets/spotify_icon.svg";
import { Flexbox } from "./Flexbox.tsx";

export const SpotifyTooltip = memo(function SpotifyTooltip(props: { artistItem?: ArtistItem; performerName?: string }) {
  const { artistItem, performerName } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
      <Tooltip
        open={tooltipOpen}
        sx={{ backdropFilter: "blur(8px)", backgroundColor: "transparent", borderRadius: "15px" }}
        title={
          !artistItem || artistItem.id === "-1" ?
            <Flexbox maxWidth="20rem" p={1}>
              ¯\_(ツ)_/¯
            </Flexbox>
          : <Link color="success" fontSize="0.8rem" href={artistItem?.external_urls?.spotify} overlay underline="none">
              <Flexbox maxWidth="20rem" p={1}>
                <Flexbox flexDirection="column" gap={1}>
                  <Typography level="body-sm" startDecorator={<img height="20px" src={SpotifyIcon} width="20px" />}>
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
        <Typography fontSize={isMobile ? "0.9rem" : "1rem"} onClick={() => setTooltipOpen(!tooltipOpen)}>
          {artistItem ?
            artistItem.id === "-1" ?
              performerName
            : <Link>{artistItem.name}</Link>
          : <CircularProgress />}
        </Typography>
      </Tooltip>
    </ClickAwayListener>
  );
});

const styles = {
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
  },
};
