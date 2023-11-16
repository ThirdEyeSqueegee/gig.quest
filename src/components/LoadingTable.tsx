import { HourglassTop } from "@mui/icons-material";
import { CircularProgress, Sheet, Table, Typography } from "@mui/joy";

export const LoadingTable = () => {
  return (
    <Sheet sx={{ overflow: "auto", height: "100%" }}>
      <Table size="lg" sx={{ height: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: "2.5%" }}>
              <Typography level="body-lg">Type</Typography>
            </th>
            <th style={{ width: "20%" }}>
              <Typography level="body-lg">Performers</Typography>
            </th>
            <th style={{ width: "15%" }}>
              <Typography level="body-lg">Venue</Typography>
            </th>
            <th style={{ width: "8.5%" }}>
              <Typography level="body-lg">Date</Typography>
            </th>
            <th style={{ width: "3.5%" }}>
              <Typography level="body-md">$ (lo)</Typography>
            </th>
            <th style={{ width: "3.5%" }}>
              <Typography level="body-md">$ (hi)</Typography>
            </th>
            <th style={{ width: "3.5%" }}>
              <Typography level="body-md">$ (avg)</Typography>
            </th>
            <th style={{ width: "7.5%" }}>
              <Typography level="body-lg">Popularity</Typography>
            </th>
            <th style={{ width: "5%" }}>
              <Typography level="body-lg">Tickets</Typography>
            </th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          <tr />
          <tr />
          <tr />
          <tr />
          <tr>
            <td colSpan={9} rowSpan={12}>
              <CircularProgress size="lg">
                <HourglassTop />
              </CircularProgress>
            </td>
          </tr>
          <tr />
          <tr />
          <tr />
          <tr />
        </tbody>
      </Table>
    </Sheet>
  );
};
