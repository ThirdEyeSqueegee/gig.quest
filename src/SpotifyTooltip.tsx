import { Chip } from "@mui/joy";
import { Box } from "@mui/material";
import { ArtistDetails } from "./Interfaces";
import { useEffect, useState } from "react";

export const SpotifyTooltip = (props: {
  artist: string;
  getArtistDetails: (artistName: string) => Promise<ArtistDetails>;
}) => {
  const [artistDetails, setArtistDetails] = useState<ArtistDetails>();

  useEffect(() => {
    props.getArtistDetails(props.artist).then((details) => {
      setArtistDetails(details);
    });
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={1}
      maxWidth="400px"
      justifyContent="center"
    >
      {artistDetails?.genres.map((genre, i) => {
        return (
          <Chip key={i} color="success">
            {genre}
          </Chip>
        );
      })}
    </Box>
  );
};
