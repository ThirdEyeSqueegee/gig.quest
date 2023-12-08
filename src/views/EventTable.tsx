import { Table } from "@mui/joy";
import { memo } from "react";

import { EventTableBody } from "../components/organisms/EventTableBody.tsx";
import { EventTableHeader } from "../components/organisms/EventTableHeader.tsx";

export const EventTable = memo(function EventTable() {
  return (
    <Table size="lg">
      <EventTableHeader />
      <EventTableBody />
    </Table>
  );
});
