import { ArrowDownward, ArrowUpward, MoreVert } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/joy";
import { memo } from "react";

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
            <IconButton onClick={sorting.toggleSortDate} size="sm" {...styles.sortButton}>
              {sorting.sortDate !== undefined ?
                sorting.sortDate ?
                  <ArrowUpward fontSize="small" />
                : <ArrowDownward fontSize="small" />
              : <MoreVert fontSize="small" />}
            </IconButton>
          </Flexbox>
        </th>
        <th style={{ width: "3.5%" }}>
          <Flexbox justifyContent="space-between">
            <Typography level="body-lg" sx={{ userSelect: "none" }}>
              $ (lo)
            </Typography>
            <IconButton onClick={sorting.toggleSortLowestPrice} size="sm" {...styles.sortButton}>
              {sorting.sortLowestPrice !== undefined ?
                sorting.sortLowestPrice ?
                  <ArrowUpward fontSize="small" />
                : <ArrowDownward fontSize="small" />
              : <MoreVert fontSize="small" />}
            </IconButton>
          </Flexbox>
        </th>
        <th style={{ width: "3.5%" }}>
          <Flexbox justifyContent="space-between">
            <Typography level="body-lg" sx={{ userSelect: "none" }}>
              $ (hi)
            </Typography>
            <IconButton onClick={sorting.toggleSortHighestPrice} size="sm" {...styles.sortButton}>
              {sorting.sortHighestPrice !== undefined ?
                sorting.sortHighestPrice ?
                  <ArrowUpward fontSize="small" />
                : <ArrowDownward fontSize="small" />
              : <MoreVert fontSize="small" />}
            </IconButton>
          </Flexbox>
        </th>
        <th style={{ width: "3.5%" }}>
          <Flexbox justifyContent="space-between">
            <Typography level="body-lg" sx={{ userSelect: "none" }}>
              $ (avg)
            </Typography>
            <IconButton onClick={sorting.toggleSortAvgPrice} size="sm" {...styles.sortButton}>
              {sorting.sortAvgPrice !== undefined ?
                sorting.sortAvgPrice ?
                  <ArrowUpward fontSize="small" />
                : <ArrowDownward fontSize="small" />
              : <MoreVert fontSize="small" />}
            </IconButton>
          </Flexbox>
        </th>
        <th style={{ width: "7.5%" }}>
          <Flexbox justifyContent="space-between">
            <Typography level="body-lg" sx={{ userSelect: "none" }}>
              Popularity
            </Typography>
            <IconButton onClick={sorting.toggleSortPopularity} size="sm" {...styles.sortButton}>
              {sorting.sortPopularity !== undefined ?
                sorting.sortPopularity ?
                  <ArrowUpward fontSize="small" />
                : <ArrowDownward fontSize="small" />
              : <MoreVert fontSize="small" />}
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
    sx: {
      "&:hover, &:active": { backgroundColor: "transparent" },
      "--IconButton-size": "1.5rem",
    },
  },
};