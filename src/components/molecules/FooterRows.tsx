import { Option, Select, Typography, selectClasses } from "@mui/joy";
import { memo } from "react";
import { FiChevronDown } from "react-icons/fi";

import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const FooterRows = memo(function FooterRows() {
  const rowsPerPage = usePaginationStore((state) => state.rowsPerPage);
  const setRowsPerPage = usePaginationStore((state) => state.setRowsPerPage);
  const rowCountOptions = usePaginationStore((state) => state.rowCountOptions);
  const firstPage = usePaginationStore((state) => state.firstPage);

  return (
    <Flexbox gap={1}>
      <Typography {...styles.typography}>Rows:</Typography>
      <Select
        onChange={(e, v) => {
          setRowsPerPage(v!);
          firstPage();
        }}
        value={rowsPerPage}
        {...styles.select}
      >
        <Option value={rowCountOptions[0]}>{rowCountOptions[0]}</Option>
        <Option value={rowCountOptions[1]}>{rowCountOptions[1]}</Option>
        <Option value={rowCountOptions[2]}>{rowCountOptions[2]}</Option>
      </Select>
    </Flexbox>
  );
});

const styles = {
  select: {
    indicator: <FiChevronDown />,
    size: "sm",
    sx: {
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.25)" },
      [`& .${selectClasses.indicator}`]: {
        [`&.${selectClasses.expanded}`]: { transform: "rotate(-180deg)" },
        transition: "0.25s",
      },
      backgroundColor: "transparent",
    },
  },
  typography: {
    level: "body-xs",
    sx: { userSelect: "none" },
  },
} as const;
