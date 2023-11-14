import { Box, Button, Chip, CircularProgress, Link } from "@mui/joy";
import useSWR from "swr";
import { spotifySearchArtist } from "../api/API";
import SpotifyIcon from "../assets/spotify_icon.svg";

export const SpotifyTooltip = (props: { artist: string }) => {
  const { data: artistItem } = useSWR(["artist", props.artist], ([, a]) => spotifySearchArtist(a));

  return (
    <Box display="flex" flexWrap="wrap" gap={1} maxWidth="20rem" justifyContent="center" py={0.5}>
      {artistItem ? (
        artistItem.genres && artistItem.genres.length > 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1}>
              {artistItem.genres.map((genre, i) => {
                return (
                  <Chip key={i} color="success" size="sm">
                    {genre}
                  </Chip>
                );
              })}
            </Box>
            <Button
              size="sm"
              variant="plain"
              color="success"
              startDecorator={
                <Link overlay href={artistItem.external_urls?.spotify?.replace("https://open.spotify.com/", "spotify:").replaceAll("/", ":")}>
                  <img src={SpotifyIcon} width="20px" height="20px" />
                </Link>
              }
              sx={{
                fontWeight: "normal",
              }}
            >
              Open Spotify
            </Button>
          </Box>
        ) : (
          "¯\\_(ツ)_/¯"
        )
      ) : (
        <CircularProgress color="success" size="sm" />
      )}
    </Box>
  );
};
