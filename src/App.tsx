import { Box, Card, Divider, IconButton, Link, Typography } from "@mui/joy";
import { useOrientation } from "@uidotdev/usehooks";
import TypeIt from "typeit-react";
import MainTable from "./MainTable";
import { GitHub } from "@mui/icons-material";

export default function App() {
  const orientation = useOrientation();

  return (
    <Box
      sx={{
        height: "100vh",
        p: orientation.type.includes("portrait") ? 1 : 3,
      }}
    >
      <Card
        sx={{
          pt: 0,
          px: 0,
          alignItems: "center",
        }}
      >
        <Typography fontSize="4rem">
          <TypeIt>gig.quest</TypeIt>
        </Typography>
        <IconButton
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          <Link
            href="https://github.com/ThirdEyeSqueegee/gig.quest"
            target="_blank"
            rel="noopener"
            overlay
            color="neutral"
          >
            <GitHub />
          </Link>
        </IconButton>
        <Divider />
        <MainTable />
      </Card>
    </Box>
  );
}
