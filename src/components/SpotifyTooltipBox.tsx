import { Box, Button, Chip, CircularProgress } from "@mui/joy";
import { m } from "framer-motion";
import useSWR from "swr";
import { spotifySearchArtist } from "../api/API";
import SpotifyIcon from "../assets/spotify_icon.svg";

export const SpotifyTooltipBox = (props: { artist: string }) => {
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
              startDecorator={<img src={SpotifyIcon} width="20px" height="20px" />}
              sx={{
                fontSize: "0.8rem",
                fontWeight: "normal",
                borderRadius: "15px",
              }}
              onClick={e => e.stopPropagation()}
              component={m.a}
              href={artistItem.external_urls?.spotify}
              target="_blank"
              rel="noopener"
              whileTap={{ scale: 0.9 }}
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
