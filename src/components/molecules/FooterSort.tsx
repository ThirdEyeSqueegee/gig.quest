import { Option, Select, Typography, selectClasses } from "@mui/joy";
import { memo } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { useSortingStore } from "../../stores/useSortingStore.ts";
import { useViewStore } from "../../stores/useViewStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const FooterSort = memo(function FooterSort() {
  const tableView = useViewStore((state) => state.tableView);
  const sorting = useSortingStore((state) => state);

  return (
    !tableView && (
      <Flexbox gap={1}>
        <Typography {...styles.typography}>Sort:</Typography>
        <Select defaultValue="Date" {...styles.select}>
          <Option onClick={sorting.toggleSortDate} value="Date">
            Date
            {sorting.sortDate === undefined ?
              null
            : sorting.sortDate ?
              <FiChevronUp fontSize="1rem" />
            : <FiChevronDown fontSize="1rem" />}
          </Option>
          <Option onClick={sorting.toggleSortPopularity} value="Popularity">
            Popularity
            {sorting.sortPopularity === undefined ?
              null
            : sorting.sortPopularity ?
              <FiChevronUp fontSize="1rem" />
            : <FiChevronDown fontSize="1rem" />}
          </Option>
          <Option onClick={sorting.toggleSortLowestPrice} value="$ lo">
            $ lo
            {sorting.sortLowestPrice === undefined ?
              null
            : sorting.sortLowestPrice ?
              <FiChevronUp fontSize="1rem" />
            : <FiChevronDown fontSize="1rem" />}
          </Option>
          <Option onClick={sorting.toggleSortHighestPrice} value="$ hi">
            $ hi
            {sorting.sortHighestPrice === undefined ?
              null
            : sorting.sortHighestPrice ?
              <FiChevronUp fontSize="1rem" />
            : <FiChevronDown fontSize="1rem" />}
          </Option>
          <Option onClick={sorting.toggleSortAvgPrice} value="$ avg">
            $ avg
            {sorting.sortAvgPrice === undefined ?
              null
            : sorting.sortAvgPrice ?
              <FiChevronUp fontSize="1rem" />
            : <FiChevronDown fontSize="1rem" />}
          </Option>
        </Select>
      </Flexbox>
    )
  );
});

const styles = {
  select: {
    indicator: <FiChevronDown />,
    size: "sm",
    slotProps: { listbox: { sx: { fontSize: "xs" } } },
    sx: {
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
