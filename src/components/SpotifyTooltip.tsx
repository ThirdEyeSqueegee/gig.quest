import { Box, Chip } from "@mui/joy";

export const SpotifyTooltip = (props: { genres?: string[] }) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={1}
      maxWidth="20rem"
      justifyContent="center"
    >
      {props.genres && props.genres.length > 0
        ? props.genres.map((genre, i) => {
            return (
              <Chip key={i} color="success">
                {genre}
              </Chip>
            );
          })
        : "¯\\_(ツ)_/¯"}
    </Box>
  );
};
