import { Box, Chip, CircularProgress, Link, Tooltip, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useState } from "react";
import { isMobile } from "react-device-detect";
import useSWR from "swr";
import { getSpotifyToken, spotifySearchArtist } from "../api/API";
import SpotifyIcon from "../assets/spotify_icon.svg";

export const SpotifyTooltipBox = memo(function SpotifyTooltip(props: { artist: string }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const { data: token, error, isLoading } = useSWR("spotifyToken", () => getSpotifyToken());

  const { data: artistItem, isLoading: artistLoading } = useSWR(!error && !isLoading ? ["artist", props.artist] : null, ([, a]) =>
    spotifySearchArtist(a, token!.token),
  );

  if (artistLoading) {
    return (
      <Tooltip
        open={tooltipOpen}
        title={
          <Box display="flex" maxWidth="20rem" justifyContent="center" p={1}>
            <CircularProgress size="sm" color="success" />
          </Box>
        }
        variant="outlined"
        sx={{ borderRadius: "15px", backgroundColor: "transparent", backdropFilter: "blur(15px)" }}
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
        title={
          <Box display="flex" maxWidth="20rem" justifyContent="center" p={1}>
            ¯\_(ツ)_/¯
          </Box>
        }
        variant="outlined"
        sx={{ borderRadius: "15px", backgroundColor: "transparent", backdropFilter: "blur(15px)" }}
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
      title={
        <Link href={artistItem?.external_urls?.spotify} overlay underline="none" color="success" fontSize="0.8rem">
          <Box display="flex" maxWidth="20rem" justifyContent="center" p={1}>
            {artistItem && (
              <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Typography level="body-sm" startDecorator={<img src={SpotifyIcon} width="20px" height="20px" />}>
                  {artistItem.followers?.total?.toLocaleString()} followers
                </Typography>
                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
                  {artistItem.genres?.map((genre, i) => {
                    return (
                      <Chip key={i} color="success" size="sm">
                        {genre}
                      </Chip>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        </Link>
      }
      variant="outlined"
      sx={{ borderRadius: "15px", backgroundColor: "transparent", backdropFilter: "blur(15px)" }}
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
    component: m.div,
    animate: { opacity: [0, 1] },
  },
};
