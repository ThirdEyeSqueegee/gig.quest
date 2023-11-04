import { Box, Chip, CircularProgress } from "@mui/joy";

export const SpotifyTooltip = (props: { genres: string[] | undefined }) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={1}
      maxWidth="400px"
      justifyContent="center"
    >
      {props.genres && props.genres.length > 0 ? (
        props.genres.map((genre, i) => {
          return (
            <Chip key={i} color="success">
              {genre}
            </Chip>
          );
        })
      ) : props.genres && props.genres.length === 0 ? (
        "¯\\_(ツ)_/¯"
      ) : (
        <CircularProgress color="success" />
      )}
    </Box>
  );
};
