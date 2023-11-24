import { Box, Chip, CircularProgress, Link, Tooltip, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useState } from "react";
import { isMobile } from "react-device-detect";
import useSWR from "swr";

import { SpotifyToken } from "../Interfaces.ts";
import { getSpotifyToken, spotifySearchArtist } from "../api/API.ts";
import SpotifyIcon from "../assets/spotify_icon.svg";

export const SpotifyTooltipBox = memo(function SpotifyTooltip(props: { artist: string }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const { data: token, error, isLoading } = useSWR<SpotifyToken, Error>("spotifyToken", () => getSpotifyToken());

  const { data: artistItem, isLoading: artistLoading } = useSWR(!error && !isLoading ? ["artist", props.artist] : null, ([, a]) =>
    spotifySearchArtist(a, token!.token),
  );

  if (artistLoading) {
    return (
      <Tooltip
        open={tooltipOpen}
        sx={{ backdropFilter: "blur(10px)", backgroundColor: "transparent", borderRadius: "15px" }}
        title={
          <Box display="flex" justifyContent="center" maxWidth="20rem" p={1}>
            <CircularProgress color="success" size="sm" />
          </Box>
        }
        variant="outlined"
        {...styles.tooltip}
      >
        <Typography fontSize={isMobile ? "0.9rem" : "1rem"} onClick={() => setTooltipOpen(!tooltipOpen)}>
          {props.artist}
        </Typography>
      </Tooltip>
    );
  }

  if (artistItem?.id === "-1") {
    return (
      <Tooltip
        open={tooltipOpen}
        sx={{ backdropFilter: "blur(10px)", backgroundColor: "transparent", borderRadius: "15px" }}
        title={
          <Box display="flex" justifyContent="center" maxWidth="20rem" p={1}>
            ¯\_(ツ)_/¯
          </Box>
        }
        variant="outlined"
        {...styles.tooltip}
      >
        <Typography fontSize={isMobile ? "0.9rem" : "1rem"} onClick={() => setTooltipOpen(!tooltipOpen)}>
          {props.artist}
        </Typography>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      open={tooltipOpen}
      sx={{ backdropFilter: "blur(10px)", backgroundColor: "transparent", borderRadius: "15px" }}
      title={
        <Link color="success" fontSize="0.8rem" href={artistItem?.external_urls?.spotify} overlay underline="none">
          <Box display="flex" justifyContent="center" maxWidth="20rem" p={1}>
            {artistItem ? (
              <Box alignItems="center" display="flex" flexDirection="column" gap={1}>
                <Typography level="body-sm" startDecorator={<img height="20px" src={SpotifyIcon} width="20px" />}>
                  {artistItem.followers?.total?.toLocaleString()} followers
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
                  {artistItem.genres?.map((genre, i) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <Chip color="success" key={`${artistItem.id}${i}`} size="sm">
                        {genre}
                      </Chip>
                    );
                  })}
                </Box>
              </Box>
            ) : null}
          </Box>
        </Link>
      }
      variant="outlined"
      {...styles.tooltip}
    >
      <Typography fontSize={isMobile ? "0.9rem" : "1rem"} onClick={() => setTooltipOpen(!tooltipOpen)}>
        <Link>{props.artist}</Link>
      </Typography>
    </Tooltip>
  );
});

const styles = {
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
  },
};
