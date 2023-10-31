import { Box, Card, Typography, Divider } from "@mui/joy";
import ShowsTable from "./ShowsTable";

export default function App() {
  return (
    <Box sx={{ height: "100vh", p: 4 }}>
      <Card variant="soft" size="lg" sx={{ alignItems: "center" }}>
        <Typography level="h1">gig.quest</Typography>
        <Divider />
        <ShowsTable />
      </Card>
    </Box>
  );
}
