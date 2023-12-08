import loadable from "@loadable/component";
import { Table } from "@mui/joy";
import { memo } from "react";

const EventTableBody = loadable(() => import("../components/organisms/EventTableBody.tsx"), {
  resolveComponent: (component) => component.EventTableBody,
  ssr: false,
});
const EventTableHeader = loadable(() => import("../components/organisms/EventTableHeader.tsx"), {
  resolveComponent: (component) => component.EventTableHeader,
  ssr: false,
});

export const EventTable = memo(function EventTable() {
  return (
    <Table size="lg">
      <EventTableHeader />
      <EventTableBody />
    </Table>
  );
});
