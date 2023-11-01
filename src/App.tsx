import { Box, Card, Divider, Typography } from "@mui/joy";
import { useOrientation } from "@uidotdev/usehooks";
import TypeIt from "typeit-react";
import MainTable from "./MainTable";

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
        <Divider />
        <MainTable />
      </Card>
    </Box>
  );
}
