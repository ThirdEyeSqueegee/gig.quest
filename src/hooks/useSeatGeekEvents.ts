import { isEqual } from "ohash";
import useSWR from "swr";

import { seatGeekFetcher } from "../api/seatGeekFetcher.ts";
import { useLocationStore } from "../stores/useLocationStore.ts";
import { usePaginationStore } from "../stores/usePaginationStore.ts";
import { useSearchStore } from "../stores/useSearchStore.ts";
import { useSortingStore } from "../stores/useSortingStore.ts";

export const useSeatGeekEvents = () => {
  const page = usePaginationStore((state) => state.page);
  const rowsPerPage = usePaginationStore((state) => state.rowsPerPage);
  const range = usePaginationStore((state) => state.range);
  const location = useLocationStore((state) => state.location);
  const debSearchTerm = useSearchStore((state) => state.debSearchTerm);
  const filter = useSearchStore((state) => state.filter);
  const sorting = useSortingStore((state) => state);

  const { data: eventsDetailsAndMeta, isLoading } = useSWR(
    [
      "eventsDetails",
      page,
      rowsPerPage,
      range,
      location,
      filter,
      sorting.sortAvgPrice,
      sorting.sortDate,
      sorting.sortHighestPrice,
      sorting.sortLowestPrice,
      sorting.sortPopularity,
      debSearchTerm,
    ],
    ([, ...args]) => seatGeekFetcher(...args),
    { compare: isEqual, keepPreviousData: true },
  );

  return {
    details: eventsDetailsAndMeta?.details,
    isLoading,
    meta: eventsDetailsAndMeta?.meta,
  };
};
