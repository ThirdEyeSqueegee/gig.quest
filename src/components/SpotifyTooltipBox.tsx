import { Box, Chip, CircularProgress, Link, Typography } from "@mui/joy";
import useSWR from "swr";
import { getSpotifyToken, spotifySearchArtist } from "../api/API";
import SpotifyIcon from "../assets/spotify_icon.svg";

export const SpotifyTooltipBox = (props: { artist: string }) => {
  const { data: token, error, isLoading } = useSWR("spotifyToken", () => getSpotifyToken());

  const { data: artistItem, isLoading: artistLoading } = useSWR(!error && !isLoading ? ["artist", props.artist] : null, ([, a]) =>
    spotifySearchArtist(a, token!.token),
  );

  if (artistLoading) {
    return (
      <Box display="flex" maxWidth="20rem" justifyContent="center" p={1}>
        <CircularProgress size="sm" color="success" />
      </Box>
    );
  }

  if (artistItem?.id === "-1") {
    return (
      <Box display="flex" maxWidth="20rem" justifyContent="center" p={1}>
        ¯\_(ツ)_/¯
      </Box>
    );
  }

  return (
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
  );
};
