import { isEqual } from "ohash";
import useSWR from "swr";

import { eventsFetcher } from "../api/API.ts";
import { useLocationStore } from "../stores/useLocationStore.ts";
import { usePaginationStore } from "../stores/usePaginationStore.ts";
import { useSearchStore } from "../stores/useSearchStore.ts";
import { useSortingStore } from "../stores/useSortingStore.ts";

export const useEvents = () => {
  const pagination = usePaginationStore((state) => state);
  const sorting = useSortingStore((state) => state);
  const location = useLocationStore((state) => state);
  const debSearchTerm = useSearchStore((state) => state.debSearchTerm);

  const { data: eventsDetailsAndMeta, isLoading } = useSWR(
    location.location ?
      [
        "eventsDetails",
        pagination.filter,
        location.location,
        pagination.page,
        pagination.rowsPerPage,
        pagination.range,
        sorting.sortAvgPrice,
        sorting.sortDate,
        sorting.sortHighestPrice,
        sorting.sortLowestPrice,
        sorting.sortPopularity,
        debSearchTerm,
      ]
    : null,
    ([, filter, loc, page, rowsPerPage, range, sortAvgPrice, sortDate, sortHighestPrice, sortLowestPrice, sortPopularity, term]) =>
      eventsFetcher(filter, loc, page, rowsPerPage, range, sortAvgPrice, sortDate, sortHighestPrice, sortLowestPrice, sortPopularity, term),
    {
      compare: isEqual,
      keepPreviousData: true,
    },
  );

  return {
    details: eventsDetailsAndMeta?.details,
    isLoading,
    meta: eventsDetailsAndMeta?.meta,
  };
};
