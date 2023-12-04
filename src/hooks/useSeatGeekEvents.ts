import { isEqual } from "ohash";
import useSWR from "swr";

import { seatGeekFetcher } from "../api/seatGeekFetcher.ts";
import { useLocationStore } from "../stores/useLocationStore.ts";
import { usePaginationStore } from "../stores/usePaginationStore.ts";
import { useSearchStore } from "../stores/useSearchStore.ts";
import { useSortingStore } from "../stores/useSortingStore.ts";

export const useSeatGeekEvents = () => {
  const pagination = usePaginationStore((state) => state);
  const sorting = useSortingStore((state) => state);
  const location = useLocationStore((state) => state);
  const debSearchTerm = useSearchStore((state) => state.debSearchTerm);
  const filter = useSearchStore((state) => state.filter);

  const { data: eventsDetailsAndMeta, isLoading } = useSWR(
    location.location ?
      [
        "eventsDetails",
        location.location,
        pagination.page,
        pagination.rowsPerPage,
        pagination.range,
        filter,
        sorting.sortAvgPrice,
        sorting.sortDate,
        sorting.sortHighestPrice,
        sorting.sortLowestPrice,
        sorting.sortPopularity,
        debSearchTerm,
      ]
    : null,
    ([, loc, page, rowsPerPage, range, f, sortAvgPrice, sortDate, sortHighestPrice, sortLowestPrice, sortPopularity, term]) =>
      seatGeekFetcher(loc, page, rowsPerPage, range, f, sortAvgPrice, sortDate, sortHighestPrice, sortLowestPrice, sortPopularity, term),
    { compare: isEqual, keepPreviousData: true },
  );

  return {
    details: eventsDetailsAndMeta?.details,
    isLoading,
    meta: eventsDetailsAndMeta?.meta,
  };
};
