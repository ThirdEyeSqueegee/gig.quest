import { Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";

import { useSeatGeekEvents } from "../../hooks/useSeatGeekEvents.ts";
import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { FooterPagination } from "../molecules/FooterPagination.tsx";
import { FooterRangeSlider } from "../molecules/FooterRangeSlider.tsx";
import { FooterRows } from "../molecules/FooterRows.tsx";
import { FooterSort } from "../molecules/FooterSort.tsx";

export const Footer = memo(function Footer() {
  const page = usePaginationStore((state) => state.page);
  const rowsPerPage = usePaginationStore((state) => state.rowsPerPage);

  const { meta: sgMeta } = useSeatGeekEvents();

  const sgEventCount = sgMeta?.total;

  const lastPage = sgEventCount ? Math.ceil(sgEventCount / rowsPerPage) : undefined;

  return (
    <Flexbox flexDirection="column" position={isMobile ? "inherit" : "sticky"} {...styles.mainFlex}>
      <Flexbox flexWrap="wrap" gap={isMobile ? 1 : 2}>
        <FooterRows />
        <FooterRangeSlider />
        <FooterSort />
        <FooterPagination lastPage={lastPage} />
      </Flexbox>
      <Typography level="body-sm">
        Page {page} of {lastPage ?? "..."}
      </Typography>
    </Flexbox>
  );
});

const styles = {
  mainFlex: {
    component: m.div,
    gap: isMobile ? 1 : 0,
    layout: true,
    my: 1.25,
    transition: { duration: 0.25 },
    width: isMobile ? 0.9 : "auto",
    ...(!isMobile && {
      bottom: 25,
      px: 3,
      py: 1,
      sx: { backdropFilter: "blur(0.5rem)", border: 1, borderColor: "neutral.outlinedBorder", borderRadius: 25, zIndex: "badge" },
    }),
  },
};
