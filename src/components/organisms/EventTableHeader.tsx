import { IconButton, Typography } from "@mui/joy";
import { memo } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdMoreVert } from "react-icons/md";

import { useSortingStore } from "../../stores/useSortingStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const EventTableHeader = memo(function EventTableHeader() {
  const sorting = useSortingStore((state) => state);

  return (
    <thead>
      <tr>
        <th style={{ width: "2.5%" }}>
          <Typography level="body-lg" sx={{ userSelect: "none" }}>
            Type
          </Typography>
        </th>
        <th style={{ width: "20%" }}>
          <Typography level="body-lg" sx={{ userSelect: "none" }}>
            Event
          </Typography>
        </th>
        <th style={{ width: "15%" }}>
          <Typography level="body-lg" sx={{ userSelect: "none" }}>
            Venue
          </Typography>
        </th>
        <th style={{ width: "8.5%" }}>
          <Flexbox justifyContent="space-between">
            <Typography level="body-lg" sx={{ userSelect: "none" }}>
              Date
            </Typography>
            <IconButton aria-label="Sort by date" onClick={sorting.toggleSortDate} {...styles.sortButton}>
              {sorting.sortDate !== undefined ?
                sorting.sortDate ?
                  <FiChevronUp fontSize="0.875rem" />
                : <FiChevronDown fontSize="0.875rem" />
              : <MdMoreVert fontSize="0.875rem" />}
            </IconButton>
          </Flexbox>
        </th>
        <th style={{ width: "4%" }}>
          <Flexbox justifyContent="space-between">
            <Typography level="body-lg" sx={{ userSelect: "none" }}>
              $ (lo)
            </Typography>
            <IconButton aria-label="Sort by lowest price" onClick={sorting.toggleSortLowestPrice} {...styles.sortButton}>
              {sorting.sortLowestPrice !== undefined ?
                sorting.sortLowestPrice ?
                  <FiChevronUp fontSize="0.875rem" />
                : <FiChevronDown fontSize="0.875rem" />
              : <MdMoreVert fontSize="0.875rem" />}
            </IconButton>
          </Flexbox>
        </th>
        <th style={{ width: "4%" }}>
          <Flexbox justifyContent="space-between">
            <Typography level="body-lg" sx={{ userSelect: "none" }}>
              $ (hi)
            </Typography>
            <IconButton aria-label="Sort by highest price" onClick={sorting.toggleSortHighestPrice} {...styles.sortButton}>
              {sorting.sortHighestPrice !== undefined ?
                sorting.sortHighestPrice ?
                  <FiChevronUp fontSize="0.875rem" />
                : <FiChevronDown fontSize="0.875rem" />
              : <MdMoreVert fontSize="0.875rem" />}
            </IconButton>
          </Flexbox>
        </th>
        <th style={{ width: "4%" }}>
          <Flexbox justifyContent="space-between">
            <Typography level="body-lg" sx={{ userSelect: "none" }}>
              $ (avg)
            </Typography>
            <IconButton aria-label="Sort by average price" onClick={sorting.toggleSortAvgPrice} {...styles.sortButton}>
              {sorting.sortAvgPrice !== undefined ?
                sorting.sortAvgPrice ?
                  <FiChevronUp fontSize="0.875rem" />
                : <FiChevronDown fontSize="0.875rem" />
              : <MdMoreVert fontSize="0.875rem" />}
            </IconButton>
          </Flexbox>
        </th>
        <th style={{ width: "7.5%" }}>
          <Flexbox justifyContent="space-between">
            <Typography level="body-lg" sx={{ userSelect: "none" }}>
              Popularity
            </Typography>
            <IconButton aria-label="Sort by popularity" onClick={sorting.toggleSortPopularity} {...styles.sortButton}>
              {sorting.sortPopularity !== undefined ?
                sorting.sortPopularity ?
                  <FiChevronUp fontSize="0.875rem" />
                : <FiChevronDown fontSize="0.875rem" />
              : <MdMoreVert fontSize="0.875rem" />}
            </IconButton>
          </Flexbox>
        </th>
        <th style={{ width: "5%" }}>
          <Typography level="body-lg" sx={{ userSelect: "none" }}>
            Tickets
          </Typography>
        </th>
      </tr>
    </thead>
  );
});

const styles = {
  sortButton: {
    size: "sm",
    sx: { "--IconButton-size": "1rem", "&:hover, &:active": { backgroundColor: "transparent" } },
  },
} as const;
