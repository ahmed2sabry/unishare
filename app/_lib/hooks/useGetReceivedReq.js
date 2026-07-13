"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getToolAction } from "../actions/getToolAction";
import { getReceivedReqAction } from "../actions/getReceivedReqAction";

export function useGetReceivedReq(type = "received") {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["lending-requests", type],
    queryFn: ({ pageParam, queryKey }) =>
      getReceivedReqAction({ pageParam, queryKey }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: true,
    staleTime: 5000,
  });

  return {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
