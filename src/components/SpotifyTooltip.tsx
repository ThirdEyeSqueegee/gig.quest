import { Box, Chip, CircularProgress, Link } from "@mui/joy";
import useSWR from "swr";
import { spotifySearchArtist } from "../api/API";

export const SpotifyTooltip = (props: { artist: string }) => {
  const { data: artistItem } = useSWR(["artist", props.artist], ([, a]) => spotifySearchArtist(a));

  return (
    <Box display="flex" flexWrap="wrap" gap={1} maxWidth="20rem" justifyContent="center">
      {artistItem ? (
        artistItem.genres && artistItem.genres.length > 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1}>
              {artistItem.genres.map((genre, i) => {
                return (
                  <Chip key={i} color="success" size="sm">
                    {genre}
                  </Chip>
                );
              })}
            </Box>
            <Link overlay href={artistItem.external_urls?.spotify} />
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
