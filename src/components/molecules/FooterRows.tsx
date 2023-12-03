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
      <Typography fontSize="0.75rem" level="body-sm">
        Rows:
      </Typography>
      <Select
        indicator={<FiChevronDown />}
        onChange={(e, v: null | number) => {
          setRowsPerPage(v!);
          firstPage();
        }}
        size="sm"
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
    sx: {
      [`& .${selectClasses.indicator}`]: {
        [`&.${selectClasses.expanded}`]: { transform: "rotate(-180deg)" },
        transition: "0.2s",
      },
      backgroundColor: "transparent",
    },
  },
};
