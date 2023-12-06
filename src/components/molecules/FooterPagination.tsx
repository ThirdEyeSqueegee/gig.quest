import { IconButton } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const FooterPagination = memo(function FooterPagination(props: { lastPage?: number }) {
  const { lastPage } = props;

  const page = usePaginationStore((state) => state.page);
  const setPage = usePaginationStore((state) => state.setPage);
  const firstPage = usePaginationStore((state) => state.firstPage);
  const prevPage = usePaginationStore((state) => state.prevPage);
  const nextPage = usePaginationStore((state) => state.nextPage);

  return (
    <Flexbox gap={1}>
      <IconButton disabled={page === 1} onClick={firstPage} {...styles.pageButton}>
        <FaAnglesLeft />
      </IconButton>
      <IconButton disabled={page === 1} onClick={prevPage} {...styles.pageButton}>
        <FaAngleLeft />
      </IconButton>
      <IconButton disabled={page === lastPage} onClick={nextPage} {...styles.pageButton}>
        <FaAngleRight />
      </IconButton>
      <IconButton disabled={page === lastPage} onClick={() => setPage(lastPage!)} {...styles.pageButton}>
        <FaAnglesRight />
      </IconButton>
    </Flexbox>
  );
});

const styles = {
  pageButton: {
    component: m.button,
    variant: "outlined",
    whileTap: { scale: 0.8 },
  },
} as const;
