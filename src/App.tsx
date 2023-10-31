import { Box, Card, Typography, Divider } from "@mui/joy";
import MainTable from "./MainTable";
import TypeIt from "typeit-react";

export default function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        p: 3,
      }}
    >
      <Card
        size="lg"
        sx={{
          pt: 0,
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
