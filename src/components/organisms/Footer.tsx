import { Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";

import { useSeatGeekEvents } from "../../hooks/useSeatGeekEvents.ts";
import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { FooterFilter } from "../molecules/FooterFilter.tsx";
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
    <Flexbox {...styles.mainFlex}>
      <Flexbox columnGap={isMobile ? 1 : 2} flexWrap="wrap" rowGap={0}>
        <FooterFilter />
        <FooterRows />
        <FooterRangeSlider />
        <FooterSort />
        <FooterPagination lastPage={lastPage} />
      </Flexbox>
      <Typography level="body-sm" sx={{ userSelect: "none" }}>
        Page {page} of {lastPage ?? "..."}
      </Typography>
    </Flexbox>
  );
});

const styles = {
  mainFlex: {
    component: m.div,
    flexDirection: "column",
    layout: true,
    my: 1.25,
    position: isMobile ? undefined : "sticky",
    rowGap: isMobile ? 2 : 0,
    transition: { duration: 0.25 },
    width: isMobile ? 0.9 : "auto",
    ...(!isMobile && {
      bottom: "1.5rem",
      px: 3,
      py: 1,
      sx: { backdropFilter: "blur(0.5rem)", border: 1, borderColor: "neutral.outlinedBorder", borderRadius: "2rem", zIndex: "badge" },
    }),
  },
} as const;
